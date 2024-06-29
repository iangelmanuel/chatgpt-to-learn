import * as fs from 'fs';
import OpenAI from 'openai';
import * as path from 'path';

type Options = {
  prompt: string;
  voice: string;
};

export const textToAudioUseCase = async (
  openai: OpenAI,
  { prompt, voice }: Options,
) => {
  const voices = {
    nova: 'Nova',
    alloy: 'alloy',
    echo: 'echo',
    fable: 'fable',
    onyx: 'onyx',
    shimmer: 'shimmer',
  };

  const seletedVoice = voices[voice] ?? 'nova';

  const folderPath = path.resolve(__dirname, `../../../generated/audios/`);
  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);
  fs.mkdirSync(folderPath, { recursive: true });

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: seletedVoice,
    input: prompt,
    response_format: 'mp3',
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  fs.writeFileSync(speechFile, buffer);

  return speechFile;
};
