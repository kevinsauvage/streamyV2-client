import config from '../config';

const apiRoutes = {
  auth: `${config.serverUrl}auth`,
  users: `${config.serverUrl}users`,
};
export default apiRoutes;
