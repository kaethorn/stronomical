import { InjectionToken } from '@angular/core';

export const WINDOW_TOKEN = new InjectionToken<Window>('Window');

// eslint-disable-next-line no-undef
export const WindowProvider = { provide: WINDOW_TOKEN, useFactory: (): Window => window };
