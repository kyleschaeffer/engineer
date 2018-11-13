export interface ISingleResponse<T> {
  d: T;
}

export interface ICollectionResponse<T> {
  d: {
    results: T[];
  }
}
