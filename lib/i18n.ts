// This is a simplified version of the i18n implementation
// In a real application, you would use a proper i18n library like next-i18next or react-i18next

export const locales = ["en", "fr", "de", "es", "hi", "sw"] as const
export const defaultLocale = "en" as const

export type Locale = (typeof locales)[number]

// Translation keys
export type TranslationKey = {
  common: {
    connect: string
    disconnect: string
    home: string
    sports: string
    parlays: string
    bots: string
    profile: string
    login: string
    admin: string
    privacy: string
    terms: string
    contact: string
    copyright: string
    notifications: string
    howToPlay: string
    faq: string
    insights: string
    fantasy: string
  }
  wallet: {
    connectWallet: string
    disconnectWallet: string
    walletConnected: string
  }
  navigation: {
    selectLanguage: string
  }
}

// Default English translations
export const defaultTranslations: Record<Locale, TranslationKey> = {
  en: {
    common: {
      connect: "Connect",
      disconnect: "Disconnect",
      home: "Home",
      sports: "Sports",
      parlays: "Parlays",
      bots: "Bots",
      profile: "Profile",
      login: "Login",
      admin: "Admin",
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact",
      copyright: "© {year} Mdisells Sport ParlAI. All rights reserved.",
      notifications: "Notifications",
      howToPlay: "How to Play",
      faq: "FAQ",
      insights: "Insights",
      fantasy: "Fantasy"
    },
    wallet: {
      connectWallet: "Connect Wallet",
      disconnectWallet: "Disconnect Wallet",
      walletConnected: "Wallet Connected"
    },
    navigation: {
      selectLanguage: "Select Language"
    }
  },
  fr: {
    common: {
      connect: "Se connecter",
      disconnect: "Se déconnecter",
      home: "Accueil",
      sports: "Sports",
      parlays: "Paris",
      bots: "Bots",
      profile: "Profil",
      login: "Connexion",
      admin: "Administrateur",
      privacy: "Confidentialité",
      terms: "Conditions",
      contact: "Contact",
      copyright: "© {year} Mdisells Sport ParlAI. Tous droits réservés.",
      notifications: "Notifications",
      howToPlay: "Comment jouer",
      faq: "FAQ",
      insights: "Aperçus",
      fantasy: "Fantaisie"
    },
    wallet: {
      connectWallet: "Connecter le portefeuille",
      disconnectWallet: "Déconnecter le portefeuille",
      walletConnected: "Portefeuille connecté"
    },
    navigation: {
      selectLanguage: "Sélectionner la langue"
    }
  },
  de: {
    common: {
      connect: "Verbinden",
      disconnect: "Trennen",
      home: "Startseite",
      sports: "Sport",
      parlays: "Parlays",
      bots: "Bots",
      profile: "Profil",
      login: "Anmelden",
      admin: "Administrator",
      privacy: "Datenschutz",
      terms: "Nutzungsbedingungen",
      contact: "Kontakt",
      copyright: "© {year} Mdisells Sport ParlAI. Alle Rechte vorbehalten.",
      notifications: "Benachrichtigungen",
      howToPlay: "Spielanleitung",
      faq: "FAQ",
      insights: "Einblicke",
      fantasy: "Fantasy"
    },
    wallet: {
      connectWallet: "Wallet verbinden",
      disconnectWallet: "Wallet trennen",
      walletConnected: "Wallet verbunden"
    },
    navigation: {
      selectLanguage: "Sprache auswählen"
    }
  },
  es: {
    common: {
      connect: "Conectar",
      disconnect: "Desconectar",
      home: "Inicio",
      sports: "Deportes",
      parlays: "Parlays",
      bots: "Bots",
      profile: "Perfil",
      login: "Iniciar sesión",
      admin: "Administrador",
      privacy: "Privacidad",
      terms: "Términos",
      contact: "Contacto",
      copyright: "© {year} Mdisells Sport ParlAI. Todos los derechos reservados.",
      notifications: "Notificaciones",
      howToPlay: "Cómo jugar",
      faq: "Preguntas frecuentes",
      insights: "Perspectivas",
      fantasy: "Fantasía"
    },
    wallet: {
      connectWallet: "Conectar billetera",
      disconnectWallet: "Desconectar billetera",
      walletConnected: "Billetera conectada"
    },
    navigation: {
      selectLanguage: "Seleccionar idioma"
    }
  },
  hi: {
    common: {
      connect: "कनेक्ट करें",
      disconnect: "डिस्कनेक्ट करें",
      home: "होम",
      sports: "खेल",
      parlays: "पारले",
      bots: "बॉट्स",
      profile: "प्रोफ़ाइल",
      login: "लॉग इन",
      admin: "एडमिन",
      privacy: "प्राइवेसी",
      terms: "नियम और शर्तें",
      contact: "संपर्क",
      copyright: "© {year} Mdisells Sport ParlAI. सर्वाधिकार सुरक्षित।",
      notifications: "सूचनाएं",
      howToPlay: "कैसे खेलें",
      faq: "सामान्य प्रश्न",
      insights: "अंतर्दृष्टि",
      fantasy: "फैंटेसी"
    },
    wallet: {
      connectWallet: "वॉलेट कनेक्ट करें",
      disconnectWallet: "वॉलेट डिस्कनेक्ट करें",
      walletConnected: "वॉलेट कनेक्टेड"
    },
    navigation: {
      selectLanguage: "भाषा चुनें"
    }
  },
  sw: {
    common: {
      connect: "Unganisha",
      disconnect: "Kutenganisha",
      home: "Nyumbani",
      sports: "Michezo",
      parlays: "Parlays",
      bots: "Bots",
      profile: "Wasifu",
      login: "Ingia",
      admin: "Msimamizi",
      privacy: "Faragha",
      terms: "Masharti",
      contact: "Mawasiliano",
      copyright: "© {year} Mdisells Sport ParlAI. Haki zote zimehifadhiwa.",
      notifications: "Taarifa",
      howToPlay: "Jinsi ya Kucheza",
      faq: "Maswali Yanayoulizwa Mara Nyingi",
      insights: "Ufahamu",
      fantasy: "Fantasia"
    },
    wallet: {
      connectWallet: "Unganisha Pochi",
      disconnectWallet: "Kutenganisha Pochi",
      walletConnected: "Pochi Imeunganishwa"
    },
    navigation: {
      selectLanguage: "Chagua Lugha"
    }
  }
}
