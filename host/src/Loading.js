import React from 'react';

const LoadingComponent = (props) => {
  return (
    <div style={styles.container}>
      <h3>Loading... {props.name}</h3>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
    width: '100%',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: 'yellow',
  },
};

LoadingComponent.defaultProps = {
  name: undefined,
};

export default LoadingComponent;
