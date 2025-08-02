import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Terminal, BookOpen, Play, Code } from 'lucide-react';
import TerminalPlayground from './TerminalPlayground';

interface Exercise {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  estimatedTime: string;
  theory: string;
  commands: string[];
  examples: { command: string; description: string; output: string }[];
  tasks: string[];
}

interface ExercisePageProps {
  exercises: Exercise[];
  completedExercises: Set<number>;
  onComplete: (exerciseId: number) => void;
}

const ExercisePage: React.FC<ExercisePageProps> = ({ exercises, completedExercises, onComplete }) => {
  const { id } = useParams<{ id: string }>();
  const exerciseId = parseInt(id || '1');
  const exercise = exercises.find(ex => ex.id === exerciseId);
  
  const [activeTab, setActiveTab] = useState<'theory' | 'playground'>('theory');
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Exercise Not Found</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleTaskComplete = (taskIndex: number) => {
    const newCompleted = new Set([...completedTasks, taskIndex]);
    setCompletedTasks(newCompleted);
    
    if (newCompleted.size === exercise.tasks.length) {
      onComplete(exercise.id);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Labs</span>
              </Link>
              <div className="h-6 w-px bg-gray-600" />
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)} text-white`}>
                  {exercise.difficulty}
                </span>
                <h1 className="text-xl font-semibold text-white">{exercise.title}</h1>
              </div>
            </div>
            {completedExercises.has(exercise.id) && (
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
              activeTab === 'theory'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Theory & Examples</span>
          </button>
          <button
            onClick={() => setActiveTab('playground')}
            className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
              activeTab === 'playground'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Terminal className="w-5 h-5" />
            <span>Interactive Playground</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'theory' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Theory Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  <span>Theory</span>
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {exercise.theory}
                  </p>
                </div>
              </div>

              {/* Commands Section */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <Code className="w-6 h-6 text-green-400" />
                  <span>Key Commands</span>
                </h2>
                <div className="space-y-3">
                  {exercise.commands.map((command, index) => (
                    <div key={index} className="bg-gray-900 rounded-lg p-3 font-mono text-green-400 border border-gray-700">
                      <code>{command}</code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Examples Section */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <Play className="w-6 h-6 text-purple-400" />
                  <span>Examples</span>
                </h2>
                <div className="space-y-6">
                  {exercise.examples.map((example, index) => (
                    <div key={index} className="space-y-2">
                      <p className="text-gray-300">{example.description}</p>
                      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                        <div className="text-green-400 font-mono mb-2">
                          <span className="text-blue-400">$</span> {example.command}
                        </div>
                        <div className="text-gray-300 font-mono whitespace-pre-line">
                          {example.output}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tasks Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Practice Tasks</h3>
                <div className="space-y-3">
                  {exercise.tasks.map((task, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <button
                        onClick={() => handleTaskComplete(index)}
                        className={`flex-shrink-0 mt-1 w-5 h-5 rounded-full border-2 transition-colors ${
                          completedTasks.has(index)
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-500 hover:border-blue-400'
                        }`}
                      >
                        {completedTasks.has(index) && (
                          <CheckCircle className="w-3 h-3 text-white m-0.5" />
                        )}
                      </button>
                      <p className="text-gray-300 text-sm">{task}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="text-sm text-gray-400">
                    Progress: {completedTasks.size} / {exercise.tasks.length}
                  </div>
                  <div className="mt-2 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(completedTasks.size / exercise.tasks.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <TerminalPlayground 
            exercise={exercise}
            onTaskComplete={handleTaskComplete}
            completedTasks={completedTasks}
          />
        )}
      </main>
    </div>
  );
};

export default ExercisePage;