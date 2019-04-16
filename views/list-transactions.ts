import { LitElement, html, property } from 'lit-element'
import '@material/mwc-button'

import { getRef, trimDate } from './util'
import { navigate } from '../actions'
import { Agent, Transaction } from '../interfaces'

export default class ListTransactions extends LitElement {
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

  private select (transaction) {
    navigate(`transactions/${transaction.id}`)
  }

  private listItemTemplate (transaction :Transaction) {
    const select = this.select.bind(this)
    return html`
      <li
        @click=${_ => select(transaction)}
      >
        ${getRef(transaction.agent, this.agents).name}
        (${trimDate(transaction.date)})
      </li>
    `
  }

  render () {
    const { labels, transactions, listItemTemplate } = this
    return html`
      <style>
        li {
          cursor: pointer;
        }
      </style>
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