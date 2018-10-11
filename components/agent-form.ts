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

  constructor () {
    super()
    this.addEventListener('input', (event) => {
      this.requestUpdate()
    })
  }

  get data () :any {
    return this. computeData()
  }

  set data (data :any) {
    if (this.fields.name && data.name !== undefined) this.fields.name.value = data.name
  }

  private computeData () {
    return {
      name: this.fields.name ? this.fields.name.value : ''
    }
  }

  reset () {
    this.data = {
      name: ''
    }
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
