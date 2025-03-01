import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  //const verificationUrl = `https://yourapp.com/verify?token=${token}`;
  const verificationUrl = process.env.APP_URL + "/verify?token=" + token;
  await resend.emails.send({
    from: "no-reply@yourapp.com",
    to: email,
    subject: "Verify Your Account",
    html: `<p>Click the link to verify your account:</p>
           <a href="${verificationUrl}">Verify Now</a>`,
  });
}
