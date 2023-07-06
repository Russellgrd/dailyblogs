import './index.css';
import Home from './components/Home';
import Nav from './components/Nav';
import Wrapper from './components/Wrapper';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Wrapper>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  )
}

export default App;
