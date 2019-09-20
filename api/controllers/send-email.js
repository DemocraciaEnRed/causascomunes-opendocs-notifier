const { INTERNAL_SERVER_ERROR, OK } = require('http-status')
const { ObjectID } = require('mongodb')
const mongo = require('../../services/db')
const notification = require('../../core/notification-strategies')

exports.post = async (req, res) => {
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
          from: 'documentversions',
          localField: 'version',
          foreignField: '_id',
          as: 'version'
        }
      },
      { $project: {
        'user.avatar': 0,
        'version.content.fundation': 0,
        'version.content.articles': 0,
        'decoration': 0
      }
      }
    ]).toArray()
    // Prepare email props
    let emailProps = {
      author: {
        id: commentInfo[0].user[0]._id,
        name: commentInfo[0].user[0].name,
        fullname: commentInfo[0].user[0].fullname,
        email: commentInfo[0].user[0].email
      },
      document: {
        id: commentInfo[0].document,
        title: commentInfo[0].version[0].content.title
      },
      comment: {
        content: commentInfo[0].content
      },
      reply: commentInfo[0].reply || null
    }
    // Send notification
    notification.sendEmail(type, emailProps)
    res.status(OK).json({
      message: 'Email scheduled'
    })
  } catch (err) {
    console.log(err)
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'An error ocurred trying to schedule the email.',
      reason: err.message
    })
  }
}
