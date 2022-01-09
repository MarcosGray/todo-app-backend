import { ApiProperty } from "@nestjs/swagger";

export class InternalServerSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}