import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useIsAuth } from "../helpers/useIsAuth";
import navBurger from '../assets/nav-burgerIcon.svg';


const Nav = () => {
    const userContext = useContext(UserContext);
    const [show, setShow] = useState(false);
    useEffect(() => {
        useIsAuth(userContext);
    }, [])

    const handleNavBurgerButton = () => {
        setShow((val) => val = !val);
    }

    let navClass = "nav ";
    navClass += show ? "show" : "hide";

    return (

        <div className="navWrapper">
            <img onClick={handleNavBurgerButton} className="navBurger" src={navBurger} alt="Nav Burger Icon" />
            <ul onClick={(e) => { setShow(state => !state) }} className={navClass}>
                {userContext?.user?.email ?
                    <li className="navChild">
                        <Link to='/logout'>logout</Link>
                    </li> : <li className="navChild">
                        <Link to='/login'>Login</Link>
                    </li>
                }

                {userContext?.user?.email &&
                    <li className="navChild">
                        <Link to='/posts'>posts</Link>
                    </li>}

                {userContext?.user?.email &&
                    <li className="navChild">
                        <Link to='/submitblog'>submit post</Link>
                    </li>}
                {userContext?.user?.email && <p className="navUserEmail">{userContext?.user?.email}</p>}
            </ul>
        </div>
    )
}

export default Nav;