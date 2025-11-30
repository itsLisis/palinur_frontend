
import './App.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AuthLayout from './Layouts/AuthLayouts';
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import CarouselDemo from './Components/CarouselDemo';
import SplitScreen from './Pages/SplitScreen';


// export default function App() {
//   return (
//     <CarouselDemo/>
//   )
// }

export default function App() {
  return (
    <SplitScreen/>
    // <Routes>
      
    //     <Route path="/" element={<LoginPage />} />
    //     <Route path="/registro" element={<RegisterPage />} />
    //     <Route path="/principal" element={<SplitScreen/>} />
      
    // </Routes>
  );
}

