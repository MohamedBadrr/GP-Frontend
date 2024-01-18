import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './shared/Navbar/Navbar'
import Footer from "./shared/Footer/Footer"

function App() {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
