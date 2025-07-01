import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import MyPreset from '../mypreset';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { backendInterceptor } from './interceptor/backend.interceptor';
import { errorHandleInterceptor } from './interceptor/error-handle.interceptor';
import { CookieHandleService } from './service/cookie-handle.service';

export const appConfig: ApplicationConfig = {
  providers: [
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
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
  ]
};
