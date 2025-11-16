const express = require('express');
const cookieSession = require('cookie-session');
const app = express();
const swaggerDocs = require('./swagger');

app.use(express.json());

app.use(cookieSession({
  name: 'session',
  keys: ['secretKey123'], 
  maxAge: 24 * 60 * 60 * 1000 
}));

// serve images
app.use('/images', express.static('images'));

// import routes
const authRoutes = require('./routes/auth.js');
const imageRoutes = require('./routes/images.js');

app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

swaggerDocs(app);

// start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
