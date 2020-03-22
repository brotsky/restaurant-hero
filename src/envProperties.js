const { host } = window.location;

const googleSheetLA = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8sQyzK0GFOY3r6p_QQ-b6uprsMPN8uN9piRFPemLoJHI-JBshyzL4YtNIVjGem09ts-q3L55wu79E/pub?gid=0&single=true&output=tsv';
const googleSheetHouston = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT3a2jeKTk--9jI0Zqdq9h7DbR_lF2Iu5AZwG3ZiPbejaRmJ_0uTiw-6ojM4AVoeBrQJIJwiOgBhG17/pub?gid=0&single=true&output=tsv';
const googleSheetNYC = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vReDHUmGFgLUmBw0mja1CB6mutjMvVXQEojFgloRbdVnX6s_FxfS78dswO6lAVXRGgM3vsXKhtULkU0/pub?gid=0&single=true&output=tsv';
const googleSheetSeattle = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTffGfOkLRD87cNhflsYmUDXVK02AKiyxrRJVyLGXzX7652b-qd9w3Gjv9JDW9f6RapKewnigPo0Qrp/pub?gid=0&single=true&output=tsv';

const logoLA = '/restaurant-hero-logo.svg';
const logoHouston = '/restaurant-hero-logo-houston.svg';

// default to LA
let googleSheet = googleSheetLA;
let logo = logoLA;

if (host === 'restaurantherohtx.com' || host === 'www.restaurantherohtx.com') {
  googleSheet = googleSheetHouston;
  logo = logoHouston;
} else if (host === 'nyc.restauranthero.org') {
  googleSheet = googleSheetNYC;
} else if (host === 'seattle.restauranthero.org') {
  googleSheet = googleSheetSeattle;
}

function getEnvProperties () { 
  var properties = {
    logo: logoLA,
    googleSheet: googleSheetLA
  };

  if (host === 'restaurantherohtx.com' || host === 'www.restaurantherohtx.com') {
    properties.googleSheet = googleSheetHouston;
    properties.logo = logoHouston;
  } else if (host === 'nyc.restauranthero.org') {
    properties.googleSheet = googleSheetNYC;
  } else if (host === 'seattle.restauranthero.org') {
    properties.googleSheet = googleSheetSeattle;
  }
  
  return properties;
}
// add proxy to avoid CORS issuse
export function getGoogleSheetUrl(){
  return `https://cors-anywhere.herokuapp.com/${getEnvProperties(),googleSheet}`;
}

export function getLogo() {
  return getEnvProperties().logo;
}





