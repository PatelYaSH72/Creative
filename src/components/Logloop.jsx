import LogoLoop from './LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact color='white'/>, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs color='white'/>, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript color='white'/>, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss color='white'/>, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

const imageLogos = [
  { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
];

function LogLoop() {
  return (
    <div style={{ height: '200px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'end'}}>
      {/* Horizontal logo loop */}
      <LogoLoop
        logos={techLogos}
        speed={200}               // speed control
        direction="left"          // left / right
        logoHeight={80}           // icon size
        gap={50}                  // gap between logos
        fadeOut
        fadeOutColor="var(--pure-black)"
        scaleOnHover
        pauseOnHover={true}       // hover pe pause
        width="100%"              // container width
        height="180px"            // container height
        backgroundColor="var(--text-dark)" // background color
        ariaLabel="Technology partners"
      />

      {/* Example vertical loop */}
      
    </div>
  );
}

export default LogLoop;
