import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Resend lazily
let resend: Resend | null = null;
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey && process.env.NODE_ENV === "production") {
    console.warn("RESEND_API_KEY is missing. Emails will not be sent.");
    return null;
  }
  if (!resend && apiKey) {
    resend = new Resend(apiKey);
  }
  return resend;
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { category, name, email, scenario } = req.body;
    
    console.log("New Contact Form Submission received.");
    
    const resendClient = getResend();
    
    if (resendClient) {
      try {
        const { data, error } = await resendClient.emails.send({
          from: '子瓏官網 <onboarding@resend.dev>',
          to: ['pocket12012076@gmail.com'],
          subject: `【官網聯絡】來自 ${name} 的新訊息`,
          replyTo: email,
          html: `
            <h2>收到新的聯絡表單申請</h2>
            <p><strong>分類：</strong> ${category}</p>
            <p><strong>姓名：</strong> ${name}</p>
            <p><strong>電子信箱：</strong> ${email}</p>
            <p><strong>內容描述：</strong></p>
            <p style="white-space: pre-wrap;">${scenario}</p>
          `,
        });

        if (error) {
          console.error("Resend Error:", error);
          return res.status(500).json({ success: false, message: "郵件發送失敗，請稍後再試。" });
        }

        console.log("Email sent successfully:", data?.id);
      } catch (err) {
        console.error("Server Error during email sending:", err);
        return res.status(500).json({ success: false, message: "伺服器錯誤，請稍後再試。" });
      }
    } else {
      // Fallback for development or missing API key
      console.log("--- EMAIL SIMULATION (No API Key) ---");
      console.log(`To: pocket12012076@gmail.com`);
      console.log(`Subject: New Contact from ${name}`);
      console.log(`Body: ${scenario}`);
      console.log("-------------------------------------");
    }

    res.json({ success: true, message: "您的訊息已成功送出，我會盡快回覆您。" });
  });

  app.post("/api/subscribe", async (req, res) => {
    const { email } = req.body;
    
    console.log("New Subscription request received.");
    
    const resendClient = getResend();
    
    if (resendClient) {
      try {
        const { data, error } = await resendClient.emails.send({
          from: '子瓏官網 <onboarding@resend.dev>',
          to: ['pocket12012076@gmail.com'],
          subject: `【官網訂閱】新訂閱者：${email}`,
          html: `
            <h2>收到新的訂閱申請</h2>
            <p><strong>電子信箱：</strong> ${email}</p>
            <p>該用戶已加入您的深度察覺體系訂閱名單。</p>
          `,
        });

        if (error) {
          console.error("Resend Error:", error);
          return res.status(500).json({ success: false, message: "訂閱失敗，請稍後再試。" });
        }

        console.log("Subscription Email sent successfully:", data?.id);
      } catch (err) {
        console.error("Server Error during subscription email sending:", err);
        return res.status(500).json({ success: false, message: "伺服器錯誤，請稍後再試。" });
      }
    } else {
      console.log("--- SUBSCRIPTION SIMULATION (No API Key) ---");
      console.log(`To: pocket12012076@gmail.com`);
      console.log(`Subject: New Subscription from ${email}`);
      console.log("--------------------------------------------");
    }

    res.json({ success: true, message: "訂閱成功！我們將在有新筆記時通知你。" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
