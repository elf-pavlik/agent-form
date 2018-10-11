import { LitElement, html, property } from '@polymer/lit-element'
import '@material/mwc-button'

import connect from '../store'
import { navigate } from '../actions'

export default class ListTransactions extends connect(LitElement) {
  @property({ type: Object })
  labels :any

  _stateChanged (state) {
    this.labels = state.labels
  }

  render () {
    const { labels } = this
    return html`
      <mwc-button
        unelevated
        icon="add"
        @click=${_ => navigate('add-transaction')}
      >${labels['add transaction']}</mwc-button>
    `
  }
}

customElements.define('list-transactions', ListTransactions)