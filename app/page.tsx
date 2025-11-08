import Link from 'next/link';
import { ArrowRight, Code, Cpu, Microscope, Zap, Cog, Smartphone } from 'lucide-react';

export default function Home() {
  const categories = [
    {
      name: 'Electrical',
      icon: Zap,
      description: 'Circuit design, PCB layout, power systems',
      color: 'bg-yellow-500',
    },
    {
      name: 'Mechanical',
      icon: Cog,
      description: 'CAD design, mechanisms, prototyping',
      color: 'bg-gray-600',
    },
    {
      name: 'Mechatronics',
      icon: Cpu,
      description: 'Arduino, sensors, robotics, automation',
      color: 'bg-blue-500',
    },
    {
      name: 'Biomedical',
      icon: Microscope,
      description: 'Medical devices, biosensors, health tech',
      color: 'bg-red-500',
    },
    {
      name: 'IoT',
      icon: Smartphone,
      description: 'Connected devices, wireless communication',
      color: 'bg-green-500',
    },
    {
      name: 'Software',
      icon: Code,
      description: 'Embedded systems, firmware, applications',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Learn by Doing
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Turn Theory into Practice with Guided STEM Projects
          </p>
          <p className="text-lg mb-10 max-w-3xl mx-auto text-primary-50">
            Bridge the gap between classroom learning and real-world application.
            Build Arduino sensors, design PCBs, create biomedical devices, and more
            with step-by-step guidance and AI mentorship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center justify-center space-x-2">
              <span>Start a Project</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/tracks" className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors inline-flex items-center justify-center">
              Browse Learning Tracks
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-12">How Practicum Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose a Project</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse curated projects across electrical, mechanical, biomedical,
                and other STEM fields
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Follow Step-by-Step</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Watch tutorials, read theory notes, and complete hands-on tasks
                with clear guidance
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get AI Mentorship</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ask questions, understand the 'why' behind concepts, and get
                instant help from your AI mentor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-4">Explore by Category</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            From circuit design to biomedical sensors, find projects that match
            your interests and skill level
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.name}
                  href={`/projects?category=${category.name}`}
                  className="card hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${category.color} p-3 rounded-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4">Ready to Start Building?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Join students worldwide who are turning theoretical knowledge into
            practical skills
          </p>
          <Link href="/projects" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center space-x-2">
            <span>Browse All Projects</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
