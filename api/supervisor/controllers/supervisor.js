"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  leaveOrganization: async (ctx) => {
    const user = await strapi
      .query("supervisor")
      .findOne({ id: ctx.params.supervisor_id });

    return strapi.query("supervisor").update(
      { id: user.id },
      {
        organizations: user.organizations.filter(
          (o) => o.id != ctx.params.organization_id
        ),
      }
    );
  },
};
