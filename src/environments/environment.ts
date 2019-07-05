// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    config: {
      // This was taken as copy/paste from the firebase console when you create the application
      // for more details watch my tutorial
      apiKey: 'AIzxxxxxxxxxxxxx',
      authDomain: 'fixxx.firebaseapp.com',
      databaseURL: 'https://fir-projects-85a6b.firebaseio.com',
      projectId: 'xxxxxxx-xx',
      storageBucket: '',
      messagingSenderId: 'xxxxx',
      appId: '1:xxxxxxxxxxxx'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
