declare namespace global {
  interface Window {
    nw: {
      require<T extends string>(id: T): import(T);
    };
  }
}
