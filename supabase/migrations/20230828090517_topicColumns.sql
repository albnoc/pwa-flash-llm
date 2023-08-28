ALTER TABLE public.topic
ADD depth integer,
ADD parent_id integer REFERENCES public.topic(id);