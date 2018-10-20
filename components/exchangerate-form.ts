import { LitElement, html, property } from '@polymer/lit-element'
import { ComponentElement } from '@material/mwc-base/component-element.js'
import '@material/mwc-textfield'
import { FlowTemplate, ExchangeRate } from '../interfaces'


export default class ExchangerateForm extends LitElement {

  @property({ type: Object })
  numeratorFlow :FlowTemplate

  @property({ type: Object })
  denominatorFlow :FlowTemplate

  enteredFraction :number
  enteredTotal :number

  private get fields () :any {
    return {
      fraction: this.shadowRoot.querySelector("#fraction") as ComponentElement,
      total: this.shadowRoot.querySelector("#total") as ComponentElement
    }
  }

  firstUpdated () {
    this.fields.fraction && this.fields.fraction.addEventListener('input', (event) => {
      if (!this.fields.fraction.value) return
      this.enteredFraction = Number(this.fields.fraction.value)
      this.enteredTotal = null
      this.requestUpdate()
    })
    this.fields.total && this.fields.total.addEventListener('input', (event) => {
      if (!this.fields.total.value) return
      this.enteredFraction = Number(this.fields.fraction.value)
      this.enteredTotal = Number(this.fields.total.value)
      this.enteredFraction = null
      this.requestUpdate()
    })
  }

  get fraction () :number {
    if (this.enteredFraction) return this.enteredFraction
    return this.enteredTotal
        ? this.enteredTotal / this.denominatorFlow.quantity
        : this.numeratorFlow.quantity / this.denominatorFlow.quantity
  }

  get total () :number {
    if (this.enteredTotal) return this.enteredTotal
    return this.enteredFraction
        ? this.enteredFraction * this.denominatorFlow.quantity
        : this.numeratorFlow.quantity
  }

  get data () :ExchangeRate {
    return {
      numeratorFlow: this.numeratorFlow.id,
      denominatorFlow: this.denominatorFlow.id,
      fraction: this.fraction
    }
  }

  reset () {
    this.enteredFraction = null
    this.enteredTotal = null
  }

  render() {
    const { fraction, total } = this
    return html`
      <section>
        x
        <mwc-textfield
          id="fraction"
          value=${fraction}
        ></mwc-textfield>
        =
        <mwc-textfield
          id="total"
          value=${total}
          ></mwc-textfield>
      </section>
    `
  }
}