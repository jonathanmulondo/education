import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { sampleTracks, sampleProjects } from '@/lib/data/sampleData';

export default function TracksPage() {
  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Learning Tracks</h1>
          <p className="text-gray-400">
            Follow curated learning paths to build your skills progressively
          </p>
        </div>

        {/* Tracks List */}
        <div className="space-y-6">
          {sampleTracks.map((track) => {
            const trackProjects = sampleProjects.filter((p) =>
              track.project_ids.includes(p.id)
            );

            return (
              <div key={track.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-500/20 p-3 rounded-lg">
                      <BookOpen className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2 text-white">{track.name}</h2>
                      <p className="text-gray-400 mb-2">
                        {track.description}
                      </p>
                      <span className="inline-block px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                        {track.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Projects in Track */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4 text-white">
                    Projects in this track ({trackProjects.length})
                  </h3>
                  <div className="space-y-3">
                    {trackProjects.map((project, index) => (
                      <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold text-white">
                            {project.title}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {project.difficulty} • {project.duration}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Enroll Button */}
                <div className="mt-6">
                  <button className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors font-semibold">
                    Enroll in this Track
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coming Soon */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mt-8 text-center">
          <h3 className="text-xl font-semibold mb-2 text-white">More Tracks Coming Soon!</h3>
          <p className="text-gray-400 mb-4">
            We're working on additional learning tracks for various STEM disciplines
          </p>
          <Link href="/projects" className="text-yellow-500 hover:text-yellow-400">
            Browse individual projects in the meantime →
          </Link>
        </div>
      </div>
    </div>
  );
}
