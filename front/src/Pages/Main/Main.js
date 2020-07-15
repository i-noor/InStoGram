import React, {useState, useEffect, useRef} from 'react';
import {Container} from 'react-bootstrap'
import Images from "../../components/Images";
import { httpGetImages} from "../../api/v1";
import s from "./Main.module.scss"

const Main = () => { 	
	const [images, setImages] = useState([]);
	useEffect(() => {
		httpGetImages().then(res => 
			setImages(res.response.items.reverse()),
		  );		 
	  },[]);
	  console.log(images)
    return (   
	    <Container>	 
			{images.length > 0 && <Images images={images} delete={false}/>}
		</Container>  
    )
	
};

export default Main;