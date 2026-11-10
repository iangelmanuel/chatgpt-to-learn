import { useState } from "react"

type Props = {
  onSendMessage: (message: string) => void
  placeholder?: string
  disableCorrections?: boolean
}

export const TextMessageBox = ({
  onSendMessage,
  placeholder,
  disableCorrections
}: Props) => {
  const [message, setMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim().length === 0) return
    onSendMessage(message)
    setMessage("")
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex h-16 w-full flex-row items-center rounded-xl bg-gray-800 px-4"
    >
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            name="message"
            autoFocus
            placeholder={placeholder}
            autoComplete={disableCorrections ? "on" : "of"}
            autoCorrect={disableCorrections ? "on" : "of"}
            spellCheck={disableCorrections ? "false" : "true"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex h-10 w-full rounded-xl border pl-4 text-gray-800 focus:border-indigo-300 focus:outline-none"
          />
        </div>
      </div>

      <div className="ml-4">
        <button className="btn-primary">
          <span className="mr-2">Enviar</span>
          <i className="fa-regular fa-paper-plane" />
        </button>
      </div>
    </form>
  )
}
