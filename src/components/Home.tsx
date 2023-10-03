import { useEffect, useContext } from 'react';
import homeBackground from '../assets/home_background.jpg';
import { useIsAuth } from '../helpers/useIsAuth';
import { UserContext } from '../context/UserContext';

const Home = () => {

    const userContext = useContext(UserContext);

    useEffect(() => {
        useIsAuth(userContext);
    }, []);

    return (
        <div className="home">
            <h1 className='homeHeading'>Daily Blogs</h1>
        </div>
    )
}

export default Home;