// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
   apiKey: "AIzaSyCGMPI4kn0pWaN2to9i8-OR4HmGysRRB98",
    authDomain: "porkeros-porkeras.firebaseapp.com",
    databaseURL: "https://porkeros-porkeras.firebaseio.com",
    projectId: "porkeros-porkeras",
    storageBucket: "porkeros-porkeras.appspot.com",
    messagingSenderId: "1001476931639"
  }
};
