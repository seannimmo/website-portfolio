
import '../css/App.css';
import Menu from './menu.js';
import Navbar from './navbar.js';
import Window from './Window.js';
import React, {useState} from 'react';
import Drench from './Drench.js';
import Tutorial from './Tutorial.js';

const App = () => {
  
  const [content, setContent] = useState(<Tutorial />);

  const handleContent = game => {
    setContent(game);
    console.log(content);
  }

  return (
    <div className='App'>
      <Navbar />
      <Menu handleContent={handleContent}/>
      <Window game={content}/>
    </div>
    // <div className='App'>
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
  );
}

export default App;
