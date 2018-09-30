import { LitElement, html, property } from '@polymer/lit-element'
import Localize from './localize'

import AgentForm from './agent-form.js'
customElements.define('agent-form', AgentForm)


class AppShell extends LitElement {
  private currentLanguage: string

  @property({ type: Object })
  labels: any

  get language () :string {
    return this.currentLanguage
  }

  set language (lang: string) {
    this.currentLanguage = lang
    const l = Localize(lang)
    this.labels = {
      name: l('name')
    }
  }

  constructor () {
    super()
    this.language = 'en'
  }

  render () {
    return html`
      <agent-form
        .labels=${this.labels}
      ></agent-form 
    `
  }
}
customElements.define('app-shell', AppShell)
