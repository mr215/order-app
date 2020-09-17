import { observable, action, set } from 'mobx'

import { Supplier, DEFAULT_SUPPLIER } from 'types'

export default class SupplierStore {
  @observable
  suppliers: Supplier[] = [DEFAULT_SUPPLIER]

  @action
  updateSuppliers(suppliers: Supplier[]) {
    set(this.suppliers, suppliers)
  }
}
