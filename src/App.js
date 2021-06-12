
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StockRow from './components/StockRow.js';


let stock="aapl";
const url=`https://cloud.iexapis.com/stable/stock/${stock}/quote?token=pk_5600d65a8fcc45418dcb19281fc77e47`;


const fetchRequest = async (url)=>{
  try{
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch(err){
    console.log(err)
    return err;
  }
}

function App() {
  return (
      <div className={'app'}>
        <div className={'container'}>
          <h1>Sukhman Sra's Stock App</h1>
        </div>
        <div className={'container'}>
          <table className={'table mt-5'}>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Price</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <StockRow ticker={"aapl"}/>
              <StockRow ticker={"goog"}/>
              <StockRow ticker={"msft"}/>
              <StockRow ticker={"tsla"}/>
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default App;
