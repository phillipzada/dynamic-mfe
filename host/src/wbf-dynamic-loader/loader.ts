import 'regenerator-runtime/runtime';
import 'core-js/stable';

const moduleMap = {};
const remoteMap = {};
let isDefaultScopeInititalised = false;

async function lookupExposedModule<T>(
  remoteName: string,
  exposedModule: string
): Promise<T> {
  const container = window[remoteName] as Container;
  const factory = await container.get(exposedModule);
  const Module = factory();
  return Module as T;
}

async function initRemote(remoteName: string) {
  const container = window[remoteName] as Container;

  if (remoteMap[remoteName]) {
    return container;
  }

  if (!isDefaultScopeInititalised) {
    await __webpack_init_sharing__('default');
    isDefaultScopeInititalised = true;
  }
  console.log(__webpack_share_scopes__.default);
  await container.init(__webpack_share_scopes__.default);
  remoteMap[remoteName] = true;
  return container;
}

export type LoadRemoteModuleOptions = {
  remoteEntry?: string;
  remoteName: string;
  exposedModule: string;
};

export function loadRemoteEntry(
  remoteEntry: string,
  remoteName: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (moduleMap[remoteEntry]) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = remoteEntry;
    script.onerror = reject;

    console.log(script.type);

    script.onload = () => {
      initRemote(remoteName);
      moduleMap[remoteEntry] = true;
      resolve();
    };

    document.body.appendChild(script);
  });
}

export async function loadRemoteModule<T = any>(
  options: LoadRemoteModuleOptions
): Promise<T> {
  if (options.remoteEntry)
    await loadRemoteEntry(options.remoteEntry, options.remoteName);
  return await lookupExposedModule<T>(
    options.remoteName,
    options.exposedModule
  );
}
