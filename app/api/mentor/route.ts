import { NextRequest, NextResponse } from 'next/server';
import type { MentorContext } from '@/types';

// This endpoint can use either OpenAI or Anthropic Claude
// Switch between them by setting the appropriate API key in .env.local

export async function POST(request: NextRequest) {
  try {
    const body: MentorContext = await request.json();
    const { project_id, step_id, user_query, conversation_history } = body;

    // Check which AI service is configured
    const openaiKey = process.env.OPENAI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    let response;

    if (openaiKey) {
      response = await handleOpenAI(user_query, conversation_history);
    } else if (anthropicKey) {
      response = await handleAnthropic(user_query, conversation_history);
    } else {
      // Fallback response when no API keys are configured
      return NextResponse.json({
        response:
          "I'm your AI mentor! To enable full AI capabilities, please configure either OPENAI_API_KEY or ANTHROPIC_API_KEY in your .env.local file.\n\nIn the meantime, I can help you understand:\n- Why certain components are used\n- How circuits work\n- What concepts are being applied\n- How to troubleshoot common issues\n\nWhat would you like to know?",
      });
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in mentor endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

async function handleOpenAI(
  userQuery: string,
  conversationHistory: any[]
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  const messages = [
    {
      role: 'system',
      content: `You are an expert STEM educator and mentor specializing in hands-on engineering projects. Your role is to:

1. Answer "why" and "how" questions about engineering concepts
2. Explain theoretical concepts in practical, relatable terms
3. Help students understand the connection between theory and practice
4. Provide helpful hints without giving away complete solutions
5. Encourage critical thinking and problem-solving
6. Be patient, encouraging, and supportive
7. Use analogies and examples from real-world applications

When students ask questions:
- Break down complex concepts into digestible parts
- Relate concepts to the specific project they're working on
- Provide relevant formulas when appropriate
- Suggest resources for deeper learning
- Ask guiding questions to help them think through problems

Keep responses concise (2-4 paragraphs) but informative.`,
    },
    ...conversationHistory.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
    {
      role: 'user',
      content: userQuery,
    },
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

async function handleAnthropic(
  userQuery: string,
  conversationHistory: any[]
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  const systemPrompt = `You are an expert STEM educator and mentor specializing in hands-on engineering projects. Your role is to:

1. Answer "why" and "how" questions about engineering concepts
2. Explain theoretical concepts in practical, relatable terms
3. Help students understand the connection between theory and practice
4. Provide helpful hints without giving away complete solutions
5. Encourage critical thinking and problem-solving
6. Be patient, encouraging, and supportive
7. Use analogies and examples from real-world applications

When students ask questions:
- Break down complex concepts into digestible parts
- Relate concepts to the specific project they're working on
- Provide relevant formulas when appropriate
- Suggest resources for deeper learning
- Ask guiding questions to help them think through problems

Keep responses concise (2-4 paragraphs) but informative.`;

  const messages = [
    ...conversationHistory.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
    {
      role: 'user',
      content: userQuery,
    },
  ];

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      system: systemPrompt,
      messages,
    }),
  });

  const data = await response.json();
  return data.content[0].text;
}
