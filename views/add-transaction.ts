import { LitElement, html, property } from '@polymer/lit-element'
import '@material/mwc-button'
import '@material/mwc-chip'
import '@material/mwc-formfield'

import cuid from 'cuid'

import connect from '../store'
import { getRef, trimDate } from './util'

import { navigate, selectDate, unselectDate, addTransaction, cancelTransaction } from '../actions'
import { TransactionTemplate, Agent, Transaction } from '../interfaces'

export default class AddTransaction extends connect(LitElement) {
  @property({ type: Object })
  labels :any

  @property({ type: String })
  view :string

  @property({ type: Object })
  transaction :TransactionTemplate

  @property({ type: Array })
  agents :Agent[]

  get transactionAgent () {
    return getRef(this.transaction.agent, this.agents)
  }

  get transactionDate () {
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
    this.labels = state.labels
    this.view = state.view
    this.agents = state.agents
    this.transaction = state.newTransaction
  }

  get valid () {
    return this.transaction
      && this.transaction.agent
      && this.transaction.date
  }

  private save () {
    const transaction = { id: cuid(), ...this.transaction } as Transaction
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
    const { labels, transaction, transactionAgent, transactionDate, cancel, save, valid } = this
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
        <label>${labels.note}</label>
        <div>
          <textarea value=${transaction.note}></textarea>
        </div>
      </section>
    `
  }
}

customElements.define('add-transaction', AddTransaction)