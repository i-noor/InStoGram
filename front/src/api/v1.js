
export const httpGetImages = async () => {   
    return fetch('http://localhost:8080/api/v1/images')
    .then(response => response.json())
    .then(json =>  json) 
    .catch(console.log)
};

export const httpSendImage = async (form) => {
    return fetch('http://localhost:8080/api/v1/images',{ method:'POST', body:form})
          .then(str  => str.json())
}

export const httpDeleteImage = async (id) => {
    return fetch('http://localhost:8080/api/v1/images/'+id,{ method:'DELETE'})
          .then(str  => str.json())
}

export const httpLogIn = async (form) => {
    return fetch('http://localhost:8080/api/v1/session/new',{
        method:'POST',      
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:form})
        .then(str  => str.json())  
}

export const httpAuth = async (form) => {
    return fetch('http://localhost:8080/api/v1/session/',{
        method:'POST',      
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:form})
        .then(str  => str.json())  
}


export const httpGetUsers = async () => { 

  return fetch('http://localhost:8080/api/v1/users/',{
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