
interface EmotionData {
  emotion: string;
  percentage: number;
}

/**
 * Generates a prompt for Microsoft Copilot based on detected emotions
 * @param emotions Array of detected emotions with percentages
 * @returns A formatted prompt string ready to send to Microsoft Copilot
 */
export const generateCopilotPrompt = (emotions: EmotionData[]): string => {
  // Sort emotions by percentage (highest first)
  const sortedEmotions = [...emotions].sort((a, b) => b.percentage - a.percentage);
  
  // Extract top 3 emotions for a more focused prompt
  const topEmotions = sortedEmotions.slice(0, 3);
  
  // Create emotion description string
  const emotionDescription = topEmotions
    .map(e => `${e.emotion} (${e.percentage}%)`)
    .join(', ');

  // Generate the prompt
  const prompt = `
I'm working with a person who has autism and has shown the following emotions in a video: ${emotionDescription}.
 
Please provide:
1. Specific strategies for responding to these emotional states in someone with autism
2. Communication approaches that would be most effective given these emotions
3. Potential triggers that might be causing these emotions and how to address them
4. Activities or coping mechanisms that might help regulate these emotions
5. Signs to watch for if these emotions may escalate and how to prevent that

Please format your response in clear, concise sections that are easy to understand and implement.
`;

  return prompt.trim();
};

/**
 * Mock function for what would be an actual API call to Microsoft Copilot
 * This would be replaced with the actual implementation using Microsoft's API
 * @param prompt The prompt to send to Copilot
 */
export const sendToCopilot = async (prompt: string): Promise<string> => {
  console.log("Sending prompt to Microsoft Copilot API:", prompt);
  
  // In a real implementation, this would make an API call to Microsoft Copilot
  // return await actualCopilotApiCall(prompt);
  
  // For now, return a mock response
  return "This is where the Microsoft Copilot API response would appear. To implement the actual API call, you would need to use the official Microsoft Copilot API credentials and endpoints.";
};
