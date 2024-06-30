import { useState } from 'react'

import { textToAudioUseCase } from '../../../core/use-cases'
import {
  GptMessage,
  GptMessageAudio,
  MyMessage,
  TextMessageBoxSelect,
  TypingLoader
} from '../../components'

type TextMessage = {
  text: string
  isGpt: boolean
  type: 'text'
}

type AudioMessage = {
  text: string
  isGpt: boolean
  audio: string
  type: 'audio'
}

type Message = TextMessage | AudioMessage

const displaimer = '## Todo el Audio generado es propiedad de OpenAI'

const voices = [
  { id: 'nova', text: 'Nova' },
  { id: 'alloy', text: 'Alloy' },
  { id: 'echo', text: 'Echo' },
  { id: 'fable', text: 'Fable' },
  { id: 'onyx', text: 'Onyx' },
  { id: 'shimmer', text: 'Shimmer' }
]

export const TextToAudioPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (prompt: string, selectedVoice: string) => {
    setIsLoading(true)
    setMessages((prevState) => [
      ...prevState,
      { text: prompt, isGpt: false, type: 'text' }
    ])

    // useCase
    const { ok, message, audioUrl } = await textToAudioUseCase(
      prompt,
      selectedVoice
    )
    setIsLoading(false)

    if (!ok) return

    setMessages((prevState) => [
      ...prevState,
      {
        text: `${selectedVoice} ${message}`,
        isGpt: true,
        type: 'audio',
        audio: audioUrl!
      }
    ])

    // Añadir el mensaje de isGPT en true
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text={displaimer} />
          {messages.map((message, index) =>
            message.isGpt ? (
              message.type === 'audio' ? (
                <GptMessageAudio
                  key={index}
                  text={message.text}
                  audio={message.audio}
                />
              ) : (
                <GptMessage
                  key={index}
                  text={message.text}
                />
              )
            ) : (
              <MyMessage
                key={index}
                text={message.text}
              />
            )
          )}
          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader className="fade-in" />
            </div>
          )}
        </div>
      </div>
      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Escribe un mensaje..."
        options={voices}
      />
    </div>
  )
}
