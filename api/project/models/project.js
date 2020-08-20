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
