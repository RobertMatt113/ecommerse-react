import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {Cart, Home, Login, ProductsDetail, Purchase} from './pages'
import { LoadingScreen, NavBar, ProtectedRoutes } from './components';
import { useSelector } from 'react-redux';
import Footer from './components/Footer';

function App() {

  const isLoading = useSelector(state => state.isLoading)
  
  return (
    <HashRouter>
      <Container>
        {
          isLoading && <LoadingScreen/>
        }
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/product/:id" element={<ProductsDetail/>} />
          <Route path="/login" element={<Login/>} />

          <Route element={<ProtectedRoutes/>}>
            <Route path="/purchase" element={<Purchase/>} />
            <Route path="/cart" element={<Cart/>} />
          </Route>
        </Routes>
        <Footer/>
      </Container>
    </HashRouter>
  );
}

export default App;
