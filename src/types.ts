export interface Lead {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  industry: string;
  message: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  content: string;
  timestamp: string;
}

export type IndustryType = "hvac" | "plumbing" | "realestate" | "general";

export interface IndustryOption {
  value: IndustryType;
  label: string;
  icon: string;
  description: string;
  samplePrompt: string;
}
