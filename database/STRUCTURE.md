# MongoDB Collection Structure

MongoDB의 Collection에 해당하는 구조를 이 문서에 기록하도록 한다.

**Schema**의 구조에 변경이 생길 경우 반드시 문서를 업데이트 하도록 한다.

문서를 업데이트 한 경우 밑의 표에 표시된 문서 버전도 업데이트 하도록 한다.

> 최초 생성일: 23.05.08
>
> 수정일: 23.05.08

| 작성자       | 문서버전 |
| ------------ | -------- |
| Robin, Ethan | v 1.0.0  |

---

## 1. Tag Schema 정의

**Tag**의 경우 Article [게시글] 생성 시 해당 게시글에 붙게 될 태그를 정의하는 Schema 이다.

**검색**필터로 사용될 수도 있다.

```js
{
    // tag.schema.js
    // TagSchema
    _id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        default: "",
        maxLength: 24,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}
```
