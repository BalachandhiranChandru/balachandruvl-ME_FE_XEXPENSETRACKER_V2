// import Home from './pages/Home/Home'
import Home from './components/Home/Home'

// import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div className="App">
      <Home />
      {/* <h1>Welcome to the My-App</h1> */}
    </div>
    // <SnackbarProvider >
    //   <div>
    //     <Home />
    //   </div>
    // </SnackbarProvider>
  );
}

export default App;