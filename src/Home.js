import React, { Suspense, useState } from 'react';
import InstagramEmbed from 'react-instagram-embed';
import useFetch from 'fetch-suspense';
import { toString, countBy, orderBy } from 'lodash';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import LazyLoad from 'react-lazyload';
import './content/styles/bootstrap-4.1.2/bootstrap.min.css'
import './content/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import './content/styles/main_styles.css'
import './content/styles/responsive.css'

import "./content/js/custom.js"
import homeImg from './content/images/home.jpg'
import { tsvJSON } from './tsvToJson';
import { getGoogleSheetUrl, getLogo, getGoogleForm, isHomePage } from './envProperties';
import Cities from './Cities';

console.log('If you are developer and want to contribute or use this code for your city please go to https://github.com/brotsky/restaurant-hero');

const googleForm = getGoogleForm();
const googleSheet = getGoogleSheetUrl();
const logo = getLogo();
const DEFAULT_INSTAGRAM_POST = 'https://www.instagram.com/p/B-DiFXiFFU6/';

const MyFetchingComponent = () => {
  
  const [selectedCity, setSelectedCity] = useState('All');
  const response = useFetch(googleSheet, { method: 'GET' });
  const posts = tsvJSON(response);
  const countByCity = countBy(posts, 'City');
  const cityKeys = Object.keys(countByCity);
  const cities = orderBy(cityKeys.map(city => ({ name: city, count: countByCity[city] })), 'name');
  const filteredPosts = selectedCity === 'All' ? posts : posts.filter(post => post.City === selectedCity);

  return (<div>
    <div className="container">
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

    {filteredPosts.map((post, index) => {
    const instagramPost = post.Instagram === '' ? DEFAULT_INSTAGRAM_POST : post.Instagram;
    return (
      <article key={`post-${index}`}>
          
           <div className="intro">
           <div className="container">
             <div className="row card-row" >
             <div className='col'>
                  <LazyLoad height={600}>
                    <InstagramEmbed
                      maxWidth={320}
                      className="insta"
                      url={instagramPost}
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
               <div className="col">
                 <div className="intro_content">
                   <div className="intro_title"><h2>{post.Restaurant}</h2></div>
                   {post.Tag &&  <div className="intro_subtitle page_subtitle">{post.Tag}</div>}
                   <div className="intro_text">
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
    )})}
    {/* {
      visibleItems < filteredPosts.length && 
      <div className="container">
        <div className="load-more" onClick={() => setVisibleItems(visibleItems + 10)}>Load more</div>
      </div>
    } */}
    
  </div>)
};

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    
    <div className="super_container">

      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="header_content d-flex flex-row align-items-center justify-content-start">
                <div className="logo">
                  <img className="logo" src={logo} alt="Restaurant Hero Logo" />
                </div>
                <a className="reservations_phone ml-auto" href={googleForm} target="_blank" rel="noopener noreferrer">Submit a Restaurant</a>
              </div>
            </div>
          </div>
        </div>
      </header>


      {/* <div className="hamburger_bar trans_400 d-flex flex-row align-items-center justify-content-start">
        <div className="hamburger">
          <div className="menu_toggle d-flex flex-row align-items-center justify-content-start">
            <span>menu</span>
            <div className="hamburger_container">
              <div className="menu_hamburger">
                <div className="line_1 hamburger_lines" style={{transform: 'matrix(1, 0, 0, 1, 0, 0);'}}></div>
                <div className="line_2 hamburger_lines" style={{visibility: 'inherit; opacity: 1;'}}></div>
                <div className="line_3 hamburger_lines" style={{transform: 'matrix(1, 0, 0, 1, 0, 0);'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}


      {/* <div className="menu trans_800">
        <div className="menu_content d-flex flex-column align-items-center justify-content-center text-center">
          <ul>
            <li><a href="index.html">home</a></li>
            <li><a href="about.html">about us</a></li>
            <li><a href="menu.html">menu</a></li>
            <li><a href="#">delivery</a></li>
            <li><a href="blog.html">blog</a></li>
            <li><a href="contact.html">contact</a></li>
          </ul>
        </div>
        <div className="menu_reservations_phone ml-auto">Reservations: +34 586 778 8892</div>
      </div> */}


      <div className="home">
       {/* <img className="parallax-slider" src={homeImg} style={{transform: 'translate3d(0px, -40px, 0px)', position: 'absolute', height: '500px', width: '1903px', maxWidth: 'none' }}/> */}
        <img src={homeImg} alt="Logo" style={{height: '500px', width: '1903px'}} />
        <div className="parallax_background parallax-window" data-parallax="scroll" data-image-src={homeImg} data-speed="0.8"></div>
        <div className="home_container">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="home_content text-center">
                  <div className="home_title"><h2>Our mission is to keep an updated list of restaurants still serving take out / to go during this crazy time. Please support them by ordering their food</h2></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll_icon"></div>
      </div>
      
      
      {
      !isHomePage() ?
        <Suspense fallback="Loading...">
          <MyFetchingComponent />
        </Suspense>
      :
        <Cities/>
      }

      <footer className="footer">
        <div className="container">
          <div className="row">

            <div className="col-lg-3 footer_col">
              <div className="footer_logo">
                <img className="logo" src={logo} alt="Restaurant Hero Logo" style={{width: '100%'}}/>
              </div>
            </div>


            <div className="col-lg-8 footer_col">
              <div className="footer_about">
              <p>If you code and would like to contribute to this project, we welcome you to submit a PR on <a href="https://github.com/brotsky/restaurant-hero" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
              <p>We encourage you to fork it and create your own RestaurantHero[major city].com.</p>
              <p>Join the <a href="https://join.slack.com/t/restauranthero/shared_invite/zt-cyzlvdhg-lKSaf2dYg2FGNzXPLRk3Sw" target="_blank" rel="noopener noreferrer">Restaurant Hero Slack</a> to collab with our growing community, everyone is welcome!</p>
                    <p>
                      {'Website created with ❤️ by '}
                      <a href="https://twitter.com/gbaroth" target="_blank" rel="noopener noreferrer">Greg Baroth</a>
                      {' & '}
                      <a href="https://www.linkedin.com/in/brandonbrotsky/" target="_blank" rel="noopener noreferrer">Brandon Brotsky</a>
                    </p>
                    <p>
                      Special thanks to those who contributed code and/or graphics to this project:<br />
                      <ul id="thank-you-list">
                        <li><a href="https://www.sherrod-designs.com/" target="_blank" rel="noopener noreferrer">Jordana Sherrod</a></li>
                        <li><a href="https://honeycombsoft.com/" target="_blank" rel="noopener noreferrer">Kostia Bondariev of Honeycomb</a></li>
                        <li><a href="http://www.linkedin.com/in/sallykim5" target="_blank" rel="noopener noreferrer">Sally Kim</a></li>
                        <li><a href="http://linkedin.com/in/bareinhard" target="_blank" rel="noopener noreferrer">Brett Reinhard</a></li>
                        <li><a href="https://portfolio.noahjanderson.com/" target="_blank" rel="noopener noreferrer">Noah Anderson</a></li>
                      </ul>
                      And to everyone that has helped add & moderate content, its too many list!
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
