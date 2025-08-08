import InlineCryptoGrid from '@/components/InlineCryptoGrid';

export default function Home() {
  return (
    <main className="container container--fluid">
      {/* üst widgetlar & tickerlarınız */}
      <section className="below">
        <aside className="left-rail">
          <InlineCryptoGrid />
        </aside>
        <div className="main-rail" />
      </section>
    </main>
  );
}