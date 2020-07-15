import React, {useState, useEffect, useRef} from 'react';
import {Form, Button, Container, Row, Col, Image} from 'react-bootstrap'
import { httpGetImages, httpSendImage, httpDeleteImage} from "../../api/v1";
import { useParams } from "react-router-dom";
import { FiPlusSquare, FiTrash2 } from "react-icons/fi";
import s from "./Images.module.scss";

const Images = (props) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        console.log(props)
		setImages(props.images);		 
    },[]);
      
    
	let { author_id } = useParams();
	if (!author_id) author_id = sessionStorage.getItem('user_id');
    let visitorProfile = author_id == sessionStorage.getItem('user_id');    
	 

	const id = (e) => {return document.getElementById(e)}

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
      
    const onDeleteImage = async (id) => {
        httpDeleteImage(id).then(data => {
            console.log(data.response);
            if (data.response == 1) document.getElementById(id).style.display = 'none';
        })
    }

    return (
        <>
        {visitorProfile &&  	      
			<Form method="post" encType="multipart/form-data">
				<Form.Group controlId="file">
					<Form.Label className={s.label}><FiPlusSquare /></Form.Label>
					<Form.Control  style={{display: 'none'}} type="file" accept="image/jpeg,image/png,image/gif" onChange={() => onSendImage()} name="filedata" />
				</Form.Group>				    
			</Form>	
		} 
        <Row id={s.imageRow}>
            {images && images.map(image =>
            
                <Col id={image.id} key={image.id} xs={12} md={6} lg={4} xl={3} className={s.col}>
                    <div className={s.image} style={{backgroundImage:"url(/images/"+image.id+".jpg)"}}>
                    {visitorProfile && props.delete && <FiTrash2 onClick={() => onDeleteImage(image.id)} className={s.delete}>
                    </FiTrash2>}
                    </div>
                </Col>					    
                    
			)}
        </Row>		
        </>
    
)};

export default Images;