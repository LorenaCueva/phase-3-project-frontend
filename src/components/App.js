import '../App.css';
import NavBar from './NavBar';
import TopicsContainer from './TopicsContainer';

function App() {
  return (
    <div className='container'>
      <div className="App">
        <header className="App-header">
        <h1>Hello</h1>
        <NavBar/>
        <TopicsContainer/>
        </header>
      </div>
     </div>
  );
}

export default App;
