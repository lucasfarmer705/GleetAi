import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;
const LEADS_FILE = path.join(process.cwd(), "leads.json");

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Ensure the leads file exists on startup
async function initLeadsFile() {
  try {
    await fs.access(LEADS_FILE);
  } catch {
    // Write an initial empty array
    await fs.writeFile(LEADS_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

// Lazy Gemini client initialization matching instructions
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// Industry configurations for the Gleet AI Sandbox Simulator
const INDUSTRY_PRESETS: Record<string, { systemInstruction: string; name: string; mockReplies: string[] }> = {
  hvac: {
    name: "Gleet HVAC Assistant (for Elite Air Solutions)",
    systemInstruction: `You are the friendly, professional, instant AI front-desk scheduler for "Elite Air Solutions".
Your job is to answer customer questions and book a service appointment.
Customer context: They want air conditioning or heating help.
Keep answers under 3 sentences!
Always be friendly and helpful. Be proactive in asking for their name, phone number, and preferred date/time (e.g., tomorrow morning at 9am) so we can schedule them.
Once they specify a date or block of time, reply confirming you've booked them into our calendar slot!`,
    mockReplies: [
      "Hello! Thanks for reaching out to Elite Air Solutions. I can help resolve your heating or AC issues right away. What's the best name for your account, and what kind of issue are you experiencing today?",
      "I can definitely get an HVAC technician out to take a look. We have slots open tomorrow afternoon or Wednesday morning. Would either of those fit your schedule?",
      "Perfect! I've booked you in for our technician's visit tomorrow at 2:00 PM. I'm texting a confirmation link to your phone now. Let me know if you need anything else!"
    ]
  },
  plumbing: {
    name: "Gleet Plumbing Assistant (for FlowForce Plumbers)",
    systemInstruction: `You are the expert, ultra-fast AI scheduler for "FlowForce Plumbers".
Answering inquiries politely and scheduling plumbers for leaks, drains, or water heaters.
Keep responses concise (less than 3 sentences).
Ask for their name, address/phone, and check availability.
Suggest slots: today at 4 PM or tomorrow morning. Book it when they agree!`,
    mockReplies: [
      "Hi! Welcome to FlowForce Plumbers. What's the emergency or plumbing project I can get scheduled for you today?",
      "A leak under the kitchen sink should definitely be checked. We have a master plumber available today at 4:30 PM, or tomorrow at 9:00 AM. Which service window works best?",
      "Got it! Scheduled. Your master plumber is booked for tomorrow morning at 9:00 AM. We've locked in the slot, and we'll text you when they are on their way!"
    ]
  },
  realestate: {
    name: "Gleet Realty Assistant (for Apex Homes Group)",
    systemInstruction: `You are the polite real estate leasing AI assistant for "Apex Homes Group".
Your goal is to answer questions about active properties and book a home viewing.
Be warm, professional, and descriptive but keep it under 3 sentences.
Offer immediate touring slots for viewings. Ask for their email and phone.`,
    mockReplies: [
      "Hello! Thank you for inquiring about Apex Homes Group listings. We have beautiful homes and luxury apartments available. Which specific property or neighborhood are you interested in viewing?",
      "Excellent choice! That 3-bedroom on Elm Street is gorgeous. We have viewings available tomorrow at 11:00 AM or Saturday at 2:00 PM. Do you have a preference?",
      "Fabulous! I have locked in your tour of 142 Elm Street for tomorrow at 11:00 AM. I am sending the calendar invite and directions to your email now. See you then!"
    ]
  },
  general: {
    name: "Gleet AI Standard Business Bot",
    systemInstruction: `You are Gleet AI's customer representative bot.
Your goal is to explain how Gleet AI books appointments and follows up with leads via SMS/Email automatically.
Be super concise and professional. Invite them to schedule a demo.`,
    mockReplies: [
      "Welcome to Gleet AI! I'm an example of our live customer booking assistant. How does your business currently handle inbound leads?",
      "That is exactly the problem we solve. Gleet AI monitors your website inquiries, webhooks, and SMS channels 24/7/365, engaging leads in under 15 seconds to book service appointments directly. Would you like to check out some of our industry presets or schedule a live screen-share demo?",
      "Great! Just fill out our demo request form right on this page, and our founding team will meet with you to construct your custom training workflow!"
    ]
  }
};

// --- API ROUTES ---

// Upload direct custom headshot
app.post("/api/upload-headshot", async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "Missing headshot image content." });
    }

    // Handle base64 extraction
    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(cleanBase64, "base64");

    const assetsDir = path.join(process.cwd(), "assets");
    await fs.mkdir(assetsDir, { recursive: true });

    const targetPath = path.join(assetsDir, "lucas_farmer_headshot.jpg");
    await fs.writeFile(targetPath, buffer);

    console.log("Uploaded and wrote headshot directly to:", targetPath);

    return res.json({
      success: true,
      url: "/assets/lucas_farmer_headshot.jpg?t=" + Date.now()
    });
  } catch (error) {
    console.error("Error saving headshot:", error);
    return res.status(500).json({ error: "Failed to save the headshot image on server." });
  }
});

// Check if a custom headshot has been uploaded on this server
app.get("/api/headshot-status", async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "assets", "lucas_farmer_headshot.jpg");
    await fs.access(filePath);
    return res.json({ exists: true, url: "/assets/lucas_farmer_headshot.jpg?t=" + Date.now() });
  } catch {
    return res.json({ exists: false });
  }
});

// Submit a Demo Request / Lead Form
app.post("/api/demo", async (req, res) => {
  try {
    const { name, businessName, email, phone, industry, message } = req.body;

    // Validate inputs
    if (!name || !businessName || !email) {
      return res.status(400).json({ error: "Missing required fields: name, businessName, and email are mandatory." });
    }

    // Read current leads
    let leads = [];
    try {
      const data = await fs.readFile(LEADS_FILE, "utf-8");
      leads = JSON.parse(data);
    } catch {
      leads = [];
    }

    // Append new lead with timestamp
    const newLead = {
      id: "lead_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      name,
      businessName,
      email,
      phone: phone || "",
      industry: industry || "Other",
      message: message || "",
      createdAt: new Date().toISOString()
    };

    leads.push(newLead);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");

    return res.status(201).json({
      success: true,
      message: "Lead successfully captured. Thank you for your interest!",
      lead: newLead
    });
  } catch (error: any) {
    console.error("Error saving lead:", error);
    return res.status(500).json({ error: "An error occurred while saving your lead request." });
  }
});

// Retrieve captured leads (For Owner Dashboard review)
app.get("/api/leads", async (req, res) => {
  try {
    let leads = [];
    try {
      const data = await fs.readFile(LEADS_FILE, "utf-8");
      leads = JSON.parse(data);
    } catch {
      leads = [];
    }
    // Sort youngest first
    leads.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return res.json({ leads });
  } catch (error) {
    console.error("Error retrieving leads:", error);
    return res.status(500).json({ error: "Failed to retrieve leads." });
  }
});

// Simulator chat endpoint (Accepts a message history and selected business type)
app.post("/api/simulate", async (req, res) => {
  try {
    const { messages, industry } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid message history format." });
    }

    const selectedIndustry = (industry && INDUSTRY_PRESETS[industry]) ? industry : "general";
    const preset = INDUSTRY_PRESETS[selectedIndustry];

    const ai = getGeminiClient();

    if (ai) {
      try {
        // Map message history to standard system instructions + dialogue block
        // We compile the history for generateContent
        const formattedHistory = messages.map(msg => 
          `${msg.sender === "user" ? "Customer" : "Gleet AI Assistant"}: ${msg.content}`
        ).join("\n");

        const prompt = `System Environment Instruction:
${preset.systemInstruction}

Here is the conversation so far:
${formattedHistory}

Gleet AI Assistant:`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt
        });

        const replyText = response.text || "I'm sorry, I'm having trouble formulating a response right now.";
        return res.json({
          reply: replyText,
          assistantName: preset.name,
          source: "gemini-api"
        });
      } catch (geminiError) {
        console.error("Gemini API call failed, falling back to smart rule-replies:", geminiError);
      }
    }

    // --- FALLBACK SMART REPLIES (if Gemini API key is missing or failed) ---
    // Count user messages to send the next logical preset response
    const userMessageCount = messages.filter(m => m.sender === "user").length;
    const replyIndex = Math.min(userMessageCount - 1, preset.mockReplies.length - 1);
    const fallbackReply = preset.mockReplies[replyIndex >= 0 ? replyIndex : 0];

    return res.json({
      reply: fallbackReply,
      assistantName: preset.name,
      source: "fallback-smart-rule"
    });

  } catch (error) {
    console.error("Simulation error:", error);
    return res.status(500).json({ error: "Failed to simulate agent response." });
  }
});

// Setup server and router configurations
async function startServer() {
  await initLeadsFile();

  // Serve persistent uploaded assets statically in both dev and prod
  app.use("/assets", express.static(path.join(process.cwd(), "assets")));

  // Vite development middleware vs Static Production bundle
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Gleet AI server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
