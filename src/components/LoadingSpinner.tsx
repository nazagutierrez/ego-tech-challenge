import { LoaderCircle } from 'lucide-react';

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <LoaderCircle className={`${className} animate-spin`} />
    </div>
  )
}
