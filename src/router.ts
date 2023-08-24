// docs for router https://github.com/thepassle/app-tools/blob/master/router/README.md

import { html } from 'lit';

if (!(globalThis as any).URLPattern) {
  await import('urlpattern-polyfill');
}

import { Router } from '@thepassle/app-tools/router.js';
import { lazy } from '@thepassle/app-tools/router/plugins/lazy.js';

// @ts-ignore
import { title } from '@thepassle/app-tools/router/plugins/title.js';

import './pages/app-home.js';
import { createAuthPlugin } from './auth-middleware.js';

const baseURL: string = (import.meta as any).env.BASE_URL;
console.log(baseURL);
export const router = new Router({
  routes: [
    {
      path: resolveRouterPath(),
      title: 'Home',
      plugins: [createAuthPlugin()],
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
      plugins: [lazy(() => import('./pages/auth/signin-page/signin-page.js'))],
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
    // {
    //   path: resolveRouterPath('profile'),
    //   title: 'Profile',
    //   plugins: [
    //     lazy(() => import('./pages/app-profile/app-profile.js')),
    //   ],
    //   render: () => html`<app-profile></app-profile>`
    // },
    // {
    //   path: resolveRouterPath('settings'),
    //   title: 'Settings',
    //   plugins: [
    //     lazy(() => import('./pages/app-settings/app-settings.js')),
    //   ],
    //   render: () => html`<app-settings></app-settings>`
    // },
    // {
    //   path: resolveRouterPath('help'),
    //   title: 'Help',
    //   plugins: [
    //     lazy(() => import('./pages/app-help/app-help.js')),
    //   ],
    //   render: () => html`<app-help></app-help>`
    // },
    // {
    //   path: resolveRouterPath('search'),
    //   title: 'Search',
    //   plugins: [
    //     lazy(() => import('./pages/app-search/app-search.js')),
    //   ],
    //   render: () => html`<app-search></app-search>`
    // },
    // {
    //   path: resolveRouterPath('notifications'),
    //   title: 'Notifications',
    //   plugins: [
    //     lazy(() => import('./pages/app-notifications/app-notifications.js')),
    //   ],
    //   render: () => html`<app-notifications></app-notifications>`
    // },
    // {
    //   path: resolveRouterPath('activity'),
    //   title: 'Activity',
    //   plugins: [
    //     lazy(() => import('./pages/app-activity/app-activity.js')),
    //   ],
    //   render: () => html`<app-activity></app-activity>`
    // },
  ],
});

// This function will resolve a path with whatever Base URL was passed to the vite build process.
// Use of this function throughout the starter is not required, but highly recommended, especially if you plan to use GitHub Pages to deploy.
// If no arg is passed to this function, it will return the base URL.

export function resolveRouterPath(unresolvedPath?: string) {
  let resolvedPath = baseURL;
  if (unresolvedPath) {
    resolvedPath = resolvedPath + unresolvedPath;
  }

  return resolvedPath;
}

