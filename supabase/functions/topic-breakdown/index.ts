import 'https://deno.land/x/xhr@0.3.0/mod.ts';
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req, res) => {
  try {
    const { topicName } = await req.json();

    const supabaseClient = await getSupabaseClient(req);
    const user = await getAuthenticatedUser(supabaseClient);

    const topic = await findOrInsertTopic(supabaseClient, topicName);

    const subtopics = await getSubtopicsFromCompletion(topic.name);
    await insertSubtopics(supabaseClient, topic, subtopics);

    const body = JSON.stringify(topic);
    return new Response(body, {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    });
  } catch (error) {
    console.error(error);
    const body = JSON.stringify({ message: error.message });
    return new Response(body, {
      status: 500,
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    });
  }
});

async function getAuthenticatedUser(supabaseClient: any) {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (!user) throw new Error('User not authenticated');
  return user;
}

async function findOrInsertTopic(supabaseClient: any, topicName: string) {
  let { data: topic } = await supabaseClient
    .from('topic')
    .select('*')
    .eq('name', topicName);
  if (topic.length === 0) {
    const { data: insertedTopic } = await supabaseClient
      .from('topic')
      .insert([{ name: topicName, depth: 0, parent_id: null }]);
    topic = insertedTopic;
  }
  return topic[0];
}

async function getSubtopicsFromCompletion(topicName: string) {
  const response = await breakdownTopic(topicName);
  const completion = await response.json(); // Convert the raw response to JSON
  const content = JSON.parse(completion.choices[0].message.content);
  return content.subtopics;
}

async function insertSubtopics(
  supabaseClient: any,
  topic: any,
  subtopics: string[]
) {
  const newSubtopics = subtopics.map((sub) => ({
    name: sub,
    depth: topic.depth + 1,
    parent_id: topic.id,
  }));
  const { data, error } = await supabaseClient
    .from('topic')
    .insert(newSubtopics);
  if (error) throw error;
  console.log(data);
  return data;
}

async function getSupabaseClient(req) {
  const supabaseClient = createClient(
    // Supabase API URL - env var exported by default.
    Deno.env.get('SUPABASE_URL') ?? '',
    // Supabase API ANON KEY - env var exported by default.
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    // Create client with Auth context of the user that called the function.
    // This way your row-level-security (RLS) policies are applied.
    {
      global: { headers: { Authorization: req.headers.get('Authorization')! } },
      persistSession: false,
    }
  );

  return supabaseClient;
}

async function breakdownTopic(topicName: string) {
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
    stream: false,
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(completionConfig),
  });

  return response; // Return the raw response
}

