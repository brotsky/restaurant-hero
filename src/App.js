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
  
  return posts.map((post, index) => (<InstagramEmbed
    key={`post-${index}`}
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
  />))
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Restaurant Hero LA</h1>
        <Suspense fallback="Loading...">
          <MyFetchingComponent />
        </Suspense>
      </header>
    </div>
  );
}

export default App;
