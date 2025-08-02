import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, BookOpen, Play, CheckCircle, Code, Server, Zap } from 'lucide-react';

interface Exercise {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  estimatedTime: string;
}

interface DashboardProps {
  exercises: Exercise[];
  completedExercises: Set<number>;
}

const Dashboard: React.FC<DashboardProps> = ({ exercises, completedExercises }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'basic commands': return <Terminal className="w-5 h-5" />;
      case 'file operations': return <BookOpen className="w-5 h-5" />;
      case 'text manipulation': return <Code className="w-5 h-5" />;
      case 'system management': return <Server className="w-5 h-5" />;
      case 'scripting': return <Zap className="w-5 h-5" />;
      default: return <Terminal className="w-5 h-5" />;
    }
  };

  const completionRate = Math.round((completedExercises.size / exercises.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Terminal className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">DevOps Shell Lab</h1>
                <p className="text-gray-400">Master shell scripting from the ground up</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">{completionRate}%</div>
              <div className="text-sm text-gray-400">Complete</div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-gray-800 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>{completedExercises.size} of {exercises.length} exercises completed</span>
          <span>Keep going! 🚀</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Exercises</p>
                <p className="text-2xl font-bold text-white">{exercises.length}</p>
              </div>
              <BookOpen className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-400">{completedExercises.size}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Remaining</p>
                <p className="text-2xl font-bold text-orange-400">{exercises.length - completedExercises.size}</p>
              </div>
              <Play className="w-10 h-10 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <Link
              key={exercise.id}
              to={`/exercise/${exercise.id}`}
              className="group bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(exercise.category)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)} text-white`}>
                    {exercise.difficulty}
                  </span>
                </div>
                {completedExercises.has(exercise.id) && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {exercise.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {exercise.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="bg-gray-700 px-2 py-1 rounded">{exercise.category}</span>
                <span>{exercise.estimatedTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Getting Started Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-8 border border-blue-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">🚀 Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">How to Use This Lab</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Start with Exercise 1 and work your way up</li>
                <li>• Read the theory section carefully</li>
                <li>• Practice commands in the interactive terminal</li>
                <li>• Complete exercises to track your progress</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Lab Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Safe, simulated shell environment</li>
                <li>• Real-time command feedback</li>
                <li>• Progress tracking across exercises</li>
                <li>• Dockerized for easy deployment</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;