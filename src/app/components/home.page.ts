import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="d-flex justify-content-center align-items-center">
      <h1 class="text-center">CMR realizzato da Sergio Di Pinto</h1>
    </div>
  `,
  styles: [
    `
      .d-flex {
        height: 100vh;
        background: url('https://images.unsplash.com/photo-1525935944571-4e99237764c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80');
        background-position: center;
        background-size: cover;
        color: #5b56a7;
        font-weight: bold
      }
    `,
  ],
})
export class HomePage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
