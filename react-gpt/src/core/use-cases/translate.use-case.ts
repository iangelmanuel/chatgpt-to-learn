import type { TranslateResponse } from '../../types'

export const translateUseCase = async (prompt: string, lang: string) => {
  try {
    const url = `${import.meta.env.VITE_GPT_API}/translate`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt, lang })
    })

    if (!res) {
      return {
        ok: false,
        message: 'No se pudo traducir'
      }
    }

    const { message } = (await res.json()) as TranslateResponse

    return {
      ok: true,
      message
    }
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo traducir'
    }
  }
}
