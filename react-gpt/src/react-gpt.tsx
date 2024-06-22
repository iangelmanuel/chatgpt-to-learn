import { RouterProvider } from 'react-router-dom'

import { router } from './presentation/router/router'

export default function ReactGPT() {
  return <RouterProvider router={router} />
}
