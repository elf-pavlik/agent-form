export interface Agent {
  id :string
  type :('Agent' | 'Person' | 'Organization')
  name :string
}

export interface TransactionTemplate {
  type :'Transaction'
  agent ?:string
  date ?:string
}

export interface Transaction extends TransactionTemplate {
  id :string
  agent :string
  date :string
}