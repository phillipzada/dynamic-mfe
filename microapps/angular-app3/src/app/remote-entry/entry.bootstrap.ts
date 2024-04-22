import {
  bootstrapApplication,
  platformBrowser,
} from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { appConfig } from '../app.config';
import { RemoteEntryComponent } from './entry.component';
import { RemoteEntryModule } from './entry.module';
import { CONFIGURATION } from './entry.tokens';

// this allows for dynamic configuration
const mountComponent = async (configuration?: any) => {
  appConfig.providers.push([
    {
      provide: CONFIGURATION,
      useValue: configuration,
    },
  ]);
  const applicationRef = await bootstrapApplication(
    RemoteEntryComponent,
    appConfig
  );
  return applicationRef.components[0].instance;
};

// this allows for one time configuration
const mountModule = async (configuration?: any) => {
  const app = await platformBrowserDynamic([
    {
      provide: CONFIGURATION,
      useValue: configuration,
    },
  ]).bootstrapModule(RemoteEntryModule);
  return app.instance;
};

export default { mountComponent, mountModule };
