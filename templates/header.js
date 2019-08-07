const React = require('react')
const ReactDom = require('react-dom/server')
const { Email, Item, Span, A, renderEmail, Box, Image } = require('react-html-email')
const Styles = require('./styles')

const MailHeader = (props) => {
  return (
    <Item align='center' style={Styles.headerStyle}>
      <Image src='https://www.hcdn.gob.ar/system/modules/ar.gob.hcdn.frontend/resources/img/logo-hcdn-vertical.jpg' align='center' style={{ width: 130, height: 98, margin: 25 }} />
    </Item>
  )
}

module.exports = MailHeader
