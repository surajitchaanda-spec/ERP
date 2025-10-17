import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  en: {
    translation: {
      auth: {
        welcome: 'Welcome back',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        loginCta: 'Sign in',
        loginError: 'Unable to sign in. Please try again.'
      },
      students: {
        linkPrompt: 'Link a student using an invitation code or QR code.',
        codeLabel: 'Invitation code',
        linkCta: 'Link student',
        linkError: 'Unable to link student. Check the code and try again.',
        linkHeader: 'Link a student',
        scanQrCta: 'Scan QR code',
        scanQrTitle: 'Scan invitation QR',
        scanQrMessage: 'Open the QR scanner to capture the student invitation code.'
      },
      dashboard: {
        title: 'Overview',
        attendanceTitle: 'Attendance',
        attendanceDesc: 'Current attendance performance',
        attendancePending: 'Attendance data pending',
        homeworkTitle: 'Homework due today',
        homeworkDesc: 'Assignments that require immediate attention',
        noHomework: 'No homework due today.',
        announcementsTitle: 'Announcements',
        noAnnouncements: 'No announcements right now.'
      },
      attendance: {
        title: 'Attendance history',
        date: 'Date',
        status: 'Status'
      },
      timetable: {
        title: 'Today\'s timetable',
        teacher: 'Teacher'
      },
      homework: {
        title: 'Homework',
        dueDate: 'Due {{date}}'
      },
      grades: {
        title: 'Grades',
        subject: 'Subject',
        exam: 'Exam',
        score: 'Score'
      },
      exams: {
        title: 'Exam schedule',
        venue: 'Venue'
      },
      fees: {
        title: 'Fees',
        due: 'Due',
        payNow: 'Pay now',
        paid: 'Paid',
        errorTitle: 'Payment failed',
        errorMessage: 'Please try again later.',
        razorpayTitle: 'Razorpay payment',
        launchRazorpay: 'Launch Razorpay checkout with session {{sessionId}}',
        stripeTitle: 'Stripe payment',
        launchStripe: 'Use client secret {{clientSecret}} with Stripe SDK.'
      },
      announcements: {
        title: 'Announcements',
        publishedAt: 'Published {{date}}'
      },
      messages: {
        placeholder: 'Send a message to the teacher'
      },
      calendar: {
        title: 'Calendar sync',
        syncCta: 'Sync to device calendar',
        permissionDenied: 'Calendar permission is required to sync events.',
        prefix: 'School',
        syncComplete: 'Events synced successfully.'
      },
      support: {
        title: 'Support & contact',
        email: 'Email support',
        phone: 'Call support',
        chat: 'Live chat',
        chatDesc: 'Talk to our team in real time.',
        language: 'Language'
      },
      nav: {
        dashboard: 'Dashboard',
        attendance: 'Attendance',
        timetable: 'Timetable',
        homework: 'Homework',
        grades: 'Grades',
        exams: 'Exams',
        fees: 'Fees',
        announcements: 'Announcements',
        messages: 'Messages',
        calendar: 'Calendar',
        support: 'Support'
      }
    }
  },
  hi: {
    translation: {
      auth: {
        welcome: 'वापसी पर स्वागत है',
        emailLabel: 'ईमेल',
        passwordLabel: 'पासवर्ड',
        loginCta: 'साइन इन करें',
        loginError: 'साइन इन करने में असमर्थ। कृपया पुनः प्रयास करें।'
      },
      support: {
        title: 'सहायता और संपर्क',
        email: 'ईमेल सहायता',
        phone: 'कॉल सहायता',
        chat: 'लाइव चैट',
        chatDesc: 'हमारी टीम से तुरंत बात करें।',
        language: 'भाषा'
      },
      students: {
        scanQrCta: 'QR कोड स्कैन करें',
        scanQrTitle: 'आमंत्रण QR स्कैन करें',
        scanQrMessage: 'छात्र आमंत्रण कोड कैप्चर करने के लिए QR स्कैनर खोलें।'
      }
    }
  },
  es: {
    translation: {
      auth: {
        welcome: 'Bienvenido de nuevo',
        emailLabel: 'Correo electrónico',
        passwordLabel: 'Contraseña',
        loginCta: 'Iniciar sesión',
        loginError: 'No se puede iniciar sesión. Inténtalo de nuevo.'
      },
      support: {
        title: 'Soporte y contacto',
        email: 'Soporte por correo',
        phone: 'Soporte telefónico',
        chat: 'Chat en vivo',
        chatDesc: 'Habla con nuestro equipo en tiempo real.',
        language: 'Idioma'
      },
      students: {
        scanQrCta: 'Escanear código QR',
        scanQrTitle: 'Escanear invitación QR',
        scanQrMessage: 'Abre el escáner QR para capturar el código de invitación del estudiante.'
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.locale.split('-')[0],
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
