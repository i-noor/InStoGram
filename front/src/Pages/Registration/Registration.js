import React, {useState}  from 'react';
import {Form, Button, Jumbotron, Container} from 'react-bootstrap'
import Navbar from "../../components/Navbar";
import { httpSignUp} from "../../api/v1";
import s from "./Registration.module.scss"

function Registration() {	
	const [errors, setErrors] = useState({});
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
		      	if(data.error && data.error=="login already taken") setErrors({login:data.error})
		      })
		      .catch(err => {
		        console.error(err);	        
		      });
		  } else {
		  	setErrors({password:"passwords don't match"})
		  }	    
	  }  

	const onChangeImage = async () => {

	}


    return (
    	<>
    	<Navbar />
    	<Container>
	    	<Jumbotron className={s.jumbotron}>      
		        <Form id="form" onSubmit={onSignUp}>
		        	<Form.Label className={s.title}>Вход</Form.Label>
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
				  <Form.Group controlId="photo">
					    <Form.Label variant="dark" type="button" className={s.label}>
							Загрузить аватар
					    </Form.Label>
					    <Form.Control  style={{display: 'none'}} type="file" accept="image/jpeg,image/png,image/gif" onChange={() => onChangeImage()} name="filedata" />
				    </Form.Group>	
				  <Button variant="dark" type="submit">Зарегистрироваться</Button> 
				</Form>				 
			</Jumbotron>
		</Container>
		</>
    )
};

export default Registration;