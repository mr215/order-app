import { makeAutoObservable, set } from 'mobx'

import { FavoriteAddressEntity } from 'types'

export default class FavoriteAddressesStore {
  favoriteAddresses: FavoriteAddressEntity[] = []

  constructor() {
    makeAutoObservable(this)
  }

  exists(address: string) {
    const favoriteAddress = this.favoriteAddresses.find(fa =>
      fa.attributes.address.toLowerCase().includes(address.toLowerCase())
    )

    return !!favoriteAddress
  }

  load(favoriteAddresses: FavoriteAddressEntity[]) {
    set(this.favoriteAddresses, favoriteAddresses)
  }

  add(address: FavoriteAddressEntity) {
    this.favoriteAddresses.unshift(address)
  }

  remove(id: string) {
    this.favoriteAddresses = this.favoriteAddresses.filter(fa => fa.id !== id)
  }
}
