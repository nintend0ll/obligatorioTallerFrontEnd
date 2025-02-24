import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userData = useSelector(state => state.userSlice.userData) || JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default PrivateRoute;

