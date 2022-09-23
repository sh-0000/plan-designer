import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectsContext } from "../context/projects_context";
import Loading from "../components/Loading";

const EditorPage = () => {
  const { projectID } = useParams();
  const navigate = useNavigate();
  const {
    single_project_loading: loading,
    single_project_error: error,
    single_project: project,
    fetchSingleProject,
  } = useProjectsContext();

  useEffect(() => {
    fetchSingleProject(projectID);
    console.log(loading);
  }, [projectID]);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error]);

  if (!loading) {
    return <Loading />;
  }
  if (error) {
    return <h4>Error</h4>;
  }
};
export default EditorPage;
