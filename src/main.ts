import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Import the appConfig
import { AppComponent } from './app/app.component';
import { PusherService } from './app/shared/services/pusher/pusher.service';
// import { PusherService } from './app/services/pusher/pusher.service';

bootstrapApplication(AppComponent, {
  providers: [
    PusherService,
    ...appConfig.providers  // Spread the providers array from appConfig
  ]
})
  .catch((err) => console.error(err));
