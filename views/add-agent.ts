import { LitElement, html, property } from '@polymer/lit-element'
import connect from '../store'

import '../components/agent-form.js'

export default class AddAgent extends connect(LitElement) {
  @property({ type: Object })
  labels :any

  _stateChanged (state) {
    this.labels = state.labels
  }

  render () {
    const { labels } = this
    return html`
      <agent-form
        .labels=${labels}
      ></agent-form 
    `
  }
}

customElements.define('add-agent', AddAgent)