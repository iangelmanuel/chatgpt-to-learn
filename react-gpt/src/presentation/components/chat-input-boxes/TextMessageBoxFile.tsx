import { useRef, useState } from "react"

type Props = {
  onSendMessage: (message: string, audioFile: File) => void
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
  const [message, setMessage] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>()
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedFile === null || selectedFile === undefined) return
    onSendMessage(message, selectedFile)
    setMessage("")
    setSelectedFile(null)
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex h-16 w-full flex-row items-center rounded-xl bg-white px-4"
    >
      <div className="mr-3">
        <button
          type="button"
          onClick={() => inputFileRef.current?.click()}
          className="hover:tet-gray-600 flex items-center justify-center text-gray-400"
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
        <button
          className="btn-primary"
          disabled={!selectedFile}
        >
          {!selectedFile ? (
            <span className="mr-2">Enviar</span>
          ) : (
            <span className="mr-2">
              {selectedFile.name.substring(0, 10) + "..."}
            </span>
          )}
          <i className="fa-regular fa-paper-plane" />
        </button>
      </div>
    </form>
  )
}
