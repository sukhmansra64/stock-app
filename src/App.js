import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from "./components/MainPage";
//this function is where the main component of deployment is being run, this function renders the main page
function App() {
  return (
      <div className={'app'}>
        <div className='container mt-3 text-light bg-dark' style={{width: '185px', height:'55px', borderRadius: '5px', marginLeft:'100px'}}>
          <h1>STOCK.y</h1>
        </div>
          <MainPage/>
        </div>
  );
}

export default App;
