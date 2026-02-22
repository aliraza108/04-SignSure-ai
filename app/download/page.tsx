import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import InstallLinkButton from '../../components/InstallLinkButton';
import MagneticButton from '../../components/MagneticButton';

export default function DownloadPage() {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <main className="relative">
        <section className="relative overflow-hidden bg-bg-primary py-24">
          <div className="absolute inset-0 grid-float opacity-20" />
          <div className="absolute inset-0 gold-radial opacity-70" />
          <div className="relative mx-auto max-w-5xl px-6">
            <div className="rounded-3xl border border-border-gold/60 bg-bg-card/90 p-8 shadow-gold">
              <div className="text-xs uppercase tracking-[0.4em] text-accent-gold">
                [ INSTALL SIGN SURE ]
              </div>
              <h1 className="mt-4 font-display text-4xl text-text-primary">
                Download the SignSure mobile app
              </h1>
              <p className="mt-4 max-w-2xl text-base text-text-secondary">
                Download the Android APK directly from the website or add SignSure
                to your home screen on iOS for a full-screen app experience.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <InstallLinkButton
                  href="/downloads/signsure-app.apk"
                  download="signsure-app.apk"
                  className="rounded-full bg-[#2d6a4f] px-8 py-4 text-xs uppercase tracking-[0.35em] text-white shadow-[0_0_20px_rgba(45,106,79,0.35)]"
                >
                  Download APK
                </InstallLinkButton>
                <MagneticButton
                  href="/#demo"
                  className="rounded-full border border-border-gold/60 bg-bg-primary/70 px-8 py-4 text-xs uppercase tracking-[0.35em] text-text-primary"
                >
                  Open Demo
                </MagneticButton>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-border-gold/50 bg-bg-primary/70 p-6">
                  <div className="text-xs uppercase tracking-[0.35em] text-text-secondary">
                    Android (APK)
                  </div>
                  <ol className="mt-4 space-y-2 text-sm text-text-secondary">
                    <li>1. Tap Download APK above.</li>
                    <li>2. Open the file and approve install from this source.</li>
                    <li>3. Launch SignSure from your home screen.</li>
                  </ol>
                </div>
                <div className="rounded-2xl border border-border-gold/50 bg-bg-primary/70 p-6">
                  <div className="text-xs uppercase tracking-[0.35em] text-text-secondary">
                    iPhone (Safari)
                  </div>
                  <ol className="mt-4 space-y-2 text-sm text-text-secondary">
                    <li>1. Tap the Share icon in Safari.</li>
                    <li>2. Choose Add to Home Screen.</li>
                    <li>3. Open SignSure like a native app.</li>
                  </ol>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-border-gold/40 bg-bg-primary/60 p-4 text-xs uppercase tracking-[0.35em] text-text-secondary">
                No store link required. The APK downloads directly from this site.
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
