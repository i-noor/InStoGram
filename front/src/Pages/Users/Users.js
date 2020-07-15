import React, {useState, useEffect} from 'react';
import {Form, Button, Jumbotron, Container,Card,Image} from 'react-bootstrap'
import { httpGetUsers} from "../../api/v1";
import s from "./Users.module.scss"
import defaultAvatar from "../../assets/defaultAvatar.png";

const Users = () => { 
	const [users, setUsers] = useState([]);
	
	// useEffect(() => {
 //    const fetchData = async () => {
 //      const result = await axios(
 //        'https://hn.algolia.com/api/v1/search?query=redux',
 //      );
 //      setData(result.data);
 //    };
 //    fetchData();
 //    console.log()
 //  }, []);

	useEffect(() => {

       httpGetUsers().then(res => 
	      setUsers(res.response.items),
	      
    	);
       
    },[]);
	

    return (
    	<>
    	{console.log(users)}    	
    	<Container>
	    	<Jumbotron className={s.jumbotron}>      
		        {users && users.map(user=>{		
						let avatar = user && user.avatar ? "/images/avatars/"+user.avatar : defaultAvatar;				
						return <a href={"/#/Profile/"+user.id} key={user.id}>
						<Card>
							<Card.Body >
								<div className={s.nameWrapper}>
									<div className={s.avatar} style={{backgroundImage:'url('+avatar+')'}}  />
									<div>{user.name}</div>
								</div>
							</Card.Body>
						</Card>
							<div>
							
							</div>
						</a>
						}					
		        	)}
			</Jumbotron>
		</Container>
		</>
    )
	
};

export default Users;