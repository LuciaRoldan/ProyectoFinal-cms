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
        };

        await strapi.query("supervisor").create(supervisor);

        // TODO: make this work and send the email
        // await strapi.plugins["email"].services.email.send({
        //   to: model.mail,
        //   from: "admin@strapi.io",
        //   subject: "Mirate ese mail papurri",
        //   text: `Qué onda perro`,
        // });

        strapi.query("pending-supervisor").delete({ id: model.id });
      }
    },
  },
};
