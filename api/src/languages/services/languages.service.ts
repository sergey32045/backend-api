import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../models/languages.entity';
import { CreateLanguageDto } from '../validation/CreateLanguageDto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  async getAllLanguages(): Promise<Language[]> {
    return this.languageRepository.find();
  }

  async findOneByCode(code: string): Promise<Language> {
    return this.languageRepository.findOne({ where: { code } });
  }

  async createLanguage(landuageData: CreateLanguageDto): Promise<Language> {
    const language = new Language();

    language.title = landuageData.title;
    language.code = landuageData.code;

    const existingCode = await this.findOneByCode(language.code);

    if (existingCode) {
      throw new BadRequestException('Language with this code already exists');
    }

    return this.languageRepository.save(language);
  }

  async updateLanguage(id: number, data: CreateLanguageDto) {
    const language = await this.languageRepository.findOne({ where: { id } });
    if (!language) {
      throw new BadRequestException("Language doesn't exists");
    }
    language.title = data.title;
    language.code = data.code;
    return this.languageRepository.save(language);
  }

  async deleteLanguage(id: number): Promise<void> {
    await this.languageRepository.delete(id);
  }
}
