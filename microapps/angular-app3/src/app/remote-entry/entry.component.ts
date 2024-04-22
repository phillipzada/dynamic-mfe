import {
  ApplicationRef,
  Component,
  DoBootstrap,
  HostBinding,
  Injector,
  Input,
  OnInit,
  VERSION,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONFIGURATION } from './entry.tokens';

console.log('👋 Hello World from "Angular Entry Component"');

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'ng-mf-entry',
  styles: [
    `
    div {
      margin: 10px;
      padding: 10px;
      text-align: center;
      background-color: coral;
      border: none;
      border-radius: 4px;
    }
  `,
  ],
  template: `
    <div>
      <h1>Angular App 3: {{title}}</h1>
      <span>Angular Version: {{version}}</span><br/>
    </div>
  `,
})
export class RemoteEntryComponent implements OnInit {
  configuration: any = inject(CONFIGURATION);

  @HostBinding('attr.title') @Input() title: string | undefined;
  version = VERSION.full;

  ngOnInit(): void {
    const properties = this.configuration?.properties[0];
    if (properties.title) this.title = properties.title;
  }
}
