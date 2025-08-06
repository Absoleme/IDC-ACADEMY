import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Configuration du transporteur email (à adapter selon votre fournisseur)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email pour IDC Academy
    const adminEmailContent = `
      NOUVELLE DEMANDE DE FORMATION
      =============================
      
      Formation : ${data.formation}
      
      INFORMATIONS DU CANDIDAT :
      - Nom : ${data.nom}
      - Prénom : ${data.prenom}
      - Email : ${data.email}
      - Téléphone : ${data.telephone || 'Non renseigné'}
      - Situation : ${data.situation || 'Non renseignée'}
      
      MESSAGE :
      ${data.message || 'Aucun message'}
      
      =============================
      Demande reçue le ${new Date().toLocaleString('fr-FR')}
    `

    // Email de confirmation pour le candidat
    const candidateEmailContent = `
      Bonjour ${data.prenom},
      
      Nous avons bien reçu votre demande d'information concernant la formation "${data.formation}".
      
      Notre équipe va étudier votre profil et vous recontacter dans les plus brefs délais pour discuter de votre projet de formation.
      
      RÉCAPITULATIF DE VOTRE DEMANDE :
      - Formation : ${data.formation}
      - Email : ${data.email}
      - Téléphone : ${data.telephone || 'Non renseigné'}
      
      N'hésitez pas à nous contacter si vous avez des questions :
      - Email : contact@idcacademy.fr
      - Téléphone : 07 59 56 59 18
      
      À très bientôt,
      L'équipe IDC Academy
    `

    // Envoi de l'email à IDC Academy
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'contact@idcacademy.fr',
      subject: `[FORMATION] Nouvelle demande - ${data.formation}`,
      text: adminEmailContent,
    })

    // Envoi de l'email de confirmation au candidat
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: data.email,
      subject: 'Confirmation de votre demande - IDC Academy',
      text: candidateEmailContent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi' },
      { status: 500 }
    )
  }
}
