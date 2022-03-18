/**
 * Interface intended for requesting results paginated
 */
export interface PaginationRequest {
  // Number of records to skip (where the pagination shall start)
  skip: number;
  /**
   * The index of the page where the pagination should start from.
   *
   * It's intended for the same purpose that `skip`, but the latter represents an amount of
   * records that should be skipped.
   *
   * Should be used only when needed to handle the pagination by the current page index.
   */
  from?: number;

  // Page size
  size: number;

  // Sort order
  order?: { [field: string]: 'ASC' | 'DESC' };

  // Other params of type T
  other?: any;
}
