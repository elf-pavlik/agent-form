import { LitElement, html, property } from '@polymer/lit-element'
import { installRouter } from 'pwa-helpers/router.js'

import connect from './store'

import './views/add-agent.js'


class AppShell extends connect(LitElement) {

  @property({ type: String })
  private view :string

  @property({ type: Object })
  labels :any

  firstUpdated () {
    installRouter((location) => {
      if (location.pathname === '/') {
        this.view = 'transactions'
      } else {
        this.view = location.pathname.substring(1)
      }
    })
  }

  _stateChanged (state) {
    this.labels = state.labels
  }

  render () {
    const { labels, view } = this
    return html`
      <style>@import 'app-shell.css'</style>
      <ul>
        <li><a href="add-agent">${labels['add new']}</a>
      </ul>
      <add-agent
         class="view"
         ?active="${view === 'add-agent'}"
        .labels=${labels}
      ></add-agent 
    `
  }
}
customElements.define('app-shell', AppShell)
