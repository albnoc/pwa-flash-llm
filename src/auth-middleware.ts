import { supabase } from './supabase-client';
import { router } from './router';

const requireAuth =
  () =>
  async ({ resolve }: any) => {
    const user = supabase.auth.getUser();

    if (!user) {
      router.navigate('/signin');
      return;
    }

    return resolve();
  };

export default requireAuth;

