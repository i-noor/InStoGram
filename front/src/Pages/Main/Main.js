import React, {useState, useEffect, useRef} from 'react';
import {Form, Button, Container} from 'react-bootstrap'
import { httpGetImages, httpSendImage} from "../../api/v1";
import Images from "../../components/Images";
import Navbar from "../../components/Navbar";
import { FiPlusSquare } from "react-icons/fi";

const Main = () => { 
	const [users, setUsers] = useState([]);
	
	useEffect(() => {
      
       
    },[]);
	
	
	const images = httpGetImages().then(res => 
      console.log(res)
    );

   

	const id = (e) => {return document.getElementById(e)}

	const onSendImage = async () => {
	    var form = new FormData();
	    form.append('file',id('file').files[0]);
	    httpSendImage(form)
	      .then(data => {
	        if(data.response) id('res').innerHTML = '<img src="'+data.response+'" /><br/>';
	        else if(data.error) id('res').innerHTML = '<p>Ошибка: '+data.error+'</p>';
	        id('res').innerHTML += 'Ответ:<br/>'+JSON.stringify(data,null,4);
	      })
	      .catch(err => {
	        console.error(err);
	        id('res').innerHTML = '<p>Ошибка: '+err+'</p>';
	      });
	  }  

	  
    return (
        <div className="App">
	      <Navbar />
	      {console.log(images)}
	      <Container>	    	      
		        <Form method="post" encType="multipart/form-data">
		        <Form.Group controlId="file">
				    <Form.Label ><FiPlusSquare /></Form.Label>
				    <Form.Control  style={{display: 'none'}} type="file" accept="image/jpeg,image/png,image/gif" onChange={() => onSendImage()} name="filedata" />
				  </Form.Group>
				    
				</Form>	
				<div id="res"></div>		
		</Container>	      
	    </div>
    )
	
};

export default Main;