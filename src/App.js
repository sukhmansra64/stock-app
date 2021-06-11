import 'strict';
import logo from './logo.svg';
import './App.css';
const request = require('request');
let stream;
let partialMessage;
const connect = ()=>{
  stream = request({
    url: 'https://cloud-sse.iexapis.com/stable/stocksUSNoUTP?token=pk_5600d65a8fcc45418dcb19281fc77e47&symbols=spy,ibm,twtr',
    headers:{
      'Content-Type': 'text/event-stream'
    }
  })
}
connect();
stream.on('socket',()=>{
  console.log("Connected");
});
stream.on('end',()=>{
  console.log("Reconnecting");
  connect();
});
stream.on('complete',()=>{
  console.log("Reconnecting");
  connect();
});
stream.on('error',(err)=>{
  console.log("Error",err);
  connect();
});
//go to documentation of the api and complete the code above

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
