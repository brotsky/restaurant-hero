import React, { Suspense, useState } from 'react';
import InstagramEmbed from 'react-instagram-embed';
import useFetch from 'fetch-suspense';
import { shuffle, toString } from 'lodash';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import { isMobile } from 'react-device-detect';
import LazyLoad from 'react-lazyload';

// import logo from './logo.svg';
import './App.css';

const googleSheet = '/spreadsheets/d/e/2PACX-1vR8sQyzK0GFOY3r6p_QQ-b6uprsMPN8uN9piRFPemLoJHI-JBshyzL4YtNIVjGem09ts-q3L55wu79E/pub?gid=0&single=true&output=tsv';

const tsvJSON = (tsv) => {
  var lines=tsv.split("\n");
  var result = [];
  var headers=lines[0].split("\t");

  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split("\t");
	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  
  return shuffle(result);
}

const MyFetchingComponent = () => {
  const response = useFetch(googleSheet, { method: 'GET' });
  const posts = tsvJSON(response);
  
  return posts.map((post, index) => (
  <>
    { post.Instagram !== '' && (
      <div key={`post-${index}`} className="App-header">
        <div>
          <h3>{post.Restaurant}</h3>
          <h5><a href={`https://maps.google.com/?q=${post.Location}`} target="_blank" rel="noopener noreferrer">{post.Location}</a></h5>
          <h5><a href={`tel:${toString(post.Phone).replace(/\D/g,'')}`}>{post.Phone}</a></h5>
        </div>
        <LazyLoad height={600}>
          <InstagramEmbed
            maxWidth={320}
            url={post.Instagram}
            hideCaption={true}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { console.log('onLoading') }}
            onSuccess={() => { console.log('onSuccess') }}
            onAfterRender={() => { console.log('onAfterRender') }}
            onFailure={() => { console.log('onFailure') }}
          />
        </LazyLoad>
      </div>)
      }
    </>
  ));
};

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Restaurant Hero LA</h1>
        <p>Our mission is to keep an updated list of restaurants still serving take out / to go during this crazy time. Please support them by ordering their food.</p>
        <Suspense fallback="Loading...">
          <MyFetchingComponent />
        </Suspense>
        <hr />
        { isMobile ? <a href={'https://greg960960.typeform.com/to/HhOIov'}><button id="submit">Submit a Restaurant</button></a>
              : <button id="submit" onClick={() => setModalOpen(true)}>Submit a Restaurant</button> }
  <p>If you code and would like to contribute to this project, we welcome you to submit a PR on <a href="https://github.com/brotsky/restaurant-hero" target="_blank" rel="noopener noreferrer">GitHub</a>.<br />We encourage you to fork it and create your own RestaurantHero[major city].com.</p>
        <p>
          {'Website created with ❤️ by '}
          <a href="https://twitter.com/gbaroth" target="_blank" rel="noopener noreferrer">Greg Baroth</a>
          {' & '}
          <a href="https://twitter.com/DownToBrotsky" target="_blank" rel="noopener noreferrer">Brandon Brotsky</a>
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
