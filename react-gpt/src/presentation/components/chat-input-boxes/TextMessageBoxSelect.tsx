import { useState } from "react"

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
  const [message, setMessage] = useState("")
  const [selectedOption, setSelectedOption] = useState("")

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim().length === 0) return
    if (selectedOption === "") return
    onSendMessage(message, selectedOption)
    setMessage("")
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex h-16 w-full flex-row items-center rounded-xl bg-gray-800 px-4"
    >
      <div className="flex-grow">
        <div className="flex">
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
            className="h-10 w-full rounded-xl border pl-4 text-gray-800 focus:border-indigo-300 focus:outline-none"
          />
          <select
            name="select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="ml-5 h-10 w-2/6 rounded-xl border pl-4 text-gray-800 focus:border-indigo-300 focus:outline-none"
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
