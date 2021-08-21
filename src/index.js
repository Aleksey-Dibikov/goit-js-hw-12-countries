import debounce from "lodash.debounce";

import { alert, info } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

alert({
    text: 'Notice me, senpai!'
});
  
const refs = {
    input: document.querySelector('#search'),
    container: document.querySelector('.container')
}

const url = 'https://restcountries.eu/rest/v2/name/'

const findCountry = (e) => {
    e.preventDefault();
    const value = refs.input.value
    fetch(url + value)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}
refs.input.addEventListener('input', debounce(findCountry, 500))