import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieModule } from './movies/movie.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { ErrorInterceptor } from './auth/interceptor/auth-error.interceptor';
import { AuthInterceptor } from './auth/interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MovieModule,
    AuthModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
      {
        provide : HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi   : true
      },
      {
        provide : HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi   : true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
