'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { sampleProjects } from '@/lib/data/sampleData';
import type { Project, DifficultyLevel, ProjectCategory } from '@/types';

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electrical' as ProjectCategory,
    difficulty: 'Beginner' as DifficultyLevel,
    duration: '',
    components_list: '',
    learning_objectives: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProject: Project = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      difficulty: formData.difficulty,
      duration: formData.duration,
      components_list: formData.components_list
        .split('\n')
        .filter((item) => item.trim()),
      learning_objectives: formData.learning_objectives
        .split('\n')
        .filter((item) => item.trim()),
      created_at: new Date().toISOString(),
    };

    setProjects([...projects, newProject]);
    setIsAddingProject(false);

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: 'Electrical',
      difficulty: 'Beginner',
      duration: '',
      components_list: '',
      learning_objectives: '',
    });

    alert('Project added! (In production, this would save to Supabase)');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((p) => p.id !== id));
      alert('Project deleted! (In production, this would delete from Supabase)');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Admin Panel</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage projects, steps, and learning tracks
            </p>
          </div>
          <button
            onClick={() => setIsAddingProject(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Project</span>
          </button>
        </div>

        {/* Add Project Modal */}
        {isAddingProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-2xl font-bold mb-6">Add New Project</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="input-field"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as ProjectCategory,
                        })
                      }
                      className="input-field"
                    >
                      <option value="Electrical">Electrical</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Mechatronics">Mechatronics</option>
                      <option value="Biomedical">Biomedical</option>
                      <option value="Physics">Physics</option>
                      <option value="Software">Software</option>
                      <option value="IoT">IoT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          difficulty: e.target.value as DifficultyLevel,
                        })
                      }
                      className="input-field"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Duration (e.g., "2-3 hours")
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Components List (one per line)
                  </label>
                  <textarea
                    value={formData.components_list}
                    onChange={(e) =>
                      setFormData({ ...formData, components_list: e.target.value })
                    }
                    className="input-field"
                    rows={4}
                    placeholder="Arduino Uno&#10;DHT22 Sensor&#10;Breadboard"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Learning Objectives (one per line)
                  </label>
                  <textarea
                    value={formData.learning_objectives}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        learning_objectives: e.target.value,
                      })
                    }
                    className="input-field"
                    rows={4}
                    placeholder="Understand temperature sensors&#10;Learn Arduino programming&#10;Interface with LCD displays"
                  />
                </div>

                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary flex-1">
                    Add Project
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingProject(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Existing Projects ({projects.length})</h2>
          {projects.map((project) => (
            <div
              key={project.id}
              className="card flex items-start justify-between"
            >
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                    {project.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                    {project.duration}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Edit className="h-5 w-5 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Trash2 className="h-5 w-5 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="card mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
            Note for Production
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            This admin panel is a prototype. In production, you would:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300">
            <li>Add authentication to restrict access to admin users only</li>
            <li>Integrate with Supabase for actual data persistence</li>
            <li>Add step management for each project</li>
            <li>Include image upload functionality</li>
            <li>Add validation and error handling</li>
            <li>Implement edit functionality</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
