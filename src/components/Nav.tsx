import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Nav = () => {

    const [isAuth, setIsAuth] = useState<null | { authenticated: boolean }>(null);


    const isAuthCheck = async () => {
        try {
            setIsAuth({ authenticated: false });
            const resp = await fetch('http://localhost:3000/auth', {
                credentials: "include",
            });
            const data = await resp.json();
            setIsAuth(data);
            console.log('IS Authed is >>>>', data);
        } catch (err) {
            console.log('nav error', err);
        }
    }

    useEffect(() => {
        isAuthCheck();
    }, [])

    return (
        <ul className="nav">
            <li className="navChild">
                <Link to='/login'>Login</Link>
            </li>
            <li className="navChild">
                <Link to='/logout'>Logout</Link>
            </li>
            <li className="navChild">
                <Link to='/posts'>Posts</Link>
            </li>
        </ul>

    )
}

export default Nav;