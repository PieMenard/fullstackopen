

import LoginForm from './LoginForm';

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


const NavigationBar = () => {

  const padding = {
    padding: 5

}


      return (
        <div>
            <Navbar bg="light" expand="lg" style = {padding}>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="\">Blogs</Nav.Link>
                    <Nav.Link href="\users">Users</Nav.Link>
                  </Nav>
                  <LoginForm/>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </div>
      );
  

}

export default NavigationBar