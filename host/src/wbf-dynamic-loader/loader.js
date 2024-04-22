const moduleMap = {};
const remoteMap = {};
let isDefaultScopeInititalised = false;

async function lookupExposedModule(remoteName, exposedModule) {
  const container = window[remoteName];
  const factory = await container.get(exposedModule);
  const Module = factory();
  return Module;
}

async function initRemote(remoteName) {
  const container = window[remoteName];

  if (remoteMap[remoteName]) {
    return container;
  }

  if (!isDefaultScopeInititalised) {
    await __webpack_init_sharing__('default');
    isDefaultScopeInititalised = true;
  }
  await container.init(__webpack_share_scopes__.default);
  remoteMap[remoteName] = true;
  return container;
}

export function loadRemoteEntry(remoteEntry, remoteName) {
  return new Promise((resolve, reject) => {
    if (moduleMap[remoteEntry]) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = remoteEntry;
    script.onerror = reject;

    script.onload = () => {
      initRemote(remoteName);
      moduleMap[remoteEntry] = true;
      resolve();
    };

    document.body.appendChild(script);
  });
}

export async function loadRemoteModule(options) {
  if (options.remoteEntry)
    await loadRemoteEntry(options.remoteEntry, options.remoteName);
  return await lookupExposedModule(options.remoteName, options.exposedModule);
}
