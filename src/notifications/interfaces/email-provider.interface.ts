export interface IEmailProvider {
    sendEmail(options: { to: string; subject?: string; body?: string; templateId?: number; params?: Record<string, any> }): Promise<void>;
  }