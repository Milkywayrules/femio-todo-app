import StorageDriver from '@/libs/StorageDriver'
import { Dispatch, SetStateAction } from 'react'

export type FilterOnType = 'all' | 'active' | 'completed'

export interface FilterOnState {
  filterOn: FilterOnType
  setFilterOn: Dispatch<SetStateAction<FilterOnType>>
}

export default class Filter {
  private _storage
  private _storageKey

  private _filterSelected: FilterOnType = 'all'

  constructor(filterStorage: StorageDriver, storageKey: string) {
    this._storage = filterStorage.getStorage()
    this._storageKey = storageKey

    this.set(this._filterSelected)
  }

  public set(filter: FilterOnType) {
    this._filterSelected = filter
    this._storage.setItem(this._storageKey, this._filterSelected)

    return this
  }

  public get() {
    const data = this._storage.getItem(this._storageKey) || this._filterSelected
    this._filterSelected = data as FilterOnType

    return this._filterSelected
  }
}
