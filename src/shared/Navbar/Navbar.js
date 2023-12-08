import React, { startTransition } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import bootstrapNavbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    Navbar
       {/* <bootstrapNavbar bg="dark" variant="dark">
        <Container>
          <bootstrapNavbar.Brand href="#home">space ships</bootstrapNavbar.Brand>
          
          <Nav className="me-auto">
            <Link className='nav-link' to={'/'} >Home</Link>
            <Link className='nav-link' to={'/Login'}>Login</Link>
            <Link className='nav-link' to={'/register'}>Register</Link>
          </Nav>

          <Nav className = "ms-auto">
            <Nav.Link href='#home' > Logout</Nav.Link>
          </Nav>
        </Container>
      </bootstrapNavbar>*/}
    </> 
  );
}
export default Navbar ;
