import { observable, action, set } from 'mobx'

import { Supplier } from 'types'

export default class SuppliersStore {
  @observable
  suppliers: Supplier[] = [
    {
      id: 1,
      type: 'Lumber',
      name: 'Weiland Industries - San Rafael',
      address: 'Weiland Industries Inc, De Luca Place, San Rafael, CA, USA',
      phone: '707-685-7765',
      logo:
        'https://drive.google.com/thumbnail?id=1PrIKNpRGwO3-ayyjwrj9EmmIcUOzJ_mb',
    },
    {
      id: 2,
      type: 'Plumbing',
      name: 'Water Components - San Rafael',
      address:
        'water components & building supply, inc., Simms Street, San Rafael, CA, USA',
      phone: '408-332-7571',
      logo:
        'https://drive.google.com/thumbnail?id=1kF62-2jD1oMpMsUgdljB2JGBkukTCavh',
    },
    {
      id: 3,
      type: 'Other',
      name: 'Verde Metals - San Rafael',
      address: 'Verde Metals, Gary Place, San Rafael, CA, USA',
      phone: '707-685-7765',
      logo:
        'https://drive.google.com/thumbnail?id=1-azosLxfnSZvEYz3ZYBVi3-0gKuk9QHe',
    },
    {
      id: 4,
      type: 'Paint',
      name: 'Tamalpais Paint & Color - Corte Madera',
      address: 'Tamalpais Paint & Color, Paradise Drive, Corte Madera, CA, USA',
      phone: '301-802-1595',
      logo:
        'https://drive.google.com/thumbnail?id=1i3Jk1QQrzcO6vTXY3zCZ-u5YS_u_ETz7',
    },
    {
      id: 5,
      type: 'Plumbing',
      name: 'Slakey Brothers - Santa Rosa',
      address: 'Slakey Brothers, Duke Court, Santa Rosa, CA, USA',
      phone: '707-293-7706',
      logo:
        'https://drive.google.com/thumbnail?id=1sRbxbjNWenMGwtaknp4ODEDz-5PFtuq7',
    },
  ]

  @action
  updateSuppliers(suppliers: Supplier[]) {
    set(this.suppliers, suppliers)
  }
}
