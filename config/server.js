module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "78307570ce3d36d5e07fb82bbc8e79ec"),
    },
  },
  supervisorLoginUrl: env(
    "SUPERVISOR_LOGIN_URL",
    "${process.env.SUPERVISOR_LOGIN_URL}"
  ),
  authorizationTokens: env.array(
    "AUTHORIZATION_TOKENS",
    "${process.env.AUTHORIZATION_TOKENS}"
  ),
});
