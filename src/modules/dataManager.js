const remoteURL = 'http://localhost:8000'

export default {
    getAll(collection){
        return fetch(`${remoteURL}/${collection}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("smallconnections_token")}`
            }
        })
                .then(response => response.json())
    },
    get(collection, id){
        return fetch(`${remoteURL}/${collection}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("smallconnections_token")}`
            }
        })
                .then(response => response.json())
    },
    update(collection, editedObject){
        return fetch(`${remoteURL}/${collection}/${editedObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("smallconnections_token")}`
            },
            body: JSON.stringify(editedObject)
        })
    },
    delete(collection, id){
        return fetch(`${remoteURL}/${collection}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("smallconnections_token")}`
            }
        })
    }

}