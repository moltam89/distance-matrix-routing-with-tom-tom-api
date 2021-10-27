import './App.css'
let APP_KEY = "3ovwP0g2CzgNMyc7QtYqn6JuOHtaESTC";

const App = () => {


  useEffect(
    () => {
      map = new tt.map({
        "key": APP_KEY,
        "container":"mapElement",
    });
    }
  );

  return (
    <div className="App">
    </div>
  );
}

export default App;
