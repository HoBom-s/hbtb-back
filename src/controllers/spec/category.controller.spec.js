/* eslint-disable no-undef */

/**
 * jest와 supertest 라이브러리는 따로 import가 필요 없기 때문에
 * TestCode 환경에서는 no-undef ESLint 환경을 무시하도록 한다.
 *
 * Category의 GET / POST를 TEST
 */

import request from "supertest";
import app from "../../../app";
import dotenv from "dotenv";

dotenv.config();

/**
 * 모든 카테고리 정보를 가져오는 API Test
 *
 * 카테고리를 가져온 후 상태 코드는 200번 이어야만 한다.
 * 결과의 Body의 Length는 0보다 커야 한다.
 */
describe("GET /category", () => {
  it("Should return all categories", async () => {
    const res = await request(app).get("/category");
    const { statusCode, body } = res;
    expect(statusCode).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });
});

/**
 * 카테고리를 생성하는 API Test
 *
 * 새로운 카테고리를 생성하는 API
 */
describe.skip("POST /category/create", () => {
  it("Should create category", async () => {
    const res = await request(app).post("/category/create").send({
      title: "I'm category",
      path: "/im-category",
      sortIndex: 1,
      spot: "F",
    });
    const { statusCode, body } = res;
    expect(statusCode).toBe(200);
    expect(body.title).toBe("I'm category");
  });
});
