import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '../../../components/topic-item';
import { supabase } from '../../../supabase-client';
import { styles } from '../../../styles/shared-styles';

@customElement('topic-page')
export class TopicPage extends LitElement {
  @property({ type: String }) topicId = '';

  @property() subtopics: string[] = [];
  topicName = '';

  static get styles() {
    return [
      styles,
      css`
        #container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 0px 18px;
        }
        .empty-state {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px; /* Adjust as needed */
          font-style: italic;
          color: #888; /* Adjust as needed */
        }
      `,
    ];
  }

  async firstUpdated() {
    try {
      let { data: parentTopic, error: parentTopicError } = await supabase
        .from('topic')
        .select('id, name')
        .eq('id', Number(this.topicId));

      let { data: topic, error } = await supabase
        .from('topic')
        .select('id, name')
        .eq('parent_id', Number(this.topicId));

      if (error) {
        console.error('Error fetching subtopics:', error);
      }
      if (parentTopicError) {
        console.error('Error fetching parent:', error);
      } else {
        this.subtopics = topic?.map((t) => t.name) ?? [];
        this.topicName = parentTopic?.[0].name ?? '';
      }
    } catch (err) {
      console.error('Unexpected error fetching subtopics:', err);
    }
  }

  render() {
    return html`
      <app-header ?enableBack="${true}" title="${this.topicName}"></app-header>

      <main>
        <sl-card id="container">
          <div id="subtopicsGrid">
            ${this.subtopics.length
              ? this.subtopics.map(
                  (subtopic, _index) => html`
                    <topic-item .label=${subtopic}></topic-item>
                  `
                )
              : html` <div class="empty-state">No subtopics available.</div> `}
          </div>
        </sl-card>
      </main>
      <bottom-navigation active-route="home"></bottom-navigation>
    `;
  }
}

