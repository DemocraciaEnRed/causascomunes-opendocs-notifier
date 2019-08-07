const fs = require('fs')
const express = require('express')
const { ObjectID } = require('mongodb')
const { INTERNAL_SERVER_ERROR, OK } = require('http-status')
const mongo = require('../../services/db')
const router = express.Router()
const { NODE_ENV } = process.env
const basePath = NODE_ENV === 'production' ? '../../dist/templates' : '../../templates'
// const mailer = require('../../services/nodemailer');

// function arrayUnique (array) {
//   let a = array.concat()
//   for (let i = 0; i < a.length; ++i) {
//     for (let j = i + 1; j < a.length; ++j) {
//       if (a[i] === a[j]) { a.splice(j--, 1) }
//     }
//   }
//   return a
// }

function buildTemplate (fileName, props) {
  const path = `${basePath}/${fileName}`
  const reactTemplate = require(path)

  return reactTemplate({ ...props })
}

router.post('/test', async (req, res, next) => {
  try {
    const { type, comment } = req.body
    let commentInfo = await mongo.getDB().collection('comments').aggregate([
      { $match: { _id: ObjectID(comment) } },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $lookup: {
          from: 'documents',
          localField: 'document',
          foreignField: '_id',
          as: 'document'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'document.author',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $project: {
        'user.avatar': 0,
        'author.avatar': 0,
        'version.content.fundation': 0,
        'version.content.articles': 0,
        'decoration': 0
      }
      }
    ]).toArray()
    // console.log(commentInfo[0].document[0])
    // let emailProps = {
    //   author: {
    //     id: commentInfo[0].user[0]._id,
    //     name: commentInfo[0].user[0].name,
    //     fullname: commentInfo[0].user[0].fullname,
    //     email: commentInfo[0].user[0].email
    //   },
    //   document: {
    //     id: commentInfo[0].document,
    //     title: commentInfo[0].document[0].author
    //   },
    //   comment: {
    //     content: commentInfo[0].content
    //   },
    //   reply: commentInfo[0].reply || null
    // }
    res.send(commentInfo[0])
    // const template = buildTemplate(type, emailProps)
    // res.send(template)
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'An error ocurred',
      reason: err.message
    })
  }
})

router.get('/:type', (req, res, next) => {
  if (!fs.existsSync(`templates/${req.params.type}.js`)) return next()

  const template = require(`../../templates/${req.params.type}`)
  let props

  try {
    props = JSON.parse(req.query.props)
  } catch (err) {
    console.log(err)
  }

  console.log('props')
  console.log(props)
  console.log('-----------------------------')

  res.send(template(props))
})

module.exports = router
