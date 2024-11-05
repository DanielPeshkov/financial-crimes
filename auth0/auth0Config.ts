import { auth } from 'express-openid-connect';
import express from 'express';

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'E1Q2Ce5pxmaYXczJcbE-ps6W47zu4dCaxPC6jlQS4SHVcOeAY9k2ov1MevWkZs-h',
  baseURL: 'http://localhost:8080',
  clientID: 'nNYpXNJDRywctt9eNGewujDF245qIK1K',
  issuerBaseURL: 'https://dev-d7ewcj6c3dzdr2rk.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
