import { LitElement, html, property } from '@polymer/lit-element'
import { installRouter } from 'pwa-helpers/router.js'

import connect from './store'
import { navigate } from './actions'

import { TransactionTemplate } from './interfaces'

import './views/list-transactions.js'
import './views/add-transaction.js'
import './views/list-agents.js'
import './views/add-agent.js'


class AppShell extends connect(LitElement) {

  @property({ type: String })
  private view :string

  @property({ type: Object })
  labels :any

  @property({ type: Object })
  newTransaction :TransactionTemplate

  private initialRouteHandled :boolean = false

  constructor () {
    super()
    this.newTransaction = {
      type: 'Transaction'
    }
  }

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
    this.labels = state.labels
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

  private agentSelected (event) {
    this.newTransaction = Object.assign({}, this.newTransaction, {agent: event.detail})
  }

  render () {
    const { view, newTransaction, agentSelected } = this
    return html`
      <style>@import 'app-shell.css'</style>
      <list-transactions
         class="view"
         ?active=${view === 'transactions'}
      ></list-transactions>
      <add-transaction
         class="view"
         ?active=${view === 'add-transaction'}
         .transaction=${newTransaction}
      ></add-transaction>
      <list-agents
         class="view"
         ?active=${view === 'agents'}
         @select=${agentSelected.bind(this)}
      ></list-agents>
      <add-agent
         class="view"
         ?active=${view === 'add-agent'}
      ></add-agent>
    `
  }
}
customElements.define('app-shell', AppShell)
