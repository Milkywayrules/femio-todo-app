export class Storage {
  private driver: 'localStorage'
  private storage

  constructor(driver: 'localStorage' = 'localStorage') {
    this.driver = driver
    this.storage = window[this.driver]
  }

  setDriver(driver: 'localStorage' = 'localStorage') {
    this.driver = driver
  }

  getDriver() {
    return this.driver
  }

  getStorage() {
    return this.storage
  }
}
