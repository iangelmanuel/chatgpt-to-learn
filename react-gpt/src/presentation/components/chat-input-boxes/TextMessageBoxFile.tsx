import { useRef, useState } from 'react'

type Props = {
  onSendMessage: (message: string) => void
  placeholder?: string
  disableCorrections?: boolean
  accept?: string
}

export const TextMessageBoxFile = ({
  onSendMessage,
  placeholder,
  disableCorrections,
  accept
}: Props) => {
  const [message, setMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>()
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim().length === 0) return
    onSendMessage(message)
    setMessage('')
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="mr-3">
        <button
          type="button"
          onClick={() => inputFileRef.current?.click()}
          className="flex items-center justify-center text-gray-400 hover:tet-gray-600"
        >
          <i className="fa-solid fa-paperclip text-xl" />
        </button>
        <input
          hidden
          type="file"
          accept={accept}
          ref={inputFileRef}
          onChange={(e) => setSelectedFile(e.target.files?.item(0))}
        />
      </div>

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
        <button
          className="btn-primary"
          disabled={!selectedFile}
        >
          {!selectedFile ? (
            <span className="mr-2">Enviar</span>
          ) : (
            <span className="mr-2">
              {selectedFile.name.substring(0, 10) + '...'}
            </span>
          )}
          <i className="fa-regular fa-paper-plane" />
        </button>
      </div>
    </form>
  )
}
