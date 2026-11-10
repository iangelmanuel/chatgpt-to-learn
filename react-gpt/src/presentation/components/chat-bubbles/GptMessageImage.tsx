type Props = {
  text: string
  imageUrl: string
  alt: string
  onImageSelected?: (imageUrl: string) => void
}

export const GptMessageImage = ({ imageUrl, alt, onImageSelected }: Props) => {
  return (
    <div className="col-start-1 col-end-9 rounded-lg p-3">
      <div className="flex flex-row items-center">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-600">
          G
        </div>

        <div className="relative ml-3 rounded-xl bg-black bg-opacity-25 px-4 pb-2 pt-3 text-sm shadow">
          <img
            src={imageUrl}
            alt={alt}
            className="mt-2 h-96 w-96 rounded-xl object-cover"
            onClick={() => onImageSelected && onImageSelected(imageUrl)}
          />
        </div>
      </div>
    </div>
  )
}
