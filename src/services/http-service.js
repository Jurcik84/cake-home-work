
import { CAKES_END_POINT } from './../CONSTS/http-endpoints'


export default new class HttpService {

    constructor() {
        // fix the binding to HttpService class/function
        this.getAllCakes = this.getAllCakes.bind(this);
        this.getOneCakeById = this.getOneCakeById.bind(this);
        this.createCake = this.createCake.bind(this);
    }

    // get all cakes form cake server
    getAllCakes(callback) {
        return fetch(CAKES_END_POINT)
            .then(response => {
                if (response.ok === true && response.status < 300) {
                    return response.json();
                }
                else {
                    return {
                        serverMessage: 'Problem when loading all cakes'
                    };
                }
            })
            .then(cakes => callback(cakes))
            .catch(error => callback('error:getall'))
    }

    // get one cake from server by cake ID
    getOneCakeById(cakeId, callback) {
        return fetch(CAKES_END_POINT + `${cakeId}`)
            .then(response => {
                if (response.ok === true && response.status < 300) {
                    return response.json();
                }
                else {
                    return {
                        serverMessage: 'Problem when loading one cakes by its id'
                    };
                }

            })
            .then(cakes => callback(cakes))
            .catch(error => callback('error:getone'))
    }

    createCake(cake, callback) {

        const cake_config_ob = JSON.stringify(cake);
        const http_method_post = 'POST';

        fetch(CAKES_END_POINT, {
            method: http_method_post,
            body: cake_config_ob,
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
            .then((response) => {
                if (response.ok === true && response.status === 201) {
                    return response.json();
                }
                else {
                    serverMessage: 'Problem when creating new cake'
                }
            })

            .then((data) => callback(data))
            .catch(error => callback('error:create'))
    }
}
