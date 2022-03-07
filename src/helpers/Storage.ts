export class Storage {
  private _driver: 'localStorage'
  private _storage

  constructor(driver: 'localStorage' = 'localStorage') {
    this._driver = driver
    this._storage = window[this._driver]
  }

  public setDriver(driver: 'localStorage' = 'localStorage') {
    this._driver = driver
  }

  public getDriver() {
    return this._driver
  }

  public getStorage() {
    return this._storage
  }
}
