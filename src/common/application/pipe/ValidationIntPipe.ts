import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ValidationIntPipe implements PipeTransform {
  public transform(value: any): any {
    const intValue = parseInt(value);
    if (isNaN(intValue)) {
      throw new BadRequestException('Not valid int value');
    }
    return intValue;
  }
}
