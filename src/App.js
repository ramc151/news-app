import './App.css'
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';

function App() {

  const [progress, setProgress] = useState(0)

  const apiKey = process.env.REACT_APP_API_KEY;

  return (
    <Router>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(100)}
      />
      <Navbar />
      <Routes>
        <Route exact path='/' element={<News country="us" pageSize={5} key="general" apiKey={apiKey} setProgress={setProgress} category="general" />}></Route>
        <Route exact path='/business' element={<News country="us" pageSize={5} key="business" apiKey={apiKey} setProgress={setProgress} category="business" />}></Route>
        <Route exact path='/entertainment' element={<News country="us" pageSize={5} key="entertainment" apiKey={apiKey} setProgress={setProgress} category="entertainment" />}></Route>
        <Route exact path='/general' element={<News country="us" pageSize={5} key="general" apiKey={apiKey} setProgress={setProgress} category="general" />}></Route>
        <Route exact path='/health' element={<News country="us" pageSize={5} key="health" apiKey={apiKey} setProgress={setProgress} category="health" />}></Route>
        <Route exact path='/science' element={<News country="us" pageSize={5} key="science" apiKey={apiKey} setProgress={setProgress} category="science" />}></Route>
        <Route exact path='/sports' element={<News country="us" pageSize={5} key="sports" apiKey={apiKey} setProgress={setProgress} category="sports" />}></Route>
        <Route exact path='/technology' element={<News country="us" pageSize={5} key="technology" apiKey={apiKey} setProgress={setProgress} category="technology" />}></Route>
      </Routes>
    </Router>

  );
}

export default App;
