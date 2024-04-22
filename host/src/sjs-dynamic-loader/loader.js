const loadedModules = {};

export async function loadModule(scope, name, moduleName) {
  const container = await System.import(name);
  await __webpack_init_sharing__(scope);
  try {
    await container.init(__webpack_share_scopes__[scope]);
  } catch (e) {
    // already was initialized
  }
  const factory = await container.get(moduleName);
  const Module = factory();

  if (!loadedModules[scope])
    loadedModules[scope] = { [name]: { [moduleName]: Module } };
  else if (!loadedModules[scope][name])
    loadedModules[scope][name] = { [moduleName]: Module };
  else if (!loadedModules[scope][name][moduleName])
    loadedModules[scope][name][moduleName] = Module;

  return Module;
}

export function lookupLoadedModule(scope, name, moduleName) {
  return loadedModules?.[scope]?.[name]?.[moduleName];
}

export async function loadSystemJsRemoteModule(options) {
  const scope = options.scope ?? 'default';
  const existingModule = lookupLoadedModule(
    scope,
    options.name,
    options.moduleName
  );
  return (
    existingModule ??
    (await loadModule(scope, options.name, options.moduleName))
  );
}
