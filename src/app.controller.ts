import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() { }

  @Get("hc")
  healthCheck(): string {
    return "ari4me backend ok";
  }
}
