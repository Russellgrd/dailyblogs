
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const Logout = () => {

    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const [isLoggedOut, setIsLoggedOut] = useState<null | { message: string }>(null);


    useEffect(() => {
        fetch("http://localhost:3000/logout", {
            credentials: "include"
        })
            .then(resp => resp.json())
            .then((data) => {
                setIsLoggedOut(data);
            })
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                console.log('there was an error', err);
            })
    }, [])

    return (
        <div className="logout">

            <h1>Logged out</h1>
            {isLoggedOut?.message == "successfully logged out" ? <p>Successfully logged out</p> : <p>{isLoggedOut?.message}</p>}
        </div>
    )
}

export default Logout;