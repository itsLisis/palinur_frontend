import './App.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AuthLayout from './Layouts/AuthLayouts';
import { Routes, Route, useLocation } from "react-router-dom";
import MainScreen from './Pages/MainScreen';
import ProtectedRoute from './Components/ProtectedRoute';
import UserCreation from './Pages/UserCreation'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/creacion" element={<UserCreation/>} />
      <Route
        path="/principal"
        element={
          <ProtectedRoute>
            <MainScreen />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

