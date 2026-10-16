import "./_group.css";
import { LogIn, ShieldCheck } from "lucide-react";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path fill="#4285F4" d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26Z" />
      <path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.5Z" />
      <path fill="#FBBC05" d="M6.54 13.58a5.85 5.85 0 0 1 0-3.16V7.89H3.3a9.5 9.5 0 0 0 0 8.22l3.24-2.53Z" />
      <path fill="#EA4335" d="M12 6.39c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.47 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 8.11 9.46 6.39 12 6.39Z" />
    </svg>
  );
}

export function Current() {
  const isEmbeddedPreview = window.self !== window.top;

  return (
    <div className="dark fleetx-auth-preview">
      <main className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md flex flex-col gap-8">
          <div className="text-center">
            <img
              src="/__mockup/images/fleetx-logo.jpeg"
              alt="FleetX logo"
              className="mx-auto mb-6 block h-24 w-24 rounded-3xl border border-white/10 bg-black object-cover shadow-lg shadow-black/20"
            />
            <h1 className="text-3xl font-black tracking-tight text-foreground">FleetX</h1>
            <p className="text-muted-foreground mt-2 font-medium">
              Run your vehicles, work logs, drivers and accounts from one place.
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-border p-7 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

            <div className="flex items-start gap-4 mb-8">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h2 className="font-bold text-foreground text-lg">Sign in to continue</h2>
                <p className="text-sm text-muted-foreground mt-0.5 leading-snug">
                  Sign in with your Google account to open your FleetX workspace.
                </p>
              </div>
            </div>

            {isEmbeddedPreview && (
              <p className="mb-4 mt-2 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs leading-relaxed text-muted-foreground">
                Google sign-in can lose its browser state inside an embedded preview.{" "}
                <a href="#" className="font-bold text-primary underline underline-offset-2">
                  Open FleetX in a new tab
                </a>{" "}
                and sign in there.
              </p>
            )}

            <button
              type="button"
              className="w-full bg-primary text-primary-foreground rounded-2xl p-4 font-bold flex items-center justify-center gap-3 shadow-[0_4px_14px_rgba(245,158,11,0.3)]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                <GoogleMark />
              </span>
              Continue with Google
              <LogIn size={18} className="ml-1" />
            </button>

            <p className="text-[11px] text-muted-foreground text-center mt-6">
              Only your signed-in account can access its fleet workspace.{" "}
              <a href="#" className="ml-1 underline underline-offset-4">Admin sign in</a>
            </p>
          </div>

          <p className="text-xs text-muted-foreground/60 text-center font-bold mt-4 uppercase tracking-[0.15em]">
            Rugged • Trusted • Field Ready
          </p>
        </div>
      </main>
    </div>
  );
}
