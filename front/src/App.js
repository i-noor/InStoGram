import React from 'react';
import logo from './logo.svg';
import './App.css';
import { httpGetImages} from "./api/v1";
import Images from "./components/Images";

function App() {
  const images = httpGetImages().then(res => 
          console.log(res)
        );
  console.log(images)
  return (
    <div className="App">
      <header className="App-header">        
        <form action="/upload" method="post" encType="multipart/form-data">         
          <input type="file" name="filedata" />
          <input type="submit" value="Send" />
        </form>
        {/*<Images images={images}/>*/}
      </header>
    </div>
  );
}

export default App;
