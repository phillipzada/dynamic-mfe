import React from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  console.log(`🎊 Hello World from "App: ${props.title}"`);
  return (
    <div
      style={{
        margin: '10px',
        padding: '10px',
        textAlign: 'center',
        backgroundColor: 'cyan',
        border: 'none',
        borderRadius: '4px',
      }}
    >
      <h1>React App 1: {props.title}</h1>
      <span>React Version: {React.version}</span><br/>
      <span>React Dom Version: {ReactDOM.version}</span>
    </div>
  );
};

App.defaultProps = {
  title: 'Missing Title!',
};

export default App;
