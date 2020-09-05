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
