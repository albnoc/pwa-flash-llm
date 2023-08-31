create table public.flashcard (
  id integer primary key generated always as identity,
  topic_id integer REFERENCES public.topic(id);
  front text,
  back text,
);