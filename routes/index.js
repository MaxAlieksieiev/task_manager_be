const authRoutes = require('./auth.route');


// eslint-disable-next-line require-jsdoc
function init(server) {
  server.get('*', function(req, res, next) {
    console.log(
        `Request was made to: 
        '${req.originalUrl} with ${JSON.stringify(req.body)}`,
    );
    return next();
  });

  server.use('/api/auth', authRoutes);
}

module.exports = {
  init: init,
};
