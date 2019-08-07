const React = require('react')
const { Email, Item, Span, A, renderEmail, Box, Image } = require('react-html-email')
const MailHeader = require('./header')
const MailFooter = require('./footer')
const Content = require('./content')
const Style = require('./styles')
const { ORGANIZATION_NAME, ORGANIZATION_URL, ORGANIZATION_API_URL } = process.env

const cardStyle = {
  width: '80%',
  margin: '30px auto',
  border: 'solid 1px #e9e9e9',
  position: 'relative'
}

const cardImgStyle = {
  width: '100%'
}

const cardLabelStyle = {
  width: '80%',
  backgroundColor: '#ffffff',
  position: 'relative',
  marginTop: '-63px',
  padding: '10px 10px 20px'
}
const userContainerStyle = {
  padding: '30px 0 10px'
}

const userAvatarStyle = {
  position: 'relative',
  height: '40px',
  width: '40px',
  display: 'inline-block',
  marginRight: '10px',
  verticalAlign: 'middle',
  borderRadius: '400px'
}

const userNameStyle = {
  color: '#404b68',
  fontSize: 14,
  fontWeight: 'bold'
}

const commentsContainerStyle = {
  borderTop: '1px solid #cacaca',
  padding: '20px 10px',
  color: 'blue'
}
const commentsLabelStyle = {
  color: '#404b68'
}
const commentIconStyle = {
  height: '20px',
  width: '20px',
  display: 'inline-block',
  marginRight: '10px',
  verticalAlign: 'middle'
}

const titleStyle = { fontSize: 24, fontWeight: 'bold', lineHeight: 'normal' }

const CommentClosed = (props) => {
  return (
    <Email title='Cierre de comentarios' style={{ width: '100%', maxWidth: '700px' }}>
      <MailHeader />
      <Content showName={false} style={{ width: '100%' }}>
        <Item style={Style.itemStyle}>
          <Span {...Style.defaultContentStyle}>
          Finalizó el periodo para realizar aportes en el proyecto <b>{props.document.title}</b> en la que participó. Ingrese en <A href={ORGANIZATION_URL}>{ORGANIZATION_NAME}</A> para ver la versión final y los resultados del proceso de co-creación de normas.
          </Span>
        </Item>
        <Item style={Style.itemStyle}>
          <A href={`${ORGANIZATION_URL}/propuesta?id=${props.document.id}`} textDecoration='none'>
            <Box align='center' style={cardStyle}>
              <Item>
                <Image src={props.document.imageCover} style={cardImgStyle} />
                <Box style={cardLabelStyle}>
                  <Item>
                    <Span style={titleStyle}>{props.document.title}</Span>
                  </Item>
                  <Item style={userContainerStyle}>
                    <Span style={userNameStyle}>
                      <Image src={`${ORGANIZATION_API_URL}/api/v1/users/${props.author.id}/avatar`} style={userAvatarStyle} />
                      {props.author.fullname}
                    </Span>
                  </Item>
                </Box>
              </Item>
              <Item style={commentsContainerStyle}>
                <Span style={commentsLabelStyle}>
                  <Image src={`${ORGANIZATION_URL}/static/assets/emails/comment.png`} style={commentIconStyle} />
                  <b>{props.document.commentsCount}</b> COMENTARIOS
                </Span>
              </Item>
            </Box>
          </A>
        </Item>
      </Content>
      <MailFooter />
    </Email>
  )
}

module.exports = (props) => renderEmail(<CommentClosed {...props} />)
