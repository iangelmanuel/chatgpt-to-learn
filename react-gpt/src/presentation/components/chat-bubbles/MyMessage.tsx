import Markdown from "react-markdown"

type Props = {
  text: string
}

export const MyMessage = ({ text }: Props) => {
  return (
    <div className="col-start-6 col-end-13 rounded-lg p-3">
      <div className="flex flex-row-reverse items-center justify-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
          G
        </div>

        <div className="relative ml-3 rounded-xl bg-indigo-700 px-4 pb-2 pt-3 text-sm shadow">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  )
}
