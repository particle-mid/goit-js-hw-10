'use strict'

const BASE_URL = 'https://restcountries.com/v3.1/name'
const baseParams = 'name,capital,population,flags,languages'

 export default function fetchCountries(name) {
        return fetch(`${BASE_URL}/${name}?fields=${baseParams}`).then(res => {
            if (!res.ok) {
                throw new Error (res.status);
            }
            return res.json();
        })
        // .then((data) => {console.log(data)})
        // .catch((err) => {console.log(err)});
    }