import { ResultsPerPage } from './const';
export const isEmail = (email: string) => {};

export const isLenLowerThan = (isValid: string, length: number): boolean => {
  return isValid.length <= length;
};

export const getOffsetLimit = (page: number): [number, number] => {
  if (page < 1) {
    page = 1;
  }
  return [ResultsPerPage * page - ResultsPerPage, ResultsPerPage];
};
