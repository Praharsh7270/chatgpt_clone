// Frontend-only Gemini API integration using fetch
// API key is now stored in .env file for security
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Available models to try (flash models often have higher limits)
const MODELS = [
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
  'gemini-1.5-pro',
  'gemini-1.5-pro-latest',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite'
];

// Function to generate content using Gemini REST API
export async function generateResponse(prompt) {
  if (!API_KEY) {
    throw new Error('Gemini API key not found. Please check your .env file.');
  }

  let lastError = null;
  
  // Try each model until one works
  for (const model of MODELS) {
    try {
      console.log(`Trying model: ${model}`);
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ]
          })
        }
      );

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        // Provide specific error messages for common status codes
        if (response.status === 429) {
          errorMessage = "Rate limit exceeded. Please wait a few minutes and try again.";
        } else if (response.status === 400) {
          errorMessage = "Invalid request. Please check your API key.";
        } else if (response.status === 403) {
          errorMessage = "Access denied. Please check your API key permissions.";
        } else if (response.status === 404) {
          errorMessage = `Model ${model} not found. Trying next model...`;
          console.log(errorMessage);
          lastError = new Error(errorMessage);
          continue; // Try next model
        } else if (response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        console.log(`✅ Success with model: ${model}`);
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('No response from Gemini API');
      }
    } catch (error) {
      console.error(`Error with model ${model}:`, error.message);
      lastError = error;
      
      // If it's a 404, try the next model
      if (error.message.includes('404') || error.message.includes('not found')) {
        continue;
      }
      
      // For other errors (rate limit, etc.), stop trying
      throw error;
    }
  }
  
  // If we get here, all models failed
  throw new Error('All available models failed. Please check your API key and try again later.');
}

// Test function for debugging
export async function testGemini() {
  try {
    const prompt = "Say 'Hello, Gemini is working!' in one sentence.";
    const response = await generateResponse(prompt);
    console.log("✅ Gemini Response:", response);
    return response;
  } catch (error) {
    console.error("❌ Test failed:", error);
    throw error;
  }
}
