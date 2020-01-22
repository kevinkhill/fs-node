declare namespace global {
  interface Window {
    nw: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      require(id: string): any;
    };
  }
}
