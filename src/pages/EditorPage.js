import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectsContext } from "../context/projects_context";
import Loading from "../components/Loading";
import { LeftPanel, RightPanel } from "../components";
import { useLibraryContext } from "../context/library_context";
import Canvas from "../components/editor/Canvas";
import Background from "../components/editor/Background";
import Rectangle from "../components/editor/Rectangle";
import { useCanvasContext } from "../context/canvas_context";
import { Text } from "../components/editor/Text";
import IconImage from "../components/editor/IconImage";

const EditorPage = () => {
  const { projectID } = useParams();
  const navigate = useNavigate();
  const {
    single_project_loading: loading,
    single_project_error: error,
    single_project: project,
    fetchSingleProject,
  } = useProjectsContext();
  const {
    icons,
    icons_loading: iconLoading,
    icons_error: iconError,
  } = useLibraryContext();

  const { canvas, images, canvas_loaded, updateImages } = useCanvasContext();

  /*On load fetchSingleProject and pass projectID from useParams*/
  useEffect(() => {
    fetchSingleProject(projectID);
  }, [projectID]);
  /* errors while fetch data will redirect the user to the dashboard after 3 seconds */
  useEffect(() => {
    if (error || iconError) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error, iconError]);

  if (loading || iconLoading) {
    //while the data is loading
    return <Loading />;
  }
  if (error || iconError) {
    //while no errors exist
    return <h4>Error</h4>;
  }

  return (
    <div>
      <LeftPanel icons={icons} />
      <RightPanel />
      <Canvas>
        {images.map(
          (image, index) =>
            canvas_loaded && (
              <IconImage
                key={index}
                canvas={canvas}
                id={index}
                element={image.element}
                options={image.options}
              />
            )
        )}
        {canvas_loaded && <Background canvas={canvas} src={project.schema} />}
      </Canvas>
    </div>
  );
};
export default EditorPage;
