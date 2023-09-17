import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";



const Nav = () => {

    const userContext = useContext(UserContext);
    // console.log('userContext', JSON.stringify(userContext));
    // console.log(userContext.user.email);

    const isAuthCheck = async () => {
        const resp = await fetch('http://localhost:3000/auth', {
            credentials: "include",
        });
        const data = await resp.json();
        userContext.setUser(data);
    }

    useEffect(() => {
        isAuthCheck()
            .catch((err) => {
                console.log('Error', err);
            })
    }, [])

    console.log(userContext)

    return (

        <ul className="nav">
            {userContext?.user?.email ?
                <li className="navChild">
                    <Link to='/logout'>Logout</Link>
                </li> : <li className="navChild">
                    <Link to='/login'>Login</Link>
                </li>
            }

            {userContext?.user?.email &&
                <li className="navChild">
                    <Link to='/posts'>Posts</Link>
                </li>}

            {userContext?.user?.email &&
                <li className="navChild">
                    <Link to='/submitblog'>submit post</Link>
                </li>}
            {userContext?.user?.email && <p>{userContext?.user?.email}</p>}
        </ul>

    )
}

export default Nav;