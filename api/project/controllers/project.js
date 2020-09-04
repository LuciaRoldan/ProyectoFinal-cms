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
  createAuthor: async (ctx) => {
    const author = await strapi
      .query("author")
      .find({ _id: ctx.request.body.author_id });

    return strapi
      .query("project")
      .update(
        { _id: ctx.params.project_id },
        { authors: project.authors.concat(author) }
      );
  },
  createSupervisor: async (ctx) => {
    const supervisor = await strapi
      .query("supervisor")
      .find({ _id: ctx.request.body.supervisor_id });

    return strapi
      .query("project")
      .update(
        { _id: ctx.params.project_id },
        { authors: project.supervisors.concat(supervisor) }
      );
  },
  deleteAuthor: async (ctx) => {
    return strapi
      .query("project")
      .update(
        { _id: ctx.params.project_id },
        { authors: project.authors.filter((a) => a.id != ctx.params.author_id) }
      );
  },
  deleteSupervisor: async (ctx) => {
    return strapi
      .query("project")
      .update(
        { _id: ctx.params.project_id },
        {
          supervisor_id: project.supervisors.filter(
            (s) => s.id != ctx.params.supervisor_id
          ),
        }
      );
  },
};
