import React, { Suspense } from 'react';
import InstagramEmbed from 'react-instagram-embed';
import useFetch from 'fetch-suspense';

// import logo from './logo.svg';
import './App.css';

const googleSheet = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR8sQyzK0GFOY3r6p_QQ-b6uprsMPN8uN9piRFPemLoJHI-JBshyzL4YtNIVjGem09ts-q3L55wu79E/pub?gid=0&single=true&output=tsv';

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
  
  return result;
}

const MyFetchingComponent = () => {
  const response = useFetch(googleSheet, { method: 'GET' });
  const posts = tsvJSON(response);
  
  return posts.map((post, index) => post.Instagram !== '' && (
    <div key={`post-${index}`} className="App-header">
      <div>
        <h3>{post.Restaurant}</h3>
        <h5><a href={`https://maps.google.com/?q=${post.Location}`} target="_blank" rel="noopener noreferrer">{post.Location}</a></h5>
        <h5><a href={`tel:${post.Phone.replace(/\D/g,'')}`}>{post.Phone}</a></h5>
      </div>
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
    </div>))
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Restaurant Hero LA</h1>
        <p>Our mission is to help promote Restaurants in Los Angeles that are affected by COVID-19.</p>
        <p>If you would like to contribute to the project and are a developer, we welcome you to submit a PR on <a href="https://github.com/brotsky/restaurant-hero" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
        <Suspense fallback="Loading...">
          <MyFetchingComponent />
        </Suspense>
      </header>
    </div>
  );
}

export default App;
