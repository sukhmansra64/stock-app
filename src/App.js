
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WackyForm from "./components/WackyForm";
import StockRow from "./components/StockRow";
import MainPage from "./components/MainPage";
import StockInfoDisplay from "./components/StockInfoDisplay";
//lol just for a commit dont have time today unfortunately
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
