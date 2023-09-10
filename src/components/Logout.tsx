
import { useEffect, useState } from 'react';


const Logout = () => {

    const [isLoggedOut, setIsLoggedOut] = useState<null | { message: string }>(null);

    useEffect(() => {
        fetch("http://localhost:3000/logout", {
            credentials: "include"
        })
            .then(resp => resp.json())
            .then((data) => {
                setIsLoggedOut(data);
            })
            .catch((err) => {
                console.log('there was an error', err);
            })
    }, [])

    return (
        <div className="logout">

            <h1>Logout Route</h1>
            {isLoggedOut?.message == "successfully logged out" ? <p>Successfully logged out</p> : <p>{isLoggedOut?.message}</p>}
        </div>
    )
}

export default Logout;