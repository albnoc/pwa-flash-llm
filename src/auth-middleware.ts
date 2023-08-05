import { supabase } from './supabase-client';

export function createAuthPlugin() {
  return {
    shouldNavigate: (context: any) => ({
      condition: async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log(context, user);
        return user !== null; // Returns true if a user is logged in, false otherwise
      },
      redirect: '/signin', // If the condition is false, redirect to the signin page
    }),
    beforeNavigation: (context: any) => {},
    afterNavigation: (context: any) => {},
  };
}

