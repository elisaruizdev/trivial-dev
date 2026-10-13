export function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <main className="welcome">
      <h1 className="mark-title welcome-title">
        <span className="mark-line">
          <span className="mark-word mark-pink">Trivial</span>{' '}
          <span className="mark-word mark-yellow">para</span>
        </span>
        <span className="mark-line">
          <span className="mark-word mark-mint">desarrolladores</span>
        </span>
      </h1>
      <button type="button" className="primary welcome-continue" onClick={onContinue}>
        Continuar
      </button>
    </main>
  )
}
