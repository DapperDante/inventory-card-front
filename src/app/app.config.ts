import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import MyPreset from '../mypreset';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { backendInterceptor } from './interceptor/backend.interceptor';
import { errorHandleInterceptor } from './interceptor/error-handle.interceptor';
import { CookieHandleService } from './service/cookie-handle.service';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: false
        }
      }
    }),
    provideHttpClient(
      withFetch(),
      withInterceptors([backendInterceptor, errorHandleInterceptor])
    ),
    MessageService,
    CookieHandleService,
    ConfirmationService,
    provideRouter(routes, withHashLocation()), provideClientHydration(withEventReplay()),
  ]
};
