import fs from 'fs'
import path, { dirname } from "path";
import handlebar from "handlebars";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const AVAILABLE_TEMPLATES = {
  REQUEST: "emailTemplate",
};

export const Email = class Email {
  constructor(template = "") {
    this.body = "";
    this.subject = "";
    this.cc = [];
    if (template) {
      this.setTemplate(template);
    }
  }

  setTemplate(template) {
    if (!Object.values(AVAILABLE_TEMPLATES).includes(template)) {
      throw new Error("Invalid template");
    }

    this.template = template;
    switch (template) {
      case AVAILABLE_TEMPLATES.REQUEST:
        this.subject = "Welcome to our website";
        break;

      default:
        break;
    }
  }

  setBody(data) {
    if (!this.template) {
      throw new Error("Template not set");
    }
    const fileBody = fs
      .readFileSync(
        path.join(__dirname, `views/templates/${this.template}.hbs`)
      )
      .toString();
    
    const template = handlebar.compile(fileBody);
    this.body = template(data);
  }

  setRawBody(body) {
    this.body = body;
  }

  setSubject(subject) {
    this.subject = subject;
  }

  setCC(emails) {
    this.cc = emails;
  }

  async send(emails) {
    if (!emails) {
      throw new Error("Email not set");
    }
    if (!this.body || !this.subject) {
      throw new Error("Body or subject not set");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: `"Mini-Drive" <${process.env.EMAIL_USERNAME}>`,
      to: emails,
      subject: "Welcome to our website",
      html: this.body,
    });
    return info;
  }

  static sendEmailTemplate(template, data, emails, cc = []) {
    const emailClient = new Email(template);
    emailClient.setBody(data);
    emailClient.setCC(cc);
    return emailClient.send(emails);
  }
}
