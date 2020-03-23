const { host } = window.location;

const googleSheetLA = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8sQyzK0GFOY3r6p_QQ-b6uprsMPN8uN9piRFPemLoJHI-JBshyzL4YtNIVjGem09ts-q3L55wu79E/pub?gid=0&single=true&output=tsv';
const googleSheetHouston = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT3a2jeKTk--9jI0Zqdq9h7DbR_lF2Iu5AZwG3ZiPbejaRmJ_0uTiw-6ojM4AVoeBrQJIJwiOgBhG17/pub?gid=0&single=true&output=tsv';
const googleSheetNYC = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vReDHUmGFgLUmBw0mja1CB6mutjMvVXQEojFgloRbdVnX6s_FxfS78dswO6lAVXRGgM3vsXKhtULkU0/pub?gid=0&single=true&output=tsv';
const googleSheetSeattle = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTffGfOkLRD87cNhflsYmUDXVK02AKiyxrRJVyLGXzX7652b-qd9w3Gjv9JDW9f6RapKewnigPo0Qrp/pub?gid=0&single=true&output=tsv';

const googleFormLA = 'https://docs.google.com/forms/d/e/1FAIpQLSfQQaZ3WqXUMtZquB18OJ2_CXaGmBqcWVJXW7atLqBGpNgd1w/viewform?usp=sf_link';
const googleFormSeattle = 'https://docs.google.com/forms/d/e/1FAIpQLSeb94MlXgLbdStXoauiBe2G3GlB1gpMJSZyDv4v9iv_SX5KOA/viewform?usp=sf_link';
const googleFormHouston = 'https://docs.google.com/forms/d/e/1FAIpQLSea8pZcPHhGCc_HzW_1a38FCZNIQznfgZmla3T4pf_DgVYEwA/viewform?usp=sf_link';
const googleFormNYC = 'http://example.com/404';

const logoLA = '/restaurant-hero-logo.svg';
const logoHouston = '/restaurant-hero-logo-houston.svg';
const logoSeattle = '/restaurant-hero-logo-seattle.svg';
const logoNewYork = '/restaurant-hero-logo-new-york.svg';

const urlsLA = ['restaurantherola.com', 'www.restaurantherola.com'];
const urlsHouston = ['restaurantherohtx.com', 'www.restaurantherohtx.com'];
const urlsSeattle = ['seattle.restauranthero.org'];
const urlsNYC = ['nyc.restauranthero.org'];

const citiesMap = {
  Houston:{
      GoogleForm: googleFormHouston,
      GoogleSheet: googleSheetHouston,
      City: 'Houston',
      Logo: logoHouston,
      URLs: urlsHouston
    },
  LosAngeles: {
      GoogleForm: googleFormLA,
      GoogleSheet: googleSheetLA,
      City: 'Los Angeles',
      Logo: logoLA,
      URLs: urlsLA
  },
  Seattle: {
      GoogleForm: googleFormSeattle,
      GoogleSheet: googleSheetSeattle,
      City: 'Seattle',
      Logo: logoSeattle,
      URLs: urlsSeattle
  },
  NewYorkCity: {
      GoogleForm: googleFormNYC,
      GoogleSheet: googleSheetNYC,
      City: 'New York City',
      Logo: logoNewYork,
      URLs: urlsNYC
  }
}

function getEnvProperties () { 
  let citiesMap = getCitiesMap();
  let host=citiesMap.Houston.URLs[0];
  var properties = {
    logo: citiesMap.LosAngeles.Logo,
    googleForm: citiesMap.LosAngeles.GoogleForm,
    googleSheet: citiesMap.LosAngeles.GoogleSheet
  };
  if (citiesMap.Houston.URLs.includes(host)) {
    properties.googleSheet = citiesMap.Houston.GoogleSheet;
    properties.googleForm = citiesMap.Houston.GoogleForm;
    properties.logo = citiesMap.Houston.Logo;
  } else if (citiesMap.NewYorkCity.URLs.includes(host)) {
    properties.googleSheet = citiesMap.NewYorkCity.GoogleSheet;
    properties.googleForm = citiesMap.NewYorkCity.GoogleForm;
    properties.logo = citiesMap.NewYorkCity.GoogleForm;
  } else if (citiesMap.Seattle.URLs.includes(host)) {
    properties.googleSheet = citiesMap.Seattle.GoogleSheet;
    properties.googleForm = citiesMap.Seattle.GoogleForm;
    properties.logo = citiesMap.Seattle.Logo;
  }
  return properties;
}
// add proxy to avoid CORS issuse
export function getGoogleSheetUrl(){
  return `https://cors-anywhere.herokuapp.com/${getEnvProperties().googleSheet}`;
}

export function getLogo() {
  return getEnvProperties().logo;
}

export function getGoogleForm() {
  return getEnvProperties().googleForm;
}

export function getCitiesMap() {
  return citiesMap;
}

export function getCitiesArray() {
  return Object.values(getCitiesMap());
}
