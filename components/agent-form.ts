import { LitElement, html, property } from '@polymer/lit-element'
import '@material/mwc-textfield'
import { ComponentElement } from '@material/mwc-base/component-element.js'

export default class AgentForm extends LitElement {
  @property({ type: Object })
  labels: any

  private get fields () :any {
    return {
      name: this.shadowRoot.querySelector("#name") as ComponentElement
    }

  }

  get data () :any {
    return {
      name: this.fields.name._component.value
    }
  }

  set data (data :any) {
    if (data.name) this.fields.name.value = data.name
  }

  render () {
    return html`
      <mwc-textfield
        id="name"
        label=${this.labels.name}
        required
        outlined
      ></mwc-textfield>
    `
  }
}

customElements.define('agent-form', AgentForm)