import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: false,
});

async function generateContent(prompt: string, type: 'draft' | 'summarize') {
  try {
    const systemPrompt = type === 'draft' 
      ? "You are a helpful writing assistant. Transform the user's notes into a well-structured blog post or article. Make it engaging and professional."
      : "You are a helpful summarization assistant. Provide a concise, clear summary of the given content, highlighting the key points.";

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "No content generated";
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate content');
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, type } = await request.json();

    if (!prompt || !type) {
      return NextResponse.json(
        { error: 'Missing prompt or type' },
        { status: 400 }
      );
    }

    const content = await generateContent(prompt, type);

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
