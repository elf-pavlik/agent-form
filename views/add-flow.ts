import { LitElement, html, property } from '@polymer/lit-element'
import { Button } from '@material/mwc-button'
import FlowForm from '../components/flow-form.js'
customElements.define('flow-form', FlowForm)

import cuid from 'cuid'

import connect from '../store'
import { navigate, addFlow } from '../actions'
import { TransactionTemplate, Person, Agent } from '../interfaces'
import { getRef } from './util'

export default class AddFlow extends connect(LitElement) {
  @property({ type: Object })
  user :Person

  @property({ type: Object })
  transaction :TransactionTemplate

  @property({ type: Array })
  agents :Agent[]

  @property({ type: Array })
  units :string[]

  @property({ type: Array })
  categories :string[]

  @property({ type: Array })
  classifications :string[]

  @property({ type: Object })
  labels :any

  firstUpdated () {
    let form = this.shadowRoot.querySelector('flow-form') as FlowForm
    form.addEventListener('change', (event) => {
      this.requestUpdate()
    })
  }

  get transactionAgent () :Agent {
    return getRef(this.transaction.agent, this.agents)
  }


  get valid () :boolean {
    let form = this.shadowRoot.querySelector('flow-form') as FlowForm
    return !!(form && form.data.unit && form.data.quantity && form.data.category
      && form.data.classification && form.data.provider && form.data.receiver)
  }

  _stateChanged (state) {
    this.user = state.user
    this.labels = state.labels
    this.units = state.units
    this.categories = state.categories
    this.classifications = state.classifications
    this.transaction = state.newTransaction
    this.agents = state.agents
  }

  private save () {
    if (!this.valid) return
    let button = this.shadowRoot.querySelector('#save') as Button
    if (button.disabled) return
    let form = this.shadowRoot.querySelector('flow-form') as FlowForm
    addFlow({ id: cuid(), ...form.data })
    form.reset()
    this.requestUpdate()
    navigate('add-transaction')
  }

  private cancel () {
    let form = this.shadowRoot.querySelector('agent-form') as FlowForm
    form.reset()
    this.requestUpdate()
    navigate('add-transaction')
  }

  render () {
    const { user, transactionAgent, labels, units, categories, classifications, 
      save, cancel, valid } = this
    return html`
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
      <section>
        <flow-form
          .labels=${labels}
          .user=${user}
          .agent=${transactionAgent}
          .units=${units}
          .categories=${categories}
          .classifications=${classifications}
        ></flow-form>
      </section>
    `
  }
}

customElements.define('add-flow', AddFlow)