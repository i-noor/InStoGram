
export const httpGetImages = async () => {   
    return fetch('http://localhost:8080/api/v1/image/list',{
      method: "POST",      
    })
    .then(response => response.json())
    .then(json =>  console.log(json)) 
    .catch(console.log)
};

export const httpSendImage = async (form) => {
    return fetch('http://localhost:8080/api/v1/image/add',{method:'POST',body:form, headers:{'Access-Control-Allow-Origin':'*'}})
          .then(str  => str.json())
}


export const httpGetUsers = async () => { 

  return fetch('http://localhost:8080/api/v1/user/list',{
      method: "POST",      
    })
  .then(response => response.json())
  .then(json =>  json) 
	// const response = await fetch('http://localhost:8080/api/v1/user/list', {
 //    	method: 'POST',    	
 //      headers : { 
 //        'Content-Type': 'application/json',
 //        'Accept': 'application/json'
 //       }
 //    }).then(response => console.log(response));
	// const myJson = await response.json();
	// console.log(JSON.stringify(myJson)); 
    // return fetch('/api/v1/user/list')
        
    //     .catch(console.log)
};