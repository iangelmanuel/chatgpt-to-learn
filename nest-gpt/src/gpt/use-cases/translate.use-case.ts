import OpenAI from 'openai';

type Options = {
  prompt: string;
  lang: string;
};

export const translateUseCase = async (
  openai: OpenAI,
  { prompt, lang }: Options,
) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${lang}: ${prompt}`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o',
    temperature: 0.2,
    // max_tokens: 150,
  });

  return {
    message: completion.choices[0].message.content,
  };
};
