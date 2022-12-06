import '../App.css';
import NavBar from './NavBar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import TopicsContainer from './TopicsContainer';

function App() {

  const user_id = 1

  return (
    <div className='container'>
      <div className="App">
        <header className="App-header">
        <h1>Hello</h1>
        {/* <NavBar/>
        <TopicsContainer/> */}
        </header>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBar/>}>
              <Route path="topics/open" element={<TopicsContainer user_id={user_id}/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
        
      </div>
     </div>
  );
}

export default App;
