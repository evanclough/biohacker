import { 
    Menu,
    MenuItem
  } from '@aws-amplify/ui-react';
  import '@aws-amplify/ui-react/styles.css';
  import Nav from 'react-bootstrap/Nav';
  import Container from 'react-bootstrap/Container';
  import Navbar from 'react-bootstrap/Navbar';
  import { Activity } from 'react-feather';
  import { NavLink } from 'react-router-dom';
  
  
  function Header({user, signOut}){
  
    return (
  
       <Navbar data-bs-theme="dark" sticky="top" className="border-bottom bg-black border-light border-3">
        <Container>
        <Nav className="justify-content-start">
            <NavLink to={"/"}>
              <Navbar.Brand className = "mx-3">
                <Activity/>
              </Navbar.Brand>
            </NavLink>
          </Nav>
        <Menu
          menuAlign="end"
          className="nav-menu"
        >
          <NavLink className='my-btns'
            to={"/compounds"}
          >
            <MenuItem className="w-100" >
              compounds 
            </MenuItem>
          </NavLink>
          <NavLink className='my-btns'
            to={"/protocols"}
          >
            <MenuItem className="w-100" >
              protocols 
            </MenuItem>
          </NavLink>
          <NavLink className='my-btns'
            to={"/users"}
          >
            <MenuItem className="w-100" >
              users 
            </MenuItem>
          </NavLink>
          <MenuItem onClick={e => signOut()} className="my-btns">
          sign out
          </MenuItem>
        </Menu>
        </Container>
      </Navbar>
          
      )
  }
  
  export default Header;