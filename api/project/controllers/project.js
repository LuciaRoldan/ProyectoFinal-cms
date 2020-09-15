"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  createDocuments: async (ctx) => {
    if (ctx.request.body.items) {
      const items = ctx.request.body.items;

      const docs = await Promise.all(
        items.map((i) => strapi.query("documentation").create(i))
      );
      const project = await strapi
        .query("project")
        .findOne({ _id: ctx.params.id });

      return strapi
        .query("project")
        .update(
          { _id: ctx.params.id },
          { documentation: project.documentation.concat(docs) }
        );
    } else {
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
    }
  },
  deleteDocument: async (ctx) => {
    await strapi.query("documentation").delete({ id: ctx.params.document_id });

    const project = await strapi
      .query("project")
      .findOne({ id: ctx.params.project_id });

    return strapi.query("project").update(
      { id: ctx.params.project_id },
      {
        documentation: project.documentation.filter(
          (doc) => doc.id != ctx.params.document_id
        ),
      }
    );
  },
  deleteDocuments: async (ctx) => {
    const project = await strapi
      .query("project")
      .findOne({ id: ctx.params.project_id });

    const project = strapi.query("project").update(
      { _id: ctx.params.project_id },
      {
        documentation: project.documentation.filter(
          (d) => !ctx.request.body.items.some((it) => it == d.id)
        ),
      }
    );

    await strapi
      .query("documentation")
      .delete({ id_in: ctx.request.body.items });

    return project;
  },
  addAuthors: async (ctx) => {
    const authors = await strapi
      .query("author")
      .find({ id_in: ctx.request.body.items });
    const project = await strapi
      .query("project")
      .findOne({ id: ctx.params.project_id });

    return strapi
      .query("project")
      .update(
        { _id: ctx.params.project_id },
        { authors: project.authors.concat(authors) }
      );
  },
  addSupervisors: async (ctx) => {
    const supervisors = await strapi
      .query("supervisor")
      .find({ id_in: ctx.request.body.items });
    const project = await strapi
      .query("project")
      .findOne({ id: ctx.params.project_id });

    return strapi
      .query("project")
      .update(
        { _id: ctx.params.project_id },
        { supervisors: project.supervisors.concat(supervisors) }
      );
  },
  removeAuthors: async (ctx) => {
    const ids = ctx.request.query.items.split(",");
    const project = await strapi
      .query("project")
      .findOne({ id: ctx.params.project_id });

    return strapi.query("project").update(
      { _id: ctx.params.project_id },
      {
        authors: project.authors.filter((a) => !ids.some((it) => it == a.id)),
      }
    );
  },
  removeSupervisors: async (ctx) => {
    const ids = ctx.request.query.items.split(",");
    const project = await strapi
      .query("project")
      .findOne({ id: ctx.params.project_id });

    return strapi.query("project").update(
      { _id: ctx.params.project_id },
      {
        supervisors: project.supervisors.filter(
          (a) => !ids.some((it) => it == a.id)
        ),
      }
    );
  },
};
