import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'chatty-root',
  template: `<chatty-nx-welcome></chatty-nx-welcome>
    <router-outlet></router-outlet>`,
  styles: ``,
})
export class AppComponent {
  title = 'chatty-frontend';
}
