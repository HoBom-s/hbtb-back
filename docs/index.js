import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    info: {
      title: "HoBom Tech Blog API Documents",
      version: "1.0.0",
      description: "HoBom Tech Blog backEnd with Node Express",
    },
    host: "localhost:8081",
    tags: [
      {
        name: "tag",
        description: "게시글 태그관련 API",
      },
    ],
    paths: {
      "/tag": {
        get: {
          tags: ["tag"],
          summary: "모든 태그 불러오기",
          responses: {
            200: {
              description: "태그 불러오기 성공",
            },
          },
        },
      },

      "/tag/create": {
        post: {
          tags: ["tag"],
          summary: "새롭게 작성된 태그 등록하기",
          parameters: [
            {
              in: "body",
              name: "title",
              description: "태그 이름",
              required: true,
              type: "string",
            },
            {
              in: "body",
              name: "path",
              description: "url용 태그 영문 경로",
              required: true,
              type: "string",
            },
          ],
          responses: {
            200: {
              description: "태그 등록 성공",
            },
          },
        },
      },
    },
  },
  apis: ["../src/routes/*.js"],
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs };
