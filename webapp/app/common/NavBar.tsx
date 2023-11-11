import { NavLink } from "remix";
import RommeLogo from "./RommeLogo";

const NavBar = () => {
    return (
        <nav className="py-5 flex">
            <NavLink to="/">
                <RommeLogo />
            </NavLink>
        </nav>
    );
};

export default NavBar;
