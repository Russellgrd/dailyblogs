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
            <h1 className="homeHeading">Blogs</h1>
            <img className='homeBackground' src={homeBackground} alt="notebook" />
        </div>
    )
}

export default Home;