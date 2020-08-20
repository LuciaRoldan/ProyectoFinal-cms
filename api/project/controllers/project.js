"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  createDocument: async (ctx) => {
    const doc = await strapi.query("documentation").create(ctx.request.body);
    const project = await strapi
      .query("project")
      .findOne({ _id: ctx.params.id });

    return strapi
      .query("project")
      .update(
        { _id: ctx.params.id },
        { documentation: project.documentation.concat(doc) }
      );
  },
};
