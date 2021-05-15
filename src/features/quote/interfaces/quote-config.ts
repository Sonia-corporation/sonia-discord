import { ColorEnum } from '../../../enums/color.enum';
import { IconEnum } from '../../../enums/icon.enum';

export interface IQuoteConfig {
  apiKey: string;
  imageColor: ColorEnum;
  imageUrl: IconEnum;
}
