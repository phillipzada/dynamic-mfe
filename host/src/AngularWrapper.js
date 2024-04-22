import React, { useState, useEffect } from 'react';
import { loadRemoteModule } from './wbf-dynamic-loader/loader';

const getModule = async () => {
  const component = await loadRemoteModule({
    remoteEntry: 'http://localhost:4200/remoteEntry.js',
    remoteName: 'angular_app3',
    exposedModule: './Entry',
  });
  return component;
};

const RemoteAppAngular = async (title) => {
  const component = await getModule();
  const instance = await component.default.bootstrapComponent({
    properties: [
      {
        title: title,
      },
    ],
  });
};

const AngularWrapper = () => {
  useEffect(async () => {
    await RemoteAppAngular('Dynamic Module Federation (Component)');
  }, []);

  return <ng-mf-entry></ng-mf-entry>;
};

export default AngularWrapper;
