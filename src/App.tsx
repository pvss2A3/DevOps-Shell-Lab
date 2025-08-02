import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Terminal, BookOpen, Play, CheckCircle, ArrowLeft, Code, Server } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ExercisePage from './components/ExercisePage';
import { exercises } from './data/exercises';

function App() {
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());

  const markExerciseComplete = (exerciseId: number) => {
    setCompletedExercises(prev => new Set([...prev, exerciseId]));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route 
            path="/" 
            element={
              <Dashboard 
                exercises={exercises} 
                completedExercises={completedExercises} 
              />
            } 
          />
          <Route 
            path="/exercise/:id" 
            element={
              <ExercisePage 
                exercises={exercises}
                completedExercises={completedExercises}
                onComplete={markExerciseComplete}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;