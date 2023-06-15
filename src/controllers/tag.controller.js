import tagService from "../services/tag.service";

/**
 * Tag controller
 */
const tagController = {};

tagController.getAllTagRequest = async function (req, res, next) {
  try {
    const tags = await tagService.getAllTagRequest();
    res.status(200).send(tags);
  } catch (error) {
    next(error);
  }
};

tagController.createTagRequest = async function (req, res, next) {
  try {
    const { title, path } = req.body;
    const createdTag = await tagService.createTagRequest(title, path);
    return res.status(200).send(createdTag);
  } catch (error) {
    next(error);
  }
};

tagController.updateTagReqest = async function (req, res, next) {
  try {
    const { _id, title, path, count } = req.body;
    const updatedTag = await tagService.updateTagRequest(
      _id,
      title,
      path,
      count
    );
    res.status(200).send(updatedTag);
  } catch (error) {
    next(error);
  }
};

tagController.deleteTagRequest = async function (req, res, next) {
  try {
    const { _id } = req.params;
    const deletedTag = await tagService.deleteTagRequest(_id);
    if (!deletedTag) {
      return res.status(404).send({
        message: "Delete tag request controller fail",
      });
    }
    res.status(200).send(deletedTag);
  } catch (error) {
    next(error);
  }
};

Object.freeze(tagController);
export default tagController;
