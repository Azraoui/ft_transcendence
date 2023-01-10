import { Controller, Get } from '@nestjs/common';
import { FirstService } from './first.service';

@Controller()
export class AppController {
  constructor(private readonly appService: FirstService) {}

  @Get('/Coordinates')
  getHello(): string {
    return "hello";
  }
}
