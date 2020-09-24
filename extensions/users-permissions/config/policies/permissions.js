module.exports = async (ctx, next) => {
  const apiKey = ctx.header["medusa-api-key"];
  const tokens = strapi.config.get("server.authorizationTokens");

  if (apiKey && tokens.includes(apiKey)) {
    return next();
  } else {
    ctx.throw(401, "Invalid API key");
  }
};
