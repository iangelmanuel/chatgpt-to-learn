import { useState } from 'react'

type Option = {
  id: string
  text: string
}

type Props = {
  onSendMessage: (message: string, selectedOption: string) => void
  placeholder?: string
  disableCorrections?: boolean
  options: Option[]
}

export const TextMessageBoxSelect = ({
  onSendMessage,
  placeholder,
  disableCorrections,
  options
}: Props) => {
  const [message, setMessage] = useState('')
  const [selectedOption, setSelectedOption] = useState('')

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim().length === 0) return
    if (selectedOption === '') return
    onSendMessage(message, selectedOption)
    setMessage('')
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-gray-800 w-full px-4"
    >
      <div className="flex-grow">
        <div className="flex">
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
            className="w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
          />
          <select
            name="select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-2/6 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
          >
            <option
              value=""
              disabled
            >
              Selecciona una opción
            </option>
            {options.map((option) => (
              <option
                key={option.id}
                value={option.text}
              >
                {option.text}
              </option>
            ))}
          </select>
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
