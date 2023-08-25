import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '../components/topic-item';

import { styles } from '../styles/shared-styles';
import { supabase } from '../supabase-client';

@customElement('app-home')
export class AppHome extends LitElement {
  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = 'Welcome!';
  @property() topics: string[] = [];

  static get styles() {
    return [
      styles,
      css`
        #welcomeBar {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        #welcomeCard,
        #infoCard {
          padding: 18px;
          padding-top: 0px;
        }

        sl-card::part(footer) {
          display: flex;
          justify-content: flex-end;
        }

        #topicsGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4px;
        }
        @media (horizontal-viewport-segments: 2) {
          #welcomeBar {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
          }

          #welcomeCard {
          }
        }
      `,
    ];
  }

  constructor() {
    super();
  }

  async firstUpdated() {
    try {
      let { data: topic, error } = await supabase.from('topic').select('name');

      if (error) {
        console.error('Error fetching topic:', error);
      } else {
        this.topics = topic?.map((t) => t.name) ?? [];
      }
    } catch (err) {
      console.error('Unexpected error fetching topic:', err);
    }
  }

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'PWABuilder pwa-starter',
        text: 'Check out the PWABuilder pwa-starter!',
        url: 'https://github.com/pwa-builder/pwa-starter',
      });
    }
  }
  // ... other properties ...

  getColor(index: number): string {
    const colors = [
      '#FAD02E',
      '#F28D35',
      '#D83367',
      '#635DFF',
      '#508BF9',
      '#2EC5CE',
      '#2ECC71',
      '#FEC007',
      '#FC5C65',
      '#26de81',
    ];
    return colors[index % colors.length];
  }

  render() {
    return html`
      <app-header></app-header>

      <main>
        <div id="welcomeBar">
          <sl-card id="welcomeCard">
            <div slot="header">
              <h2>${this.message}</h2>
            </div>

            <div id="topicsGrid">
              ${this.topics.map(
                (topic, index) => html`
                  <topic-item
                    .label=${topic}
                    .color=${this.getColor(index)}
                  ></topic-item>
                `
              )}
            </div>

            ${'share' in navigator
              ? html`<sl-button
                  slot="footer"
                  variant="primary"
                  @click="${this.share}"
                  >Share this Starter!</sl-button
                >`
              : null}
          </sl-card>
        </div>
      </main>
      <bottom-navigation active-route="home"></bottom-navigation>
    `;
  }
}

