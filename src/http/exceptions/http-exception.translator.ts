import {
  AlreadyExistsException,
  Exception,
  InvalidCredentialsException,
  NotAuthenticatedException,
  TokenExpiredException,
} from '../../core/exceptions';
import {
  BadRequestException,
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ResourceNotFoundException } from '../../core/exceptions';
import { WrongRequestException } from '../../core/exceptions';

/**
 * This function is meant for translating Business Exceptions into
 * Http Exceptions.
 *
 * New business exceptions should be added here so that when these are thrown
 * from the business layer the corresponding http one gets thrown too.
 *
 * @param e Implementation of Exception interface, which is in the top of all
 * business exceptions.
 */
export const translateException = (e: Exception): HttpException => {
  if (e instanceof ResourceNotFoundException) {
    throw new NotFoundException(e);
  } else if (e instanceof WrongRequestException) {
    throw new BadRequestException(e);
  } else if (e instanceof AlreadyExistsException) {
    throw new ConflictException(e);
  } else if (
    e instanceof InvalidCredentialsException ||
    e instanceof NotAuthenticatedException ||
    e instanceof TokenExpiredException
  ) {
    throw new UnauthorizedException(e);
  } else {
    throw new InternalServerErrorException();
  }
};
