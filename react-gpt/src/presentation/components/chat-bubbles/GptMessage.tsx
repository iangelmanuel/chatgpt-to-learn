import Markdown from "react-markdown"

type Props = {
  text: string
}

export const GptMessage = ({ text }: Props) => {
  return (
    <div className="col-start-1 col-end-9 rounded-lg p-3">
      <div className="flex flex-row items-center">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-600">
          G
        </div>

        <div className="relative ml-3 rounded-xl bg-black bg-opacity-25 px-4 pb-2 pt-3 text-sm shadow">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  )
}
