import { LitElement, html, property } from '@polymer/lit-element'
import { ComponentElement } from '@material/mwc-base/component-element.js'
import '@material/mwc-formfield'
import '@material/mwc-textfield'
import '@material/mwc-radio'

import { Agent, Person, FlowTemplate } from '../interfaces'

export default class FlowForm extends LitElement {
  @property({ type: Object})
  user :Person

  @property({ type: Object})
  agent :Agent

  @property({ type: Object })
  labels :any

  @property({ type: Array })
  units :any[]

  @property({ type: Array })
  categories :string[]

  @property({ type: Array })
  classifications :string[]

  private get fields () :any {
    return {
      quantity: this.shadowRoot.querySelector("#quantity") as ComponentElement,
      unit: this.shadowRoot.querySelector("#unit") as ComponentElement,
      category: this.shadowRoot.querySelector("#category") as ComponentElement,
      classification: this.shadowRoot.querySelector("#classification") as ComponentElement,
      providing: this.shadowRoot.querySelector("#providing") as ComponentElement,
      receiving: this.shadowRoot.querySelector("#receiving") as ComponentElement
    }

  }

  firstUpdated () {
    this.reset() // TODO: this prevents passing data property from the host
    for (let field in this.fields) {
      this.fields[field].addEventListener('input', (event) => this.dispatchEvent(new CustomEvent('change')))
      // HACK for mwc-radio not forwarding events
      this.fields[field].addEventListener('click', (event) => { 
        setTimeout(() => this.dispatchEvent(new CustomEvent('change')), 100)
      })
    }
  }

  get data () :any {
    return this.computeData()
  }

  set data (data :any) {
    if (this.fields.quantity && data.quantity !== undefined) this.fields.quantity.value = data.quantity
    if (this.fields.unit && data.unit !== undefined) this.fields.unit.value = data.unit
    if (this.fields.category && data.category !== undefined) this.fields.category.value = data.category
    if (this.fields.classification && data.classification !== undefined) this.fields.classification.value = data.classification
    if (this.fields.providing && data.provider && data.provider !== this.user.id) this.fields.providing.checked = true
    if (this.fields.receiving && data.receiver && data.receiver !== this.user.id) this.fields.receiving.checked = true
  }

  private computeData () {
    let data = {
      type: 'Flow',
      quantity: this.fields.quantity ? this.fields.quantity.value : '',
      unit: this.fields.unit ? this.fields.unit.value : '',
      category: this.fields.category ? this.fields.category.value : '',
      classification: this.fields.classification ? this.fields.classification.value : ''
    }
    if (!this.fields.providing.checked && !this.fields.receiving.checked
        || !this.user || !this.agent) {
      return data
    } else {
      return {
        ...data,
        provider: this.fields.providing.checked ? this.user.id : this.agent.id,
        receiver: this.fields.receiving.checked ? this.user.id : this.agent.id
      }
    }
  }

  reset () {
    this.data = {
      type: 'Flow',
      quantity: '',
      unit: '',
      category: '',
      classification: ''
    } as FlowTemplate
  }

  render () {
    const { labels, units, categories, classifications } = this
    return html`
      <section>
        <mwc-formfield label=${labels.providing}>
          <mwc-radio id="providing" name="role"></mwc-radio>
        </mwc-formfield>
        <mwc-formfield label=${labels.receiving}>
          <mwc-radio id="receiving" name="role"></mwc-radio>
        </mwc-formfield>
      </section>
      <section>
        <label>
          ${labels.category}
          <select id="category">
          ${categories.map(category => html`<option value=${category}>${category}</option>`)}
          </select>
        </label>
        <label>
          ${labels.classification}
          <select id="classification">
          ${classifications.map(classification => html`<option value=${classification}>${classification}</option>`)}
          </select>
        </label>
      </section>
      </section>
        <mwc-textfield
          id="quantity"
          label=${labels.quantity}
          required
          outlined
        ></mwc-textfield>
        <label>
          ${labels.unit}
          <select id="unit">
          ${units.map(unit => html`<option value=${unit}>${unit}</option>`)}
          </select>
        </label>
      </section>
    `
  }
}
