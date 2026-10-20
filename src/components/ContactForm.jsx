"use client";

import { useState } from "react";
import { useLocale } from "../config/localeContext";
import Link from "./LocalizedLink";


export default function ContactForm() {
  const { locale } = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    clientType: "Private",
    message: "",
  });
  const [status, setStatus] = useState("");

  // Localized text
  const text = {
    "hr-HR": {
      nameLabel: "Ime i prezime",
      namePlaceholder: "Vaše ime i prezime",
      emailLabel: "Email",
      emailPlaceholder: "Vaša email adresa",
      phoneLabel: "Broj telefona",
      phonePlaceholder: "Vaš broj telefona",
      clientTypeLabel: "Tip klijenta",
      clientTypePrivate: "Privatni klijent",
      clientTypeCompany: "Tvrtka",
      messagePlaceholder: "Vaša poruka",
      sendButton: "Pošaljite",
      statusSending: "Šalje se...",
      statusSuccess: "✅ Poruka je uspješno poslana!",
      statusError: "❌ Slanje poruke nije uspjelo.",
      statusGenericError: "⚠️ Nešto je pošlo po zlu.",
      privacyNotice: "Podatke iz obrasca obrađujemo radi odgovora na Vaš upit, u skladu s ",
      privacyLink: "Pravilima privatnosti",
      privacyNoticeEnd: "."
    },
    "en": {
      nameLabel: "Full name",
      namePlaceholder: "Your full name",
      emailLabel: "Email",
      emailPlaceholder: "Your email address",
      phoneLabel: "Phone number",
      phonePlaceholder: "Your phone number",
      clientTypeLabel: "Client type",
      clientTypePrivate: "Private client",
      clientTypeCompany: "Company",
      messagePlaceholder: "Your message",
      sendButton: "Send",
      statusSending: "Sending...",
      statusSuccess: "✅ Message sent successfully!",
      statusError: "❌ Failed to send message.",
      statusGenericError: "⚠️ Something went wrong.",
      privacyNotice: "We process the data from this form to respond to your enquiry, in accordance with our ",
      privacyLink: "Privacy Policy",
      privacyNoticeEnd: "."
    },
    "de-DE": {
      nameLabel: "Vollständiger Name",
      namePlaceholder: "Ihr vollständiger Name",
      emailLabel: "E-Mail",
      emailPlaceholder: "Ihre E-Mail-Adresse",
      phoneLabel: "Telefonnummer",
      phonePlaceholder: "Ihre Telefonnummer",
      clientTypeLabel: "Kundentyp",
      clientTypePrivate: "Privatkunde",
      clientTypeCompany: "Unternehmen",
      messagePlaceholder: "Ihre Nachricht",
      sendButton: "Senden",
      statusSending: "Wird gesendet...",
      statusSuccess: "✅ Nachricht erfolgreich gesendet!",
      statusError: "❌ Nachricht konnte nicht gesendet werden.",
      statusGenericError: "⚠️ Etwas ist schief gelaufen.",
      privacyNotice: "Wir verarbeiten die Daten aus diesem Formular zur Beantwortung Ihrer Anfrage, gemäß unserer ",
      privacyLink: "Datenschutzerklärung",
      privacyNoticeEnd: "."
    }
  };

  const currentText = text[locale] || text["hr-HR"]; // Fallback to Croatian

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(currentText.statusSending);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.status === 201) {
        setStatus(currentText.statusSuccess);
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          clientType: "Private",
          message: "",
        });
      } else {
        setStatus(currentText.statusError);
      }
    } catch (err) {
      console.error(err);
      setStatus(currentText.statusGenericError);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <p className="font-bold uppercase text-xs">{currentText.nameLabel}</p>
      <input
        type="text"
        name="name"
        placeholder={currentText.namePlaceholder}
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-6 py-4 border-1 border-dark-text/10 bg-card-bg h-[58px] rounded-[16px] mb-4 mt-2"
      />
      
      <p className="font-bold uppercase text-xs">{currentText.emailLabel}</p>
      <input
        type="email"
        name="email"
        placeholder={currentText.emailPlaceholder}
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-6 py-4 border-1 border-dark-text/10 bg-card-bg h-[58px] rounded-[16px] mb-4 mt-2"
      />
      
      <p className="font-bold uppercase text-xs">{currentText.phoneLabel}</p>
      <input
        type="text"
        name="phoneNumber"
        placeholder={currentText.phonePlaceholder}
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        className="w-full px-6 py-4 border-1 border-dark-text/10 bg-card-bg h-[58px] rounded-[16px] mb-4 mt-2"
      />
      
      <p className="font-bold uppercase text-xs">{currentText.clientTypeLabel}</p>
      <select
        name="clientType"
        value={formData.clientType}
        onChange={handleChange}
        className="w-full px-6 py-4 border-1 border-dark-text/10 bg-card-bg h-[58px] rounded-[16px] mb-4 mt-2"
      >
        <option value="Private">{currentText.clientTypePrivate}</option>
        <option value="Company">{currentText.clientTypeCompany}</option>
      </select>
      
      <textarea
        name="message"
        placeholder={currentText.messagePlaceholder}
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full px-6 py-4 border-1 border-dark-text/10 bg-card-bg rounded-[16px] h-32 mb-8"
      ></textarea>
      
      <button
        type="submit"
        className="bg-cta-color text-white px-4 py-2 w-full rounded-[999px] h-[58px]"
      >
        {currentText.sendButton}
      </button>

      <p className="text-xs text-dark-text/60 text-center mt-4">
        {currentText.privacyNotice}
        <Link href="/privacy-policy" className="underline hover:text-dark-text transition-colors">
          {currentText.privacyLink}
        </Link>
        {currentText.privacyNoticeEnd}
      </p>

      {status && <p className="text-center mt-4">{status}</p>}
    </form>
  );
}