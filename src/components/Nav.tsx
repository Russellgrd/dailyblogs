import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";



const Nav = () => {

    const userContext = useContext(UserContext);
    // console.log('userContext', JSON.stringify(userContext));
    // console.log(userContext.user.email);

    const isAuthCheck = async () => {
        try {
            const resp = await fetch('http://localhost:3000/auth', {
                credentials: "include",
            });
            const data = await resp.json();
            userContext.setUser(data);
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
            <li className="navChild">
                <Link to='/submitblog'>submit post</Link>
            </li>
            {userContext?.user?.email && <p>{userContext.user.email}</p>}
        </ul>

    )
}

export default Nav;