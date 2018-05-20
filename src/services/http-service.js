

const CAKES_END_POINT = `http://ec2-34-243-153-154.eu-west-1.compute.amazonaws.com:5000/api/cakes/`;

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
            .then(httpResponseCakes => {
                if (httpResponseCakes.ok === true && httpResponseCakes.status < 300) {
                    return httpResponseCakes;
                }
                else {
                    return 'all:error';
                }
            }).then(data => (data.json())
            ).then(cakes => callback(cakes))
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
                    return new Error('expected 201 created ! something else has been re')
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
                    return new Error('expected 201 created ! something else has been re')
                }
            })
          
            .then((data) => callback(data))
            .catch(error => callback('error:create'))
    }
}
