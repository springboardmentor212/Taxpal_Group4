import "dotenv/config";
const getOpenAIAPIResponse = async (message) => {
  if (!message) {
    throw new Error("Message is required");
  }
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );
    const data = await response.json();
    return data;
  } 
  catch (err) {
    console.error("OpenAI API Error:", err);
    throw err;
  }
};
export default getOpenAIAPIResponse;