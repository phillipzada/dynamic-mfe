import { Component, DoBootstrap, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements DoBootstrap, OnInit {
  title = 'angular-app3';

  ngDoBootstrap() {
    console.warn('TEST');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
