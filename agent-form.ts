import { LitElement, html, property } from '@polymer/lit-element'
import '@material/mwc-textfield'
import { isProperty } from 'babel-types';

export default class AgentForm extends LitElement {
  @property({ type: Object })
  labels: any

  render () {
    return html`
      <mwc-textfield
        label=${this.labels.name}
        required
        outlined
      ></mwc-textfield>
    `
  }
}
