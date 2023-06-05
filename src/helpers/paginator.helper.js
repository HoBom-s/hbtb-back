/**
 * Pagination helper class
 */
class PaginatorHelper {
  constructor(perPage = 10, model) {
    // Pagination 을 몇 개 기준으로 보여줄 지...
    this.perPage = perPage;

    // Pagination이 적용 될 Model
    this.model = model;
  }

  /**
   * Pagintaion result
   *
   * @param {number} currentPage
   * @param {Object} options
   * @returns {Array}
   */
  async getDocumentsPerPage(
    currentPage,
    options = {
      whereTarget: "",
      whereCondition: "",
      sortTarget: "",
      sortCondition: "",
    }
  ) {
    const paginatedDocuments = (async () => {
      const { whereTarget, whereCondition, sortTarget, sortCondition } =
        options;
      if (whereTarget) {
        const result = await this.model
          .find({ [whereTarget]: whereCondition }, null, {
            sort: {
              [sortTarget]: sortCondition,
            },
          })
          .skip((currentPage - 1) * this.perPage)
          .limit(this.perPage)
          .exec();
        return result;
      } else {
        const result = await this.model
          .find({}, null, {
            sort: {
              [sortTarget]: sortCondition,
            },
          })
          .skip((currentPage - 1) * this.perPage)
          .limit(this.perPage)
          .exec();
        return result;
      }
    })();
    return paginatedDocuments;
  }
}

Object.freeze(PaginatorHelper);
export default PaginatorHelper;
