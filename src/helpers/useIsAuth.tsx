import { useContext } from "react"
import { UserContext } from '../context/UserContext';

export const useIsAuth = async () => {

    try {
        const userContext = useContext(UserContext);
        const resp = await fetch('http://localhost:3000/auth', {
            credentials: "include",
        });
        const data = await resp.json();
        userContext.setUser(data);
    } catch (err) {
        console.log(err);
    }
}
