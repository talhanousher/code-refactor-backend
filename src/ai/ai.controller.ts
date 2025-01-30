import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('refactor')
  async refactor(@Body() body: { code: string; language: string }) {
    return { refactoredCode: await this.aiService.refactorCode(body.code, body.language) };
  }

  @Post('refactor/open-route')
  async refactorOpenRoute(@Body() body: { code: string; language: string }) {
    return { refactoredCode: await this.aiService.refactorCodeOpenRoute(body.code, body.language) };
  }
}
