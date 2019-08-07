const mailer = require('../../../services/nodemailer')

module.exports = (agenda) => {
  agenda.define('send-email', async (job, done) => {
    const {
      to,
      subject,
      template
    } = job.attrs.data

    const {
      NODEMAILER_HOST,
      NODEMAILER_USER,
      NODEMAILER_PASS,
      NODEMAILER_PORT,
      NODEMAILER_SECURE,
      ORGANIZATION_NAME,
      ORGANIZATION_EMAIL } = process.env

    let config = {
      host: NODEMAILER_HOST,
      port: NODEMAILER_PORT
    }
    if (NODEMAILER_SECURE) {
      config.auth = {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS
      }
    } else {
      config.secure = false
      config.ignoreTLS = true
    }

    const emailOptions = {
      from: `"${ORGANIZATION_NAME}" <${ORGANIZATION_EMAIL}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      html: template // html body
    }

    mailer.sendEmail(config, emailOptions, done)
  })
}
