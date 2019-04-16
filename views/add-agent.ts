import { LitElement, html, property } from 'lit-element'
import connect from '../store'
import { navigate, addAgent } from '../actions'
import '@material/mwc-button'
import { Button } from '@material/mwc-button'

import cuid from 'cuid'

import AgentForm from '../components/agent-form.js'
customElements.define('agent-form', AgentForm)

export default class AddAgent extends connect(LitElement) {
  @property({ type: Object })
  labels :any

  constructor () {
    super()
    this.addEventListener('input', (event) => {
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
    if (!this.valid) return
    let button = this.shadowRoot.querySelector('#save') as Button
    if (button.disabled) return
    let form = this.shadowRoot.querySelector('agent-form') as AgentForm
    addAgent({ id: cuid(), ...form.data })
    form.reset()
    this.requestUpdate()
    navigate('agents')
  }

  private cancel () {
    let form = this.shadowRoot.querySelector('agent-form') as AgentForm
    form.reset()
    this.requestUpdate()
    navigate('agents')
  }

  render () {
    const { labels, save, cancel, valid } = this
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
        <agent-form
          .labels=${labels}
        ></agent-form 
      </section>
    `
  }
}

customElements.define('add-agent', AddAgent)