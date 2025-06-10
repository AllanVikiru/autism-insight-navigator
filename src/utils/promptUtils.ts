
export const generatePromptText = (predominantEmotion: string): string => {
  return `I am currently working with a student living with autism and they are experiencing ${predominantEmotion}. How do I assist them as an instructor?

Please provide:
1. Specific strategies for responding to this emotional state in a student with autism
2. Communication approaches that would be most effective given this emotion
3. Potential triggers that might be causing this emotion and how to address them
4. Activities or coping mechanisms that might help regulate this emotion
5. Signs to watch for if this emotion may escalate and how to prevent that

Please format your response in clear, concise sections that are easy to understand and implement in an educational setting.`;
};

export const getFriendlyErrorMessage = (error: string): string => {
  if (error.includes('API key')) {
    return 'It looks like the AI service needs to be configured. Please check your settings and try again.';
  }
  
  if (error.includes('network') || error.includes('fetch')) {
    return 'We\'re having trouble connecting to our AI service. Please check your internet connection and try again.';
  }
  
  if (error.includes('rate limit') || error.includes('quota')) {
    return 'Our AI service is currently busy. Please wait a moment and try again.';
  }
  
  if (error.includes('timeout')) {
    return 'The AI service is taking longer than expected. Please try again in a moment.';
  }
  
  return 'We encountered an issue generating recommendations. Please try again or use the manual prompt below with Microsoft Copilot.';
};
