import '../App.css';
import NavBar from './NavBar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import TopicsContainer from './TopicsContainer';

function App() {

  const user_id = 1

  return (
    <div >
      <div className="App">
        {/* <header className="App-header">
        </header> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBar/>}>
            <Route index element={<TopicsContainer user_id={user_id} type={"open"}/>}></Route>
              <Route path="topics/open" element={<TopicsContainer user_id={user_id} type={"open"}/>}></Route>
              <Route path="topics/closed" element={<TopicsContainer user_id={user_id} type={"closed"}/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
     </div>
  );
}

export default App;
