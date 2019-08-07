const { INTERNAL_SERVER_ERROR, OK } = require('http-status')
const agenda = require('../jobs/agenda')

exports.post = async (req, res) => {
  try {
    let executionDate = new Date(req.body.closingDate)
    executionDate.setHours(23, 59, 59)
    let document = req.body
    await agenda.cancel({ name: 'document-closes', 'data.id': document.id })
    await agenda.schedule(executionDate, 'document-closes', document)
    res.status(OK).json({
      message: 'Closing event scheduled'
    })
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'An error ocurred trying to schedule the closing event.',
      reason: err.message
    })
  }
}
