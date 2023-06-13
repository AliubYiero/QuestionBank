const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const { nanoid } = require( 'nanoid' )
const db = require( 'mysql' )
const cors = require( 'cors' )
const bcrypt = require( 'bcryptjs' )
const connection = db.createConnection( {
  host: 'localhost',
  user: 'root',
  password: '9512635748',
  database: 'questionnaire'
} )
const app = express()
app.use( cors() )
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: false } ) )
app.listen( 8888, () => {
  console.log( "questionStarServer running on 127.0.0.1:8888" );
} )
// 登录
app.post( '/login', ( req, res ) => {
  let username = req.body.username
  let password = req.body.password
  if ( !( username && password ) ) {
    res.send( {
      data: {},
      status: 1001,
      statusText: 'ERROR',
      msg: '缺少用户名或密码'
    } )
    return
  }
  loginSqlStr = `select * from user where username = '${username}'`
  connection.query( loginSqlStr, ( err, result ) => {
    if ( !result[0] || !bcrypt.compareSync( password, result[0].password ) ) {
      res.send( {
        data: {},
        status: 1003,
        statusText: 'ERROR',
        msg: '用户名或密码错误'
      } )
      return
    }
    if ( bcrypt.compareSync( password, result[0].password ) ) {
      res.send( {
        data: {
          user_id: result[0].user_id,
          username: result[0].username,
          rights: result[0].rights,
          telephone: result[0].telephone,
          email: result[0].email
        },
        status: 200,
        statusText: 'success',
        msg: '登录成功'
      } )
      console.log( `用户${ result[0].username }登录` );
    }
  } )
} )
// 注册
app.post( '/register', ( req, res ) => {
  let username = req.body.username
  let password = req.body.password
  let rights = '普通用户'
  let telephone = req.body.telephone || null
  let email = req.body.email || null
  if ( !( username && password ) ) {
    res.send( {
      data: {},
      status: 1001,
      statusText: 'ERROR',
      msg: '缺少用户名或密码'
    } )
    return
  }
  let user_id = nanoid( 10 )
  selectSqlStr = `select * from user where username = '${username}'`
  connection.query( selectSqlStr, ( err, result ) => {
    if ( result.length ) {
      res.send( {
        data: {},
        status: 1002,
        statusText: 'ERROR',
        msg: '该用户名已存在'
      } )
    } else {
      // 加密密码
      password = bcrypt.hashSync( password )
      registerSqlStr = `insert into user values('${user_id}','${username}','${password}','${rights}','${telephone}','${email}')`
      connection.query( registerSqlStr, ( err, result, fields ) => {
        if ( result.affectedRows > 0 ) {
          console.log( `用户${ username }注册成功` );
          res.send( {
            data: {},
            status: 200,
            statusText: 'success',
            msg: '注册成功'
          } )
        }
      } )
    }
  } )
} )
// 获取题目
app.get( '/getQuestions/:question_list_id', ( req, res ) => {
  let question_list_id = req.params.question_list_id
  let getQuestionsSQLStr = `select * from question where question_list_id = ${question_list_id}`
  connection.query( getQuestionsSQLStr, ( err, result ) => {
    // 去除所有答案
    result.forEach( item => {
      item.answer = undefined
    } )
    if ( result.length == 0 ) {
      res.send( {
        data: {},
        status: 1004,
        statusText: 'ERROR',
        msg: '未找到相关题目'
      } )
      return
    }
    res.send( {
      data: result,
      status: 200,
      statusText: 'success',
      msg: '获取成功'
    } )
  } )
} )
// 校验所有题目是否正确
app.post( '/checkAnswerAll', ( req, res ) => {
  let questionArr = req.body
  let answerArr = []
  questionArr.forEach( item => {
    let sqlStr = `select * from question where question_id = ${item.question_id}`
    connection.query( sqlStr, ( err, result ) => {
      if ( result[0].answer == item.answer ) {
        answerArr.push( { question_id: item.question_id, isRight: true } )
      } else {
        answerArr.push( { question_id: item.question_id, isRight: false } )
      }
      if ( questionArr.length == answerArr.length ) {
        res.send( {
          data: answerArr,
          status: 200,
          statusText: 'success',
          msg: '校验完成'
        } )
      }
    } )
  } )
} )
// 校验单个题目是否正确
app.post( '/checkAnswer', ( req, res ) => {
  let question_id = req.body.question_id
  let answer = req.body.answer
  let sqlStr = `select * from question where question_id = ${question_id}`
  connection.query( sqlStr, ( err, result ) => {
    if ( result[0].answer == answer ) {
      res.send( {
        data: { question_id, isRight: true },
        status: 200,
        statusText: 'success',
        msg: '校验完成'
      } )
    } else {
      res.send( {
        data: { question_id, isRight: false },
        status: 200,
        statusText: 'success',
        msg: '校验完成'
      } )
    }
  } )
} )
// 获取字符集信息
app.get( '/getQuestionListType', ( req, res ) => {
  let sqlStr = 'select * from question_list'
  connection.query( sqlStr, ( ( err, result ) => {
    res.send( {
      data: result,
      status: 200,
      statusText: 'success',
      msg: '获取题目集成功'
    } )
  } ) )
} )
