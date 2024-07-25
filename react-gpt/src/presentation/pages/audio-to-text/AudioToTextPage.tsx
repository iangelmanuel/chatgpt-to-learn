import { useState } from 'react'

import { audioToTextUseCase } from '../../../core/use-cases'
import {
  GptMessage,
  MyMessage,
  TextMessageBoxFile,
  TypingLoader
} from '../../components'

type Message = {
  text: string
  isGpt: boolean
}

export const AudioToTextPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (message: string, audioFile: File) => {
    setIsLoading(true)
    setMessages((prevState) => [...prevState, { text: message, isGpt: false }])

    // useCase
    const response = await audioToTextUseCase(audioFile, message)
    setIsLoading(false)

    if (!response) return

    // Añadir el mensaje de isGPT en true
    const gptMessage = `
    ## Transcripcción:
    __Duración:__ ${Math.round(response.duration)}
    ## El texto fue:
    ${response.text}
    `

    setMessages((prevState) => [
      ...prevState,
      { text: gptMessage, isGpt: true }
    ])

    for (const segment of response.segments) {
      const segmentMessage = `
      __De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos__
      ${segment.text}
      `

      setMessages((prevState) => [
        ...prevState,
        { text: segmentMessage, isGpt: true }
      ])
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage
                key={index}
                text={message.text}
              />
            ) : (
              <MyMessage
                key={index}
                text={message.text ? message.text : 'Transcribe el audio...'}
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
      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe un mensaje..."
        disableCorrections
        accept="audio/*"
      />
    </div>
  )
}
