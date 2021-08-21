import debounce from "lodash.debounce";
import cardTpl from './templates/templatesCountry.hbs'
import listTpl from './templates/templatesList.hbs'
import { alert } from '@pnotify/core/dist/PNotify';
import '@pnotify/core/dist/BrightTheme.css';

const PNotify = require('@pnotify/core');

const refs = {
    input: document.querySelector('#search'),
    container: document.querySelector('.container')
}

const findCountry = (e) => {
    e.preventDefault();
    clearArticle()
    const name = refs.input.value
    fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => response.json())
    .then(countries => buildListMarkup(countries, cardTpl))
    .catch(err => console.log(err))
}
refs.input.addEventListener('input', debounce(findCountry, 500))



function clearArticle() {
    refs.container.innerHTML = '';
    PNotify.defaultStack.close();
}

function buildListMarkup(countries, cardTpl) {
    if (countries.length > 10) {
        alert({
            text: 'Too many matches found. Please enter a more specific query!'
        });
    }
    if (countries.length > 2 && countries.length <= 10) {
        const markup = countries.map(listTpl).join();
        refs.container.insertAdjacentHTML('afterbegin', markup)
    }
    if (countries.length === 1) {
        const markup = countries.map(cardTpl).join();
        refs.container.insertAdjacentHTML('afterbegin', markup)
    }
}