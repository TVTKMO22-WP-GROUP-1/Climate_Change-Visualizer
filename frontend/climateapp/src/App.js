import './App.css';
import React, { useState } from 'react';
import Home from './Home';
import LoginView from './LoginView';
import ProtectedView from './ProtectedView';
import SignUpView from './SignUpView';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  let authRoutes = <>
      <Route path="/login" element={ <LoginView login ={ (newJwt) =>{
        setIsUserLoggedIn(true);
      }}/>}/>
      <Route path="/signup" element={ <SignUpView/>}/>
  </>
  if (isUserLoggedIn != null) {
      authRoutes = <Route path="/protected" element={ <ProtectedView />}/>
  }
  return (
    <div className="App">
      <div className='header'>
    <h1>Climate Change Visualizer</h1>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={ <Home userLoggedIn={isUserLoggedIn != null}/>}/>
      {authRoutes}
      <Route path="*" element={ <Home userLoggedIn={isUserLoggedIn != null}/>}/>
      </Routes>
    </BrowserRouter>
      </div>
    </div>
  );
}
export default App;