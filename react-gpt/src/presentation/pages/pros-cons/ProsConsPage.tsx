import { useState } from 'react'

import { prosConsDiscusserUseCase } from '../../../core/use-cases'
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader
} from '../../components'

type Message = {
  text: string
  isGpt: boolean
}

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (message: string) => {
    setIsLoading(true)
    setMessages((prevState) => [...prevState, { text: message, isGpt: false }])

    // useCase
    const data = await prosConsDiscusserUseCase(message)

    if (!data.ok) {
      setMessages((prevState) => [
        ...prevState,
        { text: data.content, isGpt: true }
      ])
    } else {
      setMessages((prevState) => [
        ...prevState,
        { text: data.content, isGpt: true }
      ])
    }

    setIsLoading(false)

    // Añadir el mensaje de isGPT en true
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
      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe un mensaje..."
        disableCorrections
      />
    </div>
  )
}
