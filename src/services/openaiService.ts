import OpenAI from 'openai';

// OpenAI configuration - you only need to set your API key here
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

let openai: OpenAI | null = null;

// Initialize OpenAI client only if API key is provided
if (OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Required for browser usage
  });
}

export interface OpenAIPromptRequest {
  predominantEmotion: string;
}

export interface OpenAIResponse {
  recommendations: string;
  success: boolean;
  error?: string;
}

/**
 * Generates recommendations using OpenAI based on the predominant emotion
 */
export const generateRecommendations = async ({ predominantEmotion }: OpenAIPromptRequest): Promise<OpenAIResponse> => {
  if (!openai) {
    return {
      recommendations: '',
      success: false,
      error: 'OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in your environment variables.'
    };
  }

  if (!predominantEmotion) {
    return {
      recommendations: '',
      success: false,
      error: 'No emotion detected to generate recommendations for.'
    };
  }

  try {
    const prompt = `I am currently working with a student living with autism and they are experiencing ${predominantEmotion}. How do I assist them as an instructor?

Please provide:
1. Specific strategies for responding to this emotional state in a student with autism
2. Communication approaches that would be most effective given this emotion
3. Potential triggers that might be causing this emotion and how to address them
4. Activities or coping mechanisms that might help regulate this emotion
5. Signs to watch for if this emotion may escalate and how to prevent that

Please format your response in clear, concise sections that are easy to understand and implement in an educational setting.`;

    console.log('Sending prompt to OpenAI:', prompt);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an experienced special education instructor who specializes in supporting students with autism. Provide practical, actionable advice that can be immediately implemented in an educational setting.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7
    });

    const recommendations = completion.choices[0]?.message?.content || '';
    
    console.log('OpenAI response received:', recommendations);

    return {
      recommendations,
      success: true
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return {
      recommendations: '',
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate recommendations'
    };
  }
};

export const isOpenAIConfigured = (): boolean => {
  return !!OPENAI_API_KEY;
};
