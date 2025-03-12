class API{
    constructor(baseURL){
        this.baseURL = baseURL;
    }

    async getAll(){
        const response = await fetch(`${this.baseURL}`);
        return response.json();
    }

    async create(data){
        const response = await fetch(`${this.baseURL}`, {
            method: "POST",
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify(data)
            });
            return response.json();
    }

    async update(id, data){
        const response = await fetch(`${this.baseURL}/${id}`, {
            method: "PUT",
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify(data)
            });
        return response.json();
    }

    async delete(id){
        await fetch(`${this.baseURL}/${id}`, { method: 'DELETE'});
    }
}

const baseURL = new API("https://crudcrud.com/api/6d4851c6214a4582b45f244f1384adc7");

const users = await baseURL.getAll();
console.log(users);