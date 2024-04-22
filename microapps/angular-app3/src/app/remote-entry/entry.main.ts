const bootstrap = import('./entry.bootstrap');

const bootstrapComponent = async (configuration?: any) => {
  const mod = bootstrap
    .then((e) => {
      return e.default.mountComponent(configuration);
    })
    .catch((err) => {
      debugger;
      console.error(err);
    });
  return mod;
};

const bootstrapModule = async (configuration?: any) => {
  const mod = bootstrap
    .then((e) => {
      return e.default.mountModule(configuration);
    })
    .catch((err) => {
      debugger;
      console.error(err);
    });
  return mod;
};

export default { bootstrapComponent, bootstrapModule };
