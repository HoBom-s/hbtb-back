const userComponents = {
  userAll: {
    get: {
      tags: ["User"],
      summary: "모든 유저 불러오기",
      responses: {
        200: {
          description: "유저 불러오기 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "array",
                example: [
                  {
                    _id: "User 의 고유 ID",
                    nickname: "User 의 로그인 아이디(닉네임)",
                    profileImg: "User 의 프로필 이미지(링크)",
                    role: "User 의 권한",
                    introduction: "User 의 한 줄 소개",
                  },
                ],
              },
            },
          },
        },
      },
    },
  },

  userCreate: {
    post: {
      tags: ["User"],
      summary: "새로운 유저 생성하기",
      parameters: [
        {
          in: "body",
          name: "User",
          required: true,
          description: "Create User 의 Request Body",
          schema: {
            properties: {
              _id: {
                type: "string",
              },
              nickname: {
                type: "string",
              },
              profileImg: {
                type: "string",
              },
              role: {
                type: "string",
              },
              introduction: {
                type: "string",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "유저 생성하기 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "object",
                example: {
                  _id: "User 의 고유 ID",
                  nickname: "User 의 로그인 아이디(닉네임)",
                  profileImg: "User 의 프로필 이미지(링크)",
                  role: "User 의 권한",
                  introduction: "User 의 한 줄 소개",
                },
              },
            },
          },
        },
      },
    },
  },
  userUpdate: {
    patch: {
      tags: ["User"],
      summary: "유저 수정하기",
      parameters: [
        {
          in: "body",
          name: "User",
          required: true,
          description: "Update User 의 Request Body",
          schema: {
            properties: {
              _id: {
                type: "string",
              },
              nickname: {
                type: "string",
              },
              profileImg: {
                type: "string",
              },
              role: {
                type: "string",
              },
              introduction: {
                type: "string",
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: "유저 수정하기 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "string",
                example: {
                  _id: "User 의 고유 ID",
                  nickname: "User 의 로그인 아이디(닉네임)",
                  profileImg: "User 의 프로필 이미지(링크)",
                  role: "User 의 권한",
                  introduction: "User 의 한 줄 소개",
                },
              },
            },
          },
        },
      },
    },
  },
  userDelete: {
    delete: {
      tags: ["User"],
      summary: "기존 유저 삭제하기",
      parameters: [
        {
          in: "path",
          name: "_id",
          required: true,
          description: "유저 삭제 성공",
          type: "string",
        },
      ],
      responses: {
        200: {
          description: "유저 삭제 성공",
        },
        content: {
          schema: {
            properties: {
              data: {
                type: "string",
                example: {
                  _id: "User의 고유 ID",
                },
              },
            },
          },
        },
      },
    },
  },
};

Object.freeze(userComponents);
export default userComponents;
