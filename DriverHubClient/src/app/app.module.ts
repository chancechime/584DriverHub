// src/app/app.module.ts
import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
@NgModule({
  declarations: [],
  imports: [BrowserModule, RouterModule.forRoot(routes), OktaAuthModule],
  providers: [provideHttpClient(withFetch()), provideAnimationsAsync(), { provide: OKTA_CONFIG, useValue: OKTA_CONFIG}],
  bootstrap: []
})
export class AppModule {
  ngDoBootstrap(appRef: any) {
    appRef.bootstrap(AppComponent);
  }
}
