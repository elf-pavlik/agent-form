import { LitElement, html, property } from 'lit-element'
import '@material/mwc-button'

import { navigate, selectAgent } from '../actions'
import { Agent } from '../interfaces'

export default class ListAgents extends LitElement {
  @property({ type: Object })
  labels :any

  @property({ type: Array })
  agents :Agent[]

  _stateChanged (state) {
    this.labels = state.labels
    this.agents = state.agents
  }

  private select (agent) {
    selectAgent(agent)
    navigate('add-transaction')
  }

  private listItemTemplate (agent) {
    const select = this.select.bind(this)
    return html`
      <li
        @click=${_ => select(agent)}
      >${agent.name}</li>
    `
  }

  render () {
    const { labels, agents, listItemTemplate } = this
    return html`
      <style>
        li {
          cursor: pointer;
        }
      </style>
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