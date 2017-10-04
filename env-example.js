/**
 * Deployment environment configuration: create a copy of this file called
 * env.js to enable SharePoint deployments; visit
 * https://github.com/s-KaiNet/spsave#credentials for more information on the
 * various configuration options available in spsave and node-sp-auth
 */
module.exports = {
  site: 'https://contoso.sharepoint.com',
  auth: {
    username: 'you@contoso.com',
    password: 'password',
  },
};
