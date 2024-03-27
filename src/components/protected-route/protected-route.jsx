import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { getIsAuthChecked } from "../../services/selectors";
import PropTypes from "prop-types";
import Loader from "../loader/loader";

export default function ProtectedRoute({ children, onlyUnAuth }) {
    const location = useLocation();
    const user = useSelector((state) => state.user.data);
    const isAuthChecked = useSelector(getIsAuthChecked);

    if (!isAuthChecked) {
        console.log("check authentication");
        return (
            <Loader />
        );
    }

    if (onlyUnAuth && user) {
        console.log("navigate from login to index page");
        const from = location.state?.from || { pathname: "/" };
        const backgroundLocation = location.state?.from?.state || null;
        return <Navigate replace to={from} state={{ backgroundLocation }} />;
    }

    if (!onlyUnAuth && !user) {
        console.log("navigate to login page");
        return <Navigate replace to={"/login"} state={{ from: location }} />;
    }

    console.log("render children");
    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    onlyUnAuth: PropTypes.bool,
};