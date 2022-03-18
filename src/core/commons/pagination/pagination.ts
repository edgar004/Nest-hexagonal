/**
 * Interface intended for Paginating results
 */
import { PaginationRequest } from './pagination-request';

export class Pagination<T> {
  // The number of the current page
  currentPage: number;
  // Skipped Records
  skippedRecords: number;
  // Total of pages calculated based on the total amount of records
  totalPages: number;
  // Tells if there's a next page (useful for navigation)
  hasNext: boolean;
  // Contains all the records belonging to the current page
  data: any[];
  // The amount of records the current page has
  payloadSize: number;
  // Total amount of records we're paginating
  totalRecords: number;

  static of<T>(
    pag: PaginationRequest,
    count: number,
    dtos: T[],
  ): Pagination<T> {
    const totalPages =
      Math.floor(count / pag.size) + (count % pag.size > 0 ? 1 : 0);

    const currentPage = pag.from;

    return {
      totalPages: totalPages,
      payloadSize: dtos.length,
      hasNext: currentPage < totalPages - 1,
      data: dtos,
      currentPage: currentPage,
      skippedRecords: pag.skip,
      totalRecords: count,
    };
  }
}
