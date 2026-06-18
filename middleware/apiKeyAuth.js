const validApiKeys = (process.env.API_KEYS || '')
  .split(',')
  .map(k => k.trim());

function apiKeyAuth(req, res, next) {
  const providedKey = req.headers['x-api-key'];

  if (!providedKey || !validApiKeys.includes(providedKey)) {
    return res.status(401).json({
      error: 'Unauthorized: Invalid or missing API key'
    });
  }

  next();
}

module.exports = apiKeyAuth;
