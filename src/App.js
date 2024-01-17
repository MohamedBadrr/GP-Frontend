import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './shared/Navbar/Navbar'
import Footer from "./shared/Footer/Footer"
import Home from './pages/Home/Home';

function App() {
  return (
    <>
      <Header />
      {/* <Outlet /> */}
      <Home />
      <Footer />
    </>
  );
}

export default App;
