// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { IoIosLogOut } from "react-icons/io"
import { NavLink } from "react-router-dom"
import React from "react";
// import Cookies from 'js-cookie';
// import { ACCESS_TOKEN } from '../utilities/constants'
// import logo from '../Assets/word-logo.png';
import './Header.css'

function Header() {

    // let hasTokenValue = Cookies.get(ACCESS_TOKEN) !== undefined;
    //console.log(hasTokenValue);
    // const navigate = useNavigate();

    // const logout = () =>
    // {
    //     Cookies.remove(ACCESS_TOKEN);
    //     navigate('/');
    // }

  const loginBaseUrl = process.env.REACT_APP_COGNITO_LOGIN_URL as string; 
  const loginRedirectUrl = process.env.REACT_APP_COGNITO_LOGIN_REDIRECT_URL as string; 
  const loginUrl = loginBaseUrl + loginRedirectUrl;
  return (
    <Navbar expand="md" className="bg-body-tertiary mx-4">
      {/* <Container> */}
        <Navbar.Brand className="" href="/">
            {/* <img className="nav-logo" src={logo} alt="logo"></img> */}
            <div className="nav-logo fw-bold">shiok jobs test</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav custom-nav">
          <Nav className="ms-auto  mx-3">
            {/* <Nav.Link className="ms-4"> */}
            <div className='nav-link ms-4'>

            
                    <NavLink  className={({isActive}) => isActive? 'nav-item-active':'nav-item'} to="/">Search Job</NavLink>
                {/* </Nav.Link> */}
            </div>
            {/* <Nav.Link className="ms-4"> */}
            <div className='nav-link ms-4'>
                <NavLink  className={({isActive}) => isActive? 'nav-item-active':'nav-item'} to="/">Company Reviews</NavLink>
            </div>
            {/* </Nav.Link> */}
            {/* <Nav.Link className="ms-4"> */}
            <div className='nav-link ms-4'>
                <NavLink  className={({isActive}) => isActive? 'nav-item-active ':'nav-item '} to="/">Career Guide</NavLink>
            </div>
            {/* </Nav.Link> */}
            {/* <Nav.Link className="ms-4 "> */}
            <div className='nav-link ms-4'>
                <NavLink  className={({isActive}) => isActive? 'nav-item-active gold' :'nav-item gold'} to="/">Employer</NavLink>
            </div>
            {/* </Nav.Link> */}
            <Nav.Link className="ms-4 nav-item blue fw-bold" 
          
            href={loginUrl}
            >
              Login
                    {/* <NavLink  className={({isActive}) => isActive? 'nav-item-active blue':'nav-item blue'} 
                    to="https://shiokjobs.auth.ap-southeast-1.amazoncognito.com/login?client_id=1vae5aaf8bra5o00lqi56doioq&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fshiokjobs.com">
                      Login</NavLink> */}
                    {/* {!hasTokenValue && <NavLink  className={({isActive}) => isActive? 'nav-item-active blue':'nav-item blue'} to="/login">Login</NavLink>} */}
                    {/* {!hasTokenValue && <NavLink  className={({isActive}) => isActive? 'nav-item-active':'nav-item'} to="register">/Register</NavLink>} */}
                    

            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
}

export default Header;