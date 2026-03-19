import { STEPS } from '@/lib/data'

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 px-4 py-2 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="font-display text-4xl font-extrabold text-gray-900 mb-4">
            Your Journey to Certification
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            From enrolment to your first day at work — we guide you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-200 to-transparent hidden lg:block" />

          {STEPS.map((step, i) => (
            <div key={i} className="relative text-center group">
              {/* Step number circle */}
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 rounded-full bg-white shadow-lg border-2 border-primary-100 flex items-center justify-center mx-auto group-hover:border-primary-500 group-hover:shadow-primary-200 transition-all">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center font-display">
                  {i + 1}
                </div>
              </div>

              <div className="font-display text-5xl font-extrabold text-gray-100 mb-2 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 pointer-events-none select-none">
                {step.number}
              </div>

              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
