import { IsInt, IsString } from 'class-validator';

export class TranslateDto {
  @IsString()
  readonly prompt: string;

  @IsInt()
  readonly lang: string;
}
