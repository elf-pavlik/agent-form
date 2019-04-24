import { LitElement, html, property } from 'lit-element'
import '@material/mwc-button'

import { getRef, trimDate } from './util'
import { Agent, Transaction } from '../interfaces'

import connect from '../connectMixin'
import { uiActor } from '../bootstrap'

export default class ListTransactions extends LitElement {
  @property({ type: Object })
  labels :any = {}

  @property({ type: Array })
  transactions :Transaction[] = []

  @property({ type: Array })
  agents :Agent[] = []

  private listItemTemplate (transaction :Transaction) {
    return html`
      <li
        @click=${_ => this.dispatchEvent(new CustomEvent('select-transaction', { detail: transaction }))}
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
        @click=${_ => this.dispatchEvent(new CustomEvent('add-transaction'))}
      >${labels['add transaction']}</mwc-button>
      <ul>
        ${transactions.map(listItemTemplate.bind(this))}
      </ul>
    `
  }
}

class ConnectedListTransactions extends connect (uiActor, ListTransactions) {

  mapStateToProps(state) {
    return {
      labels: state.labels,
      transactions: state.transactions,
      agents: state.agents
    }
  }

  mapEventsToActions(actions) {
    return {
      'select-transaction' (transaction) {
        return actions.navigate(`transactions/${transaction.id}`)
      },
      'add-transaction' () {
        return actions.navigate('add-transaction')
      }
    }
  }
}

customElements.define('list-transactions', ConnectedListTransactions)
