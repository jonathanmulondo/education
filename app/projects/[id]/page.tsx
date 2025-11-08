'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock, TrendingUp, Tag, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import StepCard from '@/components/StepCard';
import MentorChat from '@/components/MentorChat';
import { sampleProjects, sampleSteps } from '@/lib/data/sampleData';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;

  const project = sampleProjects.find((p) => p.id === projectId);
  const steps = sampleSteps[projectId] || [];

  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [activeStepId, setActiveStepId] = useState<string>(steps[0]?.id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-primary-600 hover:text-primary-700">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const handleCompleteStep = (stepId: string) => {
    setCompletedSteps((prev) => new Set([...prev, stepId]));

    // Move to next step
    const currentIndex = steps.findIndex((s) => s.id === stepId);
    if (currentIndex < steps.length - 1) {
      setActiveStepId(steps[currentIndex + 1].id);
    }
  };

  const progress = steps.length > 0 ? (completedSteps.size / steps.length) * 100 : 0;

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Projects</span>
        </Link>

        {/* Project Header */}
        <div className="card mb-8">
          <div className="flex items-start justify-between mb-4">
            <h1 className="flex-grow">{project.title}</h1>
            <span className={`px-3 py-1 rounded text-sm font-medium ml-4 ${difficultyColors[project.difficulty]}`}>
              {project.difficulty}
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {project.description}
          </p>

          {/* Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Tag className="h-5 w-5" />
              <span>{project.category}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Clock className="h-5 w-5" />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <CheckCircle className="h-5 w-5" />
              <span>{steps.length} Steps</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Progress
              </span>
              <span className="text-sm font-medium text-primary-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Components List */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Required Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.components_list.map((component, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{component}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Objectives */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Learning Objectives</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              {project.learning_objectives.map((objective, idx) => (
                <li key={idx}>{objective}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps */}
          <div className="lg:col-span-2 space-y-6">
            <h2>Project Steps</h2>
            {steps.map((step) => (
              <StepCard
                key={step.id}
                step={step}
                isCompleted={completedSteps.has(step.id)}
                isActive={step.id === activeStepId}
                onComplete={() => handleCompleteStep(step.id)}
              />
            ))}
          </div>

          {/* AI Mentor Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <MentorChat projectId={projectId} stepId={activeStepId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
