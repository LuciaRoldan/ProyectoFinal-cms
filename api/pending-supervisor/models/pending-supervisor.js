"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    afterUpdate: async (model) => {
      console.log(model);
      if (model.approved) {
        const supervisor = {
          mail: model.mail,
          google_user_id: model.google_user_id,
          full_name: model.full_name,
          organizations: [model.organization.id],
        };

        await strapi.query("supervisor").create(supervisor);

        await strapi.plugins["email"].services.email.send({
          to: model.mail,
          from: "proyeception@gmail.com",
          subject: "Bienvenido a proyectate!",
          templateId: "d-f4c3e3cf666b4d9a8999a5b95dcb448a",
          dynamic_template_data: {
            name: model.full_name,
            organization: model.organization.display_name,
            login: strapi.config.get("server.supervisorLoginUrl"),
          },
        });

        strapi.query("pending-supervisor").delete({ id: model.id });
      }
    },
  },
};
