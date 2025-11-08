'use client';

import { CheckCircle, Circle, PlayCircle } from 'lucide-react';
import type { StepCardProps } from '@/types';

export default function StepCard({
  step,
  isCompleted,
  isActive,
  onComplete,
}: StepCardProps) {
  return (
    <div
      className={`card ${
        isActive
          ? 'border-primary-500 border-2'
          : isCompleted
          ? 'border-green-500 border'
          : ''
      }`}
    >
      <div className="flex items-start space-x-4">
        {/* Step Number/Status Icon */}
        <div className="flex-shrink-0">
          {isCompleted ? (
            <CheckCircle className="h-8 w-8 text-green-500" />
          ) : isActive ? (
            <Circle className="h-8 w-8 text-primary-500" />
          ) : (
            <Circle className="h-8 w-8 text-gray-300 dark:text-gray-600" />
          )}
        </div>

        {/* Content */}
        <div className="flex-grow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Step {step.step_number}
              </span>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h4>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">
            {step.content}
          </p>

          {/* Video Embed */}
          {step.video_url && (
            <div className="mb-4">
              <a
                href={step.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
              >
                <PlayCircle className="h-5 w-5" />
                <span>Watch Tutorial Video</span>
              </a>
            </div>
          )}

          {/* Theory Links */}
          {step.theory_links && step.theory_links.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Related Concepts:
              </h5>
              <div className="space-y-2">
                {step.theory_links.map((link, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg"
                  >
                    <div className="font-medium text-blue-900 dark:text-blue-200">
                      {link.concept}
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      {link.description}
                    </div>
                    {link.formula && (
                      <div className="text-sm font-mono mt-2 text-blue-800 dark:text-blue-200">
                        {link.formula}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Checkpoint Quiz */}
          {step.checkpoint_quiz && !isCompleted && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-4">
              <h5 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                Checkpoint Quiz
              </h5>
              <p className="text-sm text-yellow-800 dark:text-yellow-300 mb-3">
                {step.checkpoint_quiz.question}
              </p>
              <div className="space-y-2">
                {step.checkpoint_quiz.options.map((option, idx) => (
                  <button
                    key={idx}
                    className="w-full text-left px-4 py-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Complete Button */}
          {!isCompleted && isActive && (
            <button onClick={onComplete} className="btn-primary w-full">
              Mark as Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
