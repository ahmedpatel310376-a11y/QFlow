import { Card } from '../../components/common'

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20 px-4">
        <div className="container-max text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Skip the queue. Not the service.</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            QFlow helps people join queues digitally, predict waiting times, book appointments, and receive real-time notifications.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="btn-primary">Join a Queue</button>
            <button className="btn-secondary">For Organizations</button>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="usecases" className="py-20 px-4">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-center mb-12">Where QFlow Works</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { icon: '🏥', name: 'Hospitals', desc: 'OPD, diagnostics, pharmacy' },
              { icon: '🏦', name: 'Banks', desc: 'Customer service, loans' },
              { icon: '🎓', name: 'Colleges', desc: 'Administration, admissions' },
              { icon: '🏢', name: 'Offices', desc: 'Appointments, visitor queues' },
              { icon: '🏛️', name: 'Government', desc: 'Citizen service queues' },
            ].map((item, i) => (
              <Card key={i} className="text-center hover">
                <div className="text-4xl mb-2">{item.icon}</div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Digital Token', desc: 'Join queues instantly with a unique token' },
              { title: 'Real-Time Tracking', desc: 'Monitor your position and wait time' },
              { title: 'AI Predictions', desc: 'Get accurate waiting time estimates' },
              { title: 'Smart Notifications', desc: 'Receive alerts when your turn approaches' },
              { title: 'Appointment Booking', desc: 'Schedule services in advance' },
              { title: 'Analytics', desc: 'Organizations gain valuable insights' },
            ].map((feature, i) => (
              <div key={i}>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
