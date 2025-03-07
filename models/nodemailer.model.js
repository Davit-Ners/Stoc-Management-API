import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 25,
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});

const mailFunctions = {
    sendPasswordEmail: async (email, id) => {
        try {
            const info = await transporter.sendMail({
                from: '"Stock API',
                to: email,
                subject: 'Créer votre mot de passe',
                text: `Bonjour, <br><br>
                       Votre compte vient d'être crée mais vous devez configurer votre mot de passe. <br><br>
                       Cliquez sur ce lien pour le configurer : <a href=http://localhost:8080/api/auth/setPassword/${id}>Configurer mot de passe</a>`
            });
    
            console.log("Email envoyé avec succès : ");
            return info;
        } catch (error) {
            console.error("Erreur lors de l'envoi du mail :", error);
            throw error;
        }
    }
}

export default mailFunctions;