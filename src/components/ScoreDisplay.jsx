
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Target, TrendingUp } from 'lucide-react';

const ScoreDisplay = ({ score, habits, challenges }) => {
  const getScoreLevel = (score) => {
    if (score >= 90) return { level: 'Legendary', color: 'text-yellow-400', icon: Trophy };
    if (score >= 75) return { level: 'Expert', color: 'text-purple-400', icon: Target };
    if (score >= 50) return { level: 'Intermediate', color: 'text-blue-400', icon: TrendingUp };
    return { level: 'Beginner', color: 'text-green-400', icon: Target };
  };

  const scoreLevel = getScoreLevel(score);
  const IconComponent = scoreLevel.icon;

  const completedHabits = habits.filter(habit => habit.completed).length;
  const completedChallenges = challenges.filter(challenge => challenge.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-effect score-glow border-green-500/50">
        <CardHeader className="text-center">
          <CardTitle className="gradient-text text-3xl">Your Wellness Score</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className="text-6xl font-bold gradient-text mb-2">
              {score}
            </div>
            <div className="text-sm text-muted-foreground">out of 100</div>
            
            <motion.div
              className="absolute -inset-4 rounded-full border-2 border-green-500/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <div className={`flex items-center justify-center gap-2 ${scoreLevel.color}`}>
            <IconComponent className="w-6 h-6" />
            <span className="text-xl font-semibold">{scoreLevel.level}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{completedHabits}</div>
              <div className="text-sm text-muted-foreground">Habits Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{completedChallenges}</div>
              <div className="text-sm text-muted-foreground">Challenges Done</div>
            </div>
          </div>

          <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
            <motion.div
              className="progress-bar h-full"
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScoreDisplay;
