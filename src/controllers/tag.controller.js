import tagService from "../services/tag.service";
import APIErrorHandler from "../helpers/error.helper";

/**
 * Tag controller
 */
const tagController = {};

tagController.getAllTagRequest = async function (req, res) {
  try {
    const tags = await tagService.getAllTagRequest();
    res.status(200).send(tags);
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Get all tag request controller fail with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    res.status(status).send({
      message: msg,
    });
  }
};

tagController.createTagRequest = async function (req, res) {
  try {
    const { title } = req.body;
    const createdTag = await tagService.createTagRequest(title);
    res.status(200).send(createdTag);
  } catch (error) {
    const apiError = new APIErrorHandler(
      `Create tag request controller fail with ${error.message}`,
      error.status
    );
    const { status, msg } = apiError;
    res.status(status).send({
      message: msg,
    });
  }
};

Object.freeze(tagController);
export default tagController;
