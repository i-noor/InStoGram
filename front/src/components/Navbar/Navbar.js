import React from 'react';
import {Navbar, Form, FormControl, Nav, Button, Container} from 'react-bootstrap'

function Navigation() {	
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
		      <Nav.Link href="#registration">Регистрация</Nav.Link>
		      <Nav.Link href="#login">Войти</Nav.Link>
		    </Nav>
		    </Form>
		    </Container>
		  </Navbar>		 
    )
};

export default Navigation;