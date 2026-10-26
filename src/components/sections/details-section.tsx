
const milestones = [
  { title: "Overview", detail: "Sale information", active: true },
  { title: "Progress", detail: "Funding status", active: false },
  { title: "Details", detail: "Demo information", active: false },
  { title: "Summary", detail: "Reference section", active: false },
];

const rows = [
  ["▦", "Sale status", "Demo"],
  ["⌁", "Funding progress", "See above"],
  ["◉", "Target amount", "See above"],
  ["◷", "Countdown", "Live timer"],
  ["◇", "Interface mode", "Mock data"],
];

export function DetailsSection() {
  return (
    <section
      id="details"
      className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24"
    >
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-orange-500">
          Platform overview
        </p>

        <h2 className="mt-4 text-3xl font-medium sm:text-4xl">
          Explore the details
        </h2>

        <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
          Review the sale information, progress indicators, and
          interface details in one place.
        </p>

        <div className="mt-8 border border-orange-900/70 bg-[#090504] p-5 sm:p-6">
          <h3 className="text-sm font-medium">Sale information</h3>

          <div className="mt-5 space-y-4">
            {[
              ["Sale status", "Demo"],
              ["Funding details", "Overview"],
              ["Countdown", "Active timer"],
              ["Data source", "Mock API"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 text-xs"
              >
                <span className="text-zinc-400">{label}</span>
                <a
                  href="#sale"
                  className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-orange-400"
                >
                  {value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="min-w-0">
        <div className="grid grid-cols-4">
          {milestones.map((item) => (
            <div key={item.title} className="min-w-0 pr-2">
              <div className="flex items-center">
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full border ${
                    item.active
                      ? "border-orange-500 bg-orange-500"
                      : "border-zinc-700 bg-black"
                  }`}
                />
                <span className="h-px flex-1 bg-zinc-800" />
              </div>

              <p
                className={`mt-3 text-[10px] ${
                  item.active ? "text-orange-500" : "text-zinc-300"
                }`}
              >
                {item.title}
              </p>

              <p className="mt-1 text-[10px] leading-4 text-zinc-500">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-zinc-800">
          {rows.map(([icon, label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4 border-b border-zinc-800 py-3 text-xs"
            >
              <span className="flex items-center gap-3 text-zinc-300">
                <span className="text-orange-500">{icon}</span>
                {label}
              </span>
              <span className="text-right text-zinc-500">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
