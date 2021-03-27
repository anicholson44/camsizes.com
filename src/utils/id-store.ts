// efficient data structure for storing a set of ids, because objects are easier to work with
// than sets in JavaScript
export interface IdStore<V> {
  readonly [id: number]: V;
}

export default <V>(idStore: IdStore<V>) => ({
  set: (key: number, value: ((v: V) => V) | V) => {
    const copy = {};
    Object.assign(copy, idStore);
    copy[key] = value instanceof Function ? value(idStore[key]) : value;
    return copy;
  },
  delete: (key: number) => {
    const copy = {};
    Object.assign(copy, idStore);
    delete copy[key];
    return copy;
  }
});
