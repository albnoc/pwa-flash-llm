import { resolveRouterPath } from './router';
import { supabase } from './supabase-client';

export function createAuthPlugin() {
  return {
    shouldNavigate: async (_context: any) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      return {
        condition: () => user !== null,
        redirect: resolveRouterPath('signin'),
      };
    },
    beforeNavigation: (_context: any) => {},
    afterNavigation: (_context: any) => {},
  };
}

