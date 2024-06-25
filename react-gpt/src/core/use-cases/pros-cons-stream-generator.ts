export async function* prosConsGeneratorUseCase(
  prompt: string,
  abourtSignal: AbortSignal
) {
  try {
    const url = `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt }),
      signal: abourtSignal
    })

    if (!res.ok) {
      console.log('No se pudo realizar la comparación. Inténtalo mas tarde.')
      return null
    }

    const reader = res.body?.getReader()

    if (!reader) {
      console.log('No se pudo obtener la respuesta del servidor.')
      return null
    }

    const decoder = new TextDecoder()

    let text = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const decodedChunk = decoder.decode(value, { stream: true })
      text += decodedChunk
      yield text
    }
  } catch (error) {
    console.log('No se pudo realizar la comparación. Inténtalo mas tarde.')
    console.log(error)
    return null
  }
}
