const categoryComponents = {
  categoryAll: {
    get: {
      tags: ["Category"],
      summary: "모든 카테고리 불러오기",
      responses: {
        200: {
          description: "카테고리 불러오기 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "array",
                example: [
                  {
                    _id: "Category 의 고유 ID",
                    title: "Category 의 이름",
                    path: "Category 클릭 시 이동될 Path 값",
                    sortIndex: "Category 의 정렬 우선순위 값",
                    spot: "Category 가 위치할 기준 값",
                    createdAt: "Category 생성 날짜",
                    updatedAt: "Category 수정 날짜",
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
  categoryCreate: {
    post: {
      tags: ["Category"],
      summary: "새로운 카테고리 생성하기",
      parameters: [
        {
          in: "body",
          name: "Category",
          required: true,
          description: "Create Category 의 Request Body",
          schema: {
            properties: {
              _id: {
                type: "string",
              },
              title: {
                type: "string",
              },
              path: {
                type: "string",
              },
              count: {
                type: "integer",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "카테고리 생성하기 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "object",
                example: {
                  _id: "Category 의 고유 ID",
                  title: "Category 의 이름",
                  path: "Category 클릭 시 이동될 Path 값",
                  sortIndex: "Category 의 정렬 우선순위 값",
                  spot: "Category 가 위치할 기준 값",
                  createdAt: "Category 생성 날짜",
                  updatedAt: "Category 수정 날짜",
                },
              },
            },
          },
        },
      },
    },
  },
  categoryUpdate: {
    patch: {
      tags: ["Category"],
      summary: "카테고리 수정하기",
      parameters: [
        {
          in: "body",
          name: "Category",
          required: true,
          description: "Update Category 의 Request Body",
          schema: {
            properties: {
              _id: {
                type: "string",
              },
              title: {
                type: "string",
              },
              path: {
                type: "string",
              },
              sortIndex: {
                type: "integer",
              },
              spot: {
                type: "string",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "카테고리 수정하기 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "string",
                example: {
                  _id: "Category 의 고유 ID",
                  title: "Category 의 이름",
                  path: "Category 클릭 시 이동될 Path 값",
                  sortIndex: "Category 의 정렬 우선순위 값",
                  spot: "Category 가 위치할 기준 값",
                  updatedAt: "Category 수정 날짜",
                },
              },
            },
          },
        },
      },
    },
  },
  categoryDelete: {
    delete: {
      tags: ["Category"],
      summary: "작성된 카테고리 삭제하기",
      parameters: [
        {
          in: "path",
          name: "_id",
          required: true,
          description: "Category UUID",
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "카테고리 삭제 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "string",
                example: {
                  _id: "Category 의 고유 ID",
                },
              },
            },
          },
        },
      },
    },
  },
};

Object.freeze(categoryComponents);
export default categoryComponents;
