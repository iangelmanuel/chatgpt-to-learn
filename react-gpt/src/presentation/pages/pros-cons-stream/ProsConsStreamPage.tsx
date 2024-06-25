import { useRef, useState } from 'react'

import { prosConsGeneratorUseCase } from '../../../core/use-cases'
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

export const ProsConsStreamPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const abortController = useRef(new AbortController())
  const isRunning = useRef(false)

  const handlePost = async (message: string) => {
    if (isRunning.current) {
      abortController.current.abort()
      abortController.current = new AbortController()
    }

    abortController.current.abort()
    setIsLoading(true)
    isRunning.current = true
    setMessages((prevState) => [...prevState, { text: message, isGpt: false }])

    // useCase
    const stream = prosConsGeneratorUseCase(
      message,
      abortController.current.signal
    )
    setIsLoading(false)

    setMessages((prevState) => [...prevState, { text: '', isGpt: true }])

    for await (const value of stream) {
      setMessages((prevState) => {
        const newMessages = [...prevState]
        newMessages[newMessages.length - 1].text = value
        return newMessages
      })
    }

    isRunning.current = false

    // const reader = await prosConsDiscusserStreamUseCase(message)
    // setIsLoading(false)

    // // Generar el ultimo mensaje
    // if (!reader) return alert('No se pudo obtener la respuesta del servidor.')

    // const decoder = new TextDecoder()
    // let messageData = ''
    // setMessages((prevState) => [
    //   ...prevState,
    //   { text: messageData, isGpt: true }
    // ])

    // while (true) {
    //   const { value, done } = await reader.read()

    //   if (done) break

    //   const decodedChunk = decoder.decode(value, { stream: true })
    //   // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    //   messageData += decodedChunk

    //   // Generar el mensaje
    //   setMessages((prevState) => {
    //     const newMessages = [...prevState]
    //     newMessages[newMessages.length - 1].text = messageData
    //     return newMessages
    //   })
    // }
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
