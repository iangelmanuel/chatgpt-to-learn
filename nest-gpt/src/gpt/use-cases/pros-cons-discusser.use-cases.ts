import OpenAI from 'openai';
import { ProsConsDiscusserDto } from '../dtos';

export const prosConsDiscusserUseCase = async (
  openai: OpenAI,
  { prompt }: ProsConsDiscusserDto,
) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
        la respuesta debe ser en formato markdown,
        los pros y contras deben estar en una lista,
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 500,
  });

  return response.choices[0].message;
};
