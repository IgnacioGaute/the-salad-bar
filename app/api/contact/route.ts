import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, message } = body;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'nachitogaute@gmail.com', // tu mail real
    subject: 'Nuevo mensaje de contacto',
    html: `
      <h2>Nuevo contacto desde la web</h2>
      <p><b>Nombre:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Teléfono:</b> ${phone}</p>
      <p><b>Mensaje:</b> ${message}</p>
    `,
  });

  return NextResponse.json({ success: true });
}
