// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost:3000",
  fileurl: "http://localhost:3000",
  // apiUrl: "https://nodevg81.elb.cisinlive.com",
  // fileurl: "https://nodevg81.elb.cisinlive.com",
  socketapi: "wss://api.zaboreats.com:8000",
  GoogleMapApiKey: "AIzaSyAfxEnHzdr3k9Cglf3WpNgzP1XGqLNX4nI",
  stripe_key: "pk_test_lRz8873Lk5axb5QUnywYIfY900dpsCQsO2"
};

export const tosterOptions = {
  timeOut: 2000,
  closeButton: true,
  tapToDismiss: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
