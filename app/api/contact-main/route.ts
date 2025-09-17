import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  // Generamos el HTML con todas las preguntas y respuestas
  const fieldsHtml = Object.entries(body)
    .map(([key, value]) => `<p><b>${key}:</b> ${value}</p>`)
    .join("");

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'nachitogaute@gmail.com',
        subject: 'Nuevo formulario de franquicia recibido',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width:600px; margin:0 auto; padding:20px;">
            <h2 style="text-align:center; color:#2c3e50;">📩 Nuevo formulario de franquicia recibido</h2>
      
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
          </div>
        `,
      });
      
    } catch (error) {
      console.error("Error enviando el correo:", error);
      return NextResponse.json({ success: false });
    }



  return NextResponse.json({ success: true });
}
