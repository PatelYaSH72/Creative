import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';
import '../styles/Aurora.css';

/* ================= SAFE COLOR FUNCTION ================= */
const normalizeColors = (colors) => {
  const fallback = ['#961919', '#FFFFFF', '#7EF3FF'];

  const cleaned = (colors && colors.length ? colors : fallback)
    .slice(0, 3)
    .map(c => c.slice(0, 7)); // remove alpha if present

  while (cleaned.length < 3) {
    cleaned.push(cleaned[cleaned.length - 1]);
  }

  return cleaned;
};

/* ================= VERTEX SHADER ================= */
const VERT = `#version 300 es
in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

/* ================= FRAGMENT SHADER ================= */
const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

uniform float uBrightness;
out vec4 fragColor;


vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
    0.2113248654,
    0.3660254038,
   -0.5773502691,
    0.0243902439
  );

  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);

  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod(i, 289.0);
  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0)) +
    i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(
      dot(x0, x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ), 0.0
  );

  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.792842914 - 0.853734721 * (a0 * a0 + h * h);

  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;

  return 130.0 * dot(m, g);
}

vec3 colorRamp(float t) {
  vec3 c1 = uColorStops[0];
  vec3 c2 = uColorStops[1];
  vec3 c3 = uColorStops[2];

  if (t < 0.5) {
    return mix(c1, c2, t * 2.0);
  }
  return mix(c2, c3, (t - 0.5) * 2.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;

  float x = uv.x;
  float n = snoise(vec2(
    x * 3.5 + uTime * 0.25,
    uTime * 0.15
  ));

  float wave = (1.0 - uv.y) - n * 0.28 * uAmplitude;
  float alpha = smoothstep(0.9, 0.05, wave);
  alpha = max(alpha, 0.01);

  vec3 color = colorRamp(uv.x);
  vec3 finalColor = color * alpha * uBrightness;

  fragColor = vec4(finalColor, alpha);
}
`;

/* ================= REACT COMPONENT ================= */
export default function Aurora({
  colorStops = ['#961919', '#FFFFFF', '#7EF3FF'],
  amplitude = 1.0,
  blend = 0.5,
  time,
  speed = 1.0,
   brightness = 0.1,
}) {
  const containerRef = useRef(null);
  const propsRef = useRef({ colorStops, amplitude, blend, time, speed });
  propsRef.current = { colorStops, amplitude, blend, time, speed };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const geometry = new Triangle(gl);
    delete geometry.attributes.uv;

    const safeColors = normalizeColors(colorStops);

    const program = new Program(gl, {
  vertex: VERT,
  fragment: FRAG,
  uniforms: {
    uTime: { value: 0 },
    uAmplitude: { value: amplitude },
    uBlend: { value: blend },
    uResolution: { value: [container.offsetWidth, container.offsetHeight] },
    uColorStops: {
      value: safeColors.map(hex => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      }),
    },
    uBrightness: { value: brightness }, // ✅ Correctly added here
  }
});


    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    const resize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h];
    };

    window.addEventListener('resize', resize);
    resize();

    let raf;
    const animate = t => {
      raf = requestAnimationFrame(animate);
      program.uniforms.uTime.value =
        (propsRef.current.time ?? t * 0.01) * propsRef.current.speed * 0.1;

      renderer.render({ scene: mesh });
      program.uniforms.uBrightness.value = brightness;
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [amplitude, blend, colorStops]);

  return <div ref={containerRef} className="aurora-container" />;
}
