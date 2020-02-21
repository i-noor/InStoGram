
export const httpGetImages = () => {   
    return fetch('/api/images')
        .then(res => JSON.parse(res))
        .then((data) => {
        	console.log(data);

        })
        .catch(console.log)
};