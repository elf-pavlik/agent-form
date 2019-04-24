import { LitElement, html, property } from 'lit-element'
import '@material/mwc-button'

import FlowForm from '../components/flow-form'
customElements.define('flow-form', FlowForm)
import ExchangerateForm from '../components/exchangerate-form'
customElements.define('exchangerate-form', ExchangerateForm)

import { FlowTemplate, TransactionTemplate, Person, Agent } from '../interfaces'
import { getRef } from './util'

import connect from '../connectMixin'
import { uiActor } from '../bootstrap'


export default class AddFlow extends LitElement {
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

  get flow () :FlowTemplate {
    let form = this.shadowRoot.querySelector('flow-form') as FlowForm
    return form ? form.data : {}
  }

  get valid () :boolean {
    let form = this.shadowRoot.querySelector('flow-form') as FlowForm
    return !!(form && form.data.unit && form.data.quantity && form.data.category
      && form.data.classification && form.data.provider && form.data.receiver)
  }
  
  get currencyFlow () :FlowTemplate {
    return this.transaction.flows.find(flow => flow.category === 'currency')
  } 

  get displayExchangeRate () :boolean {
    return Boolean(
      this.currencyFlow
      && this.flow.quantity
      && this.currencyFlow.provider === this.flow.receiver
      )
  }

  private save () {
    if (!this.valid) return
    let flowForm = this.shadowRoot.querySelector('flow-form') as FlowForm
    let exchangeRateForm = this.shadowRoot.querySelector('exchangerate-form') as ExchangerateForm
    this.dispatchEvent(new CustomEvent('add-flow', { detail: { ...flowForm.data } }))
    flowForm.reset()
    if (exchangeRateForm) {
      this.dispatchEvent(new CustomEvent('add-exchangerate', { detail: { ...exchangeRateForm.data } }))
      exchangeRateForm.reset()
    }
    this.requestUpdate()
  }

  private cancel () {
    let form = this.shadowRoot.querySelector('flow-form') as FlowForm
    form.reset()
    this.requestUpdate()
    this.dispatchEvent(new CustomEvent('cancel'))
  }

  render () {
    const { user, flow, currencyFlow, transactionAgent, displayExchangeRate,
      labels, units, categories, classifications, 
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
      </section>
        ${displayExchangeRate
            ? html`
              <exchangerate-form
                .numeratorFlow=${currencyFlow}
                .denominatorFlow=${flow}
              ></exchangerate-form>
            `
            : ''
        }
      </section>
    `
  }
}

class ConnectedAddFlow extends connect (uiActor, AddFlow) {

  mapStateToProps(state) {
    return {
      user: state.user,
      labels: state.labels,
      units: state.units,
      categories: state.categories,
      classifications: state.classifications,
      transaction: state.newTransaction,
      agents: state.agents
    }
  }

  mapEventsToActions(actions) {
    return {
      'add-exchangerate' (exchangeRate) {
        return actions.addExchangeRate(exchangeRate)
      },
      'add-flow' (flow) {
        actions.addFlow(flow)
        return actions.navigate('add-transaction')
      },
      'cancel' () {
        return actions.navigate('add-transaction')
      }
    }
  }
}

customElements.define('add-flow', ConnectedAddFlow)
