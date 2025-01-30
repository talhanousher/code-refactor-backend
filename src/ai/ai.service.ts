import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async refactorCode(code: string, language: string): Promise<string> {
    const prompt = `Refactor the following ${language} code for better readability and performance:\n\n${code}`;
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: prompt }],
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content || 'No response';
  }

  private readonly OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
  async refactorCodeOpenRoute(code: string, language: string): Promise<string> {
    const prompt = `Refactor the following ${language} code for better readability and performance:\n\n${code}`;

    try {
      const response = await axios.post(
        this.OPENROUTER_API_URL,
        {
          model: 'openai/gpt-3.5-turbo', // Choose a free model (e.g., mistral, llama3)
          messages: [{ role: 'system', content: prompt }],
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0]?.message?.content || 'No response';
    } catch (error) {
      console.error('Error calling OpenRouter API:', error.response?.data || error.message);
      return 'Error processing your request.';
    }
  }

}
