import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login/login';
import Router from './routes/Router';
import { BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <div>
        <Router/>
      </div>
    </BrowserRouter>
  );
}

export default App;
