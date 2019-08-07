interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'NK7PvbJ0WXehSVlFQtA1oeBpMVL0x8XT',
  domain: 'danse-attitude.eu.auth0.com',
  //callbackURL: 'http://danse-attitude-costume.s3-website.us-east-2.amazonaws.com/callback'
  callbackURL:'http://localhost:4200/callback'
};
