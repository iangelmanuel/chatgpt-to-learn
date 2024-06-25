import type { OrthographyResponse } from '../../types'

export const orthographyUseCase = async (prompt: string) => {
  try {
    const url = `${import.meta.env.VITE_GPT_API}/orthography-check`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })

    if (!res.ok) {
      throw new Error('No se pudo realizar la corrección de ortografía.')
    }

    const data = (await res.json()) as OrthographyResponse

    return {
      ok: true,
      ...data
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message:
        'No se pudo realizar la corrección de ortografía. Inténtalo de nuevo.'
    }
  }
}
