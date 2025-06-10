
interface EmotionData {
  emotion: string;
  percentage: number;
}

/**
 * Legacy function - kept for backwards compatibility
 * Now that we use OpenAI directly, this is mainly for fallback purposes
 */
export const generateCopilotPrompt = (emotions: EmotionData[]): string => {
  const sortedEmotions = [...emotions].sort((a, b) => b.percentage - a.percentage);
  const topEmotions = sortedEmotions.slice(0, 3);
  const emotionDescription = topEmotions
    .map(e => `${e.emotion} (${e.percentage}%)`)
    .join(', ');

  const prompt = `I am currently working with a student living with autism and they are experiencing ${emotionDescription}. How do I assist them as an instructor?

Please provide:
1. Specific strategies for responding to these emotional states in a student with autism
2. Communication approaches that would be most effective given these emotions
3. Potential triggers that might be causing these emotions and how to address them
4. Activities or coping mechanisms that might help regulate these emotions
5. Signs to watch for if these emotions may escalate and how to prevent that

Please format your response in clear, concise sections that are easy to understand and implement in an educational setting.`;

  return prompt.trim();
};

/**
 * @deprecated Use OpenAI service directly instead
 */
export const sendToCopilot = async (prompt: string): Promise<string> => {
  console.log("This function is deprecated. Use OpenAI service directly.");
  return "Please use the OpenAI integration for generating recommendations.";
};
