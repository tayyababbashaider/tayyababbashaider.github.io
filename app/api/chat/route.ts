// app/api/chat/route.ts (App Router)
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { query, portfolioData } = await req.json();

    const systemPrompt = `
You are an AI assistant for ${portfolioData.name}'s portfolio website.
Title: ${portfolioData.title}
Contact: ${JSON.stringify(portfolioData.contact)}
Skills: ${(portfolioData.skills || []).join(", ")}
Profiles: ${JSON.stringify(portfolioData.profiles)}
Profile Summary: ${portfolioData.profile}
Experience: ${JSON.stringify(portfolioData.experience)}
Education: ${JSON.stringify(portfolioData.education)}
Projects: ${JSON.stringify(portfolioData.projects)}
Speaking Engagements: ${JSON.stringify(portfolioData.speaking)}

Your role:
1. Answer questions about ${portfolioData.name}'s skills, experience, projects, education
2. Be professional and concise
3. Only use the provided data
`;

    const res = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "command",
        message: query,
        preamble: systemPrompt,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await res.json();
    return NextResponse.json({ text: data.text ?? "Sorry, no response." });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ text: "Something went wrong." }, { status: 500 });
  }
}
