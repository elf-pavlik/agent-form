import { LitElement, html, property } from '@polymer/lit-element'
import '@material/mwc-button'
import '@material/mwc-chip'
import '@material/mwc-formfield'
import '@material/mwc-list'

import connect from '../store'
import { getRef, trimDate } from './util'

import { navigate, selectDate, unselectDate, addTransaction, cancelTransaction } from '../actions'
import { TransactionTemplate, Agent, Person, Transaction } from '../interfaces'

import '../components/flow-item'

export default class AddTransaction extends connect(LitElement) {
  @property({ type: Object })
  user :Person

  @property({ type: Object })
  labels :any

  @property({ type: Object })
  transaction :TransactionTemplate

  @property({ type: Array })
  agents :Agent[]

  get transactionAgent () :Agent {
    return getRef(this.transaction.agent, this.agents)
  }

  get transactionDate () :string {
    return this.transaction.date ? trimDate(this.transaction.date) : ''
  }

  firstUpdated () {
    const dateInput = this.shadowRoot.querySelector('input[type=date]') as HTMLInputElement
    dateInput.addEventListener('input', (event) => {
      if (dateInput.value !== '') {
        selectDate(new Date(dateInput.value).toISOString())
      } else {
        unselectDate()
      }
    })
  }

  _stateChanged (state) {
    this.user = state.user
    this.labels = state.labels
    this.agents = state.agents
    this.transaction = state.newTransaction
  }

  get valid () {
    return this.transaction
      && this.transaction.agent
      && this.transaction.date
  }

  private save () {
    const transaction = this.transaction as Transaction
    const note = this.shadowRoot.querySelector('textarea').value
    if (note) transaction.note = note
    addTransaction(transaction)
    this.requestUpdate()
    navigate('transactions')
  }

  private cancel () {
    cancelTransaction()
    this.requestUpdate()
    navigate('transactions')
  }

  render () {
    const { labels, cancel, save, valid , user,
            transaction, transactionAgent, transactionDate } = this
    const header = html`
      <section>
        <mwc-button
          id="cancel"
          icon="cancel"
          @click=${cancel}
        >${labels['cancel']}</mwc-button>
        <mwc-button
          id="save"
          unelevated
          icon="check"
          ?disabled=${!valid}
          @click=${save}
        >${labels['save']}</mwc-button>
      </section>
    `
    const agentSection = html`
      <section>
        ${transaction.agent
          ? html`
              <mwc-chip
                label=${transactionAgent.name}
              ></mwc-chip>
          `
          : html `
              <mwc-button
                unelevated
                icon="list"
                @click=${_ => navigate('agents')}
              >${labels['select agent']}</mwc-button>
          `
        }
      </section>
    `
    return html`
      ${header}
      ${agentSection}
      <mwc-formfield>
        <input type="date" value=${transactionDate} />
      </mwc-formfield>
      <section>
        ${transaction.flows.map(flow => html`<flow-item .user=${user} .flow=${flow}></flow-item`)}
        <mwc-button
          unelevated
          icon="add"
          @click=${_ => navigate('add-flow')}
        >${labels['add flow']}</mwc-button>
      </section>
      <section>
        <label>${labels.note}</label>
        <div>
          <textarea value=${transaction.note}></textarea>
        </div>
      </section>
    `
  }
}

customElements.define('add-transaction', AddTransaction)