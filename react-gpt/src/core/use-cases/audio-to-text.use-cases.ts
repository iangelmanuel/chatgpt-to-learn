import type { AudioToTextResponse } from '../../types'

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {
  try {
    const formData = new FormData()
    formData.append('file', audioFile)
    formData.append('prompt', prompt || '')

    const url = `${import.meta.env.VITE_GPT_API}/audio-to-text`

    const res = await fetch(url, {
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      throw new Error('No se pudo realizar la corrección de ortografía.')
    }

    const data = (await res.json()) as AudioToTextResponse
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
