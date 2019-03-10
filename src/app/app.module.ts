import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieModule } from './movies/movie.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/interceptor/auth.interceptor';
import { ErrorModule } from './error/error.module';
import { GlobalErrorHandler } from './error/handler/global-error-handler';
import { CryptoModule } from './crypto/crypto.module';
import { ErrorInterceptor } from './error/error.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MovieModule,
    CryptoModule,
    AuthModule,
    ErrorModule,
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
      },
      {
        provide: ErrorHandler,
        useClass: GlobalErrorHandler
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
