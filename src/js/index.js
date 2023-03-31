`use strict`
import '../css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');



function clearMarkup(){
      countryInfoEl.innerHTML = '';
      countryListEl.innerHTML = '';
    };

const handleCountryInput = e => {
  const searchCountry = e.target.value.trim();

  if (searchCountry === '') {
   clearMarkup()
    return;
  }

  fetchCountries(searchCountry)
    .then(data => {
      if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name');
        return;
      }
      renderMarkup(data);
    })
    .catch(err => {
      clearMarkup();
      Notify.failure('Oops, there is no country with that name');
    });
};

const renderMarkup = data => {
  if (data.length === 1) {
   clearMarkup();
    const markupCard = createCardMakrup(data);
    countryInfoEl.innerHTML = markupCard;
  } else {
   clearMarkup();
    const markupList = createListMarkup(data);
    countryListEl.innerHTML = markupList;
  }
};

const createListMarkup = data => {
  return data
    .map(
      ({ name, flags }) =>
        `<li class="countries_list"><img class="list_image" src="${flags.png}" alt="${name.official}" width="60"  >${name.official}</li>`,
    )
    .join('');
};

const createCardMakrup = data => {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<img class="country-info__img" src="${flags.png}" alt="${flags.alt} width="300" ">
     <h2 class="country-info__title">${name.official}</h2>
     <li class="country-list__item">
     <p class="country-list__item-name"><b>Capital: </b>${capital}</p></li>
     <li>
     <p class="country-list__item-name"><b>Population: </b>${population}</p></li>
     <li>
     <p class="country-list__item-name"><b>Languages: </b>${Object.values(languages).join(', ')}</p>
     </li>`
  );
};

inputEl.addEventListener('input', debounce(handleCountryInput, DEBOUNCE_DELAY));