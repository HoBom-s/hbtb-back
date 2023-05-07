import tagService from "../services/tag.service";

const tagController = {
  createTagRequest: async function (req, res) {
    const { title } = req.body;
    const createdTag = await tagService.createTagRequest(title);
    if (createdTag?.error) {
      const { status, msg } = createdTag.error;
      return res.status(status).send({
        message: msg,
      });
    }
    res.status(200).send(createdTag);
  },
};

Object.freeze(tagController);
export default tagController;
