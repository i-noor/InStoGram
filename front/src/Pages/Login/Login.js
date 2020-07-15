import React from 'react';
import {Form, Button, Jumbotron, Container} from 'react-bootstrap'
import { httpLogIn} from "../../api/v1";
import s from "./Login.module.scss"

function Login() {	
	const id = (e) => {return document.getElementById(e)}
	const onLogIn = async (e) => {	  
		e.preventDefault(); 
	    var form = JSON.stringify(
		    {
		    	'login': id('login').value,
		    	'password': id('password').value
		    }
	    )
	    console.log(form)
	    httpLogIn(form)
	      .then(data => {	      	
	      	sessionStorage.setItem('user_id', data.response.user_id);
	      	sessionStorage.setItem('login', data.response.login);	    
	      	document.location.href = "/";  	
	      })
	      .catch(err => {
	        console.error(err);	        
	      });
	  }  

    return (
    	<>    	
    	<Container>
	    	<Jumbotron className={s.jumbotron}>      
		        <Form id="form" onSubmit={onLogIn}>
		        	<Form.Label className={s.title}>Вход</Form.Label>
				  <Form.Group controlId="login">
				    
				    <Form.Control type="text" placeholder="Логин" required/>
				  </Form.Group>
				  <Form.Group controlId="password">			    
				    <Form.Control type="password" placeholder="Пароль" required/>
				  </Form.Group>
				  <Button variant="dark" type="submit">Войти</Button> 
				</Form>				 
			</Jumbotron>
		</Container>
		</>
    )
};

export default Login;