import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export async function sendContactEmail(formData) {
  try {
    const { name, email, company, message, service } = formData;

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f8f8;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #85c500; margin-bottom: 20px; text-align: center;">Nuevo Mensaje de Contacto</h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Información del Cliente:</h3>
            <p style="margin: 5px 0;"><strong>Nombre:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            ${company ? `<p style="margin: 5px 0;"><strong>Empresa:</strong> ${company}</p>` : ''}
            ${service ? `<p style="margin: 5px 0;"><strong>Servicio:</strong> ${service}</p>` : ''}
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Mensaje:</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #85c500;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">Este mensaje fue enviado desde el formulario de contacto de KUNORO</p>
          </div>
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: 'KUNORO Contact <noreply@kunoro.com>',
      to: ['contact@kunoro.com'], // Cambia por tu email
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: emailContent,
      reply_to: email,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}
