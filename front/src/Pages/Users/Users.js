import React, {useState, useEffect} from 'react';
import {Form, Button, Jumbotron, Container} from 'react-bootstrap'
import Navbar from "../../components/Navbar";
import { httpGetUsers} from "../../api/v1";
import s from "./Users.module.scss"


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
    	<Navbar />
    	<Container>
	    	<Jumbotron className={s.jumbotron}>      
		        {users && users.map(user=><div key={user.id}>{user.name}</div>)}
			</Jumbotron>
		</Container>
		</>
    )
	
};

export default Users;