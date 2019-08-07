const React = require('react')
const ReactDom = require('react-dom/server')
const { Email, Item, Span, A, renderEmail, Box, Image } = require('react-html-email')
const Styles = require('./styles')

const MailFooter = (props) => {
  return (
    <Item style={Styles.footerStyle}>
      <Box align='center'>
        <Item align='center'>
          <Image src='https://causascomunes.org/static/img/logos/CC_LogoNegro_mediano.png' align='center' style={Styles.footerImgLogoStyle}/>
        </Item>
        <Item align='center'>
          <a href='https://www.instagram.com/causascomunes/'><Image src='https://causascomunes.org/static/img/icons/social_instagram_icon.png' align='center' style={Styles.footerImgSocialStyle} /></a>
          <a href='https://www.facebook.com/Causas-Comunes-449280685874685/'><Image src='https://causascomunes.org/static/img/icons/social_facebook_icon.png' align='center' style={Styles.footerImgSocialStyle} /></a>
          <a href='https://twitter.com/causas_comunes'><Image src='https://causascomunes.org/static/img/icons/social_twitter_icon.png' align='center' style={Styles.footerImgSocialStyle} /></a>
          <a href='mailto:causascomunesx@gmail.com'><Image src='https://causascomunes.org/static/img/icons/social_mail_icon.png' align='center' style={Styles.footerImgSocialStyle} /></a>
        </Item>
      </Box>
    </Item>
  )
}

module.exports = MailFooter
