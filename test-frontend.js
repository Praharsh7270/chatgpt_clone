// Test the frontend Gemini API call
const API_KEY = "AIzaSyCa0IXyKdXyoUFPFIfNXHHH4cLMjcvtGOw";

async function testFrontendGemini() {
  try {
    console.log("Testing frontend Gemini API...");
    
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
                  text: "Say 'Hello, Gemini is working!' in one sentence."
                }
              ]
            }
          ]
        })
      }
    );

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Full response data:", data);
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const result = data.candidates[0].content.parts[0].text;
      console.log("✅ Success! Response:", result);
      return result;
    } else {
      console.error("❌ No valid response in data:", data);
      throw new Error('No response from Gemini API');
    }
  } catch (error) {
    console.error("❌ Error details:", error);
    console.error("❌ Error message:", error.message);
    throw error;
  }
}

// Run the test
testFrontendGemini(); 