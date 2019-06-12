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
import { HomeComponent } from './home/home.component';
import { DietModule } from './diet/diet.module';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { FlashcardModule } from './flashcard/flashcard.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MovieModule,
    DietModule,
    FlashcardModule,
    CryptoModule,
    AuthModule,
    ErrorModule,
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
      },
      {
        provide: ErrorHandler,
        useClass: GlobalErrorHandler
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
