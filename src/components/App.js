import '../App.css';
import NavBar from './NavBar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import LogIn from './LogIn';
import TopicsContainer from './TopicsContainer';
import User from './User';

function App() {

  const [user, setUser] = useState(null);

  function handleLogIn(user){
      setUser(user);
  }

  return (
    <div >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBar user={user}/>}>
            <Route index element={<LogIn onLogIn={handleLogIn}/>}></Route>
              <Route path="topics/open" element={<TopicsContainer user={user} type={"open"}/>}></Route>
              <Route path="topics/closed" element={<TopicsContainer user={user} type={"closed"}/>}></Route>
              <Route path="user" element={<User user={user}/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
     </div>
  );
}

export default App;
