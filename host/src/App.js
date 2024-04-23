import React, { Suspense, useState } from 'react';
import ImportMapOverrideToggle from './ImportMapOverrideToggle';
import { loadRemoteModule, loadRemoteEntry } from './wbf-dynamic-loader/loader';
import { loadSystemJsRemoteModule } from './sjs-dynamic-loader/loader';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoadingComponent from './Loading';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import AngularWrapper from './AngularWrapper';

const RemoteApp = React.lazy(() => import('appPredefined/App'));
const RemoteAppPromise = React.lazy(() => import('appPromise/App'));

const RemoteApp2 = React.lazy(async () => {
  const mapping = await window.getAllImports();
  console.log(mapping.react_app1_wbf);
  return loadRemoteModule(mapping.react_app1_wbf);
});

const RemoteApp3 = React.lazy(async () => {
  return await loadSystemJsRemoteModule({
    scope: 'app3',
    //scope: 'default',
    name: 'react-app1-sjs',
    moduleName: './App',
  });
});

const RemoteApp4 = React.lazy(async () => {
  return await loadSystemJsRemoteModule({
    scope: 'app4',
    //scope: 'default',
    name: 'react-app2-sjs',
    moduleName: './App',
  });
});

const RemoteAppAngularModule = async (title) => {
  const component = await loadRemoteModule({
    remoteEntry: 'http://localhost:4200/remoteEntry.js',
    remoteName: 'angular_app3',
    exposedModule: './Entry',
  });
  const instance = await component.default.bootstrapModule({
    container: 'angular-container',
    properties: [
      {
        title: title,
      },
    ],
  });
};

console.log('👋 Hello World from "Host"');

const divStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '30px',
  alignItems: 'center',
  textAlign: 'center',
};
const App = () => {
  const [importMapOverridesEnabled, setImportMapOverridesEnabled] =
    useState(false);

  const [loading, setLoading] = useState(true);

  const handleToggle = (isEnabled) => {
    setImportMapOverridesEnabled(isEnabled);
    if (isEnabled) {
      localStorage.setItem('devtools', true);
    } else {
      localStorage.removeItem('devtools');
    }
    window.location.reload();
  };

  const onFrameLoad = (a) => {
    const sharedStyles = document.getElementById('shared_theming');
    a.target.contentWindow.postMessage({ style: sharedStyles.innerHTML }, '*');
    setLoading(false);
  };

  const loadAngularComponent = () => {
    RemoteAppAngular('Dynamic Module Federation (Component)');
  };

  return (
    <HashRouter basename="/">
      <NavBar />
      <ImportMapOverrideToggle onToggle={handleToggle} />
      <div
        style={{
          margin: '10px',
          padding: '10px',
          textAlign: 'center',
          backgroundColor: 'greenyellow',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        <h1>Host</h1>
        <span>React Version: {React.version}</span>
        <br />
        <span>React Dom Version: {ReactDOM.version}</span>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div style={divStyle}>
              <h2>With great power comes great responsibility</h2>
              <div
                style={{ marginTop: '30px', width: '350px', height: '300px' }}
              >
                {/* <iframe
                  src="https://giphy.com/embed/MCZ39lz83o5lC"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                ></iframe> */}
              </div>
            </div>
          }
        />
        <Route
          path="/app1"
          element={
            <Suspense fallback={<LoadingComponent name="RemoteApp" />}>
              <RemoteApp title="Build-Time" />
            </Suspense>
          }
        />
        <Route
          path="/app2"
          element={
            <Suspense fallback={<LoadingComponent name="RemoteApp2" />}>
              <RemoteApp2 title="Dynamic Module Federation" />
            </Suspense>
          }
        />
        <Route
          path="/app3"
          element={
            <Suspense fallback={<LoadingComponent name="RemoteApp3" />}>
              <RemoteApp3 title="Dynamic SystemJS" />
            </Suspense>
          }
        />
        <Route
          path="/app4"
          element={
            <Suspense fallback={<LoadingComponent name="RemoteApp4" />}>
              <RemoteApp4 title="Dynamic SystemJS App 2" />
            </Suspense>
          }
        />
        <Route
          path="/iframe"
          element={
            <iframe
              src={window.location.origin.replace('3001', '3004')}
              onLoad={onFrameLoad}
              scrolling="no"
              style={{
                marginTop: '-10px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
              }}
            />
          }
        />
        <Route
          path="/angular-app1"
          element={
            <Suspense fallback={<LoadingComponent name="AngularApp" />}>
              <AngularWrapper />
            </Suspense>
          }
        />
        <Route
          path="/nuts"
          element={
            <div>
              <Suspense fallback={<LoadingComponent name="RemoteApp" />}>
                <RemoteApp title="Build-Time" />
              </Suspense>
              <Suspense
                fallback={<LoadingComponent name="RemoteApp Promise" />}
              >
                <RemoteAppPromise title="Build-Time + Promise" />
              </Suspense>
              <Suspense fallback={<LoadingComponent name="RemoteApp2" />}>
                <RemoteApp2 title="Dynamic Module Federation" />
              </Suspense>
              <Suspense fallback={<LoadingComponent name="RemoteApp3" />}>
                <RemoteApp3 title="Dynamic SystemJS" />
              </Suspense>
              <Suspense fallback={<LoadingComponent name="RemoteApp4" />}>
                <RemoteApp4 title="Dynamic SystemJS App 2" />
              </Suspense>
              <Suspense fallback={<LoadingComponent name="AngularApp" />}>
                <angular-container
                  onload={RemoteAppAngularModule(
                    'Dynamic Module Federation (Module)'
                  )}
                >
                  <angular-remote-entry-app-root></angular-remote-entry-app-root>
                </angular-container>
              </Suspense>
              <AngularWrapper />
              {loading ? <LoadingComponent name="Standalone" /> : <></>}
              <iframe
                src={window.location.origin.replace('3001', '3004')}
                onLoad={onFrameLoad}
                scrolling="no"
                style={{
                  marginTop: '-10px',
                  marginBottom: '-10px',
                  width: '100%',
                  border: 'none',
                  borderRadius: '4px',
                }}
              />
            </div>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
