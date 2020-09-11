import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Terminal from './Components/Terminal';
import TerminalItem from './Components/TerminalItem'
import TerminalSkip from './Components/TerminalSkip'


import './Components/Terminal.css'

function App() {
  const terminalStyle = {
    color: 'white'
  }
  return (
    <div className='centerContainer'>
      <div className="HomepageTerminal">
        <div className="TerminalTop">
          <div className="closeWindowIcon" />
          <div className="minimizeWindowIcon" />
          <div className="expandWindowIcon" />
        </div>
        <div className='TerminalBody'>
        <Terminal className='Terminal' style={terminalStyle} prefix={'>'}>
          <TerminalItem shouldDelete={true} newLine={false}>Hello World</TerminalItem>
          <TerminalItem>My name is Will Hord</TerminalItem>
          <TerminalItem>This is my react terminal component</TerminalItem>
          <TerminalItem>It will type any number of words at the rate you set and even has a skip button</TerminalItem>
          <TerminalItem>If you want to see it in action on my personal website go to WillHord.org</TerminalItem>
          <TerminalSkip>Skip &#9654;</TerminalSkip>
        </Terminal>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);