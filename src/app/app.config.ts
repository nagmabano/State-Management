import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { appEffects, appStore } from '../store/store';
import { provideEffects } from '@ngrx/effects';
import { ToDoService } from '../store/service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideStore(appStore), provideEffects(appEffects), ToDoService]
};
