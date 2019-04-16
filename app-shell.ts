import { LitElement, html, property } from 'lit-element'
import { installRouter } from 'pwa-helpers/router.js'

import '@material/mwc-button'

import connect, { store, persistor } from './store'
import { navigate, restore } from './actions'

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

  store = store
  persistor :Persistor = persistor // debug helper

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

  private download () {
    const blob = new Blob([JSON.stringify(this.store.getState())], { type: 'application/json;charset=utf-8'})
    saveAs(blob, 'backup.json')
  }

  private upload () {
    const input = this.shadowRoot.querySelector('#upload input') as HTMLInputElement
    input.click()
  }

  private handleUpload () {
    const form = this.shadowRoot.querySelector('#upload') as HTMLFormElement
    const input = this.shadowRoot.querySelector('#upload input') as HTMLInputElement
    const backup = input.files[0]
    const fileReader = new FileReader()
    fileReader.onload = event => {
      let reader = event.target as any
      let data = JSON.parse(reader.result)
      restore(data)
      form.reset()
    }
   fileReader.readAsText(backup)
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
    const { view, download, upload, handleUpload } = this
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
      ${ view !== 'transactions' ? '' :
        html`
          <section>
            <mwc-button
              icon="cloud_download"
              @click=${download}
            ></mwc-button>
            <mwc-button
              icon="cloud_upload"
              @click=${upload}
            ></mwc-button>
            <form id="upload">
              <input type="file" @change=${handleUpload} />
            </form>
          </section>
        `
      }
    `
  }
}
customElements.define('app-shell', AppShell)
