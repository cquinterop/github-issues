import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarWithFallbackProps {
  src: string | null | undefined
  alt: string
  fallback: string
  size?: number
}

export function AvatarWithFallback({ src, alt, fallback, size = 40 }: AvatarWithFallbackProps) {
  const [isError, setIsError] = useState(false)

  // If no src or error loading, show fallback
  if (!src || isError) {
    return (
      <Avatar>
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    )
  }

  return (
    <Avatar>
      <AvatarImage asChild>
        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          onError={() => setIsError(true)}
          loading="lazy"
          className="object-cover"
        />
      </AvatarImage>
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}

