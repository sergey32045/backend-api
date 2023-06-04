import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Role, Roles } from 'src/auth/rbac';
import { LanguagesService } from '../services/languages.service';
import { CreateLanguageDto } from '../validation/CreateLanguageDto';

@Controller('languages')
export class LanguagesController {
  constructor(private languagesService: LanguagesService) {}

  @Roles(Role.Guest)
  @Get()
  async getAll() {
    return this.languagesService.getAllLanguages();
  }

  @Roles(Role.Admin)
  @Post()
  async create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.createLanguage(createLanguageDto);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createLanguageDto: CreateLanguageDto,
  ) {
    return this.languagesService.updateLanguage(id, createLanguageDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.languagesService.deleteLanguage(id);
  }
}
