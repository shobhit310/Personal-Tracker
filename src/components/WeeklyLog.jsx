
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Award, TrendingUp } from 'lucide-react';

const WeeklyLog = ({ habits, challenges }) => {
  const getWeeklyStats = () => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const recentHabits = habits.filter(habit => 
      new Date(habit.createdAt) >= weekAgo
    );
    
    const completedHabits = recentHabits.filter(habit => habit.completed);
    const completedChallenges = challenges.filter(challenge => challenge.completed);
    
    return {
      totalHabits: recentHabits.length,
      completedHabits: completedHabits.length,
      completionRate: recentHabits.length > 0 ? Math.round((completedHabits.length / recentHabits.length) * 100) : 0,
      totalChallenges: challenges.length,
      completedChallenges: completedChallenges.length,
      badges: getBadges(completedHabits.length, completedChallenges.length)
    };
  };

  const getBadges = (completedHabits, completedChallenges) => {
    const badges = [];
    
    if (completedHabits >= 5) {
      badges.push({ name: 'Habit Hero', icon: '🏆', description: '5+ habits completed' });
    }
    
    if (completedChallenges >= 1) {
      badges.push({ name: 'Challenge Champion', icon: '🎯', description: 'Completed a challenge' });
    }
    
    if (completedHabits >= 10) {
      badges.push({ name: 'Consistency King', icon: '👑', description: '10+ habits completed' });
    }
    
    return badges;
  };

  const stats = getWeeklyStats();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold gradient-text flex items-center gap-2">
        <Calendar className="w-6 h-6" />
        Weekly Progress
      </h2>
      
      <div className="grid gap-6">
        {/* Stats Overview */}
        <Card className="glass-effect border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              This Week's Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.completedHabits}</div>
                <div className="text-sm text-muted-foreground">Habits Done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{stats.completionRate}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.completedChallenges}</div>
                <div className="text-sm text-muted-foreground">Challenges</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{stats.badges.length}</div>
                <div className="text-sm text-muted-foreground">Badges</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        {stats.badges.length > 0 && (
          <Card className="glass-effect border-yellow-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Earned Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {stats.badges.map((badge, index) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 badge-shine"
                  >
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <div className="font-semibold text-yellow-400">{badge.name}</div>
                      <div className="text-sm text-muted-foreground">{badge.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        <Card className="glass-effect border-blue-500/30">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {habits.length === 0 && challenges.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No activity yet. Start by creating your first habit!
              </div>
            ) : (
              <div className="space-y-3">
                {habits.slice(0, 3).map((habit) => (
                  <div key={habit.id} className="flex items-center justify-between p-2 rounded border border-gray-700">
                    <span>{habit.name}</span>
                    <Badge variant={habit.completed ? "default" : "secondary"}>
                      {habit.completed ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                ))}
                {challenges.slice(0, 2).map((challenge) => (
                  <div key={challenge.id} className="flex items-center justify-between p-2 rounded border border-gray-700">
                    <span>{challenge.title}</span>
                    <Badge variant={challenge.completed ? "default" : "secondary"}>
                      {challenge.completed ? "Completed" : "Active"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeeklyLog;
