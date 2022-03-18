import { applyDecorators, Injectable } from '@nestjs/common';

export const CustomRepository = () => {
  return applyDecorators(Injectable());
};
