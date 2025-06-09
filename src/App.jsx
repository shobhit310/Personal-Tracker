
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/toaster';
import HabitForm from '@/components/HabitForm';
import HabitList from '@/components/HabitList';
import ScoreDisplay from '@/components/ScoreDisplay';
import ChallengeSystem from '@/components/ChallengeSystem';
import WeeklyLog from '@/components/WeeklyLog';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Activity, Target, Calendar, Plus } from 'lucide-react';

function App() {
  const [habits, setHabits] = useLocalStorage('wellness-habits', []);
  const [challenges, setChallenges] = useLocalStorage('wellness-challenges', []);
  const [score, setScore] = useState(0);

  // Calculate wellness score
  useEffect(() => {
    const calculateScore = () => {
      let totalScore = 0;
      let factors = 0;

      // Base score from completed habits
      const completedHabits = habits.filter(habit => habit.completed);
      if (habits.length > 0) {
        totalScore += (completedHabits.length / habits.length) * 60;
        factors++;
      }

      // Bonus points for challenges
      const completedChallenges = challenges.filter(challenge => challenge.completed);
      if (challenges.length > 0) {
        totalScore += (completedChallenges.length / challenges.length) * 30;
        factors++;
      } else if (completedChallenges.length > 0) {
        totalScore += 30;
        factors++;
      }

      // Consistency bonus
      if (habits.length >= 3) {
        totalScore += 10;
        factors++;
      }

      return factors > 0 ? Math.round(totalScore / factors) : 0;
    };

    setScore(calculateScore());
  }, [habits, challenges]);

  const handleAddHabit = (newHabit) => {
    setHabits(prev => [...prev, newHabit]);
  };

  const handleToggleHabit = (habitId) => {
    setHabits(prev => 
      prev.map(habit => 
        habit.id === habitId 
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  };

  const handleDeleteHabit = (habitId) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
  };

  const handleJoinChallenge = (challenge) => {
    setChallenges(prev => [...prev, challenge]);
  };

  const handleCompleteChallenge = (challengeId) => {
    setChallenges(prev =>
      prev.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, completed: true }
          : challenge
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            Wellness Tracker
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your habits, join challenges, and level up your wellness game! 🚀
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="habits" className="w-full">
              <TabsList className="grid w-full grid-cols-4 glass-effect">
                <TabsTrigger value="habits" className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Habits
                </TabsTrigger>
                <TabsTrigger value="challenges" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Challenges
                </TabsTrigger>
                <TabsTrigger value="log" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Weekly Log
                </TabsTrigger>
                <TabsTrigger value="add" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Habit
                </TabsTrigger>
              </TabsList>

              <TabsContent value="habits" className="mt-6">
                <HabitList
                  habits={habits}
                  onToggleHabit={handleToggleHabit}
                  onDeleteHabit={handleDeleteHabit}
                />
              </TabsContent>

              <TabsContent value="challenges" className="mt-6">
                <ChallengeSystem
                  challenges={challenges}
                  onJoinChallenge={handleJoinChallenge}
                  onCompleteChallenge={handleCompleteChallenge}
                />
              </TabsContent>

              <TabsContent value="log" className="mt-6">
                <WeeklyLog habits={habits} challenges={challenges} />
              </TabsContent>

              <TabsContent value="add" className="mt-6">
                <HabitForm onAddHabit={handleAddHabit} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <ScoreDisplay 
              score={score} 
              habits={habits} 
              challenges={challenges} 
            />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
