import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from "./components/MainPage";
//this function is where the main component of deployment is being run, this function renders the main page
function App() {
  return (
      <div className={'app'}>
        <div className={'container'}>
          <h1>Sukhman Sra's Stock App</h1>
        </div>
          <MainPage/>
        </div>
  );
}

export default App;
