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

  @Post('convert')
  async convertCode(@Body() body: { code: string; sourceLanguage: string; targetLanguage: string }) {
    return { convertedCode: await this.aiService.convertCode(body.code, body.sourceLanguage, body.targetLanguage) };
  }

  @Post('analyze-complexity')
  async analyzeCodeComplexity(@Body() body: { code: string; language: string }) {
    return { complexityReport: await this.aiService.analyzeCodeComplexity(body.code, body.language) };
  }
}
