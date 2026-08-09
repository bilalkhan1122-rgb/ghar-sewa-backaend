import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class ApproveAppealDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

export class RejectAppealDto {
  @IsString()
  @IsNotEmpty({ message: 'Rejection note is required' })
  @MaxLength(500)
  note!: string;
}
