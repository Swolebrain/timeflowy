import Auth0Lock from 'auth0-lock';

const APP_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:3001';

export default class AuthService {
  constructor(clientId, domain, authCallback) {
    // Configure Auth0
    this.authCallback = authCallback;
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: APP_URL ,
        responseType: 'token'
      }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken)
    // navigate to the home route
    //fetch user's todos from server
    //will need a redux action to hydrate todos
    //hit the authcallback at the end of the promise chain
    console.log(authResult);
    fetch(BACKEND_URL+'/load-todos',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify(authResult),
    }).then(res=>{
      console.log(res);
      return res.json();
    })
    .then(resContent=>{
      console.log(resContent);
      console.log("CALLING AUTH CALLBACK");
      this.authCallback();
    });
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
  }
}
