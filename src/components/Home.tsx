import homeBackground from '../assets/home_background.jpg';

const Home = () => {


    return (
        <div className="home">
            <h1 className="homeHeading">Blogs</h1>
            <img className='homeBackground' src={homeBackground} alt="notebook" />
        </div>
    )
}

export default Home;