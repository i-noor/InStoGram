export const httpGetImages = async () => {   
    return fetch('/api/v1/images')
    .then(response => response.json())
    .then(json =>  json) 
    .catch(err=>console.log(err))
};

export const httpGetImagesByUserId = async (id) => {   
    return fetch('/api/v1/images?author_id='+id)
    .then(response => response.json())
    .then(json =>  json) 
    .catch(err=>console.log(err))
};

export const httpSendImage = async (form) => {
    return fetch('/api/v1/images',{ method:'POST', body:form})
          .then(str  => str.json())
}

export const httpDeleteImage = async (id) => {
    return fetch('/api/v1/images/'+id,{ method:'DELETE'})
          .then(str  => str.json())
}

export const httpLogIn = async (form) => {
    return fetch('/api/v1/session/new',{
        method:'POST',      
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:form})
        .then(str  => str.json())  
}

export const httpLogOut = async () => {
    return fetch('/api/v1/session/',{
        method:'DELETE',      
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }})
        .then(str  => str.json())  
}

export const httpSignUp = async (form) => {
    return fetch('/api/v1/users',{
        method:'POST',      
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:form})
        .then(str  => str.json())  
}

export const httpAuth = async (form) => {
    return fetch('/api/v1/session/',{
        method:'POST',      
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:form})
        .then(str  => str.json())  
}


export const httpGetUsers = async () => { 

  return fetch('/api/v1/users/',{
      method: "GET",      
    })
  .then(response => response.json())
  .then(json =>  json) 
};

export const httpGetUserById = async (id) => { 

  return fetch('/api/v1/users/'+id,{
      method: "GET",      
    })
  .then(response => response.json())
  .then(json =>  json) 
};

export const httpUpdateUserInfo = async (form) => { 

  return fetch('/api/v1/users/',{
      method: "PUT",      
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body:form      
    })
  .then(response => response.json())
  .then(json =>  json) 
};