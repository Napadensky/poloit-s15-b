const emailHelper = require('./emailHelper')


exports.sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;
  
    try {
      let info = await emailHelper(to, subject, text);
      res.status(200).send(`Email sent: ${info.response}`);
    } catch (error) {
      res.status(500).send("Error sending email");
    }
  };