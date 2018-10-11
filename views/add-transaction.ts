import { LitElement, html, property } from '@polymer/lit-element'
import '@material/mwc-button'
import '@material/mwc-chip'

import connect from '../store'
import { navigate } from '../actions'
import { TransactionTemplate } from '../interfaces'

export default class AddTransaction extends connect(LitElement) {
  @property({ type: Object })
  labels :any

  @property({ type: Object })
  transaction :TransactionTemplate

  _stateChanged (state) {
    this.labels = state.labels
  }

  get valid () {
    return this.transaction && this.transaction.agent
  }

  private save () {
    this.requestUpdate();
    navigate('transactions')
  }

  private cancel () {
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('cancel'))
    navigate('transactions')
  }

  render () {
    const { labels, transaction, cancel, save, valid } = this
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
                label=${transaction.agent.name}
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
    `
  }
}

customElements.define('add-transaction', AddTransaction)