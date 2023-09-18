import './index.css';
import Home from './components/Home';
import Nav from './components/Nav';
import Wrapper from './components/Wrapper';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/Posts';
import SubmitBlog from './components/SubmitBlog';
import Logout from './components/Logout';
import { UserContextProvider } from './context/UserContext';

function App() {

  return (
    <BrowserRouter>
      <Wrapper>
        <UserContextProvider>
          <Nav />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/register" element={<Register />} />
            <Route path="/submitblog" element={<SubmitBlog />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </UserContextProvider>
      </Wrapper>
    </BrowserRouter>
  )
}

export default App;
