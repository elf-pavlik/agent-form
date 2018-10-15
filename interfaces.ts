export interface Agent {
  id :string
  type :('Agent' | 'Person' | 'Organization')
  name :string
}

export interface Person extends Agent {
  id :string
  type :'Person'
  name :string
}

export interface TransactionTemplate {
  id :string
  type :'Transaction'
  flows :Flow[]
  agent ?:string
  date ?:string
  note ?:string
}

export interface Transaction extends TransactionTemplate {
  agent :string
  date :string
}

export interface FlowTemplate {
  id :string
  type :'Flow'
  provider ?:Agent
  receiver ?:Agent
  unit ?:string
  quantity ?:string
  category ?:string
  classification ?:string
}

export interface Flow extends FlowTemplate {
  id :string
  type :'Flow'
  provider :Agent
  receiver :Agent
  unit :string
  quantity :string
  category :string
}