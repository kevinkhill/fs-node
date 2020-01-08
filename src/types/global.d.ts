declare namespace global {
  interface Window {
    nw: {
      require<T>(id: T): T;
    };
  }
}
