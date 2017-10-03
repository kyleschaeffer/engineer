const colors = require('colors');
const env = require('../env');
const request = require('request-promise');
const spauth = require('node-sp-auth');

console.log(`Connecting to ${env.site}...`.cyan);

spauth.getAuth(env.site, env).then((options) => {
  console.log('Connected!'.green);

  console.log(`Retrieiving webs from ${env.site}...`.cyan);

  const { headers } = options;
  headers.Accept = 'application/json;odata=verbose';
  request.get({
    url: `${env.site}/_api/web`,
    headers,
  }).then((response) => {
    const site = JSON.parse(response).d;
    console.log(`The site title is ${site.Title}.`);

    console.log('All done!'.cyan);
  });
});
