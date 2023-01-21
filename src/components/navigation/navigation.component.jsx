import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { CartContext } from "../../context/cart.context";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { UserContext } from "./../../context/user.context";
import { signOutUser } from "./../../utils/firebase/firebase.util";
import CardIcon from "./../card-icon/card-icon.component";

import "./navigation.styles.scss";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpened } = useContext(CartContext);

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
                    <CardIcon />
                </div>
                {isCartOpened && <CartDropdown />}
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;
