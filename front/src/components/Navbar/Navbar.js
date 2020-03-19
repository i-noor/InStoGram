import React from 'react';
import {Navbar, Form, FormControl, Nav, Button, Container} from 'react-bootstrap'
import { httpLogOut} from "../../api/v1";

function Navigation() {	
	let login = sessionStorage.getItem('login') ? sessionStorage.getItem('login') : "";

	const onLogOut = async (e) => {	 
	    httpLogOut()
	      .then(data => {	      	
	      	console.log(data)	      	
	      })
	      .catch(err => {
	        console.error(err);	        
	      });
	  } 
	console.log(login, "HEYEYEY")
    return (
        <Navbar bg="dark" variant="dark">
        	<Container>
		    <Navbar.Brand href="/">И</Navbar.Brand>
		    <Nav className="mr-auto">
		      <Nav.Link href="/">Главная</Nav.Link>
		      <Nav.Link href="#users">Пользователи</Nav.Link>
		    </Nav>
		    <Form inline>
		    <Nav className="mr-auto">
		    {!login ? (
		    	<>
			      <Nav.Link href="#registration">Регистрация</Nav.Link>
			      <Nav.Link href="#login">Войти</Nav.Link>
		        </>
		        ) : <Nav.Link href="#" onClick={() => onLogOut()}>Выйти</Nav.Link>}
		    </Nav>
		    </Form>
		    </Container>
		  </Navbar>		 
    )
};

export default Navigation;