const articleComponents = {
  articleAll: {
    get: {
      tags: ["Article"],
      summary: "모든 아티클 불러오기",
      responses: {
        200: {
          description: "아티클 불러오기 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "array",
                example: [
                  {
                    _id: "Article 의 고유 ID",
                    thumbnail: "Article 의 썸네일 이미지",
                    title: "Article 의 제목",
                    subtitle: "Article 제목 하단에 들어가는 설명문",
                    contents: "Article 의 본 내용",
                    tags: "Article 의 태그",
                    writers: "Article 의 글 작성자",
                    path: "Article 클릭 시 이동될 Path 값(url)",
                    createdAt: "Article 생성 날짜",
                    updatedAt: "Article 수정 날짜",
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
  articleCreate: {
    post: {
      tags: ["Article"],
      summary: "새로운 아티클 생성하기",
      parameters: [
        {
          in: "body",
          name: "Article",
          required: true,
          description: "Create Article의 Request Body",
          schema: {
            properties: {
              _id: {
                type: "string",
              },
              thumbnail: {
                type: "string",
              },
              title: {
                type: "string",
              },
              subtitle: {
                type: "string",
              },
              contents: {
                type: "string",
              },
              tags: {
                type: "array",
              },
              writers: {
                type: "array",
              },
              path: {
                type: "string",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "아티클 등록 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "object",
                example: {
                  _id: "Article 의 고유 ID",
                  thumbnail: "Article 의 썸네일 이미지",
                  title: "Article 의 제목",
                  subtitle: "Article 제목 하단에 들어가는 설명문",
                  contents: "Article 의 본 내용",
                  tags: "Article 의 태그",
                  writers: "Article 의 글 작성자",
                  path: "Article 클릭 시 이동될 Path 값(url)",
                  createdAt: "Article 생성 날짜",
                  updatedAt: "Article 수정 날짜",
                },
              },
            },
          },
        },
      },
    },
  },

  articleUpdate: {
    patch: {
      tags: ["Article"],
      summary: "작성된 아티클 수정하기",
      // ? update의 parameters required: true?
      parameters: [
        {
          in: "body",
          name: "Article",
          required: true,
          description: "Update Article 의 Request Body",
          schema: {
            properties: {
              _id: {
                type: "string",
              },
              thumbnail: {
                type: "string",
              },
              title: {
                type: "string",
              },
              subtitle: {
                type: "string",
              },
              contents: {
                type: "string",
              },
              tags: {
                type: "array",
              },
              writers: {
                type: "array",
              },
              path: {
                type: "string",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "아티클 수정하기 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "string",
                example: {
                  _id: "Article 의 고유 ID",
                  thumbnail: "Article 의 썸네일 이미지",
                  title: "Article 의 제목",
                  subtitle: "Article 제목 하단에 들어가는 설명문",
                  contents: "Article 의 본 내용",
                  tags: "Article 의 태그",
                  writers: "Article 의 글 작성자",
                  path: "Article 클릭 시 이동될 Path 값(url)",
                  createdAt: "Article 생성 날짜",
                  updatedAt: "Article 수정 날짜",
                },
              },
            },
          },
        },
      },
    },
  },
  articleDelete: {
    delete: {
      tags: ["Article"],
      summary: "작성된 아티클 삭제하기",
      parameters: [
        {
          in: "path",
          name: "_id",
          required: true,
          description: "Article's UUID",
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "아티클 삭제 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "object",
                example: {
                  _id: "Article 의 고유 ID",
                },
              },
            },
          },
        },
      },
    },
  },
};

Object.freeze(articleComponents);
export default articleComponents;
