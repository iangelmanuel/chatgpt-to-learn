export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const url = `${import.meta.env.VITE_GPT_API}/text-to-audio`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt, voice })
    })

    if (!res.ok) {
      throw new Error('No se pudo realizar la generación del audio.')
    }

    const audioFile = await res.blob()
    const audioUrl = URL.createObjectURL(audioFile)

    return {
      ok: true,
      message: prompt,
      audioUrl
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'No se pudo realizar la generación del audio.'
    }
  }
}
