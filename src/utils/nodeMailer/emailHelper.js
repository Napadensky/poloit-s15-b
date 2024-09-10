const nodemailer = require('nodemailer');
require('dotenv').config();  // Cargar variables de entorno

const emailHelper = async (to, subject, text) => {
  // Crear el transportador
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER, // Usuario desde el archivo .env
      pass: process.env.NODEMAILER_PASS, // Contraseña desde el archivo .env
    },
  });

  // Opciones del correo
  let mailOptions = {
    from: process.env.NODEMAILER_USER, // Usar el remitente del archivo .env
    to: to,
    subject: subject,
    text: text,
  };

  // Enviar el correo
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email enviado: " + info.response);
    return info; // Devolver la información del correo enviado
  } catch (error) {
    console.error("Error enviando el email:", error);
    throw error; // Lanza el error para que lo capture el controlador
  }
};

module.exports = emailHelper;
