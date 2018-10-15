import { LitElement, html, property } from '@polymer/lit-element'
import { installRouter } from 'pwa-helpers/router.js'

import connect, { persistor } from './store'
import { navigate } from './actions'

import { Persistor } from 'redux-persist'

import './views/list-transactions.js'
import './views/add-transaction.js'
import './views/detail-transaction.js'
import './views/list-agents.js'
import './views/add-agent.js'
import './views/add-flow.js'


class AppShell extends connect(LitElement) {

  @property({ type: String })
  view :string

  persistor :Persistor = persistor

  private initialRouteHandled :boolean = false

  firstUpdated () {
    installRouter((location) => {
      let view
      if (location.pathname === '/') {
        view = 'transactions'
      } else {
        view = location.pathname.substring(1)
      }
      if (view !== this.view) {
        navigate(view)
      }
      this.initialRouteHandled = true
    })
  }

  _stateChanged (state) {
    this.view = state.view
    if (this.initialRouteHandled) this.handleHistory()
  }

  private handleHistory () {
    let newPath
    if (this.view === 'transactions') {
      if (location.pathname !== "/") newPath = '/'
    } else if (this.view !== location.pathname.substring(1)) {
      newPath = `/${this.view}`
    }
    if (newPath && newPath !== location.pathname) {
      window.history.pushState({}, '', newPath)
    }
  }

  render () {
    const { view } = this
    return html`
      <style>@import 'app-shell.css'</style>
      <list-transactions
         class="view"
         ?active=${view === 'transactions'}
      ></list-transactions>
      <add-transaction
         class="view"
         ?active=${view === 'add-transaction'}
      ></add-transaction>
      <detail-transaction
         class="view"
         ?active=${view !== 'transactions' && view.match('transactions')}
      ></detail-transaction>
      <list-agents
         class="view"
         ?active=${view === 'agents'}
      ></list-agents>
      <add-agent
         class="view"
         ?active=${view === 'add-agent'}
      ></add-agent>
      <add-flow
         class="view"
         ?active=${view === 'add-flow'}
      ></add-flow>
    `
  }
}
customElements.define('app-shell', AppShell)
