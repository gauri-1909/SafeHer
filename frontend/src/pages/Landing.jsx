import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FDF2F8] font-['Inter',-apple-system,sans-serif] leading-[1.6] text-[#2A1B3D] antialiased [&_*]:box-border [&_a]:text-inherit [&_a]:no-underline [&_svg]:block [&_svg]:max-w-full">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-[#F3E1EC] bg-[rgba(253,242,248,0.85)] backdrop-blur-[12px]">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-7 py-[18px]">
          <div className="flex items-center gap-2.5 text-[19px] font-extrabold text-[#BE185D]">
            <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#F472B6] to-[#BE185D] text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3Z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </span>
            SafeHer
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-br from-[#EC4899] to-[#BE185D] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(190,24,93,0.28)] transition duration-150 hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(190,24,93,0.36)]"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative pb-[60px] pt-[88px]">
        <div className="mx-auto grid max-w-[1120px] grid-cols-2 items-center gap-16 px-7 max-[860px]:grid-cols-1 max-[860px]:gap-10">
          <div>
            <span className="relative mb-6 inline-flex items-center gap-2 rounded-full bg-[#FCE9F3] px-3.5 py-[7px] text-[12.5px] font-bold uppercase tracking-[0.08em] text-[#BE185D] before:h-[6px] before:w-[6px] before:shrink-0 before:rounded-full before:bg-[#B0374A] before:shadow-[0_0_0_3px_#FCEBEB] before:content-['']">
              Live · MERN + Socket.IO
            </span>

            <h1 className="mb-[22px] font-['Fraunces',Georgia,serif] text-[clamp(40px,5.2vw,62px)] font-semibold leading-[1.06] tracking-[-0.02em] text-[#2A1B3D]">
              One tap.<br />
              Instant alert.<br />
              <em className="font-medium italic text-[#BE185D]">Safer you.</em>
            </h1>

            <p className="mb-[34px] max-w-[440px] text-lg text-[#4A3A5A]">
              SafeHer keeps someone watching, always. Link with people you trust, and the moment you need help, they know exactly where you are — live.
            </p>

            <div className="mb-10 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-br from-[#EC4899] to-[#BE185D] px-[26px] py-[13px] text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(190,24,93,0.28)] transition duration-150 hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(190,24,93,0.36)]"
              >
                Login
              </Link>

              <a
                href="/"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] border-[#F3E1EC] bg-transparent px-[26px] py-[13px] text-[15px] font-semibold text-[#BE185D] transition duration-150 hover:bg-[#FCE9F3]"
              >
                See how it works
              </a>
            </div>

            <div className="flex flex-wrap gap-7 max-[860px]:gap-5">
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Fraunces',serif] text-[22px] font-bold text-[#2A1B3D]">&lt;1s</span>
                <span className="text-[13px] text-[#6B4C7A]">Alert delivery</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Fraunces',serif] text-[22px] font-bold text-[#2A1B3D]">100%</span>
                <span className="text-[13px] text-[#6B4C7A]">Ownership-checked data</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Fraunces',serif] text-[22px] font-bold text-[#2A1B3D]">0</span>
                <span className="text-[13px] text-[#6B4C7A]">Refreshes needed</span>
              </div>
            </div>
          </div>

          {/* SOS VISUAL */}
          <div className="relative flex h-[460px] items-center justify-center max-[860px]:h-[340px]" aria-hidden="true">
            <div className="absolute h-[148px] w-[148px] animate-ping rounded-full border-2 border-[#B0374A] opacity-20 [animation-duration:2.8s]" />
            <div className="absolute h-[148px] w-[148px] animate-ping rounded-full border-2 border-[#B0374A] opacity-20 [animation-delay:0.9s] [animation-duration:2.8s]" />
            <div className="absolute h-[148px] w-[148px] animate-ping rounded-full border-2 border-[#B0374A] opacity-20 [animation-delay:1.8s] [animation-duration:2.8s]" />

            <div className="relative z-[3] flex h-[148px] w-[148px] flex-col items-center justify-center rounded-full border-[3px] border-[#E9A8A8] bg-[radial-gradient(circle_at_50%_40%,#FDECEC,#FBE0E3)] text-[#B0374A] shadow-[0_8px_32px_rgba(176,55,74,0.18)]">
              <svg className="mb-1 h-[30px] w-[30px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 9v4M12 17h.01M10.3 3.9 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/>
              </svg>
              <span className="text-base font-extrabold tracking-[0.04em]">SOS</span>
            </div>

            <div className="absolute left-1/2 top-1/2 h-0.5 w-[210px] origin-left -translate-y-1/2 rotate-[-18deg]">
              <svg width="210" height="2" className="overflow-visible">
                <line x1="0" y1="1" x2="210" y2="1" stroke="#EC4899" strokeWidth="2" strokeDasharray="6 7" />
              </svg>
            </div>

            <div className="absolute right-[4%] top-[14%] z-[3] flex items-center gap-3 rounded-2xl bg-white px-[18px] py-3.5 shadow-[0_4px_24px_rgba(90,30,70,0.08)] max-[860px]:right-0">
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#FCE9F3] text-sm font-bold text-[#BE185D]">R</div>
              <div>
                <div className="text-[13.5px] font-bold text-[#2A1B3D]">Rohan Sharma</div>
                <div className="flex items-center gap-1 text-[11.5px] font-semibold text-[#1F7A3D]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  Alert received
                </div>
              </div>
            </div>

            <div className="absolute bottom-[10%] left-[2%] z-[3] flex items-center gap-2 rounded-[14px] bg-white px-4 py-2.5 text-xs text-[#6B4C7A] shadow-[0_2px_14px_rgba(90,30,70,0.06)] max-[860px]:left-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <strong className="font-semibold text-[#2A1B3D]">Live location</strong>&nbsp;shared
            </div>
          </div>
        </div>
      </header>

      {/* HOW IT WORKS — ORIGINAL WHITE BACKGROUND */}
      <section id="how-it-works" className="bg-white py-[100px]">
        <div className="mx-auto max-w-[1120px] px-7">
          <div className="mb-14 max-w-[560px]">
            <span className="mb-[14px] block text-[12.5px] font-bold uppercase tracking-[0.1em] text-[#DB2777]">
              How SafeHer works
            </span>
            <h2 className="mb-[14px] font-['Fraunces',serif] text-[clamp(30px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.01em] text-[#2A1B3D]">
              Three steps between you and someone who can help.
            </h2>
            <p className="text-base text-[#6B4C7A]">
              No setup complexity, no configuration. Just people you trust, connected before you ever need them.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 max-[860px]:grid-cols-1">
            {[
              ["01", "Add your circle", "Save the people who should know first — sisters, roommates, best friends. Generate a code and link their accounts to yours."],
              ["02", "Tap SOS when it matters", "One tap captures your exact location — never cached, always fresh — and logs it instantly to your account."],
              ["03", "They see it, live", "Everyone linked to you gets a real-time alert the moment you trigger it — no refresh, no delay, no waiting on a text."]
            ].map(([num, title, text]) => (
              <div key={num} className="relative rounded-[20px] border border-[#F3E1EC] bg-white px-[26px] py-8">
                <div className="mb-[18px] font-['Fraunces',serif] text-[40px] font-bold leading-none text-[#F3E1EC]">{num}</div>
                <h3 className="mb-2 text-[17px] font-bold text-[#2A1B3D]">{title}</h3>
                <p className="text-[14.5px] text-[#4A3A5A]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-[100px]">
        <div className="mx-auto max-w-[1120px] px-7">
          <div className="mb-14 max-w-[560px]">
            <span className="mb-[14px] block text-[12.5px] font-bold uppercase tracking-[0.1em] text-[#DB2777]">
              Built for real trust
            </span>
            <h2 className="mb-[14px] font-['Fraunces',serif] text-[clamp(30px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.01em] text-[#2A1B3D]">
              Every feature earns its place.
            </h2>
            <p className="text-base text-[#6B4C7A]">
              Nothing here is decorative. Each piece exists because it makes the moment you need help faster or safer.
            </p>
          </div>

          <div className="grid grid-cols-[1.3fr_1fr] gap-5 max-[860px]:grid-cols-1">
            <div className="flex min-h-[340px] flex-col justify-between rounded-[20px] bg-gradient-to-br from-[#2A1B3D] via-[#3D2354] to-[#BE185D] p-7 text-white shadow-[0_2px_14px_rgba(90,30,70,0.06)]">
              <div>
                <div className="mb-[18px] flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[rgba(255,255,255,0.12)] text-[#F472B6]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>
                  </svg>
                </div>
                <h3 className="mb-2 text-[17px] font-bold text-white">
                  Real-time alerts, not notifications you check later
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-[rgba(255,255,255,0.78)]">
                  Built on Socket.IO with authenticated, per-user private channels. When you trigger SOS, linked accounts are pushed the alert instantly — not queued, not polled, not delayed.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2.5 rounded-[14px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] px-4 py-3.5 text-[13px]">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#4ADE80] shadow-[0_0_0_4px_rgba(74,222,128,0.2)] animate-pulse" />
                Live socket connection · 2 linked accounts online
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 max-[860px]:grid-cols-1">
              {[
                ["Emergency contacts", "Save the people who matter, tied to your account only — never visible to anyone else.", "users"],
                ["Link with a code", "A 15-minute pairing code connects two accounts — no phone numbers required, no shared logins.", "link"],
                ["Ownership-checked data", "Every request is verified server-side against the logged-in user — not just hidden in the UI.", "shield"],
                ["Live location, mapped", "Every SOS event carries a fresh GPS reading with a one-tap link to view it on the map.", "map"]
              ].map(([title, text, icon]) => (
                <div key={title} className="rounded-[20px] border border-[#F3E1EC] bg-white p-7 shadow-[0_2px_14px_rgba(90,30,70,0.06)]">
                  <div className="mb-[18px] flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#FCE9F3] text-[#BE185D]">
                    {icon === "users" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    )}
                    {icon === "link" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 20H4v-5m16-6V4h-5m5 0-6.5 6.5M4 15l6.5-6.5"/>
                      </svg>
                    )}
                    {icon === "shield" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3Z"/>
                      </svg>
                    )}
                    {icon === "map" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    )}
                  </div>
                  <h3 className="mb-2 text-[17px] font-bold text-[#2A1B3D]">{title}</h3>
                  <p className="text-[14.5px] leading-[1.65] text-[#4A3A5A]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STACK — ORIGINAL WHITE BACKGROUND */}
      <section className="bg-white py-[100px]">
        <div className="mx-auto max-w-[1120px] px-7">
          <div className="mx-auto mb-10 max-w-[560px] text-center">
            <span className="mb-[14px] block text-[12.5px] font-bold uppercase tracking-[0.1em] text-[#DB2777]">
              Under the hood
            </span>
            <h2 className="font-['Fraunces',serif] text-[clamp(30px,3.4vw,40px)] font-semibold leading-tight tracking-[-0.01em] text-[#2A1B3D]">
              Built with a real stack, deployed for real.
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            {["React + Vite", "Tailwind CSS", "Node.js", "Express", "MongoDB Atlas", "Socket.IO", "JWT + bcrypt"].map((item) => (
              <span key={item} className="rounded-full border border-[#F3E1EC] bg-[#FCE9F3] px-[18px] py-[9px] text-[13.5px] font-semibold text-[#6B4C7A]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-[100px]">
        <div className="mx-7 rounded-[28px] bg-gradient-to-br from-[#EC4899] to-[#BE185D] px-12 py-16 text-center text-white max-[860px]:mx-3.5 max-[860px]:px-7 max-[860px]:py-12">
          <h2 className="mb-[14px] font-['Fraunces',serif] text-[clamp(28px,3.6vw,38px)] font-semibold">
            Ready when you are.
          </h2>
          <p className="mb-[30px] text-base text-[rgba(255,255,255,0.85)]">
            Log in to link your circle and set up your SOS alert.
          </p>
          <div className="flex justify-center gap-3">
            <Link
         to="/login"
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-br from-[#EC4899] to-[#BE185D] px-[26px] py-[13px] text-[15px] font-semibold text-black shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition duration-150 hover:-translate-y-px border-1"
            >
         Login
        </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-7 pb-10 pt-14 text-center">
        <div className="mb-[14px] flex items-center justify-center gap-2.5 text-[19px] font-extrabold text-[#BE185D]">
          <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#F472B6] to-[#BE185D] text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3Z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </span>
          SafeHer
        </div>
        <p className="text-[13.5px] text-[#6B4C7A]">
          A full-stack safety app built with the MERN stack + Socket.IO.
        </p>
      </footer>
    </div>
  );
}

