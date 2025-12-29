import ProjectText from "./ProjectText";
import ProjectPoster from "./ProjectPoster";

const ProjectScene = ({ project, index, active }) => {
  return (
    <section
      className="project-scene"
      data-index={index}
    >
      <ProjectText
        title={project.title}
        description={project.description}
        active={active}
        index={index}
      />
      <ProjectPoster
        image={project.image}
        active={active}
      />
    </section>
  );
};

export default ProjectScene;
