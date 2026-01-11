interface ErrorMessageProps {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <p className="text-red-600 text-lg mb-2">Error</p>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}
