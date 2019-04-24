import { LitElement, html, property } from 'lit-element'
import '@material/mwc-button'
import { Button } from '@material/mwc-button'

import cuid from 'cuid'
import connect from '../connectMixin'
import { uiActor } from '../bootstrap'

import AgentForm from '../components/agent-form'
customElements.define('agent-form', AgentForm)

export default class AddAgent extends LitElement {
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

  private save () {
    if (!this.valid) return
    let button = this.shadowRoot.querySelector('#save') as Button
    if (button.disabled) return
    let form = this.shadowRoot.querySelector('agent-form') as AgentForm
    this.dispatchEvent(new CustomEvent('add-agent', { detail: { id: cuid(), ...form.data }}))
    form.reset()
    this.requestUpdate()
  }

  private cancel () {
    let form = this.shadowRoot.querySelector('agent-form') as AgentForm
    form.reset()
    this.requestUpdate()
    this.dispatchEvent(new CustomEvent('cancel'))
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

class ConnectedAddAgent extends connect (uiActor, AddAgent) {

  mapStateToProps(state) {
    return {
      labels: state.labels
    }
  }

  mapEventsToActions(actions) {
    return {
      'add-agent' (agent) {
        actions.addAgent(agent)
        return actions.navigate('agents')
      },
      'cancel' () {
        return actions.navigate('agents')
      }
    }
  }
}

customElements.define('add-agent', ConnectedAddAgent)
