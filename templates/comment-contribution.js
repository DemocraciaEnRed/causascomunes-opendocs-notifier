const React = require('react')
const { Email, Item, Span, A, renderEmail, Box, Image } = require('react-html-email')
const MailHeader = require('./header')
const MailFooter = require('./footer')
const Content = require('./content')
const Style = require('./styles')
const CommentContainerStyle = require('./commentContainerStyle')
const { ORGANIZATION_NAME, ORGANIZATION_URL, ORGANIZATION_API_URL } = process.env

const CommentContribution = (props) => {
  return (
    <Email title='Gracias por su aporte' style={{ width: '100%', maxWidth: '700px' }}>
      <MailHeader />
      <Content name={props.author.name} style={{ width: '100%' }}>
        <Item style={Style.itemStyle}>
          <Span {...Style.defaultContentStyle}>
          El/la diputado/a creó un nueva versión de la propuesta <b>{props.document.title}</b> y destacó su comentario como aporte. Para ver la nueva versión ingrese en <A href={`${ORGANIZATION_URL}/propuesta?id=${props.document.id}`}>{ORGANIZATION_NAME}</A>
          </Span>
        </Item>
        <Item style={Style.itemStyle}>
          <Span {...Style.defaultContentStyle}>
          Este fue tu comentario:
          </Span>
        </Item>
        <Item style={Style.itemStyle}>
          <A href={`${ORGANIZATION_URL}/propuesta?id=${props.document.id}`} textDecoration='none'>
            <Box align='center' style={CommentContainerStyle.cardStyle}>
              <Item>
                <div style={CommentContainerStyle.leftColumn} >
                  <Image src={`${ORGANIZATION_URL}/static/assets/emails/star.png`} style={CommentContainerStyle.cardIconImg} />
                </div>
                <div style={CommentContainerStyle.cardContentStyle}>
                  <div style={CommentContainerStyle.userContainerStyle}>
                    <Span {...CommentContainerStyle.userNameStyle}>
                      <Image src={`${ORGANIZATION_API_URL}/api/v1/users/${props.author.id}`} style={CommentContainerStyle.userAvatarStyle} />
                      {props.author.fullname}
                    </Span>
                  </div>
                  <div>
                    <Span {...CommentContainerStyle.theCommentStyle}>
                      {props.comment.content}
                    </Span>
                  </div>
                </div>
              </Item>
            </Box>
          </A>
        </Item>
      </Content>
      <MailFooter />
    </Email>
  )
}

module.exports = (props) => renderEmail(<CommentContribution {...props} />)
