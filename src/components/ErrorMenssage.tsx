import { ReactNode } from "react"

function ErrorMenssage({children}: {children: ReactNode}) {
  return (
    <p className="error">{children}</p>
  )
}

export default ErrorMenssage