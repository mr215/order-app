import { makeAutoObservable } from 'mobx'

import { SupplierEntity } from 'types'

export default class SuppliersStore {
  suppliers: SupplierEntity[] = []

  constructor() {
    makeAutoObservable(this)
  }

  updateSuppliers(suppliers: SupplierEntity[]) {
    this.suppliers = suppliers
  }
}
