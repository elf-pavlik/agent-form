import { LitElement, html, property } from '@polymer/lit-element'
import '@material/mwc-button'
import '@material/mwc-list'

import connect from '../store'
import { getRef, trimDate } from './util'
import { navigate } from '../actions'
import { Agent, Transaction } from '../interfaces'

export default class ListTransactions extends connect(LitElement) {
  @property({ type: Object })
  labels :any

  @property({ type: Array })
  transactions :Transaction[]

  @property({ type: Array })
  agents :Agent[]

  _stateChanged (state) {
    this.labels = state.labels
    this.transactions = state.transactions
    this.agents = state.agents
  }

  private listItemTemplate (transaction :Transaction) {
    return html`
      <mwc-list-item>
        ${getRef(transaction.agent, this.agents).name}
        (${trimDate(transaction.date)})
      </mwc-list-item>
    `
  }

  render () {
    const { labels, transactions, listItemTemplate } = this
    return html`
      <mwc-button
        unelevated
        icon="add"
        @click=${_ => navigate('add-transaction')}
      >${labels['add transaction']}</mwc-button>
      <ul>
        ${transactions.map(listItemTemplate.bind(this))}
      </ul>
    `
  }
}

customElements.define('list-transactions', ListTransactions)