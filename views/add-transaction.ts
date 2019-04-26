import { LitElement, html, property } from 'lit-element'
import '@material/mwc-button'
import '@material/mwc-formfield'

import { getRef, trimDate } from './util'

import { TransactionTemplate, Agent, Person, Transaction } from '../interfaces'

import connect from '../connectMixin'
import { uiActor } from '../bootstrap'


import '../components/flow-item'

export default class AddTransaction extends LitElement {
  @property({ type: Object })
  user :Person

  @property({ type: Object })
  labels :any

  @property({ type: Object })
  transaction :TransactionTemplate

  @property({ type: Array })
  agents :Agent[]

  get transactionAgent () :Agent {
    return this.transaction && getRef(this.transaction.agent, this.agents)
  }

  get transactionDate () :string {
    return this.transaction && this.transaction.date ? trimDate(this.transaction.date) : ''
  }

  firstUpdated () {
    const dateInput = this.shadowRoot.querySelector('input[type=date]') as HTMLInputElement
    dateInput.addEventListener('input', (event) => {
      if (dateInput.value !== '') {
        this.dispatchEvent(new CustomEvent('select-date', {
          detail: new Date(dateInput.value).toISOString()
        }))
      } else {
        this.dispatchEvent(new CustomEvent('unselect-date'))
      }
    })
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
    this.dispatchEvent(new CustomEvent('add-transaction', { detail: transaction } ))
    this.requestUpdate()
  }

  private cancel () {
    this.dispatchEvent(new CustomEvent('cancel'))
    this.requestUpdate()
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
        >${labels && labels['cancel']}</mwc-button>
        <mwc-button
          id="save"
          unelevated
          icon="check"
          ?disabled=${!valid}
          @click=${save}
        >${labels && labels['save']}</mwc-button>
      </section>
    `
    const agentSection = html`
      <section>
        ${transactionAgent
          ? html`
              <span>
                ${transactionAgent && transactionAgent.name}
              </span>
          `
          : html `
              <mwc-button
                unelevated
                icon="list"
                @click=${_ => this.dispatchEvent(new CustomEvent('select-agent'))}
              >${labels && labels['select agent']}</mwc-button>
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
        ${transaction && transaction.flows.map(flow => html`<flow-item .user=${user} .flow=${flow}></flow-item`)}
        <mwc-button
          unelevated
          icon="add"
          @click=${_ => this.dispatchEvent(new CustomEvent('add-flow'))}
        >${labels && labels['add flow']}</mwc-button>
      </section>
      <section>
        <label>${labels && labels.note}</label>
        <div>
          <textarea value=${transaction && transaction.note}></textarea>
        </div>
      </section>
    `
  }
}

class ConnectedAddTransaction extends connect (uiActor, AddTransaction) {

  mapStateToProps(state) {
    return {
      labels: state.labels,
      agents: state.agents,
      user: state.user,
      transaction: state.newTransaction
    }
  }

  mapEventsToActions(actions) {
    return {
      'select-date' (date) {
        return actions.selectDate(date)
      },
      'unselect-date' () {
        return actions.unselectDate()
      },
      'select-agent' () {
        return actions.navigate('agents')
      },
      'add-flow' () {
        return actions.navigate('add-flow')
      },
      'select-transaction' (transaction) {
        return actions.navigate(`transactions/${transaction.id}`)
      },
      'add-transaction' (transaction) {
        actions.addTransaction(transaction)
        return actions.navigate('transactions')
      },
      'cancel' () {
        actions.cancelTransaction()
        return actions.navigate('transactions')
      }
    }
  }
}

customElements.define('add-transaction', ConnectedAddTransaction)
