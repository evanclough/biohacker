import { 
    Menu,
    MenuItem
  } from '@aws-amplify/ui-react';
  import '@aws-amplify/ui-react/styles.css';
  import Nav from 'react-bootstrap/Nav';
  import Container from 'react-bootstrap/Container';
  import Navbar from 'react-bootstrap/Navbar';
  import { Activity } from 'react-feather';
  
  
  function Header({user, signOut}){
  
    return (
  
       <Navbar data-bs-theme="dark" sticky="top" className="border-bottom bg-black border-light border-3">
        <Container>
        <Nav className="justify-content-start">
            <Navbar.Brand className = "mx-3">
              <Activity/>
            </Navbar.Brand>
          </Nav>
        <Menu
          menuAlign="end"
          className="nav-menu"
        >
          <MenuItem className='my-btns'>
            compounds 
          </MenuItem>
          <MenuItem className='my-btns'>
            stacks 
          </MenuItem>
          <MenuItem onClick={e => signOut()} className="my-btns">
          sign out
          </MenuItem>
        </Menu>
        </Container>
      </Navbar>
          
      )
  }
  
  export default Header;