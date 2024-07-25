import { IsOptional, IsString } from 'class-validator';

export class ImageGenerationDto {
  @IsString()
  readonly prompt: string;

  @IsString()
  @IsOptional()
  readonly origialImage?: string;

  @IsString()
  @IsOptional()
  readonly maskImage?: string;
}
