module.exports = {
  apps : [{
    name      : 'covid-tracker-dashboard', // App name that shows in `pm2 ls`
    exec_mode : 'cluster', // enables clustering
    instances : '2',
    cwd       : '/home/gunnar/covid-tracker-dashboard/current-build', // only if using a subdirectory
    script: './node_modules/nuxt-start/bin/nuxt-start.js',
    watch: true,
  }],
};
