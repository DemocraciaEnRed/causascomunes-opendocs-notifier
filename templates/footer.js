const React = require('react')
const ReactDom = require('react-dom/server')
const { Email, Item, Span, A, renderEmail, Box, Image } = require('react-html-email')
const Styles = require('./styles')

const MailFooter = (props) => {
  return (
    <Item style={Styles.footerStyle}>
      <Box align='center'>
        <Item align='center'>
          <Image src='https://www.hcdn.gob.ar/system/modules/ar.gob.hcdn.frontend/resources/img/logo-hcdn-blanco.png' align='center' />
        </Item>
        <Item align='center'>
          <Span {...Styles.textStyle}>
            <b>Honorable Cámara de Diputados de la Nación Argentina</b> | Congreso de la Nación Argentina | Av. Rivadavia 1864 - Ciudad Autónoma de Bs. As. (C.P.C1033AAV) | (54-11) 4127-7100
          </Span>
        </Item>
      </Box>
    </Item>
  )
}

module.exports = MailFooter
