import debounce from 'lodash.debounce';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';


alert({
    text: 'Notice me, senpai!'
  });


// https://restcountries.eu/rest/v2/name/{name}
// https://restcountries.eu/rest/v2/name/eesti
// https://restcountries.eu/rest/v2/name/united