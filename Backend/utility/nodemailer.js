const nodemailer = require("nodemailer");
const hbs = require("nodemailer-handlebars");

module.exports = {
    sendMail(email, templateName, subject, data) {
        var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
        });


        transporter.use(
            "compile",
            hbs({
                viewEngine: {
                partialsDir: "templates/",
                defaultLayout: "",
                },
                viewPath: "templates/",
                extName: ".handlebars",
            })
        );

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            template: templateName.template,
            context: {
                data: data,
            },
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                return err;
            } else {
                return info;
            }
        });
    },
};