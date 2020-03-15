import React from 'react';
import {Form, Button, Jumbotron, Container} from 'react-bootstrap'
import Navbar from "../../components/Navbar";
import { httpSignUp} from "../../api/v1";
import s from "./Registration.module.scss"

function Registration() {	
	const id = (e) => {return document.getElementById(e)}
	const onSignUp = async (e) => {	  
		e.preventDefault(); 
	    var form = JSON.stringify(
		    {
		    	'login': id('login').value,
		    	'password': id('password').value
		    }
	    )
	    console.log(form)
	    httpSignUp(form)
	      .then(data => console.log(data))
	      .catch(err => {
	        console.error(err);	        
	      });
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
				    <Form.Control type="text" placeholder="Логин" required/>
				  </Form.Group>
				  <Form.Group controlId="password">			    
				    <Form.Control type="password" placeholder="Пароль" required/>
				  </Form.Group>
				  <Form.Group controlId="password2">			    
				    <Form.Control type="password" placeholder="Повторите пароль" required/>
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