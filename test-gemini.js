import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCa0IXyKdXyoUFPFIfNXHHH4cLMjcvtGOw";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testGemini() {
  try {
    console.log("Testing Gemini API...");
    console.log("API Key (first 10 chars):", API_KEY.substring(0, 10) + "...");
    
    // Try different model names
    const models = ["gemini-pro", "gemini-1.5-pro", "gemini-1.0-pro"];
    
    for (const modelName of models) {
      try {
        console.log(`\nTrying model: ${modelName}`);
        
        const model = genAI.getGenerativeModel({ model: modelName });
        const prompt = "Say 'Hello, Gemini is working!' in one sentence.";
        
        console.log("Sending prompt:", prompt);
        
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        
        console.log("✅ Gemini Response:", response);
        console.log("✅ Gemini API is working with model:", modelName);
        return;
        
      } catch (modelError) {
        console.log(`❌ Model ${modelName} failed:`, modelError.message);
      }
    }
    
    console.log("❌ All models failed. Please check your API key.");
    
  } catch (error) {
    console.error("❌ General Error:", error.message);
    console.log("❌ Gemini API is not working properly.");
  }
}

testGemini(); 