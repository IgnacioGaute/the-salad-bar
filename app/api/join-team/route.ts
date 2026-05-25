import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const name = form.get("name") as string
    const email = form.get("email") as string
    const phone = form.get("phone") as string
    const cvFile = form.get("cvFile") as File | null

    const attachments: { filename: string; content: Buffer }[] = []
    if (cvFile && cvFile.size > 0) {
      const buffer = Buffer.from(await cvFile.arrayBuffer())
      attachments.push({ filename: cvFile.name, content: buffer })
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "thesaladbar.salta@gmail.com",
      subject: "Nueva postulación de trabajo — The Salad Bar",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width:600px; margin:0 auto; padding:20px;">
          <h2 style="text-align:center; color:#2c3e50;">📩 Nueva postulación de trabajo</h2>
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">Nombre y apellido</p>
            <p style="margin:0;">${name}</p>
          </div>
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">Email</p>
            <p style="margin:0;">${email}</p>
          </div>
          <div style="margin-bottom:20px;">
            <p style="font-weight:bold; margin-bottom:5px;">Teléfono</p>
            <p style="margin:0;">${phone || "—"}</p>
          </div>
          ${cvFile && cvFile.size > 0 ? "<p>CV adjunto al correo.</p>" : "<p>No se adjuntó CV.</p>"}
          <p style="margin-top:40px; font-size:0.9em; color:#777;">
            Este mensaje fue generado automáticamente desde el formulario de trabajo de The Salad Bar.
          </p>
        </div>
      `,
      attachments,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error enviando postulación:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
