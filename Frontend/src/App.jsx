import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Signin from './pages/signin'
import Signup from './pages/signup'
import LandingPage from './pages/landingpage'
import Home from './pages/home'
import Footer from './components/Footer'
import Options from './pages/option'
import Food from './pages/food'
import Toys from './pages/toys'
import Stationary from './pages/stationary'
import Clothes from './pages/clothes'
import Electronics from './pages/electronics'
import Money from './pages/money'
import Profile from './pages/profile'
import Volunteer from './pages/volunteer'

function App() {
   return (
     <BrowserRouter>
       <Navbar/>
       <Routes>
         <Route path='/' element={<LandingPage />} />
         <Route path='/home' element={<Home />} />
         <Route path='/signin' element={<Signin />} />
         <Route path='/signup' element={<Signup />} />
         <Route path='/donate' element={<Options />} />
         <Route path='/donate/food' element={<Food />} />
         <Route path='/donate/toys' element={<Toys />} />
         <Route path='/donate/clothes' element={<Clothes />} />
         <Route path='/donate/money' element={<Money />} />
         <Route path='/donate/electronics' element={<Electronics />} />
         <Route path='/donate/stationary' element={<Stationary />} />
         <Route path='/profile' element={<Profile />} />
         <Route path='/volunteer' element={<Volunteer />} />
       </Routes>
       <Footer/>
       </BrowserRouter >
       
  )
}

export default App
