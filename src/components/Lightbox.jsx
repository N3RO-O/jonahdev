import { useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  if (!images?.length || index == null) return null
  const item = images[index]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      <div className="max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <div className="viewfinder relative">
          <img
            src={item.src}
            alt={item.caption}
            className="max-h-[80vh] w-auto rounded-lg object-contain"
          />
          <span aria-hidden="true" className="vf-corner vf-corner-active vf-tl" />
          <span aria-hidden="true" className="vf-corner vf-corner-active vf-tr" />
          <span aria-hidden="true" className="vf-corner vf-corner-active vf-bl" />
          <span aria-hidden="true" className="vf-corner vf-corner-active vf-br" />
        </div>
        <p className="mt-3 text-center text-sm text-white/80">{item.caption}</p>
        <p className="text-center text-xs text-white/50">
          {index + 1} / {images.length}
        </p>
      </div>
    </div>
  )
}
