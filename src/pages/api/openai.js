import axios from "axios";

async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    try {
      const openaiApiKey = process.env.OPENAI_API_KEY;
      const openaiApiUrl =
        "https://api.openai.com/v1/engines/davinci-codex/completions";

      const response = await axios.post(
        openaiApiUrl,
        {
          prompt: `${prompt}\nAnswer:`,
          max_tokens: 100,
          n: 1,
          stop: "\n",
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
        }
      );

      const answer = response.data.choices[0].text;

      // Remove any unnecessary characters, such as brackets and commas, from the answer.
      const cleanedAnswer = answer.replace(/[^a-zA-Z0-9\s\.\?]+/g, "").trim();

      // Return the cleaned answer to the client.
      res.status(200).json({ message: cleanedAnswer });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching response from OpenAI API" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export default handler;
