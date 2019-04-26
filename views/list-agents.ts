import { LitElement, html, property } from 'lit-element'
import '@material/mwc-button'

import { Agent } from '../interfaces'

import connect from '../connectMixin'
import { uiActor } from '../bootstrap'

export default class ListAgents extends LitElement {
  @property({ type: Object })
  labels :any

  @property({ type: Array })
  agents :Agent[]

  private listItemTemplate (agent) {
    return html`
      <li
        @click=${_ => this.dispatchEvent(new CustomEvent('select-agent', { detail: agent }))}
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
        @click=${_ => this.dispatchEvent(new CustomEvent('add-agent'))}
      >${labels && labels['add agent']}</mwc-button>
      <ul>
        ${agents && agents.map(listItemTemplate.bind(this))}
      </ul>
    `
  }
}

class ConnectedListAgents extends connect (uiActor, ListAgents) {

  mapStateToProps(state) {
    return {
      labels: state.labels,
      agents: state.agents
    }
  }

  mapEventsToActions(actions) {
    return {
      'select-agent' (detail) {
        actions.selectAgent(detail)
        return actions.navigate('add-transaction')
      },
      'add-agent' () {
        return actions.navigate('add-agent')
      }
    }
  }
}

customElements.define('list-agents', ConnectedListAgents)
