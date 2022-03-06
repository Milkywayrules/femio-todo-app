import { FilterOnState } from '@/components/FilterControl'
import { Storage } from '@/helpers/Storage'

export default class Filter {
  private storage
  private storageKey

  private filterSelected: FilterOnState['filterOn'] = 'all'

  constructor(filterStorage: Storage, storageKey: string) {
    this.storage = filterStorage.getStorage()
    this.storageKey = storageKey
  }

  public set(filter: FilterOnState['filterOn']) {
    this.filterSelected = filter
    this.storage.setItem(this.storageKey, this.filterSelected)

    return this
  }

  public get() {
    const data = this.storage.getItem(this.storageKey) || 'all'
    const filterSelected = data as FilterOnState['filterOn']
    this.filterSelected = filterSelected

    return this.filterSelected
  }
}
