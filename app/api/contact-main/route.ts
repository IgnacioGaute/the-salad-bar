import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'thesaladbar.salta@gmail.com',
      subject: 'Nuevo contacto desde el sitio web — The Salad Bar',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width:600px; margin:0 auto; padding:20px;">
          <h2 style="text-align:center; color:#2c3e50;">📩 Nuevo contacto desde el sitio web</h2>
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">Nombre completo</p>
            <p style="margin:0;">${body.nombre}</p>
          </div>
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">Correo electrónico</p>
            <p style="margin:0;">${body.email}</p>
          </div>
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">Número de teléfono</p>
            <p style="margin:0;">${body.telefono}</p>
          </div>
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">Comentario</p>
            <p style="margin:0;">${body.comentario}</p>
          </div>
          <p style="margin-top:40px; font-size:0.9em; color:#777;">
            Enviado desde el formulario de contacto de thesaladbar.com.ar
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Error enviando el correo:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
