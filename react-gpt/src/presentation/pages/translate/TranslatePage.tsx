import { useState } from 'react'

import { translateUseCase } from '../../../core/use-cases'
import {
  GptMessage,
  MyMessage,
  TextMessageBoxSelect,
  TypingLoader
} from '../../components'

type Message = {
  text: string
  isGpt: boolean
}

const languages = [
  { id: 'alemán', text: 'Alemán' },
  { id: 'árabe', text: 'Árabe' },
  { id: 'bengalí', text: 'Bengalí' },
  { id: 'francés', text: 'Francés' },
  { id: 'italiano', text: 'Italiano' },
  { id: 'hindi', text: 'Hindi' },
  { id: 'inglés', text: 'Inglés' },
  { id: 'japonés', text: 'Japonés' },
  { id: 'mandarín', text: 'Mandarín' },
  { id: 'portugués', text: 'Portugués' },
  { id: 'ruso', text: 'Ruso' }
]

export const TranslatePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (prompt: string, seletectedOption: string) => {
    setIsLoading(true)
    const newMessage = `Traduce: "${prompt}" al idioma ${seletectedOption}`

    setMessages((prevState) => [
      ...prevState,
      { text: newMessage, isGpt: false }
    ])

    // useCase
    const { ok, message } = await translateUseCase(prompt, seletectedOption)

    if (!ok) {
      setMessages((prevState) => [...prevState, { text: message, isGpt: true }])
      setIsLoading(false)
      return
    }

    setMessages((prevState) => [...prevState, { text: message, isGpt: true }])

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
      <TextMessageBoxSelect
        onSendMessage={handlePost}
        options={languages}
        placeholder="Escribe un mensaje..."
      />
    </div>
  )
}
