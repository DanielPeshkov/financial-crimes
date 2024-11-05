import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAuth0 } from '@auth0/auth0-angular';

bootstrapApplication(AppComponent, 
                    {...appConfig, 
                    providers: 
                      [
                        ...appConfig.providers,
                        provideAuth0({
                        domain: 'dev-d7ewcj6c3dzdr2rk.us.auth0.com',
                        clientId: '6FGfYcex7z6rAJHm8z8HcU3cndeHnVHf',
                        
                        authorizationParams: {
                          redirect_uri: window.location.origin
                        }
                      })
                    ]
                  })
  .catch((err) => console.error(err));
