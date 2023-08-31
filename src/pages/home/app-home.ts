import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '../../components/topic-item';

import { styles } from '../../styles/shared-styles';
import { supabase } from '../../supabase-client';
import { resolveRouterPath, router } from '../../router';

@customElement('app-home')
export class AppHome extends LitElement {
  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = '';
  @property() topics: { id: number; topicName: string }[] = [];

  static get styles() {
    return [
      styles,
      css`
        #container {
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
      let { data: topic, error } = await supabase
        .from('topic')
        .select('id,name')
        .eq('depth', 0);

      if (error) {
        console.error('Error fetching topic:', error);
      } else {
        this.topics =
          topic?.map((t) => ({ id: t.id, topicName: t.name })) ?? [];
      }
    } catch (err) {
      console.error('Unexpected error fetching topic:', err);
    }
  }

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
  navigateToTopicPage(topic: string) {
    router.navigate(resolveRouterPath(`/topic/${topic}`));
  }
  render() {
    return html`
      <app-header title="Startup Topics"></app-header>

      <main>
        <div id="container">
          <sl-card id="welcomeCard">
            <div id="topicsGrid">
              ${this.topics.map(
                (topic, index) => html`
                  <topic-item
                    .label=${topic.topicName}
                    .color=${this.getColor(index)}
                    @click=${() => this.navigateToTopicPage(`${topic.id}`)}
                  ></topic-item>
                `
              )}
            </div>
          </sl-card>
        </div>
      </main>
      <bottom-navigation active-route="home"></bottom-navigation>
    `;
  }
}

