import { useState } from 'react'

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
  const [message, setMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim().length === 0) return
    onSendMessage(message)
    setMessage('')
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-gray-800 w-full px-4"
    >
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            name="message"
            autoFocus
            placeholder={placeholder}
            autoComplete={disableCorrections ? 'on' : 'of'}
            autoCorrect={disableCorrections ? 'on' : 'of'}
            spellCheck={disableCorrections ? 'false' : 'true'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
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
