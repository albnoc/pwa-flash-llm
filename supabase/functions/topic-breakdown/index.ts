// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

//@ts-ignore
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
//@ts-ignore
import { OpenAI } from 'https://deno.land/x/openai/mod.ts';

serve(async (req) => {
  // Parse the incoming request data.
  const { topicName } = await req.json();

  const openai = new OpenAI(Deno.env.get('OPENAI_API_KEY'));
  // Create a configuration for the OpenAI completion request.
  const completionConfig = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert in startups knowledge and create the best learning flashcards. Further more you break down particular topics in a structured way so that the student can learn the material in chunks. Right now the structure should allow up to three levels and create training cards for the particular subject. You should always return the result as json so that its consumable by an backend service.',
      },
      {
        role: 'user',
        content: `Breakdown the topic "${topicName}" into all relevant subtopics. Return the Topics in following examplary format: { "topic": "topicName", "subtopics": ["subtopic1", "subtopic2", "subtopic3"] }`,
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  // Fetch results from OpenAI.
  const completion = await openai.createChatCompletion(completionConfig);
  console.log(completion);

  return completion;

  // const data = await response.json();
  // console.log(data);
  // return data;
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'

