// simulate a fetch from an API
import './index.css';

import getAllImports from './dynamic-import-map';
window.getAllImports = getAllImports;

import 'import-map-overrides';
import 'systemjs/dist/system';
import 'systemjs/dist/extras/amd';
import 'systemjs/dist/extras/named-exports';
import 'systemjs/dist/extras/named-register';
import 'systemjs/dist/extras/use-default';

importMapOverrides.getDefaultMap().then((e) => console.log(e));
window.scopes = __webpack_share_scopes__;

// Use dynamic import here to allow webpack to interface with module federation code
import('./bootstrap');
