import { observable, action, set } from 'mobx'

import { Supplier } from 'types'

export default class SupplierStore {
  @observable
  suppliers: Supplier[] = []

  @action
  updateSuppliers(suppliers: Supplier[]) {
    set(this.suppliers, suppliers)
  }
}
