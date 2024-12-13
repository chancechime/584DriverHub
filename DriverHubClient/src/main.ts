import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAuth0 } from '@auth0/auth0-angular';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  bootstrapApplication(AppComponent, {
    providers: [
      provideAuth0({
        domain: 'dev-0yh8as4qgvrzk58a.us.auth0.com',
        clientId: 'LJtegSV8G9wQL6XzKJpxtJZoMbm1RFJi',
        authorizationParams: {
          redirect_uri: window.location.origin
        }
      }),
    ]
  });