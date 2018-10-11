import { LitElement, html, property } from '@polymer/lit-element'
import '@material/mwc-button'
import '@material/mwc-list'

import connect from '../store'
import { navigate } from '../actions'
import { Agent } from '../interfaces'

export default class ListAgents extends connect(LitElement) {
  @property({ type: Object })
  labels :any

  @property({ type: Array })
  agents :Agent[]

  _stateChanged (state) {
    this.labels = state.labels
    this.agents = state.agents
  }

  private select (agent) {
    this.dispatchEvent(new CustomEvent('select', { detail: agent }))
    navigate('add-transaction')
  }

  private listItemTemplate (agent) {
    const select = this.select.bind(this)
    return html`
      <mwc-list-item
        @click=${_ => select(agent)}
      >${agent.name}</mwc-list-item>
    `
  }

  render () {
    const { labels, agents, listItemTemplate } = this
    return html`
      <mwc-button
        unelevated
        icon="add"
        @click=${_ => navigate('add-agent')}
      >${labels['add agent']}</mwc-button>
      <ul>
        ${agents.map(listItemTemplate.bind(this))}
      </ul>
    `
  }
}

customElements.define('list-agents', ListAgents)