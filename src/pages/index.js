import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    try {
      const response = await axios.post("/api/openai", { prompt: question });
      setAnswer(response.data.message);
    } catch (error) {
      console.error(error);
      setAnswer("Error fetching response from OpenAI API");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Ask a Question</h1>
        <div className="flex flex-col space-y-4">
          <textarea
            className="resize-none p-2 border rounded"
            rows="4"
            placeholder="Enter your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white font-semibold py-2 rounded"
            onClick={handleAsk}
          >
            Ask
          </button>
          {answer && (
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-lg font-semibold mb-2">Answer:</h2>
              <p>{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
