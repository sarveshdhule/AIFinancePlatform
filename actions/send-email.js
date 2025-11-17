"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");
const DEFAULT_FROM = "Finance App <onboarding@resend.dev>";

export async function sendEmail({ to, subject, react }) {
  const from = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM;
  const testRecipients = process.env.RESEND_TEST_EMAILS;

  const recipients = Array.isArray(to) ? to : [to];
  const targetRecipients = testRecipients
    ? testRecipients.split(",").map((email) => email.trim())
    : recipients;

  try {
    const data = await resend.emails.send({
      from,
      to: targetRecipients,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
