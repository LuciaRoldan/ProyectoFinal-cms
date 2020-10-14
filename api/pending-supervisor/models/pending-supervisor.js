"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    afterUpdate: async (model) => {
      if (model.approved) {
        const supervisor = {
          mail: model.mail,
          google_user_id: model.google_user_id,
          full_name: model.full_name,
          organizations: [model.organization.id],
          profile_pic: model.profile_pic
        };
        console.log(
          `Approved user ${supervisor.mail}. Creating and sending email.`
        );

        await strapi.query("supervisor").create(supervisor);

        console.log("Supervisor created correctly");

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

        console.log(`Email for ${supervisor.mail} sent correctly`);

        strapi.query("pending-supervisor").delete({ id: model.id });
      }
    },
  },
};
