// docs for router https://github.com/thepassle/app-tools/blob/master/router/README.md

import { html } from 'lit';

if (!(globalThis as any).URLPattern) {
  await import('urlpattern-polyfill');
}

import { Router } from '@thepassle/app-tools/router.js';
import { lazy } from '@thepassle/app-tools/router/plugins/lazy.js';

import { createAuthPlugin } from './auth-middleware.js';

export const basePath: string = ensureSlashes(
  (import.meta as any).env.VITE_BASE_PATH || '/'
);
console.log(basePath);
export const router = new Router({
  routes: [
    {
      path: resolveRouterPath(''), // This should resolve to '/pwa-flash-llm/'
      title: 'Home',
      plugins: [
        {
          name: 'redirect',
          shouldNavigate: () => ({
            condition: () => false,
            redirect: resolveRouterPath('home'),
          }),
        },
      ],
    },
    {
      path: resolveRouterPath('home'),
      title: 'Home',
      plugins: [lazy(() => import('./pages/app-home.js')), createAuthPlugin()],
      render: () => html`<app-home></app-home>`,
    },
    {
      path: resolveRouterPath('profile'),
      title: 'Profile',
      plugins: [
        lazy(() => import('./pages/profile/profile-page.js')),
        createAuthPlugin(),
      ],
      render: () => html`<profile-page></profile-page>`,
    },
    {
      path: resolveRouterPath('flash'),
      title: 'Flash',
      plugins: [
        lazy(() => import('./pages/flash/flash.js')),
        createAuthPlugin(),
      ],
      render: () => html`<app-flash></app-flash>`,
    },
    {
      path: resolveRouterPath('signin'),
      title: 'Sign In',
      plugins: [import('./pages/auth/signin-page/signin-page.js')],
      render: () => html`<signin-page></signin-page>`,
    },
    {
      path: resolveRouterPath('email-sent'),
      title: 'Email Sent',
      plugins: [
        lazy(() => import('./pages/auth/email-sent-page/email-sent-page.js')),
      ],
      render: () => html`<email-sent-page></email-sent-page>`,
    },
    {
      path: `${resolveRouterPath()}*`,
      title: 'Not Found',
      render: () => {
        // Redirect to home
        window.location.href = resolveRouterPath();
        return html``; // This will not actually render anything because of the redirect above
      },
    },
    {
      path: '*',
      title: 'Home',
      plugins: [createAuthPlugin()],
      render: () => html`<app-home></app-home>`,
    },
  ],
});

// This function will resolve a path with whatever Base URL was passed to the vite build process.
// Use of this function throughout the starter is not required, but highly recommended, especially if you plan to use GitHub Pages to deploy.
// If no arg is passed to this function, it will return the base URL.

export function resolveRouterPath(unresolvedPath = ''): string {
  const route = `${basePath}${unresolvedPath}/`.replace(/\/+/g, '/');
  return route;
}

export function ensureSlashes(path: string): string {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  if (!path.endsWith('/')) {
    path = path + '/';
  }
  return path;
}

