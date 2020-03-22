import React, { Suspense, useState } from 'react';
import InstagramEmbed from 'react-instagram-embed';
import useFetch from 'fetch-suspense';
import { shuffle, toString, countBy, trim, orderBy, startCase } from 'lodash';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import { isMobile } from 'react-device-detect';
import LazyLoad from 'react-lazyload';

import './App.css';

console.log('If you are developer and want to contribute or use this code for your city please go to https://github.com/brotsky/restaurant-hero');

const { host } = window.location;

const googleSheetLA = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8sQyzK0GFOY3r6p_QQ-b6uprsMPN8uN9piRFPemLoJHI-JBshyzL4YtNIVjGem09ts-q3L55wu79E/pub?gid=0&single=true&output=tsv';
const googleSheetHouston = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT3a2jeKTk--9jI0Zqdq9h7DbR_lF2Iu5AZwG3ZiPbejaRmJ_0uTiw-6ojM4AVoeBrQJIJwiOgBhG17/pub?gid=0&single=true&output=tsv';
const googleSheetNYC = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vReDHUmGFgLUmBw0mja1CB6mutjMvVXQEojFgloRbdVnX6s_FxfS78dswO6lAVXRGgM3vsXKhtULkU0/pub?gid=0&single=true&output=tsv';
const googleSheetSeattle = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTffGfOkLRD87cNhflsYmUDXVK02AKiyxrRJVyLGXzX7652b-qd9w3Gjv9JDW9f6RapKewnigPo0Qrp/pub?gid=0&single=true&output=tsv';

const googleFormLA = 'https://docs.google.com/forms/d/e/1FAIpQLSfQQaZ3WqXUMtZquB18OJ2_CXaGmBqcWVJXW7atLqBGpNgd1w/viewform?usp=sf_link';

const logoLA = '/restaurant-hero-logo.svg';
const logoHouston = '/restaurant-hero-logo-houston.svg';
const logoSeattle = '/restaurant-hero-logo-seattle.svg';
const logoNewYork = '/restaurant-hero-logo-new-york.svg';

// default to LA
let googleSheet = googleSheetLA;
let googleForm = googleFormLA;
let logo = logoLA;

if (host === 'restaurantherohtx.com' || host === 'www.restaurantherohtx.com') {
  googleSheet = googleSheetHouston;
  logo = logoHouston;
} else if (host === 'nyc.restauranthero.org') {
  googleSheet = googleSheetNYC;
  logo = logoNewYork;
} else if (host === 'seattle.restauranthero.org') {
  googleSheet = googleSheetSeattle;
  logo = logoSeattle;
}

// add proxy to avoid CORS issuse
googleSheet = `https://cors-anywhere.herokuapp.com/${googleSheet}`;

const tsvJSON = (tsv) => {
  var lines=tsv.split("\n");
  var result = [];
  var headers=lines[0].split("\t");

  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split("\t");
	  for(var j=0;j<headers.length;j++){
      const value = trim(currentline[j]);
      const key = trim(headers[j]);
		  obj[key] =  key === 'City' ? startCase(value) : value;
	  }
	  result.push(obj);
  }
  
  return shuffle(result);
}

const MyFetchingComponent = () => {
  const [selectedCity, setSelectedCity] = useState('All');
  const response = useFetch(googleSheet, { method: 'GET' });
  const posts = tsvJSON(response);
  const countByCity = countBy(posts, 'City');
  const cityKeys = Object.keys(countByCity);
  const cities = orderBy(cityKeys.map(city => ({ name: city, count: countByCity[city] })), 'name');
  const filteredPosts = selectedCity === 'All' ? posts : posts.filter(post => post.City === selectedCity);
  
  return (<div>
    <header id="city-filter">
      <ul>
        <li
          className={selectedCity === 'All' ? 'selected' : ''}
          onClick={() => setSelectedCity('All')}
        >All</li>
        { cities.map((city, index) => (
          <li
            key={`city-filter-${index}`}
            className={selectedCity === city.name ? 'selected' : ''}
            onClick={() => setSelectedCity(city.name)}
          >
            {city.name}
          </li>
        ))}
      </ul>
    </header>
    { filteredPosts.map((post, index) => (
    <article key={`post-${index}`}>
      { post.Instagram !== '' && (
        <div className="App-header">
          <div>
            { post.Restaurant && <h3>{post.Restaurant}</h3> }
            { post.Tag && <h6>{post.Tag}</h6> }
            { post.Location && <h5><a href={`https://maps.google.com/?q=${post.Location}`} target="_blank" rel="noopener noreferrer">{post.Location}</a></h5> }
            { post.Phone && <h5><a href={`tel:${toString(post.Phone).replace(/\D/g,'')}`}>{post.Phone}</a></h5> }
          </div>
          <LazyLoad height={600}>
            <InstagramEmbed
              maxWidth={320}
              url={post.Instagram}
              hideCaption={true}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            />
          </LazyLoad>
        </div>)
        }
      </article>
    )) }
  </div>)
};

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <img className="logo" src={logo} alt="Restaurant Hero Logo" />
        <p>Our mission is to keep an updated list of restaurants still serving take out / to go during this crazy time. Please support them by ordering their food.</p>
        <a href={googleForm} target="_blank" rel="noopener noreferrer"><button id="submit">Submit a Restaurant</button></a>
        <Suspense fallback="Loading...">
          <MyFetchingComponent />
        </Suspense>
        <hr />
        
  <p>If you code and would like to contribute to this project, we welcome you to submit a PR on <a href="https://github.com/brotsky/restaurant-hero" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
  <p>We encourage you to fork it and create your own RestaurantHero[major city].com.</p>
  <p>Join the <a href="https://join.slack.com/t/restauranthero/shared_invite/zt-cyzlvdhg-lKSaf2dYg2FGNzXPLRk3Sw" target="_blank" rel="noopener noreferrer">Restaurant Hero Slack</a> to collab with our growing community, everyone is welcome!</p>
  <img className="logo" src={logo} alt="Restaurant Hero LA Logo" />
        <p>
          {'Website created with ❤️ by '}
          <a href="https://twitter.com/gbaroth" target="_blank" rel="noopener noreferrer">Greg Baroth</a>
          {' & '}
          <a href="https://twitter.com/DownToBrotsky" target="_blank" rel="noopener noreferrer">Brandon Brotsky</a><br />
          Special thanks to <a href="https://www.sherrod-designs.com/" target="_blank" rel="noopener noreferrer">Jordana Sherrod</a> for her awesome logo and graphic design contributions.
        </p>
      </header>
      
      { modalOpen && <div className={'modal'} onClick={() => setModalOpen(false)}>
        <div className={'closeButton'} onClick={() => setModalOpen(false)}>X</div>
        <div className={'modalInner'}>
          <ReactTypeformEmbed url="https://greg960960.typeform.com/to/HhOIov" />
        </div>
      </div> }
    </div>
  );
}

export default App;
