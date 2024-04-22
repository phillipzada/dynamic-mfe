import {
  APP_INITIALIZER,
  ApplicationRef,
  DoBootstrap,
  Injector,
  NgModule,
  inject,
} from '@angular/core';
import { RemoteEntryComponent } from './entry.component';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { CONFIGURATION } from './entry.tokens';

function initializeApp(configuration?: any) {
  return () => {
    return new Promise<void>((resolve, reject) => {
      // Do some asynchronous stuff
      console.log('INIT', configuration?.properties[0]);
      resolve();
    });
  };
}

@NgModule({
  declarations: [],
  imports: [BrowserModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (configuration: any) => initializeApp(configuration),
      deps: [CONFIGURATION],
      multi: true,
    },
  ],
})
export class RemoteEntryModule implements DoBootstrap {
  injector = inject(Injector);
  configuration: any = inject(CONFIGURATION);

  ngDoBootstrap(appRef: ApplicationRef): void {
    const rootElement = 'angular-remote-entry-app-root';

    if (!customElements.get(rootElement)) {
      const entryApp = createCustomElement(RemoteEntryComponent, {
        injector: this.injector,
      });

      customElements.define(rootElement, entryApp);
    }
  }
}
