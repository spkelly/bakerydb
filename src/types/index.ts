export interface Order{
  customer:Customer,
  isTaxed: boolean,
  hasPaid: boolean,
  deliverCharge: number,
  orderDate: Date,
  items: [any],
  datePaid: Date,
  dateCreated: Date
}

export interface Customer{
  name: string,
  address: string,
  phone:number,
  email:string
}


export interface MenuItem{
  name: string,
  price: number,
  modifier: any
}