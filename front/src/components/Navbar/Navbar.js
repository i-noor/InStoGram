import React, {useState} from 'react';
import {Navbar, Form, FormControl, Nav, Button, Container, Dropdown} from 'react-bootstrap'
import { httpLogOut} from "../../api/v1";
import { FiImage } from "react-icons/fi";

function Navigation() {		
	const [login, setLogin] = useState(sessionStorage.getItem('login'));
	const onLogOut = async (e) => {	 
	    httpLogOut()
	      .then(data => {	      	
	      	if (data.response == 1){
	      		sessionStorage.removeItem('user_id');
	      		sessionStorage.removeItem('login');	 
	      		setLogin(null);
	      		window.location.href = "/";
	      	}	      	
	      })
	      .catch(err => {
	        console.error(err);	        
	      });
	  } 
	console.log(login, "HEYEYEY")
    return (
        <Navbar bg="dark" variant="dark">
        	<Container>
		    <Navbar.Brand href="/"><FiImage className="nav-icon"/></Navbar.Brand>
		    <Nav className="mr-auto">
		      <Nav.Link href="/">Главная</Nav.Link>
		      <Nav.Link href="#users">Пользователи</Nav.Link>
		    </Nav>
		    <Form inline>
		    <Nav className="mr-auto">
		    {!login ? (
		    	<>
			      <Nav.Link href="#/registration">Регистрация</Nav.Link>
			      <Nav.Link href="#/login">Войти</Nav.Link>
		        </>
		        ) : 
				    <Dropdown>
					  <Dropdown.Toggle variant="dark" id="dropdown-basic">
					    {login}
					  </Dropdown.Toggle>

					  <Dropdown.Menu>
					    <Dropdown.Item href="#/profile">Профиль</Dropdown.Item>
					    <Dropdown.Item  onClick={() => onLogOut()}>Выйти</Dropdown.Item>					    
					  </Dropdown.Menu>
					</Dropdown>
				}
		    </Nav>
		    </Form>
		    </Container>
		  </Navbar>		 
    )
};

export default Navigation;