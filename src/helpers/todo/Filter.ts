import { FilterOnState } from '@/components/FilterControl'
import StorageDriver from '@/helpers/StorageDriver'

export default class Filter {
  private _storage
  private _storageKey

  private _filterSelected: FilterOnState['filterOn'] = 'all'

  constructor(filterStorage: StorageDriver, storageKey: string) {
    this._storage = filterStorage.getStorage()
    this._storageKey = storageKey
  }

  public set(filter: FilterOnState['filterOn']) {
    this._filterSelected = filter
    this._storage.setItem(this._storageKey, this._filterSelected)

    return this
  }

  public get() {
    const data = this._storage.getItem(this._storageKey) || 'all'
    const filterSelected = data as FilterOnState['filterOn']
    this._filterSelected = filterSelected

    return this._filterSelected
  }
}
