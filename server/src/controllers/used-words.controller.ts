import { UsedWordsService } from '../services/used-words.service';
import { Controller } from '@nestjs/common';

@Controller('used-words')
export class UsedWordsController {
  constructor(private readonly usedWordService: UsedWordsService) {}
}
