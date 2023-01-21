import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { UserContext } from "./../../context/user.context";
import { signOutUser } from "./../../utils/firebase/firebase.util";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <>
            <div className="navigation">
                <Link to={"/"} className="logo-container">
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to={"/shop"}>
                        shop
                    </Link>
                    {currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>
                            Sign out
                        </span>
                    ) : (
                        <Link className="nav-link" to={"/auth"}>
                            sign-in
                        </Link>
                    )}
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;
