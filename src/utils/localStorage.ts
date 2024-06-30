export enum LocalStorageItems {
  citiesSearchHistory = 'citiesSearchHistory',
  favoriteCities = 'favoriteCities',
}

export function getLocalStorageItem<T = string>(name: LocalStorageItems) {
  const data = localStorage.getItem(name);
  const parsedData = data ? (JSON.parse(data) as T) : undefined;

  return parsedData;
}

export function setLocalStorageItem<T>(name: LocalStorageItems, data: T) {
  localStorage.setItem(name, JSON.stringify(data));
}
