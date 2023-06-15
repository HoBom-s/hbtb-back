import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import tagComponents from "./tags";
import categoryComponents from "./categories";
import articleComponents from "./articles";

const options = {
  swaggerDefinition: {
    info: {
      title: "HoBom Tech Blog API Documents",
      version: "1.0.0",
      description: "HoBom Tech Blog backEnd with Node Express",
    },
    host: "localhost:8081",
    /**
     * 각각의 Tag를 정의하여 API Component의 문서마다 Tags에 해당하는 카테고리를 지정
     * Tag Grouping 역할
     */
    tags: [
      {
        name: "Tag",
        description: "태그 관련 API",
      },
      {
        name: "Category",
        description: "카테고리 관련 API",
      },
      {
        name: "Article",
        description: "아티클 관련 API",
      },
    ],
    paths: {
      "/tag": tagComponents.tagAll,
      "/tag/create": tagComponents.tagCreate,
      "/tag/update": tagComponents.tagUpdate,
      "/tag/delete/:_id": tagComponents.tagDelete,
      "/category": categoryComponents.categoryAll,
      "/category/create": categoryComponents.categoryCreate,
      "/category/update": categoryComponents.categoryUpdate,
      "/category/:_id": categoryComponents.categoryDelete,
      "/user": articleComponents.articleAll,
      "/user/create": articleComponents.articleCreate,
      "/user/update": articleComponents.articleUpdate,
      "/user/delete": articleComponents.articleDelete,
    },
  },
  apis: ["../src/routes/*.js"],
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs };
