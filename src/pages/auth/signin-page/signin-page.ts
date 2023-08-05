import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

// You can also import styles from another file
// if you prefer to keep your CSS seperate from your component
import { styles } from './signin-styles';

import { styles as sharedStyles } from '../../../styles/shared-styles';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import { router } from '../../../router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string
);

@customElement('signin-page')
export class SigninPage extends LitElement {
  static styles = [sharedStyles, styles];

  constructor() {
    super();
  }

  render() {
    return html`
      <app-header ?enableBack="${false}"></app-header>
      <main>
        <form @submit="${this._onSubmit}">
          <h2>Sign In</h2>
          <sl-input
            type="email"
            name="email"
            placeholder="Email"
            label="Email"
          ></sl-input>
          <sl-button type="submit" submit>Sign In</sl-button>
        </form>
      </main>
    `;
  }

  async _onSubmit(e: Event) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    });
    const { user, session } = data;

    if (error) {
      console.error('Error during sign in:', error);
      return;
    }
    console.log('Sign in successful:', user, session);
    // If the sign in is successful, navigate to the email sent page
    if (user || session) {
      router.navigate('/email-sent');
    }
  }
}

