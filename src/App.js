import React, { Suspense, useState } from 'react';
import InstagramEmbed from 'react-instagram-embed';
import useFetch from 'fetch-suspense';
import { shuffle, toString, countBy, trim, orderBy, startCase } from 'lodash';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import { isMobile } from 'react-device-detect';
import LazyLoad from 'react-lazyload';

import './App.css';
import { getLogo } from './envProperties';
import { tsvJSON } from './tsvToJson';

console.log('If you are developer and want to contribute or use this code for your city please go to https://github.com/brotsky/restaurant-hero');

// default to LA
const googleSheet = getGoogleSheetUrl();
const googleForm = getGoogleForm();
const logo = getLogo();

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
      { post.City !== '' && (
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
