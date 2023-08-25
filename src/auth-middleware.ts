import { resolveRouterPath } from './router';
import { supabase } from './supabase-client';

export function createAuthPlugin() {
  return {
    shouldNavigate: (_context: any) => ({
      condition: async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        return user !== null; // Returns true if a user is logged in, false otherwise
      },
      redirect: resolveRouterPath('signin'), // If the condition is false, redirect to the signin page
    }),
    beforeNavigation: (_context: any) => {
      import('./pages/auth/signin-page/signin-page.js');
    },
    afterNavigation: (_context: any) => {},
  };
}

