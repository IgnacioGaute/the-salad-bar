import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
  const body = await req.json();

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'thesaladbar.salta@gmail.com',
      subject: 'Nueva solicitud de franquicia — The Salad Bar',
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
            <p style="font-weight:bold; margin-bottom:5px;">Ciudad y país de residencia</p>
            <p style="margin:0;">${body.ciudad}</p>
          </div>
    
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">Ocupación actual</p>
            <p style="margin:0;">${body.ocupacion}</p>
          </div>
    
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">¿Por qué le interesa adquirir una franquicia de nuestro negocio?</p>
            <p style="margin:0;">${body.interes}</p>
          </div>
    
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">Ubicación geográfica de interés</p>
            <p style="margin:0;">${body.ubicacion}</p>
          </div>
    
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">Experiencia en hostelería o negocios</p>
            <p style="margin:0;">${body.experiencia}</p>
          </div>
    
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">¿Tiene experiencia previa como empresario?</p>
            <p style="margin:0;">${body.empresario}</p>
          </div>
    
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">Motivación principal</p>
            <p style="margin:0;">${body.motivacion}</p>
          </div>
    
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">¿Cómo se imagina su participación diaria?</p>
            <p style="margin:0;">${body.participacion}</p>
          </div>
    
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">Expectativas de retorno de inversión y rentabilidad</p>
            <p style="margin:0;">${body.expectativas}</p>
          </div>
    
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">Capacidad de inversión aproximada</p>
            <p style="margin:0;">${body.inversion}</p>
          </div>
    
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">¿Cómo planea financiar la inversión inicial?</p>
            <p style="margin:0;">${body.financiamiento}</p>
          </div>
    
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">Horizonte de tiempo para comenzar el negocio</p>
            <p style="margin:0;">${body.horizonte}</p>
          </div>
    
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">¿Qué cree que es lo más importante en un restaurante exitoso?</p>
            <p style="margin:0;">${body.exito}</p>
          </div>
    
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">En una palabra, describa la experiencia que quiere ofrecer</p>
            <p style="margin:0;">${body.experiencia_ofrecer}</p>
          </div>
    
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">Describa su estilo de liderazgo</p>
            <p style="margin:0;">${body.liderazgo}</p>
          </div>
    
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">¿Qué tan importante es el bienestar de sus empleados?</p>
            <p style="margin:0;">${body.bienestar}</p>
          </div>
    
          <p style="margin-top:40px; font-size:0.9em; color:#777;">
            Este mensaje fue generado automáticamente desde el formulario de franquicias de The Salad Bar.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error enviando franquicia:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
