import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burgerbuilder-cbfea.firebaseio.com/'
});

export default instance;