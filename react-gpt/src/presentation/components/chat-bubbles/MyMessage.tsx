import Markdown from 'react-markdown'

type Props = {
  text: string
}

export const MyMessage = ({ text }: Props) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex justify-start items-center gap-3 flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          G
        </div>

        <div className="relative ml-3 text-sm bg-indigo-700 pt-3 pb-2 px-4 shadow rounded-xl">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  )
}
