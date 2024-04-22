const getAllImports = () => {
  return new Promise((resolve, reject) => {
    resolve({
      react_app1_wbf: {
        remoteEntry: 'http://localhost:3002/remoteEntry.js',
        remoteName: 'react_app1_wbf',
        exposedModule: './App',
      },
      react_promise_wbf: {
        remoteEntry: 'http://localhost:3002/remoteEntry.js',
        remoteName: 'react_promise_wbf',
        exposedModule: './App',
      },
    });
  });
};

export default getAllImports;
