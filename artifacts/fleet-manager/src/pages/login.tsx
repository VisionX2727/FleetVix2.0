import { useAuth } from "@/lib/auth";
import { Link } from "wouter";
import {
  AlertCircle,
  ArrowRight,
  Check,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import fleetXLogo from "@assets/FleetX_1785676635299.jpeg";

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

export default function Login({ adminOnly = false }: { adminOnly?: boolean }) {
  const { signInWithGoogle, signingIn, authError } = useAuth();
  const showCallbackBrowserHelp = Boolean(authError && /(callback|code verifier|sign-in verifier|pkce|flow_state|sign-in state)/i.test(authError));
  const showSupabaseConfigHelp = Boolean(authError && /missing a valid supabase url or publishable key/i.test(authError));
  const showOAuthHelp = Boolean(
    authError &&
    !showCallbackBrowserHelp &&
    !showSupabaseConfigHelp &&
    /(could not reach supabase|oauth configuration|not allowed by supabase|not fully configured in supabase|publishable key configured)/i.test(authError),
  );
  const isEmbeddedPreview = window.self !== window.top;
  const appRedirectUrl = new URL(import.meta.env.BASE_URL || "/", window.location.origin).toString();

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#07111b] px-4 py-7 text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 12% 8%, rgba(245,158,11,.13), transparent 34%), radial-gradient(ellipse at 88% 88%, rgba(23,105,153,.22), transparent 34%), linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 42px 42px, 42px 42px",
        }}
      />

      <div className="relative grid w-full max-w-[1040px] overflow-hidden rounded-[30px] border border-white/10 bg-[#0d1925] shadow-[0_34px_100px_rgba(0,0,0,.5)] lg:grid-cols-[1.05fr_.95fr]">
        <section className="relative flex min-h-[238px] flex-col justify-between overflow-hidden border-b border-white/10 p-6 sm:p-8 lg:min-h-[670px] lg:border-b-0 lg:border-r lg:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 5% 100%, rgba(245,158,11,.17), transparent 48%), linear-gradient(145deg, rgba(18,42,59,.78), rgba(8,17,28,.2) 70%)",
            }}
          />

          <div className="relative">
            <div className="flex items-center gap-3">
              <img
                src={fleetXLogo}
                alt="FleetX logo"
                className="h-11 w-11 rounded-xl border border-white/15 object-cover shadow-lg"
              />
              <div>
                <p className="text-lg font-black tracking-tight text-white">FleetX</p>
                <p className="text-[10px] font-bold uppercase tracking-[.24em] text-slate-400">
                  Fleet operations
                </p>
              </div>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-amber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,.9)]" />
              {adminOnly ? "Administrator access" : "Built for the workday"}
            </div>

            <h1 className="mt-4 max-w-lg text-[clamp(2rem,7vw,3.35rem)] font-black leading-[1.02] tracking-[-.045em] text-white">
              Keep every
              <br />
              trip in view.
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-300 sm:text-base">
              Bring vehicles, drivers, work logs and accounts together in one clear fleet workspace.
            </p>
          </div>

          <div className="relative mt-7 hidden grid-cols-2 gap-3 sm:grid">
            {["Vehicles", "Drivers", "Work logs", "Accounts"].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 rounded-xl border border-white/[.08] bg-white/[.035] px-3 py-2.5 text-xs font-semibold text-slate-300"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400/10 text-amber-300">
                  <Check size={12} strokeWidth={3} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col justify-center p-6 sm:p-9 lg:px-12 lg:py-12">
          <div className="mb-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.22em] text-slate-400">
            <ShieldCheck size={15} className="text-amber-400" />
            Secure account access
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]">
            {adminOnly ? "Admin sign in" : "Sign in to FleetX"}
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
            {adminOnly
              ? "Authorized administrators can manage FleetX support and accounts."
              : "Use your Google account to open your FleetX workspace."}
          </p>

          {isEmbeddedPreview && (
            <p className="mt-5 rounded-xl border border-amber-300/20 bg-amber-300/[.06] p-3.5 text-xs leading-5 text-amber-100/80">
              Google sign-in can lose its browser state inside an embedded preview.{" "}
              <a
                href={window.location.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-200 underline underline-offset-2"
              >
                Open FleetX in a new tab
              </a>{" "}
              and sign in there.
            </p>
          )}

          <button
            type="button"
            onClick={signInWithGoogle}
            disabled={signingIn}
            aria-busy={signingIn}
            className="mt-7 flex w-full items-center justify-between gap-3 rounded-2xl bg-white px-4 py-4 text-sm font-bold text-slate-900 shadow-[0_8px_26px_rgba(0,0,0,.2)] transition hover:bg-slate-100 active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white">
                <GoogleMark />
              </span>
              {signingIn ? "Connecting to Google..." : "Continue with Google"}
            </span>
            {signingIn ? (
              <LoaderCircle size={18} className="animate-spin text-slate-500" />
            ) : (
              <ArrowRight size={18} className="text-slate-500" />
            )}
          </button>

          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-white/[.07] bg-white/[.025] p-3.5">
            <ShieldCheck size={15} className="mt-0.5 shrink-0 text-emerald-300" />
            <p className="text-xs leading-5 text-slate-400">
              Google lets you choose which account to use each time you sign in.
            </p>
          </div>

          {authError && (
            <div
              role="alert"
              aria-live="assertive"
              className="mt-5 rounded-xl border border-red-400/20 bg-red-950/35 p-4 text-sm text-red-100"
            >
              <div className="flex items-start gap-2.5">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-300" />
                <p className="font-medium leading-5 break-words">{authError}</p>
              </div>

              {showSupabaseConfigHelp && (
                <div className="mt-3 space-y-2 pl-7 text-xs leading-5 text-red-100/75">
                  <p>For the Vercel deployment, set these variables in the Production environment, then redeploy:</p>
                  <code className="block rounded-lg bg-black/20 p-2">VITE_SUPABASE_URL</code>
                  <code className="block rounded-lg bg-black/20 p-2">VITE_SUPABASE_PUBLISHABLE_KEY</code>
                </div>
              )}

              {showCallbackBrowserHelp && (
                <div className="mt-3 space-y-2 pl-7 text-xs leading-5 text-red-100/75">
                  <p>
                    This is a browser-session error, not a restriction on ordinary Gmail accounts. If this page opened inside another app, open the URL below directly in Chrome or your full browser, then start a fresh sign-in and stay in that browser.
                  </p>
                  <code className="block break-all rounded-lg bg-black/20 p-2 select-all">
                    {appRedirectUrl}
                  </code>
                </div>
              )}

              {showOAuthHelp && (
                <div className="mt-3 space-y-2 pl-7 text-xs leading-5 text-red-100/75">
                  <p>
                    Enable Google in Supabase Authentication → Providers and enter the Google OAuth client credentials there. In Google Cloud, register the callback URL shown in the Supabase Google provider settings.
                  </p>
                  <p>Add this exact URL under Supabase Authentication → URL Configuration → Redirect URLs:</p>
                  <code className="block break-all rounded-lg bg-black/20 p-2 select-all">
                    {appRedirectUrl}
                  </code>
                </div>
              )}
            </div>
          )}

          <div className="mt-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-semibold uppercase tracking-[.14em] text-slate-500">
              Protected sign-in
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <p className="mt-6 text-center text-[11px] leading-5 text-slate-500">
            {adminOnly ? (
              <Link href="/" className="underline underline-offset-4">
                Back to FleetX sign in
              </Link>
            ) : (
              <>
                Only your signed-in account can access its fleet workspace.
                <br />
                <Link href="/admin" className="mt-1 inline-block font-semibold text-slate-300 underline underline-offset-4">
                  Admin sign in
                </Link>
              </>
            )}
          </p>
        </section>
      </div>

      <p className="pointer-events-none absolute bottom-2 hidden text-[9px] font-bold uppercase tracking-[.28em] text-slate-500 sm:block">
        Rugged · Trusted · Field ready
      </p>
    </main>
  );
}
