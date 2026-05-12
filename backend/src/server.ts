import dotenv from "dotenv";

// Carregar variáveis de ambiente PRIMEIRO, antes de qualquer outra importação
dotenv.config();

import express from "express";
import cors from "cors";
import { emailRouter } from "./routes/email.routes.js";
import { checkMailgunEnv, printEnvError } from "./utils/env-check.js";

const app = express();
const PORT = process.env.PORT || 3011;

// Debug: Mostrar qual porta está sendo usada
console.log(`📋 Configuração da porta: ${process.env.PORT ? `PORT=${process.env.PORT} (do .env)` : `PORT=${PORT} (padrão)`}`);

// Verificar variáveis de ambiente do Mailgun
const envCheck = checkMailgunEnv();
if (!envCheck.valid) {
  printEnvError(envCheck.missing);
  console.error("⚠️  O servidor será iniciado, mas o serviço de email não funcionará até que as variáveis sejam configuradas.\n");
}

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:8080",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Mautone Backend API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      sendEmail: "POST /api/email/send",
    },
  });
});

// Health check
app.get("/health", (req, res) => {
  const envStatus = checkMailgunEnv();
  res.json({ 
    status: "ok", 
    message: "Server is running",
    mailgun: {
      configured: envStatus.valid,
      missing: envStatus.missing,
    },
  });
});

// Routes
app.use("/api/email", emailRouter);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  if (envCheck.valid) {
    console.log(`📧 Email service ready (Mailgun configured)`);
  } else {
    console.log(`⚠️  Email service not configured - check your .env file`);
  }
});
