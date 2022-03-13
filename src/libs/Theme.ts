import StorageDriver from '@/libs/StorageDriver'

type ThemeDarkModeType = 'light' | 'dark'
export type ThemeType = ThemeDarkModeType

export default class Theme {
  private _storage
  private _storageKey

  private _theme: ThemeType = 'light'

  constructor(filterStorage: StorageDriver, storageKey: string) {
    this._storage = filterStorage.getStorage()
    this._storageKey = storageKey

    this.set(this.get())
  }

  private _persistToStorage(theme: ThemeType) {
    this._storage.setItem(this._storageKey, theme)
  }

  private _applyToDoc(prevTheme: ThemeType, newTheme: ThemeType) {
    document.documentElement.classList.remove(prevTheme)
    document.documentElement.classList.add(newTheme)
  }

  public getKey() {
    return this._storageKey
  }

  public set(newTheme: ThemeType) {
    this._applyToDoc(this._theme, newTheme)
    this._theme = newTheme
    this._persistToStorage(this._theme)

    return this
  }

  public get() {
    const data = this._storage.getItem(this._storageKey) || this._theme
    this._theme = data as ThemeType

    return this._theme
  }

  public toggleDarkMode() {
    if (this._theme === 'light') {
      this.set('dark')
    } else {
      this.set('light')
    }

    return this
  }

  public getIsDarkMode() {
    return this.get() === 'dark' ? true : false
  }
}
