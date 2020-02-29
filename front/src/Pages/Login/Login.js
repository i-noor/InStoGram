import React from 'react';
import {Form, Button, Jumbotron, Container} from 'react-bootstrap'
import Navbar from "../../components/Navbar";
import s from "./Login.module.scss"

function Login() {	
    return (
    	<>
    	<Navbar />
    	<Container>
	    	<Jumbotron className={s.jumbotron}>      
		        <Form>
		        	<Form.Label className={s.title}>Вход</Form.Label>
				  <Form.Group controlId="formGroupEmail">
				    
				    <Form.Control type="email" placeholder="Логин" />
				  </Form.Group>
				  <Form.Group controlId="formGroupPassword">			    
				    <Form.Control type="password" placeholder="Пароль" />
				  </Form.Group>
				</Form>
				<Button variant="dark">Войти</Button>  
			</Jumbotron>
		</Container>
		</>
    )
};

export default Login;