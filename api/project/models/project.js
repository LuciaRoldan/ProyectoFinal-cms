"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

function createProjectRef(data) {
  return strapi
    .query("project-ref")
    .create({ project_id: data.id, project_name: data.title });
}

function addProjectToUser(authorRef, projectRef) {
  return strapi
    .query("author")
    .find({ id: authorRef.user_id })
    .then((author) =>
      strapi.query("author").update(
        { id: authorRef.user_id },
        {
          project_refs: (author.project_refs ? author.project_refs : []).concat(
            projectRef
          ),
        }
      )
    )
    .catch(console.error);
}

function findProjectRef(projectId) {
  return strapi.query("project-ref").find({ project_id: projectId });
}

module.exports = {
  lifecycles: {
    async beforeUpdate(data, params) {
      const docs = await Promise.all(
        params.documentation.map((d) =>
          strapi.query("documentation").create({
            file_name: d.file_name,
            drive_id: d.drive_id,
            content: d.content,
          })
        )
      );

      console.log(docs);
      const [documentation, author_refs, supervisor_refs, tags] = await strapi
        .query("project")
        .findOne({ _id: data._id })
        .then((project) => [
          project.documentation,
          project.author_refs,
          project.supervisor_refs,
          project.tags,
        ])
        .catch(console.error);

      params.documentation = documentation.concat(docs ? docs : []);
      params.author_refs = author_refs.concat(
        params.author_refs ? params.author_refs : []
      );
      params.supervisor_refs = supervisor_refs.concat(
        params.supervisor_refs ? params.supervisor_refs : []
      );
      params.tags = tags.concat(params.tags ? params.tags : []);
      console.log(params);
    },
    async afterCreate(data) {
      createProjectRef(data)
        .then((ref) =>
          Promise.all(data.author_refs.map((a) => addProjectToUser(a, ref)))
        )
        .catch(console.error);
    },
    async afterUpdate(data) {
      findProjectRef(data.id)
        .then((ref) =>
          Promise.all(data.author_refs.map((a) => addProjectToUser(a, ref)))
        )
        .catch(console.error);
    },
  },
};
