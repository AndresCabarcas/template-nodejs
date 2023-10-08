const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const { Resend } = require('resend');

const app = express();
const port = 3000;

dotenv.config();
app.use(cors({ origin: "*" }));
app.use(express.json()); 

// Create a new Resend instance
const resend = new Resend('re_UnFiSRZT_BPEFMnGhBBDNQTJ4ZLy2Nn95');

app.get("/", (req, res) => {
  res.send("Why so serious?");
});

// html function 
const html = require('./HTMLCreator.js'); 
app.post("/api/email", async (req, res) => {
    const { sAsunto, sEmail, sNombre, sMessage } = req.body;
    
    try {
      const data = await resend.emails.send({
        from: 'pqrs@asorecicol.com',
        to: 'pqrs.asorecicol@gmail.com',
        subject: sAsunto,
        html: html(sAsunto, sEmail, sNombre, sMessage)
      });

      console.log(data);
      res.json({ message: 'Mensaje enviado exitosamente...' });
    } catch (error) {
      console.error(error);
      res.json(error);
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
