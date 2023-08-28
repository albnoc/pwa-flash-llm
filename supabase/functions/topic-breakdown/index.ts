import 'https://deno.land/x/xhr@0.3.0/mod.ts';
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
// import { CreateCompletionRequest } from 'https://esm.sh/openai@3.1.0';

serve(async (req) => {
  const { topicName } = await req.json();

  const completionConfig: CreateCompletionRequest = {
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
    stream: false,
  };

  return fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(completionConfig),
  });
});

