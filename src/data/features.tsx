import type { JSX } from 'react'

export interface ShowcaseFeature {
  title: string
  text: string
  detail: string
  visual: JSX.Element
}

export const allFeatures: ShowcaseFeature[] = [
  {
    title: 'WPorbit starten. Direkt loslegen.',
    text: 'Projekt öffnen und sofort arbeiten. Die technische Einrichtung übernimmt WPorbit.',
    detail: 'Projekt öffnen und sofort arbeiten. WPorbit richtet im Hintergrund alles passend ein und sorgt dafür, dass jedes Projekt zuverlässig in seiner eigenen Umgebung läuft.',
    visual: (
      <div className="flex flex-1 flex-col gap-4 bg-surface p-5">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-tertiary">Projekt</p>
            <p className="mt-1 text-[0.85rem] font-semibold text-primary">agentur-website.ch</p>
          </div>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-[0.68rem] font-semibold text-accent">Startklar</span>
        </div>
        <div className="flex flex-1 flex-col gap-2.5 text-[0.78rem]">
          {['WordPress eingerichtet', 'Projektdateien verbunden', 'Website bereit zum Bearbeiten'].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg bg-raised px-3.5 py-3 text-secondary">
              <span className="flex size-5 items-center justify-center rounded-full bg-accent/15 text-[0.65rem] font-bold text-accent">✓</span>
              {item}
            </div>
          ))}
          <div className="mt-auto rounded-md bg-accent px-3.5 py-2.5 text-[0.77rem] font-bold text-on-accent">
            Projekt öffnen →
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Staging und Preview-Links',
    text: 'Teste Änderungen vor dem Live-Gang in einer isolierten Staging-Umgebung.',
    detail: 'Teste Änderungen vor dem Live-Gang in einer isolierten Staging-Umgebung. Teile Vorschau-Links direkt mit Kunden, ohne etwas zu veröffentlichen. Jede Staging-Umgebung ist unabhängig von der Produktion und kann jederzeit zurückgesetzt werden.',
    visual: (
      <div className="flex flex-col flex-1 bg-surface">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line">
          <span className="w-2.5 h-2.5 rounded-full bg-raised" />
          <span className="w-2.5 h-2.5 rounded-full bg-raised" />
          <span className="w-2.5 h-2.5 rounded-full bg-raised" />
          <div className="ml-3 flex-1 bg-raised rounded-full px-3 py-1 text-[0.68rem] text-tertiary font-mono">
            preview.wporbit.io/redesign-2024
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-3 relative">
          <div className="h-14 rounded-md bg-raised" />
          <div className="flex flex-col gap-2 px-1">
            <div className="h-2.5 bg-raised rounded w-3/4" />
            <div className="h-2.5 bg-raised rounded w-1/2" />
            <div className="h-2.5 bg-raised rounded w-2/3" />
          </div>
          <div className="absolute bottom-5 right-5 rounded-full bg-accent px-3 py-1.5 text-[0.72rem] font-bold text-on-accent shadow-action">
            🔗 Link kopiert
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Selektive Synchronisierung',
    text: 'Wähle genau aus, was zwischen Lokal, Staging und Produktion synchronisiert wird.',
    detail: 'Wähle genau aus, was du zwischen deiner lokalen Umgebung und deinen Produktions- oder Staging-Sites synchronisieren möchtest: ein einzelnes Theme, ein bestimmtes Plugin, nur die Datenbank oder das gesamte wp-content-Verzeichnis.',
    visual: (
      <div className="flex flex-col flex-1 bg-surface p-5 gap-3">
        <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-tertiary">Synchronisierung auswählen</p>
        {[
          { name: 'wp-content/themes/mein-theme', size: '2.3 MB',  checked: true },
          { name: 'Datenbank',                    size: '14.1 MB', checked: true },
          { name: 'wp-content/plugins/acf-pro',   size: '1.8 MB',  checked: false },
          { name: 'wp-content/uploads',           size: '312 MB',  checked: false },
        ].map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-[0.77rem] ${
              item.checked ? 'bg-accent/10 text-primary' : 'text-tertiary'
            }`}
          >
            <span className={`text-[0.72rem] font-bold w-4 flex-shrink-0 ${item.checked ? 'text-accent' : 'text-tertiary'}`}>
              {item.checked ? '✓' : '○'}
            </span>
            <span className="flex-1 font-mono text-[0.72rem] truncate">{item.name}</span>
            <span className="text-[0.68rem] text-tertiary tabular-nums flex-shrink-0">{item.size}</span>
          </div>
        ))}
        <div className="mt-auto bg-accent text-on-accent text-[0.77rem] font-bold px-3.5 py-2.5 rounded-md">
          → Zu Staging synchronisieren
        </div>
      </div>
    ),
  },
  {
    title: 'Online ohne manuelle Interaktion',
    text: 'Änderungen sicher veröffentlichen. WPorbit prüft alles Wichtige und startet den bestehenden Ablauf.',
    detail: 'Änderungen sicher veröffentlichen, ohne einzelne technische Schritte von Hand auszuführen. WPorbit prüft zuerst die Voraussetzungen, startet den bestehenden Ablauf und hält den Fortschritt nachvollziehbar fest.',
    visual: (
      <div className="flex flex-col flex-1 bg-surface p-5 gap-5">
        <div className="flex items-center">
          {(['Prüfen', 'Vorbereiten', 'Online'] as const).map((stage, i) => (
            <div key={stage} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full border-2 transition-colors ${
                  i < 1  ? 'bg-accent border-accent' :
                  i === 1 ? 'border-accent bg-transparent animate-pulse' :
                            'border-line bg-transparent'
                }`} />
                <span className={`text-[0.65rem] ${i < 2 ? 'text-secondary' : 'text-tertiary'}`}>{stage}</span>
              </div>
              {i < 2 && (
                <div className={`h-px flex-1 mx-2 mb-4 ${i < 1 ? 'bg-accent' : 'bg-line'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2 rounded-md bg-base p-3.5 text-[0.75rem]">
          <p className="font-semibold text-accent">✓ Alle Prüfungen erfolgreich</p>
          <p className="text-secondary">Website wird sicher aktualisiert …</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Monitoring und automatische Alerts',
    text: 'Uptime, Security-Scans und Performance-Checks laufen automatisiert für alle Sites.',
    detail: 'Uptime, Security-Scans und Performance-Checks laufen automatisiert für alle deine Sites. Probleme werden gemeldet, bevor Kunden sie bemerken. Alerts erreichen dich per Mail, Slack oder Webhook.',
    visual: (
      <div className="flex flex-col flex-1 bg-surface p-5 gap-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-tertiary">Site-Status</p>
        <div className="h-14 w-full">
          <svg viewBox="0 0 260 60" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
            <path d="M0,50 L40,44 L80,46 L100,32 L130,35 L160,20 L190,22 L220,12 L260,14"
              fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0,50 L40,44 L80,46 L100,32 L130,35 L160,20 L190,22 L220,12 L260,14 L260,60 L0,60Z"
              fill="var(--color-accent)" fillOpacity="0.08" />
          </svg>
        </div>
        <div className="flex flex-col gap-2.5">
          {[
            { label: 'Uptime',      value: '99.98 %',    ok: true  },
            { label: 'Security',    value: 'Keine Issues', ok: true },
            { label: 'Performance', value: '82 / 100',   ok: false },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-2.5 text-[0.78rem]">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${row.ok ? 'bg-success' : 'bg-accent'}`} />
              <span className="text-secondary flex-1">{row.label}</span>
              <strong className="text-primary font-semibold tabular-nums">{row.value}</strong>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Updates mit Staging und Rollback',
    text: 'Core-, Plugin- und Theme-Updates werden zuerst gegen Staging getestet.',
    detail: 'Core-, Plugin- und Theme-Updates werden zuerst gegen Staging getestet. Bei Freigabe rollst du sie auf alle Sites aus. Rollback jederzeit möglich. Updates können gebündelt oder einzeln ausgerollt werden.',
    visual: (
      <div className="flex flex-col flex-1 bg-surface p-5 gap-3">
        <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-tertiary">Ausstehende Updates</p>
        {[
          { name: 'WP Core',   ver: '6.4 → 6.5',    status: 'ok'      },
          { name: 'Yoast SEO', ver: '21.5 → 22.0',  status: 'ok'      },
          { name: 'ACF Pro',   ver: '6.1 → 6.2',    status: 'testing' },
        ].map((u) => (
          <div key={u.name} className="flex items-center gap-3 py-2.5 border-b border-line last:border-0 text-[0.8rem]">
            <span className="font-semibold text-primary flex-1">{u.name}</span>
            <span className="text-tertiary font-mono text-[0.72rem]">{u.ver}</span>
            <span className={`text-[0.68rem] font-bold px-2 py-0.5 rounded ${
              u.status === 'ok'
                ? 'bg-success/15 text-success'
                : 'bg-accent/15 text-accent'
            }`}>
              {u.status === 'ok' ? 'Staging ✓' : 'Testing…'}
            </span>
          </div>
        ))}
        <button className="mt-auto bg-accent text-on-accent text-[0.77rem] font-bold px-3.5 py-2.5 rounded-md w-full text-left border-0 cursor-default">
          Alle deployen →
        </button>
      </div>
    ),
  },
  {
    title: 'Zugänge sicher verwahrt',
    text: 'Passwörter, Schlüssel und weitere Zugangsdaten verschlüsselt pro Projekt ablegen.',
    detail: 'Alle Zugangsdaten liegen verschlüsselt im passenden Projekt. So bleiben sensible Informationen aus Chats, E-Mails und ungeschützten Notizen heraus und sind dort verfügbar, wo sie gebraucht werden.',
    visual: (
      <div className="flex flex-col flex-1 bg-surface p-5 gap-1.5">
        <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-tertiary mb-1.5">Zugänge: Projekt Müller &amp; Co.</p>
        {[
          { label: 'Website',        icon: '⌥', sub: 'Sicher verbunden', accent: true  },
          { label: 'WordPress',      icon: 'W', sub: 'Zugang hinterlegt', accent: false },
          { label: 'Datenbank',      icon: '◎', sub: 'Zugang hinterlegt', accent: false },
          { label: 'Veröffentlichung', icon: '⬡', sub: 'Freigabe gültig', accent: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-raised transition-colors">
            <span className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-bold flex-shrink-0 border ${
              item.accent
                ? 'bg-accent/15 text-accent border-accent/30'
                : 'bg-raised text-secondary border-line'
            }`}>
              {item.icon}
            </span>
            <span className="flex-1 min-w-0 flex flex-col gap-0.5">
              <span className="text-[0.78rem] font-semibold text-primary">{item.label}</span>
              <span className="text-[0.68rem] text-tertiary font-mono truncate">{item.sub}</span>
            </span>
            <span className="text-[0.7rem] opacity-30 flex-shrink-0">🔒</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'KI-Unterstützung im Workflow',
    text: 'Claude, ChatGPT und Copilot lassen sich schon heute direkt über VS Code im Workflow nutzen.',
    detail: 'Nutze deine bestehenden KI-Tools direkt im Workflow: Claude, ChatGPT und Copilot lassen sich schon heute über die VS-Code-Integration einsetzen. So kannst du veraltete Plugins finden, Sicherheitsscans starten oder Deployments vorbereiten, ohne den Kontext zu wechseln. Eine native UI-Integration ist in Entwicklung.',
    visual: (
      <div className="flex flex-col flex-1 bg-surface p-5 gap-3">
        <p className="text-[0.68rem] font-semibold uppercase tracking-widest text-tertiary">WPorbit Assistent</p>
        <div className="flex items-center gap-3 bg-raised border border-line rounded-xl px-4 py-3">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary opacity-70 flex-shrink-0" aria-hidden="true">
            <path d="M12 1 Q12.4 7 12.6 11 Q16 11.6 23 12 Q16 12.4 12.6 13 Q12.4 17 12 23 Q11.6 17 11.4 13 Q8 12.4 1 12 Q8 11.6 11.4 11 Q11.6 7 12 1Z" />
          </svg>
          <span className="text-primary text-[0.82rem] font-mono flex-1">Welche Plugins sind veraltet?</span>
        </div>
        <div className="bg-base rounded-xl p-4 flex flex-col gap-2.5">
          <p className="text-[0.75rem] text-secondary">3 Plugins auf 4 Sites sind veraltet:</p>
          {[
            { name: 'Yoast SEO 21.5', sites: '3 Sites' },
            { name: 'ACF Pro 6.1',    sites: '2 Sites' },
            { name: 'WooCommerce 8.2',sites: '1 Site'  },
          ].map((p) => (
            <div key={p.name} className="flex items-center gap-2 text-[0.75rem]">
              <span className="text-accent flex-shrink-0">↳</span>
              <span className="text-primary font-mono flex-1">{p.name}</span>
              <span className="text-tertiary">{p.sites}</span>
            </div>
          ))}
          <div className="mt-1 bg-accent/15 text-accent text-[0.73rem] font-bold px-3 py-2 rounded-lg cursor-default">
            Alle jetzt updaten →
          </div>
        </div>
      </div>
    ),
  },
]

// Landing showcase: 5 visually distinctive features — no 1:1 overlap with the capabilities grid above.
// Terminal, Browser, Sync-Checklist, Pipeline, Chart — each has a unique visual language.
export const showcaseFeatures = [allFeatures[0], allFeatures[3], allFeatures[6]]

export const tickerItems = [
  'Lokale Entwicklung',
  'Staging und Preview',
  'Selektive Synchronisierung',
  'Deploy via GitLab',
  'Monitoring und Alerts',
  'Updates mit Rollback',
  'Team-Vault und Zugänge',
  'Kunden- und Projektverwaltung',
  'Hoster-unabhängig',
  'Rollback auf Knopfdruck',
  'SSH, WP Admin, DB verschlüsselt',
  'Preview-Links für Kunden',
  'KI-Unterstützung im Workflow',
]
