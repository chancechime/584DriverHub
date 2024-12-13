import { domain, clientId } from '../../auth_config.json';

export const environment = {
  baseUrl: 'http://localhost:5270',
  production: false,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
  },
};
