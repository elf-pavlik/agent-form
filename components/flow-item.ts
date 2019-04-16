import { LitElement, html, property } from 'lit-element'
import { Person, Flow } from '../interfaces'

export default class FlowItem extends LitElement {
  @property({ type: Object })
  user :Person

  @property({ type: Object })
  flow :Flow

  render () {
    const { user, flow } = this
    return html`
      <style>
        .classification { padding-left: .5em; }
      </style>
      <li>
        <mwc-icon>${flow.provider !== user.id ? 'chevron_right' : ''}</mwc-icon>
        <span>${flow.quantity}</span>
        <span>${flow.unit === 'unit' ? '' : flow.unit}</span>
        <span class="classification">${flow.classification}</span>
        <mwc-icon>${flow.provider === user.id ? 'chevron_left' : ''}</mwc-icon>
      </li>
    `
  }
}

customElements.define('flow-item', FlowItem)