import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationRequest } from '../../core/commons/pagination';

const defaultSkip = 0;
const defaultFrom = 0;
const defaultSize = 10;
const defaultOrder = {};
const defaultOrderDirection = 'ASC';

/**
 * Decorator intended for building a PaginationRequest object based on the query string parameters
 */
export const PaginationParams = createParamDecorator<PaginationRequest>(
  (data: PaginationRequest, ctx: ExecutionContext) => {
    let {
      // eslint-disable-next-line prefer-const
      query: { skip, from, size, orderBy, orderDirection, ...params },
    } = ctx.switchToHttp().getRequest();

    const order = !!orderBy
      ? {
          [orderBy]: !!orderDirection ? orderDirection : defaultOrderDirection,
        }
      : defaultOrder;

    size = !!size ? +size : defaultSize;

    if (!skip) {
      if (!!from) {
        from = +from;
        skip = from * size;
      } else {
        skip = defaultSkip;
        from = defaultFrom;
      }
    } else {
      from = +skip / size;
    }

    return Object.assign(data ? data : {}, {
      skip: skip,
      from: from,
      size: size,
      order: order,
      params: params,
    });
  },
);
