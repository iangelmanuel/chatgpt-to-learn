import OpenAI from 'openai';

type Options = {
  prompt: string;
};

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Te serán proveídos textos en español con posibles errores ortográficos y gramaticales, las palabras usadas deben existir en el diccionario de la Real Academia Español.

        Debes de responser en formato JSON. Tu tarea es corregirlos y retornar información soluciones, tambien debes de dar un porcentaje de acierto por el usuario.

        Si no hay errores, debes de retornar un mensaje de felicitaciones y mencionar que no hay errores ortográficos.

        Ejemplo de salida:
        {
          userScore: number,
          errors: string[], // ['error -> solución']
          message: string, // Usa emojis y texto para felicitar al usuario
        }
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o',
    temperature: 0.3,
    max_tokens: 150,
  });

  const jsonResponse = JSON.parse(completion.choices[0].message.content);
  return jsonResponse;
};
