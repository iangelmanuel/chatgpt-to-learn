import type { ProsConsDiscusserResponse } from '../../types'

export const prosConsDiscusserUseCase = async (prompt: string) => {
  try {
    const url = `${import.meta.env.VITE_GPT_API}/pros-cons-discusser`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })

    if (!res.ok) {
      throw new Error(
        'No se pudo realizar la comparación. Inténtalo mas tarde.'
      )
    }

    const data = (await res.json()) as ProsConsDiscusserResponse

    return {
      ok: true,
      ...data
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      content: 'No se pudo realizar la comparación. Inténtalo mas tarde.'
    }
  }
}
