import { useState, useEffect } from 'react'

const prompts = [
  'Welche Plugins sind auf allen Sites veraltet?',
  'Erstelle Staging-Umgebung für Projekt Müller',
  'Performance-Bericht für mein-kunde.ch',
  'Deploye Theme-Update auf Produktion',
  'Sicherheitslücken auf allen Sites prüfen',
]

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 1 Q12.4 7 12.6 11 Q16 11.6 23 12 Q16 12.4 12.6 13 Q12.4 17 12 23 Q11.6 17 11.4 13 Q8 12.4 1 12 Q8 11.6 11.4 11 Q11.6 7 12 1Z" />
    </svg>
  )
}

export default function AISection() {
  const [promptIndex, setPromptIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = prompts[promptIndex]

    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 38)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === target.length) {
      const t = setTimeout(() => setDeleting(true), 2400)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 20)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      const t = setTimeout(() => {
        setDeleting(false)
        setPromptIndex((i) => (i + 1) % prompts.length)
      }, 0)
      return () => clearTimeout(t)
    }
  }, [displayed, deleting, promptIndex])

  return (
    <section className="px-6 py-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        <div className="reveal-up">
          <h2 className="font-heading font-semibold text-[clamp(1.75rem,3.4vw,2.125rem)] leading-[1.15] tracking-[-0.02em] mb-5">
            Schneller entscheiden. Direkt im Workflow.
          </h2>
          <p className="text-secondary text-[0.9375rem] leading-[1.78] max-w-[46ch]">
            Nutze deine bestehenden KI-Tools direkt im Workflow: Claude, ChatGPT und Copilot lassen sich schon heute über die VS-Code-Integration einsetzen. Eine native UI-Integration ist in Entwicklung.
          </p>
        </div>

        <div className="reveal-up flex items-center justify-center py-8 lg:py-0">
          <div className="w-full overflow-hidden rounded-panel border border-line bg-raised shadow-card">
            {/* Window chrome */}
            <div className="flex items-center px-4 py-3 border-b border-line">
              <span className="text-[0.75rem] text-tertiary font-medium">WPorbit — KI-Assistent</span>
            </div>
            {/* Input area */}
            <div className="px-6 py-5 flex items-center gap-4">
              <Sparkle className="w-5 h-5 text-accent flex-shrink-0 opacity-90" />
              <div className="flex-1 min-w-0 font-mono text-[0.875rem] text-primary flex items-center">
                <span>{displayed}</span>
                <span className="inline-block w-px h-[1.1em] bg-accent ml-0.5 align-middle animate-cursor" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
