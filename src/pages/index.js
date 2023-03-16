import { useState } from "react";
import axios from "axios";
import Head from "next/head";

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
    <>
      <Head>
        <title>OpenAI Chat</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="A description of your application" />
        <meta property="og:description" content="An OpenAI Chat" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-3xl font-semibold mb-6 text-center text-blue-600">
            Ask a Question
          </h1>
          <div className="flex flex-col space-y-4">
            <textarea
              className="resize-none p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
              rows="6"
              placeholder="Enter your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 focus:outline-none"
              onClick={handleAsk}
            >
              Ask
            </button>
            {answer && (
              <div className="bg-gray-100 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-blue-600">
                  Answer:
                </h2>
                <p className="text-gray-700">{answer}</p>
              </div>
            )}
          </div>
        </div>
        <footer className="bg-gray-800 w-full mt-auto py-4">
          <div className="text-center text-white">
            &copy; {new Date().getFullYear()} Florin Dobinciuc. All rights
            reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
