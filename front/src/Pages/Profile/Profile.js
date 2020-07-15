import React, {useState, useEffect} from 'react';
import {Form, Button, Jumbotron, Container, Row,Card, Col,Image, Modal} from 'react-bootstrap';
import { httpGetImagesByUserId, httpSendImage, httpDeleteImage, httpGetUserById, httpUpdateUserInfo} from "../../api/v1";
import s from "./Profile.module.scss";
import Images from "../../components/Images";
import { FiPlusSquare, FiTrash2, FiEdit } from "react-icons/fi";
import { useParams } from "react-router-dom";
import defaultAvatar from "../../assets/defaultAvatar.png";

const Profile = () => { 
	const [images, setImages] = useState([]);
	const [user, setUser] = useState(null);
	const [show, setShow] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState({});
	 
	let avatar = user && user.avatar ? "/images/avatars/"+user.avatar : defaultAvatar;

	const id = (e) => {return document.getElementById(e)}
	let { author_id } = useParams();
	if (!author_id) author_id = sessionStorage.getItem('user_id');
	let visitorProfile = author_id == sessionStorage.getItem('user_id');
	console.log(author_id)
	useEffect(() => {
        httpGetImagesByUserId(author_id).then(res => 
	      setImages(res.response.items)	      
    	);  
    	httpGetUserById(author_id).then(res => {
    		console.log(res.response)
	      setUser(res.response)	      
    	}
    	);      
    },[]);

    const onSendImage = async () => {
	    var form = new FormData();
		form.append('file',id('file').files[0]);		
	    httpSendImage(form)
	      .then(data => {
	        if(data.response) {
	        	
	        	var temp = images.slice();	        	
	        	temp.unshift(data.response)
	        	console.log("temp",temp)
	        	setImages(temp);
	        }
	        else if(data.error) console.log(data.error);
	        
	      })
	      .catch(err => {
	        console.error(err);	        
	      });
	  }  	 

	  const onChangeInfo = async () => {
	  	var form = JSON.stringify(
		    {
		    	'user_id': user.id,
		    	'password': id('password').value,
		    	'name': id('name').value,
		    	'sex': id('sex').value,
		    	'age': id('age').value,		    	
		    })

	  	httpUpdateUserInfo(form).then(data => {
		      	console.log(data)
		      
		      	if (data.response == 1) {
					  setSuccess(true);
					  setShow(false);
		      	}
		      })
		      .catch(err => {
		        console.error(err);	        
		      });
	  	// httpDeleteImage(id).then(data => {
	  	// 	console.log(data.response);
	  	// 	if (data.response == 1) document.getElementById(id).style.display = 'none';
	  	// })
	}

	const onSendAvatar = async () => {
		var form = new FormData();
		form.append('file',id('avatar').files[0]);
		form.append('type',"avatar");
	    httpSendImage(form)
	      .then(data => {	       
	        	console.log("data",data);  
	        
	      })
	      .catch(err => {
	        console.error(err);	        
	      });
	}
	

    return (
    	<>    	    	
    	<Container>	 
    		{user && <Card>
			  <Card.Body>
				{visitorProfile &&  	      
					<Form method="post" encType="multipart/form-data">
						<Form.Group className={s.nameWrapper} controlId="avatar">
							<Form.Label className={s.label}>
								<div className={s.avatar} style={{backgroundImage:'url('+avatar+')'}} />
							</Form.Label>
							<Form.Control  style={{display: 'none'}} type="file" accept="image/jpeg,image/png,image/gif" onChange={() => onSendAvatar()} name="filedata" />
							{user.name}
							<FiEdit className={s.editButton} onClick={() => setShow(true)}></FiEdit>
						</Form.Group>										    
					</Form>	
				} 
				{!visitorProfile &&  
					<div className={s.nameWrapper}>
						<div className={s.avatar} style={{backgroundImage:'url('+avatar+')'}} />
						<div>{user.name}</div>
					</div>
			  		
				}
			  </Card.Body>
			</Card>}
			
			{images.length > 0 &&<Images images={images} delete={true}/>}			
		</Container>  
		 <Modal show={show} onHide={() => setShow(false)}>
	        <Modal.Header closeButton>
	          <Modal.Title>Редактирование профиля</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        	<Form id="form" >				  			 
				  <Form.Group controlId="name">				    
				    <Form.Control type="text" defaultValue={user && user.name} placeholder="Имя" required/>
				  </Form.Group>
				  <Form.Group controlId="sex">				    
				    <Form.Control as="select" defaultValue={user && user.sex} placeholder="Пол">
				    	<option value="">Пол</option>
				      <option value="м">мужской</option>
				      <option value="ж">женский</option>				     
				    </Form.Control>
				  </Form.Group>
				  <Form.Group controlId="age">				    
				    <Form.Control type="number" defaultValue={user && user.age} placeholder="Возраст" required/>
				  </Form.Group>
				  <Form.Group controlId="password">					  	    
				    <Form.Control type="password" isInvalid={!!errors.password} placeholder="Новый пароль"/>
				  </Form.Group>					 					  
				</Form>
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={() => setShow(false)}>
	            Закрыть
	          </Button>
	          <Button variant="dark" onClick={onChangeInfo}>
	            Сохранить
	          </Button>
	        </Modal.Footer>
	      </Modal>
		</>
    )
	
};

export default Profile;