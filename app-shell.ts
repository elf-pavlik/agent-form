import { LitElement, html, property } from 'lit-element'
import { installRouter } from 'pwa-helpers/router.js'

import '@material/mwc-button'

import connect from './connectMixin'
import { uiActor } from './bootstrap'

import './views/list-transactions'
import './views/add-transaction'
import './views/detail-transaction'
import './views/list-agents'
import './views/add-agent'
import './views/add-flow'

class AppShell extends LitElement {

  @property({ type: String })
  view :string

  @property({ type: Object })
  state :any

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
        this.dispatchEvent(new CustomEvent('navigate', { detail: view }))
      }
      this.initialRouteHandled = true
    })
  }

  private download () {
    const blob = new Blob([JSON.stringify(this.state)], { type: 'application/json;charset=utf-8'})
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
      this.dispatchEvent(new CustomEvent('restore', { detail: data }))
      form.reset()
    }
   fileReader.readAsText(backup)
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
         ?active=${view && view !== 'transactions' && view.match('transactions')}
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

class ConnectedAppShell extends connect (uiActor, AppShell) {

  mapStateToProps(state) {
    return {
      state: state,
      view: state.view || 'transactions' // current view based on navigation 
    }
  }

  mapEventsToActions(actions) {
    return {
      'navigate' (view) {
        return actions.navigate(view)
      },
      'restore' (data) {
        return actions.restore(data)
      }
    }
  }
}

customElements.define('app-shell', ConnectedAppShell)
