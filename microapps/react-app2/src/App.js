import React from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  console.log(`🎊 Hello World from "React App 2: ${props.title}"`);
  return (
    <div
      style={{
        margin: '10px',
        padding: '10px',
        textAlign: 'center',
        backgroundColor: 'magenta',
        border: 'none',
        borderRadius: '4px',
      }}
    >
      <h1>React App 2: {props.title}</h1>
      <span>React Version: {React.version}</span><br/>
      <span>React Dom Version: {ReactDOM.version}</span>
    </div>
  );
};

App.defaultProps = {
  title: 'Missing Title!',
};

export default App;
