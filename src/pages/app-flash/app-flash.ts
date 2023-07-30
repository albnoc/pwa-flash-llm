// flashcards-page.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
// import { getFlashCards } from './apiService';
// import './flashcard-component';
import '../../components/flashcard';

import { styles as sharedStyles } from '../../styles/shared-styles';

import '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('app-flashcards')
export class FlashcardsPage extends LitElement {
  static styles = [
    sharedStyles,
    // Insert your FlashcardsPage specific styles here
  ];

  @property({ type: String })
  topic: string = 'Topic';

  @property({ type: Array })
  cards: Array<any> = [];

  async updated(changedProps: Map<string | number | symbol, unknown>) {
    if (changedProps.has('topic')) {
      this.cards = [{cardId: 1,question:"Question 1",answer:"Answer 1"},{cardId: 2,question:"Question 2",answer:"Answer 2"}] //await getFlashCards(this.topic);
    }
  }

  render() {
    return html`
      <app-header ?enableBack="${true}"></app-header>

      <main>
        <h2>Topic: ${this.topic}</h2>

        ${this.cards.map(card =>
          html`
            <sl-card>
              <component-flashcard flashcard="${card}"></component-flashcard>
              <h2>${card.question}</h2>
              <p>${card.answer}</p>
            </sl-card>
          `
        )}
      </main>
    `;
  }
}
