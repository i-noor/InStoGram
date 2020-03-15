import React, {useState, useEffect, useRef} from 'react';
import {Form, Button, Container, Row, Col, Image} from 'react-bootstrap'
import { httpGetImages, httpSendImage, httpDeleteImage} from "../../api/v1";
import Images from "../../components/Images";
import Navbar from "../../components/Navbar";
import { FiPlusSquare, FiTrash2 } from "react-icons/fi";
import s from "./Main.module.scss"

const Main = () => { 
	const [images, setImages] = useState([]);
	
	useEffect(() => {
      httpGetImages().then(res => 
	      setImages(res.response.items),
	    );
       
    },[]);
	   

	const id = (e) => {return document.getElementById(e)}

	const onSendImage = async () => {
	    var form = new FormData();
	    form.append('file',id('file').files[0]);
	    httpSendImage(form)
	      .then(data => {
	        if(data.response) {
	        	
	        	var temp = images;
	        	temp.push(data.response)
	        	console.log("temp",temp)
	        	setImages(temp);
	        }
	        else if(data.error) console.log(data.error);
	        
	      })
	      .catch(err => {
	        console.error(err);	        
	      });
	  }  

	  const onDeleteImage = async (id) => {
	  	httpDeleteImage(id).then(data => {
	  		console.log(data.response);
	  		if (data.response == 1) document.getElementById(id).style.display = 'none';
	  	})
	  }

	  
    return (
        <div className="App">
	      <Navbar />
	      {console.log(images)}
	      <Container>	    	      
		        <Form method="post" encType="multipart/form-data">
			        <Form.Group controlId="file">
					    <Form.Label className={s.label}><FiPlusSquare /></Form.Label>
					    <Form.Control  style={{display: 'none'}} type="file" accept="image/jpeg,image/png,image/gif" onChange={() => onSendImage()} name="filedata" />
				    </Form.Group>				    
				</Form>	
				<Row id="imageRow">
					{images && images.reverse().map(image =>
					
					    <Col id={image.id} key={image.id} xs={12} md={3} className={s.col}>
					      <div className={s.image} style={{backgroundImage:"url(http://localhost:8080/images/"+image.id+".jpg)"}}>
					      <FiTrash2 onClick={() => onDeleteImage(image.id)} className={s.delete}>
					      </FiTrash2>
					     </div>
					    </Col>					    
						  
					  )}
				</Row>
				<div id="res"></div>		
		</Container>	      
	    </div>
    )
	
};

export default Main;