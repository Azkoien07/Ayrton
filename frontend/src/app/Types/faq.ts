export interface Question {
    question: string;
    answer: string;
}

// Data
export const questions: Question[] = [
    { question: '¿Cómo puedo empezar?', answer: 'Puedes comenzar registrándote en nuestra página principal y creando tu primer proyecto.' },
    { question: '¿Ayrton es gratuito?', answer: 'Sí, ofrecemos una versión gratuita con características esenciales. También tenemos planes premium para equipos grandes.' },
    { question: '¿Cómo se integran las herramientas externas?', answer: 'Ayrton soporta integraciones fáciles con herramientas populares como GitHub, Slack y Google Drive.' },
];