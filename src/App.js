
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
        <div className="container">
            <div className="col-md-5 mt-5">
                <div className='card'>
                    <ul className='list-group list-group-flush'>
                        <StockRow ticker='aapl'></StockRow>
                        <StockRow ticker='msft'></StockRow>
                        <StockRow ticker='tsla'></StockRow>
                        <StockRow ticker='rblx'></StockRow>
                    </ul>
                </div>
            </div>
        </div>
      </div>
  );
}

export default App;
