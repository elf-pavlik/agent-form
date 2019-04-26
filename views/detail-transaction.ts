import { LitElement, html, property } from 'lit-element'
import '@material/mwc-button'
import '@material/mwc-icon'

import { getRef, trimDate } from './util'
import { Agent, Person, Transaction } from '../interfaces'

import connect from '../connectMixin'
import { uiActor } from '../bootstrap'

import '../components/flow-item'

export default class DetailTransaction extends LitElement {
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

  back () {
    this.dispatchEvent(new CustomEvent('back'))
  }

  edit () {
  }

  render () {
    const { labels, back, edit, user,
      transaction, transactionAgent, transactionDate } = this
    const header = html`
      <section>
        <mwc-button
          id="back"
          icon="navigate_before"
          @click=${back}
        >${labels && labels['back']}</mwc-button>
        <mwc-button
          outlined
          id="edit"
          icon="create"
          @click=${edit}
        >${labels && labels['edit']}</mwc-button>
      </section>
    `
    const agentSection = html`
      <section>
        <span>
          ${transactionAgent && transactionAgent.name}
        </span>
      </section>
    `
    return html`
      ${header}
      ${agentSection}
      <p>${transactionDate}</p>
      <section>
        ${transaction && transaction.flows.map(flow => html`<flow-item .user=${user} .flow=${flow}></flow-item`)}
      </section>
      <section>
        ${transaction && transaction.note}
      </section>
    `
  }
}

class ConnectedDetailTransaction extends connect (uiActor, DetailTransaction) {

  mapStateToProps(state) {
    return {
      user: state.user,
      view: state.view,
      labels: state.labels,
      transaction: state.transactions.find(t => t.id === location.pathname.split('/').pop()),
      agents: state.agents
    }
  }

  mapEventsToActions(actions) {
    return {
      'back' () {
        return actions.navigate('transactions')
      }
    }
  }
}

customElements.define('detail-transaction', ConnectedDetailTransaction)