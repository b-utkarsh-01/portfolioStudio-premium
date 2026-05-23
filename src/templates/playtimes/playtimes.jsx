import { useMemo } from "react";

const getStage = (stages, id, fallbackTitle) => {
  const match = (Array.isArray(stages) ? stages : []).find((stage) => stage?.id === id);
  return {
    enabled: match?.enabled !== false,
    title: match?.title?.trim() || fallbackTitle,
  };
};

const PlayTimes = ({ data }) => {
  const stages = data.layout?.stages || [];

  const profileStage = getStage(stages, "profile", "Profile");
  const skillsStage = getStage(stages, "skills", "Skills");
  const workStage = getStage(stages, "work", "Work & Education");
  const socialStage = getStage(stages, "social", "Services & Reviews");
  const publishStage = getStage(stages, "publish", "Publish");

  const customStages = useMemo(
    () =>
      (Array.isArray(data.customStages) ? data.customStages : []).filter((item) =>
        item?.kind === "cards" ? Array.isArray(item.cards) && item.cards.length : `${item?.paragraph || ""}`.trim()
      ),
    [data.customStages]
  );

  const topSkills = Object.values(data.skills || {}).flat().filter(Boolean).slice(0, 12);
  const contactLinks = (data.profile?.contacts || []).slice(0, 4);
  const projects = (data.projects || []).slice(0, 6);
  const experiences = (data.experiences || []).slice(0, 6);
  const services = (data.services || []).slice(0, 6);
  const certifications = (data.certifications || []).slice(0, 8);
  const testimonials = (data.testimonials || []).slice(0, 4);

  return (
    <div className="w-full min-h-screen bg-[#fbf7ee] text-neutral-900 antialiased selection:bg-lime-300 selection:text-neutral-900">
      <div className="mx-auto max-w-6xl p-4 pb-24 sm:p-6 lg:p-8">
        
        {/* --- HERO / HEADER SECTION --- */}
        <section className="relative overflow-hidden rounded-3xl border-2 border-neutral-900 bg-gradient-to-br from-lime-300 via-emerald-300 to-amber-300 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:p-10">
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center rounded-md bg-neutral-900 px-3 py-1 text-xs font-black uppercase tracking-widest text-lime-300">
                Professional Portfolio
              </span>
              <h1 className="text-4xl font-black tracking-tight text-neutral-900 sm:text-6xl uppercase">
                {data.profile?.name || "Your Name"}
              </h1>
              <p className="text-xl font-extrabold text-neutral-800 tracking-tight bg-white/40 inline-block px-2 py-0.5 rounded-lg border border-neutral-900/20 sm:text-2xl">
                {(data.profile?.title || []).filter(Boolean).join("  //  ") || "Your Role"}
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-neutral-800 font-bold">
                {data.profile?.summary || "Write a crisp summary focused on your strengths, impact, and goals."}
              </p>
            </div>

            {/* Quick Contact Sidebar */}
            <aside className="w-full shrink-0 rounded-2xl border-2 border-neutral-900 bg-[#fffdf9] p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] lg:w-80">
              <h3 className="text-xs font-black uppercase tracking-wider text-neutral-500">Quick Contact</h3>
              <div className="mt-4 space-y-2.5">
                {contactLinks.length ? (
                  contactLinks.map((item) => (
                    <a
                      key={`${item.type}-${item.href}`}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      className="group flex items-center justify-between rounded-xl border border-neutral-300 bg-amber-50/50 px-3.5 py-2.5 text-sm transition-all duration-150 hover:border-neutral-900 hover:bg-lime-200"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-wide text-emerald-800">{item.type}</span>
                        <span className="font-extrabold text-neutral-900 mt-0.5">{item.text}</span>
                      </div>
                      <span className="text-neutral-900 font-black transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  ))
                ) : (
                  <p className="rounded-xl border-2 border-dashed border-neutral-300 py-4 text-center text-xs font-bold text-neutral-400">
                    Add contact details from dashboard.
                  </p>
                )}
              </div>
            </aside>
          </div>

          {/* Featured Skills Grid */}
          {topSkills.length ? (
            <div className="mt-8 border-t-2 border-neutral-900/30 pt-6">
              <div className="flex flex-wrap gap-2">
                {topSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-neutral-900 bg-[#fffdf9] px-3 py-1 text-xs font-black text-neutral-900 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {/* --- PROFILE SUMMARY SECTION --- */}
        {profileStage.enabled ? (
          <section className="mt-8 rounded-3xl border-2 border-neutral-900 bg-amber-100/40 p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:p-8">
            <h2 className="text-xs font-black uppercase tracking-wider text-emerald-800">{profileStage.title} Overview</h2>
            <div className="mt-4 max-w-4xl space-y-2">
              <h3 className="text-xl font-black text-neutral-900">{data.profile?.name || "Your Name"}</h3>
              <p className="text-sm font-extrabold text-amber-700">{(data.profile?.title || []).join(" | ")}</p>
              <p className="text-base leading-relaxed text-neutral-700 font-bold">{data.profile?.summary}</p>
            </div>
          </section>
        ) : null}

        {/* --- ALL SKILLS SECTION --- */}
        {skillsStage.enabled ? (
          <section className="mt-6 rounded-3xl border-2 border-neutral-900 bg-[#fffdf9] p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:p-8">
            <h2 className="text-lg font-black tracking-tight text-neutral-900 uppercase">{skillsStage.title}</h2>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {topSkills.map((skill) => (
                <span key={skill} className="rounded-xl border border-neutral-300 bg-neutral-900/5 px-4 py-2 text-sm font-extrabold text-neutral-800 transition-all hover:border-neutral-900 hover:bg-lime-200">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {/* --- EXPERIENCE & PROJECTS GRID --- */}
        {workStage.enabled ? (
          <section className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Work Experience */}
            <article className="rounded-3xl border-2 border-neutral-900 bg-[#fffdf9] p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:p-8">
              <h2 className="text-lg font-black tracking-tight text-neutral-900 uppercase">{workStage.title}</h2>
              <div className="mt-5 space-y-4">
                {experiences.map((item) => (
                  <div key={`${item.title}-${item.company}`} className="group relative rounded-2xl border border-neutral-200 bg-amber-50/30 p-4 transition-all hover:border-neutral-900 hover:bg-amber-50">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="font-black text-neutral-900 group-hover:text-emerald-800 transition-colors">{item.title}</h3>
                        <p className="text-sm font-bold text-neutral-500">{item.company}</p>
                      </div>
                      <span className="inline-block shrink-0 rounded-md bg-amber-200 px-2 py-0.5 text-xs font-black text-amber-950 border border-neutral-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                        {item.period}
                      </span>
                    </div>
                    {item.description ? <p className="mt-3 text-sm leading-relaxed text-neutral-600 font-bold">{item.description}</p> : null}
                  </div>
                ))}
                {!experiences.length ? (
                  <p className="rounded-2xl border-2 border-dashed border-neutral-200 py-8 text-center text-sm font-bold text-neutral-400">
                    Add experience entries from dashboard.
                  </p>
                ) : null}
              </div>
            </article>

            {/* Projects */}
            <article className="rounded-3xl border-2 border-neutral-900 bg-[#fffdf9] p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:p-8">
              <h2 className="text-lg font-black tracking-tight text-neutral-900 uppercase">Projects</h2>
              <div className="mt-5 grid gap-4">
                {projects.map((item) => (
                  <div key={item.name} className="group rounded-2xl border border-neutral-200 bg-amber-50/30 p-4 transition-all hover:border-neutral-900 hover:bg-amber-50">
                    <div className="space-y-1">
                      <h3 className="font-black text-neutral-900 group-hover:text-emerald-800 transition-colors">{item.name}</h3>
                      <p className="text-xs font-mono font-black text-orange-600">{item.tech}</p>
                    </div>
                    {item.description ? <p className="mt-3 text-sm leading-relaxed text-neutral-600 font-bold">{item.description}</p> : null}
                  </div>
                ))}
                {!projects.length ? (
                  <p className="rounded-2xl border-2 border-dashed border-neutral-200 py-8 text-center text-sm font-bold text-neutral-400">
                    Add project entries from dashboard.
                  </p>
                ) : null}
              </div>
            </article>
          </section>
        ) : null}

        {/* --- SERVICES & TESTIMONIALS SECTION --- */}
        {socialStage.enabled ? (
          <section className="mt-6 rounded-3xl border-2 border-neutral-900 bg-[#fffdf9] p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:p-8">
            <h2 className="text-lg font-black tracking-tight text-neutral-900 uppercase">{socialStage.title}</h2>
            
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {services.map((item) => (
                <div key={item.name} className="rounded-2xl border border-neutral-200 bg-neutral-900/5 p-4">
                  <h3 className="font-black text-neutral-900">{item.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600 font-bold">{item.description}</p>
                </div>
              ))}
              {!services.length ? (
                <p className="col-span-full rounded-2xl border-2 border-dashed border-neutral-200 py-6 text-center text-sm font-bold text-neutral-400">
                  Add services from dashboard.
                </p>
              ) : null}
            </div>

            {/* Testimonials Sub-section */}
            {testimonials.length ? (
              <div className="mt-8 border-t-2 border-neutral-900/20 pt-6">
                <h3 className="text-base font-black tracking-tight text-neutral-900 uppercase">Testimonials</h3>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  {testimonials.map((item, index) => (
                    <blockquote key={`${item.name}-${index}`} className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-lime-50/40 p-5">
                      <p className="text-sm italic leading-relaxed text-neutral-700 font-bold">&quot;{item.quote}&quot;</p>
                      <footer className="mt-4 flex items-center gap-2 border-t border-neutral-200/20 pt-3">
                        <div className="text-xs">
                          <cite className="not-italic font-black text-neutral-900">{item.name}</cite>
                          <span className="text-orange-600 font-bold"> • {item.role}</span>
                        </div>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        {/* --- CERTIFICATIONS SECTION --- */}
        {publishStage.enabled ? (
          <section className="mt-6 rounded-3xl border-2 border-neutral-900 bg-[#fffdf9] p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:p-8">
            <h2 className="text-lg font-black tracking-tight text-neutral-900 uppercase">{publishStage.title}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((item) => (
                <div key={item.name} className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-amber-50/20 p-4 transition-all hover:border-neutral-900 hover:bg-lime-100/50">
                  <div className="space-y-1">
                    <h3 className="font-black text-neutral-900 line-clamp-2">{item.name}</h3>
                    <p className="text-xs font-black text-orange-600">{item.provider}</p>
                  </div>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center text-xs font-black text-neutral-900 underline hover:text-emerald-700"
                    >
                      View Credential <span className="ml-0.5 text-[10px]">↗</span>
                    </a>
                  ) : null}
                </div>
              ))}
              {!certifications.length ? (
                <p className="col-span-full rounded-2xl border-2 border-dashed border-neutral-200 py-6 text-center text-sm font-bold text-neutral-400">
                  Add certifications from dashboard.
                </p>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* --- CUSTOM SECTIONS --- */}
        {customStages.length ? (
          <section className="mt-6 rounded-3xl border-2 border-neutral-900 bg-amber-100/40 p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:p-8">
            <h2 className="text-lg font-black tracking-tight text-neutral-900 uppercase">Custom Sections</h2>
            <div className="mt-5 space-y-6">
              {customStages.map((stage) =>
                stage.kind === "cards" ? (
                  <div key={stage.id} className="grid gap-4 lg:grid-cols-2">
                    {stage.cards.map((card, idx) => (
                      <article key={`${stage.id}-${idx}`} className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-[#fffdf9] p-4 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                        <div className="space-y-1">
                          <h3 className="font-black text-neutral-900">{card.title}</h3>
                          {card.subtitle ? <p className="text-xs font-black text-orange-600">{card.subtitle}</p> : null}
                          <p className="mt-2 text-sm leading-relaxed text-neutral-600 font-bold">{card.description}</p>
                        </div>
                        {card.link ? (
                          <a href={card.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center text-xs font-black text-neutral-900 underline hover:text-emerald-700">
                            Open Link <span className="ml-0.5 text-[10px]">↗</span>
                          </a>
                        ) : null}
                      </article>
                    ))}
                  </div>
                ) : (
                  <p key={stage.id} className="rounded-2xl border border-neutral-200 bg-[#fffdf9] p-5 text-sm leading-relaxed text-neutral-700 font-bold shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                    {stage.paragraph}
                  </p>
                )
              )}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default PlayTimes;