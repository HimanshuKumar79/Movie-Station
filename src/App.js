import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import SearchResults from './pages/searchResults/SearchResults'
import './App.css'
import Footer from './components/Footer.jsx'
import Signup from './pages/auth/Auth';
import { Toaster } from 'react-hot-toast';
import Favourite from './pages/favourite/Favourite';

function App() {
  return (
    <div className='flex flex-col justify-between'>
      <BrowserRouter>
      <NavBar/>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:mediaType/:id' element={<Details/>}/>
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path='/login/user' element={<Signup/>}/>
        <Route path='/favourite' element={<Favourite/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
