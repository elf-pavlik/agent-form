import { LitElement, html, property } from '@polymer/lit-element'
import '@material/mwc-button'
import '@material/mwc-chip'
import '@material/mwc-list'
import '@material/mwc-icon'

import connect from '../store'
import { getRef, trimDate } from './util'
import { navigate } from '../actions'
import { Agent, Person, Transaction } from '../interfaces'

export default class DetailTransaction extends connect(LitElement) {
  @property({ type: Object })
  user :Person

  @property({ type: String })
  view :string

  @property({ type: Object })
  labels :any

  @property({ type: Array })
  agents :Agent[]

  @property({ type: Object })
  transaction :Transaction

  get transactionAgent () {
    return this.transaction && getRef(this.transaction.agent, this.agents)
  }

  get transactionDate () {
    return (this.transaction && this.transaction.date) ? trimDate(this.transaction.date) : ''
  }


  _stateChanged (state) {
    this.user= state.user
    this.view= state.view
    this.labels = state.labels
    this.transaction = state.transactions.find(t => t.id === location.pathname.split('/').pop())
    this.agents = state.agents
  }

  back () {
    navigate('transactions')
  }

  edit () {
  }

  // TODO: extract into a component
  private listItemTemplate (flow) {
    return html`
      <mwc-list-item>
        <mwc-icon>${flow.provider !== this.user.id ? 'chevron_right' : ''}</mwc-icon>
        <span>${flow.quantity}</span>
        <span>${flow.unit === 'unit' ? '' : flow.unit}</span>
        <span class="classification">${flow.classification}</span>
        <mwc-icon>${flow.provider === this.user.id ? 'chevron_left' : ''}</mwc-icon>
      </mwc-list-item>
    `
  }

  render () {
    const { labels, back, edit, listItemTemplate,
      transaction, transactionAgent, transactionDate } = this
    const header = html`
      <section>
        <mwc-button
          id="back"
          icon="navigate_before"
          @click=${back}
        >${labels['back']}</mwc-button>
        <mwc-button
          outlined
          id="edit"
          icon="create"
          @click=${edit}
        >${labels['edit']}</mwc-button>
      </section>
    `
    const agentSection = html`
      <section>
        <mwc-chip
          label=${transactionAgent && transactionAgent.name}
        ></mwc-chip>
      </section>
    `
    return html`
      <style>
        .classification { padding-left: 5px; }
      </style>
      ${header}
      ${agentSection}
      <p>${transactionDate}</p>
      <section>
        ${transaction && transaction.flows.map(listItemTemplate.bind(this))}
      </section>
      <section>
        ${transaction && transaction.note}
      </section>
    `
  }
}

customElements.define('detail-transaction', DetailTransaction)