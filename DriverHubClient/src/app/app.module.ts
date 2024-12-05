// src/app/app.module.ts
import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [],
  imports: [BrowserModule, RouterModule.forRoot(routes), AppComponent],
  providers: [provideHttpClient(withFetch()), provideAnimationsAsync()],
  bootstrap: []
})
export class AppModule {
  ngDoBootstrap(appRef: any) {
    appRef.bootstrap(AppComponent);
  }
}
