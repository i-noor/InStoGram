import React, {useState}  from 'react';
import {Form, Button, Jumbotron, Container} from 'react-bootstrap'
import { httpSignUp} from "../../api/v1";
import s from "./Registration.module.scss";
import { FiCheckCircle } from "react-icons/fi";

function Registration() {	
	const [errors, setErrors] = useState({});
	const [success, setSuccess] = useState(false);
	const id = (e) => {return document.getElementById(e)}
	const onSignUp = async (e) => {	  
		e.preventDefault(); 
		// var form = new FormData(id('form'));
		if (id('password').value == id('password2').value){
			var form = JSON.stringify(
		    {
		    	'login': id('login').value,
		    	'password': id('password').value,
		    	'name': id('name').value,
		    	'sex': id('sex').value,
		    	'age': id('age').value,		    	
		    })
		    // form.append('file',id('photo').files[0]);
		    console.log(form)
		    httpSignUp(form)
		      .then(data => {
		      	console.log(data)
		      	if(data.error && data.error=="login already taken") setErrors({login:data.error})
		      	if (data.response == 1) {
		      		setSuccess(true);
		      	}
		      })
		      .catch(err => {
		        console.error(err);	        
		      });
		  } else {
		  	setErrors({password:"passwords don't match"})
		  }	    
	  }  	

    return (
    	<>    	
    	<Container>
	    	<Jumbotron className={s.jumbotron}>      
		        {!success ? <Form id="form" onSubmit={onSignUp}>
		        	<Form.Label className={s.title}>Регистрация</Form.Label>
				  <Form.Group controlId="login">				  			    
				    <Form.Control type="text" placeholder="Логин" isInvalid={!!errors.login} required/>
				    <Form.Control.Feedback type="invalid">
	                  Логин занят
	                </Form.Control.Feedback>
				  </Form.Group>
				  <Form.Group controlId="password">			    
				    <Form.Control type="password" isInvalid={!!errors.password} placeholder="Пароль" required/>
				  </Form.Group>
				  <Form.Group controlId="password2">			    
				    <Form.Control type="password" isInvalid={!!errors.password} placeholder="Повторите пароль" required/>
				    <Form.Control.Feedback type="invalid">
	                  Пароли не совпадают
	                </Form.Control.Feedback>
				  </Form.Group>
				  <Form.Group controlId="name">				    
				    <Form.Control type="text" placeholder="Имя" required/>
				  </Form.Group>
				  <Form.Group controlId="sex">				    
				    <Form.Control as="select" placeholder="Пол">
				    	<option value="">Пол</option>
				      <option value="м">мужской</option>
				      <option value="ж">женский</option>				     
				    </Form.Control>
				  </Form.Group>
				  <Form.Group controlId="age">				    
				    <Form.Control type="number" placeholder="Возраст" required/>
				  </Form.Group>				 
				  <Button variant="dark" type="submit">Зарегистрироваться</Button> 
				</Form>	:
				<div className={s.success}>
					<FiCheckCircle></FiCheckCircle>
				</div>
			}			 
			</Jumbotron>
		</Container>
		</>
    )
};

export default Registration;