module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    /*{
      name      : 'Data Oauth',
      script    : './dist/server.js',
      env: {
        NODE_ENV: 'production'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },*/

    // Second application
    {
      name      : 'API Data OAuth',
      script    : './dist/server.js',
      env: {
        NODE_ENV: 'product'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env product'
    },
    dev : {
      user : 'node',
      host : '13.250.129.169',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'development'
      }
    }
  }
};
