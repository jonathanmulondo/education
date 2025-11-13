import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { code, language, context, error_message } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert programming tutor specializing in embedded systems and Arduino development.

Your role is to help students debug their code by:
1. Identifying syntax errors
2. Explaining logical issues
3. Pointing out common pitfalls
4. Suggesting fixes with clear explanations
5. Teaching best practices
6. Warning about hardware safety issues

Be encouraging and educational. Focus on helping students understand WHY something is wrong, not just fixing it for them.

Respond in JSON format with:
{
  "has_errors": boolean,
  "errors": [{ "line": number, "column": number, "message": string, "severity": "error|warning|info", "type": "syntax|logic|runtime|style" }],
  "suggestions": [{ "title": string, "description": string, "code_snippet": string, "line": number }],
  "fixed_code": string (optional),
  "explanation": string
}`;

    const userPrompt = `Debug this ${language} code:

\`\`\`${language}
${code}
\`\`\`

${context ? `Context: ${context}` : ''}
${error_message ? `Error message: ${error_message}` : ''}

Please analyze the code and provide debugging help.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in debug-code endpoint:', error);

    // Fallback response if API fails
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        has_errors: false,
        errors: [],
        suggestions: [],
        explanation: 'AI debugging is not configured. Add your OPENAI_API_KEY to .env.local to enable this feature. For now, check your code for: common syntax errors, missing semicolons, incorrect pin modes, and proper Serial.begin() calls.',
      });
    }

    return NextResponse.json(
      { error: 'Failed to analyze code', details: error.message },
      { status: 500 }
    );
  }
}
