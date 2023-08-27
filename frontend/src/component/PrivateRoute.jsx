import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({children}) => {
    const { userInfo } = useSelector((state) => state.auth);
   const loadedComponent = userInfo ? (
     children
   ) : (
     <Navigate to="/login" />
    );
    return <div>{loadedComponent}</div>;
};
export default PrivateRoute;
