import { useState } from "react"
import { imageGenerationUseCase } from "../../../core/use-cases"
import {
  GptMessageImage,
  MyMessage,
  TextMessageBox,
  TypingLoader
} from "../../components"

type Message = {
  text: string
  isGpt: boolean
  info?: {
    imageUrl: string
    alt: string
  }
}

export const ImageGenerationPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (message: string) => {
    setIsLoading(true)
    setMessages((prevState) => [...prevState, { text: message, isGpt: false }])

    // useCase
    const imageInfo = await imageGenerationUseCase(message)
    setIsLoading(false)

    if (!imageInfo) {
      return setMessages((prevState) => [
        ...prevState,
        { text: "Error al generar la imagen", isGpt: true }
      ])
    }

    setMessages((prevState) => [
      ...prevState,
      {
        text: "Aquí tienes la imagen:",
        isGpt: true,
        info: {
          imageUrl: imageInfo.url,
          alt: imageInfo.alt
        }
      }
    ])
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessageImage
                key={index}
                text={message.text}
                imageUrl={message.info?.imageUrl as string}
                alt={message.info?.alt as string}
              />
            ) : (
              <MyMessage
                key={index}
                text={message.text}
              />
            )
          )}
          {isLoading && (
            <div className="fade-in col-start-1 col-end-12">
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
