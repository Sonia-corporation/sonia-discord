import { IObject } from '../../../types/object';

export interface IQuote extends IObject {
  authorName: string;
  date: Date;
  quote: string;
  quoteUrl: string;
}
