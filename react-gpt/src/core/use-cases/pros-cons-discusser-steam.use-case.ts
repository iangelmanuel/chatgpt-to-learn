export const prosConsDiscusserStreamUseCase = async (prompt: string) => {
  try {
    const url = `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
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

    return reader

    // const decoder = new TextDecoder()

    // let text = ''

    // while (true) {
    //   const { done, value } = await reader.read()
    //   if (done) {
    //     break
    //   }
    //   const decodedChunk = decoder.decode(value, { stream: true })
    //   text += decodedChunk
    // }
  } catch (error) {
    console.error(error)
    return null
  }
}
