# MongoDB Collection Structure

MongoDB의 Collection에 해당하는 구조를 이 문서에 기록하도록 한다.

**Schema**의 구조에 변경이 생길 경우 반드시 문서를 업데이트 하도록 한다.

문서를 업데이트 한 경우 밑의 표에 표시된 문서 버전도 업데이트 하도록 한다.

> 최초 생성일: 23.05.08
>
> 수정일: 23.05.15

| 작성자       | 문서버전 |
| ------------ | -------- |
| Robin, Ethan | v 1.0.0  |

---

## 1. Tag Schema 정의

**Tag**의 경우 Article **`[게시글]`** 생성 시 해당 게시글에 붙게 될 태그를 정의하는 Schema 이다.

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
    path: {
        type: String,
        required: true,
        trim: true,
        default: "",
    },
    count: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}
```

## 2. Category Schema 정의

**Category**의 경우 Category **`[카테고리]`** 생성 시 카테고리를 정의하는 Schema 이다.

```js
{
    // category.schema.js
    // CategorySchema
    _id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: ture,
        trim: true,
        default: "",
        maxLength: 16,
    },
    path: {
        type: String,
        required: true,
        trim: true,
        default: "",
    },
    sortIndex: {
        type: Number,
        required: true,
        default: 1,
    },
    spot: {
        type: String,
        required: true,
        trim: true,
        default: "H",
        minLength: 1,
        maxLength: 1,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}
```
