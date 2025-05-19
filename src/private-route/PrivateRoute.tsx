import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const location = useLocation()

    const token = localStorage.getItem("token");

    return token ? children : <Navigate replace to="/login" state={{ pathname: location.pathname }} />;
};

export default PrivateRoute;
