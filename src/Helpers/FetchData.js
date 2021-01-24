export const FetchData =( options ={} )=>{
    if ( options.method === 'GET' || options.method === 'DELETE') {
        return fetch(options.url,{
            method: options.method
        })
    }
    else{
        return fetch(options.url,{
            method: options.method,
            body: JSON.stringify(options.data),
            headers:{
                'Content-Type': 'application/Json'
            }
        })
    }
}