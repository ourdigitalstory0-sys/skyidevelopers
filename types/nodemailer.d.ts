declare module 'nodemailer' {
  export interface SendMailOptions {
    from?: string;
    to?: string | string[];
    subject?: string;
    text?: string;
    html?: string;
    replyTo?: string;
  }

  export interface Transporter {
    sendMail(options: SendMailOptions): Promise<{ messageId: string }>;
  }

  export function createTransport(options: {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: {
      user?: string;
      pass?: string;
    };
  }): Transporter;
}
