# Causas Comunes API Notifier

API Notifications with agenda and nodemailer

## Configuration
- Install dependencies

```sh
$ npm install
```

- Set environment variables

```
PORT=3000-or-change-it
MONGO_URL=mongodb://<my-mongo-url>
DB_COLLECTION=<database-name>
ORGANIZATION_EMAIL=your-organization@mail.com
ORGANIZATION_NAME='My Organization'
ORGANIZATION_URL=https://organization.org
ORGANIZATION_API_URL=https://api.organization.org
NODEMAILER_HOST=smtp.your.host.com
NODEMAILER_PORT=465
NODEMAILER_SECURE=true|false
NODEMAILER_PASS=yourservicemailpass
NODEMAILER_USER=yourservice@mail.com
BULK_EMAIL_CHUNK_SIZE=100-or-change-it
NODE_ENV=production || development
```

## React Templates

To pre-build the templates for production purpose, run:

```sh
$ npm run build
```

This will create a "dist/templates" folder for the pre-build templates.

## ¡Run server, run!

```sh
$ npm run dev
```

Server will run on port 3000.
At the moment, try make a POST request to 

```
/api/sendemail
```

with this body structure

```javascript
{
	"type":"the-type",
	"info": {
		"to":"the-email-to@notify.com",
		"document": {
			"comment":"The original comment",
			"title":"The document title",
			"author":"The document author"
		}
	}
}
```

Currently there are three types of notifications: "comment-resolved", "comment-liked", "document-edited"

## Testing

For test the api, run

```sh
$ npm test
```