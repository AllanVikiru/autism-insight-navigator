
import OpenAI from 'openai';
import { generatePromptText, getFriendlyErrorMessage } from '@/utils/promptUtils';

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
      error: getFriendlyErrorMessage('API key not configured')
    };
  }

  if (!predominantEmotion) {
    return {
      recommendations: '',
      success: false,
      error: 'No emotion was detected in the image. Please try analyzing a clearer image.'
    };
  }

  try {
    const prompt = generatePromptText(predominantEmotion);

    console.log('Sending prompt to OpenAI:', prompt);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-2025-04-14',
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return {
      recommendations: '',
      success: false,
      error: getFriendlyErrorMessage(errorMessage)
    };
  }
};

export const isOpenAIConfigured = (): boolean => {
  return !!OPENAI_API_KEY;
};
