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
  let props = {
    document: {
      id: 12,
      title: 'Lorem the great ipsum',
      commentsCount: 20
    },
    author: {
      id: 20,
      fullname: 'Guillermo Croppi',
      avatar: 'data:image/png;base64,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'
    }
  }

  try {

  } catch (err) {
    console.log(err)
  }

  console.log('props')
  console.log(props)
  console.log('-----------------------------')

  res.send(template(props))
})

module.exports = router
