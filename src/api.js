import axios from "axios";

export const client = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    }
});

export const createAICompletions = async (message) => {
    const response = await client.post("/chat/completions", {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": message
            }
        ]
    })
    if (!response.data) {
        alert(response.data)
        return "<<Bad Request>>"
    }
    if (!response.data.choices) {
        alert(response.data)
        return "<<Bad Request>>"
    }
    return response.data.choices[0].message
}