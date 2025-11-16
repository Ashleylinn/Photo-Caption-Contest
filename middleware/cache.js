const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // 60 seconds

function cacheMiddleware(req, res, next) {
  const key = req.originalUrl; // e.g., /api/images/2
  const cached = cache.get(key);

  // Return cached version if exists
  if (cached) {
    console.log("Serving from CACHE:", key);
    return res.json(cached);
  }

  const originalSend = res.send.bind(res);

  res.send = (body) => {
    try {
      const data = JSON.parse(body);  
      cache.set(key, data);
    } catch (e) {
      console.log("Not JSON, skipping cache.");
    }

    originalSend(body);
  };

  next();
}

module.exports = cacheMiddleware;
