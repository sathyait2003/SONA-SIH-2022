import sgMail from '@sendgrid/mail'

async function sendMail(subject: string, body: string, emails: string[]) {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "")

    emails.map((email) => {
        const msg = {
            to: email, // Change to your recipient
            from: 'sihiitkgp3@gmail.com', // Change to your verified sender
            subject: subject,
            text: body,
            html: body
          }
          
        sgMail.send(msg)
            .then(() => console.log('Email scheduled.'))
            .catch((error) => console.error(error))
    })
}

export {sendMail}