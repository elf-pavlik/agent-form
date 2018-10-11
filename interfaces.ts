export interface Agent {
  type :('Agent' | 'Person' | 'Organization')
  name :string
}

export interface TransactionTemplate {
  type :'Transaction'
  agent ?: Agent
}

export interface Transaction extends TransactionTemplate {
  agent :Agent
}