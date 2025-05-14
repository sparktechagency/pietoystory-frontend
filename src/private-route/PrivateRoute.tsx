import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const token = localStorage.getItem("token");

    return token ? children : <Navigate replace to="/login" />;
};

export default PrivateRoute;
