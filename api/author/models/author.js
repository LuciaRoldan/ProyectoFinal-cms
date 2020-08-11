"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(data) {
      strapi.query("author-ref").create({
        username: data.username,
        full_name: data.full_name,
        profile_url: `users/${data.id}`,
        user_id: data.id,
      });
    },
  },
};
