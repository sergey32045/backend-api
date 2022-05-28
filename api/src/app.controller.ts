import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('test');
    return this.appService.getHello();
  }

  @Get('.well-known/pki-validation/3261FC6A37BFF23693EFD1B4C7AE49D7.txt')
  getWellKnown() {
      return '7e2a7f1421df5f69cc3a32c92961695161472f1715616dbe28b19597721b0eb0\n' +
          'comodoca.com\n' +
          'D5aWm62aAMfJnUVAoHJW'
  }
}
