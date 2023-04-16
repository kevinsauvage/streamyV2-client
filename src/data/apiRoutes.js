import config from '../config';

const apiRoutes = {
  auth: `${config.serverUrl}auth`,
  comment: `${config.serverUrl}comments`,
  users: `${config.serverUrl}users`,
};
export default apiRoutes;
