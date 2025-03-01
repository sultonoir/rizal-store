import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { admin } from 'better-auth/plugins';
import { magicLink } from 'better-auth/plugins';
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	SMTP_HOST,
	SMTP_PASSWORD,
	SMTP_PORT,
	SMTP_USER
} from '$env/static/private';
import { PUBLIC_BETTER_URL } from '$env/static/public';
import { createTransport, type TransportOptions } from 'nodemailer';

const smtpConfig = {
	host: SMTP_HOST,
	port: SMTP_PORT,
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASSWORD
	}
};

const transporter = createTransport(smtpConfig as TransportOptions);

const prisma = new PrismaClient();

export const auth = betterAuth({
	baseURL: PUBLIC_BETTER_URL,
	database: prismaAdapter(prisma, {
		provider: 'postgresql' // or "mysql", "postgresql", ...etc
	}),
	socialProviders: {
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		}
	},
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ['google', 'github']
		}
	},
	plugins: [
		admin(),
		magicLink({
			sendMagicLink: async ({ email, url }) => {
				await transporter.sendMail({
					from: 'your-email@gmail.com',
					to: email,
					subject: 'Yout magic link 🪄',
					html: html({ link: url })
				});
			}
		})
	]
});

function html({ link }: { link: string }) {
	return `<body style="background: #f6f9fc; font-family: 'Open Sans', 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: #ffffff; max-width: 600px; margin: auto; border-radius: 10px; padding: 45px; border: 1px solid #f0f0f0;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-weight: 700; color: #404040;">
        Rizal Store
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0; font-size: 16px; font-weight: 300; color: #404040;">
        Welcome to Rizal Store, the fashion brand offering stylish and high-quality apparel for every occasion.
        Discover trendsetting designs and timeless elegance that redefine your wardrobe.
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="#09090b">
              <a href="${link}"target="_blank"
                style="font-size: 18px; color: #fafafa; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid #09090b; display: inline-block; font-weight: bold; background-color: #09090b;">
                Get started
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; color: #404040;">
        If you didn&apos;t request this, please ignore this email.
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; color: #404040;">
        To keep your account secure, please don&apos;t forward this email to anyone.
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; color: #404040;">
        Have a nice day!
      </td>
    </tr>
  </table>
</body>
`;
}
