import React from 'react';
import InstagramEmbed from 'react-instagram-embed';
// import logo from './logo.svg';
import './App.css';

const posts = [
  'https://www.instagram.com/p/B94w4b-lVI9/',
  'https://www.instagram.com/p/B98S4U-hXbg/',
  'https://www.instagram.com/p/B9FhmcclZRv/',
  'https://www.instagram.com/p/B91BkY7h93s/',
  'https://www.instagram.com/p/B605umelBqI/',
  'https://www.instagram.com/p/B5QpV4hFQKg/',
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Restaurant Hero LA</h1>
        { posts.map((post, index) => (<InstagramEmbed
          key={`post-${index}`}
          maxWidth={320}
          url={post}
          hideCaption={true}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />))}
      </header>
    </div>
  );
}

export default App;
