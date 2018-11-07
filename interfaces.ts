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
  exchangeRates :ExchangeRate[]
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
  provider ?:string
  receiver ?:string
  unit ?:string
  quantity ?:number
  category ?:string
  classification ?:string
  note ?:string
}

export interface Flow extends FlowTemplate {
  provider :string
  receiver :string
  unit :string
  quantity :number
  category :string
}

export interface ExchangeRate {
  numeratorFlow :string
  denominatorFlow :string
  fraction :number
}