import { LitElement, html, property } from '@polymer/lit-element'
import connect from '../store'
import { navigate } from '../actions'

import AgentForm from '../components/agent-form.js';
customElements.define('agent-form', AgentForm)

export default class AddAgent extends connect(LitElement) {
  @property({ type: Object })
  labels :any

  constructor () {
    super()
    this.addEventListener('input', (event) => {
      console.log('add-agent')
      this.requestUpdate()
    })
  }

  get valid () {
    let form = this.shadowRoot.querySelector('agent-form') as AgentForm
    return form && form.data.name !== ''
  }

  _stateChanged (state) {
    this.labels = state.labels
  }

  private save () {
    let form = this.shadowRoot.querySelector('agent-form') as AgentForm
    console.log(form.data)
  }

  private cancel () {
    let form = this.shadowRoot.querySelector('agent-form') as AgentForm
    form.reset()
    navigate('add-transaction')
  }

  render () {
    const { labels, save, cancel, valid } = this
    return html`
      <section>
        <mwc-button
          icon="cancel"
          @click=${cancel}
        >${labels['cancel']}</mwc-button>
        <mwc-button
          unelevated
          icon="check"
          ?disabled=${!valid}
          @click=${save}
        >${labels['save']}</mwc-button>
      </section>
      <section>
        <agent-form
          .labels=${labels}
        ></agent-form 
      </section>
    `
  }
}

customElements.define('add-agent', AddAgent)