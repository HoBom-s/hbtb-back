const tagComponents = {
  tagAll: {
    get: {
      tags: ["Tag"],
      summary: "모든 태그 불러오기",
      responses: {
        200: {
          description: "태그 불러오기 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "array",
                example: [
                  {
                    _id: "Tag 의 고유 ID",
                    title: "Tag 의 이름",
                    path: "Tag 클릭 시 이동될 Path 값",
                    count: "Tag 가 눌러졌을 때 증가할 Count 값",
                    createdAt: "Tag 생성 날짜",
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
  tagCreate: {
    post: {
      tags: ["Tag"],
      summary: "새롭게 작성된 태그 등록하기",
      responses: {
        200: {
          description: "태그 등록 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "object",
                example: {
                  _id: "Tag 의 고유 ID",
                  title: "Tag 의 이름",
                  path: "Tag 클릭 시 이동될 Path 값",
                  count: "Tag 가 눌러졌을 때 증가할 Count 값",
                  createdAt: "Tag 생성 날짜",
                },
              },
            },
          },
        },
      },
    },
  },
  tagUpdate: {
    patch: {
      tags: ["Tag"],
      summary: "작성된 태그 수정하기",
      responses: {
        200: {
          description: "태그 수정 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "object",
                example: {
                  _id: "Tag 의 고유 ID",
                  title: "Tag 의 이름",
                  path: "Tag 클릭 시 이동될 Path 값",
                  count: "Tag 가 눌러졌을 때 증가할 Count 값",
                },
              },
            },
          },
        },
      },
    },
  },
  tagDelete: {
    delete: {
      tags: ["Tag"],
      summary: "작성된 태그 삭제하기",
      parameters: [
        {
          in: "path",
          name: "_id",
          required: true,
          description: "Tag's UUID",
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "태그 삭제 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "object",
                example: {
                  _id: "Tag 의 고유 ID",
                },
              },
            },
          },
        },
      },
    },
  },
};

Object.freeze(tagComponents);
export default tagComponents;
