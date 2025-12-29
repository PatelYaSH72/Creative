import ThreePoster from "./ThreePoster";

const ProjectPoster = ({ image, active }) => {
  return (
    <div className={`poster-frame ${active ? "active" : ""}`}>
      {active && <ThreePoster image={image} />}
      {!active && <img src={image} alt="" />}
    </div>
  );
};

export default ProjectPoster;
