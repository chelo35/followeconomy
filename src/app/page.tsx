export default function Home() {
  return (
    <main className="container guide">
      {/* Step 1: Üst header renk bloğu (yazısız) */}
      <section className="header-block" aria-hidden="true" />

      {/* Step 2: Navigasyon şeridi (yazısız) */}
      <nav className="nav-strip" aria-hidden="true">
        <div className="nav-pill" />
        <div className="nav-pill" />
        <div className="nav-pill" />
        <div className="nav-pill" />
      </nav>
    </main>
  );
}