import { useEffect, useRef, useState } from 'react'

/**
 * Types out a sequence of lines one character at a time, like a terminal
 * boot log. Each line finishes before the next starts. Immediately
 * completes (no animation) when the user has requested reduced motion.
 *
 * @param {string[]} lines
 * @param {{ speed?: number, lineDelay?: number, startDelay?: number }} opts
 * @returns {{ printed: string[], lineIndex: number, done: boolean }}
 */
export function useTypewriter(lines, opts = {}) {
  const { speed = 22, lineDelay = 260, startDelay = 200 } = opts
  const [printed, setPrinted] = useState(() => lines.map(() => ''))
  const [lineIndex, setLineIndex] = useState(0)
  const [done, setDone] = useState(false)
  const linesRef = useRef(lines)
  linesRef.current = lines

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setPrinted(linesRef.current.slice())
      setLineIndex(linesRef.current.length)
      setDone(true)
      return
    }

    let cancelled = false
    const timeouts = []

    const typeLine = (li) => {
      if (cancelled) return
      if (li >= linesRef.current.length) {
        setDone(true)
        return
      }
      const text = linesRef.current[li]
      let ci = 0
      const step = () => {
        if (cancelled) return
        ci += 1
        setPrinted((prev) => {
          const next = prev.slice()
          next[li] = text.slice(0, ci)
          return next
        })
        if (ci < text.length) {
          timeouts.push(setTimeout(step, speed))
        } else {
          setLineIndex(li + 1)
          timeouts.push(setTimeout(() => typeLine(li + 1), lineDelay))
        }
      }
      step()
    }

    timeouts.push(setTimeout(() => typeLine(0), startDelay))

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { printed, lineIndex, done }
}
