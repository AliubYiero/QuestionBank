###  接口说明

接口基准地址：`http://127.0.0.1:8888/`

### 通用返回状态说明

| *状态码* | *含义* | *说明*                 |
| -------- | ------ | ---------------------- |
| 200      | OK     | 请求成功               |
| 1001     | ERROR  | 缺少用户名或密码       |
| 1002     | ERROR  | 注册时用户名已存在     |
| 1003     | ERROR  | 登录时用户名或密码错误 |
| 1004     | ERROR  | 未找到相关题目         |

### 接口文档

#### 登录验证接口

- 请求路径：login
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |

- 响应参数

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| user_id   | 用户 ID  |      |
| username  | 用户名   |      |
| rights    | 权限名   |      |
| telephone | 手机号   |      |
| email     | 邮箱号   |      |

- 响应数据

```json
{
    "data": {
        "user_id": "F_cKtuYNP8",
        "username": "lei",
        "rights": "普通用户",
        "telephone": "null",
        "email": "null"
    },
    "status": 200,
    "statusText": "success",
    "msg": "登录成功"
}
```

#### 注册接口

- 请求路径：register
- 请求方法：post
- 请求参数

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
| username  | 用户名   | 不能为空 |
| password  | 密码     | 不能为空 |
| telephone | 手机号   | 可以为空 |
| email     | 邮箱号   | 可以为空 |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| 无     |          |      |

- 响应数据

```json
{
    "data": {},
    "status": 200,
    "statusText": "success",
    "msg": "注册成功"
}
```

#### 获取题目接口

- 请求路径：getQuestions/:question_list_id
- 请求方法：get
- 请求参数

| 参数名           | 参数说明   | 备注                             |
| ---------------- | ---------- | -------------------------------- |
| question_list_id | 题目类型id | 不能为空，放在路径后，params参数 |

- 响应参数

| 参数名           | 参数说明                       | 备注 |
| ---------------- | ------------------------------ | ---- |
| question_id      | 题目id                         |      |
| content          | 题目                           |      |
| options          | 选项，用,分隔                  |      |
| question_list_id | 题目类型id                     |      |
| type             | 题目的类型，如单选，多选，判断 |      |

- 响应数据

```json
{
    "data": [
        {
            "question_id": 1,
            "content": "这题选什么（选A）？",
            "options": "选A,选B,选C,选D",
            "question_list_id": 1,
            "type": "单选"
        },
        {
            "question_id": 2,
            "content": "这题选什么（选B）？",
            "options": "选A,选B,选C,选D",
            "question_list_id": 1,
            "type": "单选"
        }
    ],
    "status": 200,
    "statusText": "success",
    "msg": "获取成功"
}
```

#### 提交所有答案接口

- 请求路径：checkAnswerAll
- 请求方法：post
- 说明：请求参数为一个数组，每个数组中存一个对象，每个对象中有question_id和answer两个字段
- 请求参数

| 参数名      | 参数说明 | 备注 |
| ----------- | -------- | ---- |
| question_id | 题目id   |      |
| answer      | 答案     |      |

- 说明：响应参数为一个数组，每个数组中存一个对象，每个对象中有question_id和isRight两个字段
- 响应参数

| 参数名      | 参数说明                          | 备注     |
| ----------- | --------------------------------- | -------- |
| question_id | 题目id                            | 不能为空 |
| isRight     | 是否正确，正确返回true，反之false | 不能为空 |

- 响应数据

```json
{
    "data": [
        {
            "question_id": 1,
            "isRight": true
        },
        {
            "question_id": 2,
            "isRight": false
        }
    ],
    "status": 200,
    "statusText": "success",
    "msg": "校验完成"
}
```



#### 提交单个答案接口

- 请求路径：checkAnswer
- 请求方法：post
- 说明：请求参数为一个对象，对象中有question_id和answer两个字段
- 请求参数

| 参数名      | 参数说明 | 备注     |
| ----------- | -------- | -------- |
| question_id | 题目id   | 不能为空 |
| answer      | 答案     | 不能为空 |

- 说明：响应参数为一个对象，对象中有question_id和isRight两个字段
- 响应参数

| 参数名      | 参数说明                          | 备注 |
| ----------- | --------------------------------- | ---- |
| question_id | 题目id                            |      |
| isRight     | 是否正确，正确返回true，反之false |      |

- 响应数据

  ```json
  {
      "data": {
          "question_id": 1,
          "isRight": true
      },
      "status": 200,
      "statusText": "success",
      "msg": "校验完成"
  }
  ```

  

#### 获取所有的questionListId和name

- 请求路径：getQuestionListType
- 请求方法：get
- 请求参数：无
- 响应参数：数组，每个数组包含questionListId和questionListName

| 参数名             | 参数说明 | 备注 |
| ------------------ | -------- | ---- |
| question_list_id   | 题目集id |      |
| question_list_name | 题目集名 |      |

- 响应数据

```json
{
    "data": [
        {
            "question_list_id": 1,
            "question_list_name": "测试"
        },
        {
            "question_list_id": 2,
            "question_list_name": "测试2"
        }
    ],
    "status": 200,
    "statusText": "success",
    "msg": "获取题目集成功"
}
```

