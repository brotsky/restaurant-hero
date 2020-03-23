import React, { Suspense, useState } from 'react';
import InstagramEmbed from 'react-instagram-embed';
import useFetch from 'fetch-suspense';
import { shuffle, toString, countBy, trim, orderBy, startCase } from 'lodash';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import LazyLoad from 'react-lazyload';
import './content/styles/bootstrap-4.1.2/bootstrap.min.css'
import './content/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import './content/styles/main_styles.css'
import './content/styles/responsive.css'

import "./content/js/custom.js"
import homeImg from './content/images/home.jpg'
import { tsvJSON } from './tsvToJson';
import { getGoogleSheetUrl, getLogo, getGoogleForm } from './envProperties';

console.log('If you are developer and want to contribute or use this code for your city please go to https://github.com/brotsky/restaurant-hero');

const googleForm = getGoogleForm();
const googleSheet = getGoogleSheetUrl();
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
    <div class="container">
    <header id="city-filter">
      <ul>
        <li
          className={selectedCity === 'All' ? 'selected' : ''}
          onClick={() => { setSelectedCity('All'); }}
        >All</li>
        {cities.map((city, index) => (
          <li
            key={`city-filter-${index}`}
            className={selectedCity === city.name ? 'selected' : ''}
            onClick={() => { setSelectedCity(city.name); }}
          >
            {city.name}
          </li>
        ))}
      </ul>
    </header>
    </div>

    {filteredPosts.map((post, index) => (
      <article key={`post-${index}`}>
        {post.Instagram !== '' && (
          
           <div class="intro">
           <div class="container">
             <div class="row card-row" >
             <div class='col'>
                  <LazyLoad height={600}>
                    <InstagramEmbed
                      maxWidth={320}
                      className="insta"
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
              </div>
               <div class="col">
                 <div class="intro_content">
                   <div class="intro_title"><h2>{post.Restaurant}</h2></div>
                   {post.Tag &&  <div class="intro_subtitle page_subtitle">{post.Tag}</div>}
                   <div class="intro_text">
                   {post.Location && <h4><a href={`https://maps.google.com/?q=${post.Location}`} target="_blank" rel="noopener noreferrer">{post.Location}</a></h4>}
                   {post.Phone && <h4><a href={`tel:${toString(post.Phone).replace(/\D/g, '')}`}>{post.Phone}</a></h4>}
                   </div>
                 </div>
               </div>
              
             </div>
           </div>
         </div>)
        }
      </article>
    ))}
    {/* {
      visibleItems < filteredPosts.length && 
      <div class="container">
        <div class="load-more" onClick={() => setVisibleItems(visibleItems + 10)}>Load more</div>
      </div>
    } */}
    
  </div>)
};

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    
    <div class="super_container">

      <header class="header">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="header_content d-flex flex-row align-items-center justify-content-start">
                <div class="logo">
                  <img className="logo" src={logo} alt="Restaurant Hero Logo" />
                </div>
                <a class="reservations_phone ml-auto" href={googleForm} target="_blank" rel="noopener noreferrer">Submit a Restaurant</a>
              </div>
            </div>
          </div>
        </div>
      </header>


      {/* <div class="hamburger_bar trans_400 d-flex flex-row align-items-center justify-content-start">
        <div class="hamburger">
          <div class="menu_toggle d-flex flex-row align-items-center justify-content-start">
            <span>menu</span>
            <div class="hamburger_container">
              <div class="menu_hamburger">
                <div class="line_1 hamburger_lines" style={{transform: 'matrix(1, 0, 0, 1, 0, 0);'}}></div>
                <div class="line_2 hamburger_lines" style={{visibility: 'inherit; opacity: 1;'}}></div>
                <div class="line_3 hamburger_lines" style={{transform: 'matrix(1, 0, 0, 1, 0, 0);'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}


      {/* <div class="menu trans_800">
        <div class="menu_content d-flex flex-column align-items-center justify-content-center text-center">
          <ul>
            <li><a href="index.html">home</a></li>
            <li><a href="about.html">about us</a></li>
            <li><a href="menu.html">menu</a></li>
            <li><a href="#">delivery</a></li>
            <li><a href="blog.html">blog</a></li>
            <li><a href="contact.html">contact</a></li>
          </ul>
        </div>
        <div class="menu_reservations_phone ml-auto">Reservations: +34 586 778 8892</div>
      </div> */}


      <div class="home">
       {/* <img class="parallax-slider" src={homeImg} style={{transform: 'translate3d(0px, -40px, 0px)', position: 'absolute', height: '500px', width: '1903px', maxWidth: 'none' }}/> */}
        <img src={homeImg} alt="Logo" style={{height: '500px', width: '1903px'}} />
        <div class="parallax_background parallax-window" data-parallax="scroll" data-image-src={homeImg} data-speed="0.8"></div>
        <div class="home_container">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="home_content text-center">
                  <div class="home_title"><h2>Our mission is to keep an updated list of restaurants still serving take out / to go during this crazy time. Please support them by ordering their food</h2></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="scroll_icon"></div>
      </div>
      
      <Suspense fallback="Loading...">
        <MyFetchingComponent />
      </Suspense>

      <footer class="footer">
        <div class="container">
          <div class="row">

            <div class="col-lg-3 footer_col">
              <div class="footer_logo">
                <img className="logo" src={logo} alt="Restaurant Hero Logo" style={{width: '100%'}}/>
              </div>
            </div>


            <div class="col-lg-8 footer_col">
              <div class="footer_about">
              <p>If you code and would like to contribute to this project, we welcome you to submit a PR on <a href="https://github.com/brotsky/restaurant-hero" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
              <p>We encourage you to fork it and create your own RestaurantHero[major city].com.</p>
              <p>Join the <a href="https://join.slack.com/t/restauranthero/shared_invite/zt-cyzlvdhg-lKSaf2dYg2FGNzXPLRk3Sw" target="_blank" rel="noopener noreferrer">Restaurant Hero Slack</a> to collab with our growing community, everyone is welcome!</p>
                    <p>
                      {'Website created with ❤️ by '}
                      <a href="https://twitter.com/gbaroth" target="_blank" rel="noopener noreferrer">Greg Baroth</a>
                      {' & '}
                      <a href="https://twitter.com/DownToBrotsky" target="_blank" rel="noopener noreferrer">Brandon Brotsky</a><br />
                      Special thanks to <a href="https://www.sherrod-designs.com/" target="_blank" rel="noopener noreferrer">Jordana Sherrod</a> for her awesome logo and graphic design contributions.
                    </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      { modalOpen && <div className={'modal'} onClick={() => setModalOpen(false)}>
        <div className={'closeButton'} onClick={() => setModalOpen(false)}>X</div>
        <div className={'modalInner'}>
          <ReactTypeformEmbed url="https://greg960960.typeform.com/to/HhOIov" />
        </div>
      </div> }
    </div>
  );
}

export default Home;
