"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.google_user_id) {
        const googleId = data.google_user_id;
        const user = strapi
          .query("supervisor")
          .find({ google_user_id: googleId });

        if (user != null) {
          throw new Error(`Duplicate key google user id ${googleId}`);
        }
      }
    },
  },
};
