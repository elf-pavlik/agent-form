export function getRef(id, collection) {
    return collection.find(e => e.id === id)
}

export function trimDate(date) {
  return date.substring(0, 10)
}