const React = require('react')
const ReactDom = require('react-dom/server')
const { Email, Item, Span, A, renderEmail, Box, Image } = require('react-html-email')
const Styles = require('./styles')

const MailHeader = (props) => {
  return (
    <Item align='center' style={Styles.headerStyle}>
      <Image src='https://causascomunes.org/static/img/logos/CC_LogoColor.png' align='center' style={{ height: 60, margin: 25 }} />
    </Item>
  )
}

module.exports = MailHeader
