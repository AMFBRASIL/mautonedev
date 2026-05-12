import { Request, Response } from "express";
import { emailService } from "../services/email.service.js";
import { z } from "zod";

const emailSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(3, "Assunto deve ter pelo menos 3 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export const sendEmail = async (req: Request, res: Response) => {
  try {
    // Validar dados
    const validatedData = emailSchema.parse(req.body);

    // Enviar email
    await emailService.sendContactEmail(validatedData);

    res.json({
      success: true,
      message: "Email enviado com sucesso!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Dados inválidos",
        errors: error.errors,
      });
    }

    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao enviar email. Tente novamente mais tarde.",
    });
  }
};
