import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContextProvider from './contexts/Auth/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PrivateRoute from './utils/PrivateRoute';
const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route element={<PrivateRoute />}>
          <Route path='/' exact element={<Home />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
