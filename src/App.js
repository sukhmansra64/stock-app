
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WackyForm from "./components/WackyForm";
import StockRow from "./components/StockRow";

function App() {
  return (
      <div className={'app'}>
        <div className={'container'}>
          <h1>Sukhman Sra's Stock App</h1>
        </div>

        <div className="container mt-5">
            <WackyForm/>
        </div>
      </div>
  );
}

export default App;
