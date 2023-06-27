export const sendRequest = () => {

    const sendRequestGet = async (url) => {
        const result = await fetch(url)
        return result.json()
    }

    const sendRequestPost = async (url,data) => {
        const result = await fetch(url,{

            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        })

        return result.json()
    }

    const sendRequestDelete = async (url) => {
        const result = await fetch(url,{
            method:'DELETE',
            headers:{
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar',
            },
        })

        return result.json()
    }
    const sendRequestPatch = async (url,data) => {
        const result = await fetch(url,{
            method:'PATCH',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        })

        return result.json()
    }

    return {sendRequestGet,sendRequestPost,sendRequestDelete,sendRequestPatch}
}