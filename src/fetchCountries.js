import "./style.css";
import axios from "axios";
import debounce from "lodash.debounce";
import cardTpl from './templates/templatesCountry.hbs';
import listTpl from './templates/templatesList.hbs';
import { alert } from '@pnotify/core/dist/PNotify';
import '@pnotify/core/dist/BrightTheme.css';

const PNotify = require('@pnotify/core');

const refs = {
    input: document.querySelector('#search'),
    container: document.querySelector('.container')
}

const findCountry = async (e) => {
    e.preventDefault();
    clearArticle();
    const name = refs.input.value;
    const resp = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
    const countries = await resp.json();
    const city = await buildListMarkup(countries, cardTpl);
    return city;
    // .then(response => response.json())
    // .then(countries => buildListMarkup(countries, cardTpl))
    // .catch(err => console.log(err))
}

const doStuff = async () => {
  try {
    const country = await findCountry();
    console.log(country);
  } catch (error) {
    console.log(error.message);
  }
};

doStuff();

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
    if (countries.length >= 2 && countries.length <= 10) {
        const markup = countries.map(listTpl).join('');
        refs.container.insertAdjacentHTML('afterbegin', markup)
    }
    if (countries.length === 1) {
        const markup = countries.map(cardTpl).join('');
        refs.container.insertAdjacentHTML('afterbegin', markup)
    }
}