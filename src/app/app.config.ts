import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideAnimationsAsync(), provideFirebaseApp(() => initializeApp(
      {"projectId":"ng-firebase-my-notes","appId":"1:564622716172:web:1c71a4858f7db848452d29","storageBucket"
          :"ng-firebase-my-notes.appspot.com","apiKey":"AIzaSyCyztMs6KkVCfW40zuf49g45XWdatl4LcU","authDomain":"ng-firebase-" +
          "my-notes.firebaseapp.com","messagingSenderId":"564622716172"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())]
};
