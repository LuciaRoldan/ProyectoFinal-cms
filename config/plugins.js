module.exports = ({ env }) => ({
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: env("CLOUDINARY_NAME", process.env.cloud_name),
      api_key: env("CLOUDINARY_KEY", process.env.api_key),
      api_secret: env("CLOUDINARY_SECRET", process.env.api_secret),
    },
  },
});
