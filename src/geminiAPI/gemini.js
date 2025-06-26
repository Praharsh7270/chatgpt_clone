// Frontend-only Gemini API integration using fetch
// TODO: Replace with your valid Gemini API key from https://makersuite.google.com/app/apikey
const API_KEY = "AIzaSyBzf650CAR4N8o6NdEO431yaZd3JkLA1Pc"; // Replace this with your new API key

// Function to generate content using Gemini REST API
export async function generateResponse(prompt) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
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
      } else if (response.status === 500) {
        errorMessage = "Server error. Please try again later.";
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('No response from Gemini API');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
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
