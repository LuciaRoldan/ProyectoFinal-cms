"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterFindOne(result, params, populate) {
      strapi
        .query("project")
        .update({ _id: result.id }, { views: result.views + 1 });
    },
  },
};
