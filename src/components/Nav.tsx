import { Link } from "react-router-dom";

const Nav = () => {

    return (
        <ul className="nav">
            <li className="navChild">
                <Link to="/login">Login</Link>
            </li>
        </ul>
    )
}

export default Nav;