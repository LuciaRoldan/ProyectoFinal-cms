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
      .find({ _id: ctx.request.body.items.some((a) => _id == a) });

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
      .find({ _id: ctx.request.body.items.some((s) => _id == s) });

    return strapi
      .query("project")
      .update(
        { _id: ctx.params.project_id },
        { authors: project.supervisors.concat(supervisors) }
      );
  },
  removeAuthors: async (ctx) => {
    const ids = request.query.items.split(",");
    return strapi.query("project").update(
      { _id: ctx.params.project_id },
      {
        authors: project.authors.filter((a) => ids.some((it) => it == a.id)),
      }
    );
  },
  removeSupervisors: async (ctx) => {
    const ids = request.query.items.split(",");

    return strapi.query("project").update(
      { _id: ctx.params.project_id },
      {
        supervisor_id: project.supervisors.filter((s) =>
          ids.some((it) => it == s.id)
        ),
      }
    );
  },
};
