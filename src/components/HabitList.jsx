
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Activity, Moon, Droplets, Brain } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const HabitList = ({ habits, onToggleHabit, onDeleteHabit }) => {
  const getHabitIcon = (type) => {
    const icons = {
      exercise: Activity,
      sleep: Moon,
      water: Droplets,
      meditation: Brain
    };
    return icons[type] || Activity;
  };

  const handleToggle = (habitId) => {
    onToggleHabit(habitId);
    const habit = habits.find(h => h.id === habitId);
    if (!habit.completed) {
      toast({
        title: "Great job! 🎉",
        description: "Habit completed successfully!"
      });
    }
  };

  const handleDelete = (habitId) => {
    onDeleteHabit(habitId);
    toast({
      title: "Habit removed",
      description: "Your habit has been deleted."
    });
  };

  if (habits.length === 0) {
    return (
      <Card className="glass-effect border-blue-500/30">
        <CardContent className="text-center py-12">
          <div className="text-muted-foreground">
            No habits yet. Create your first habit to get started!
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold gradient-text">Your Habits</h2>
      <AnimatePresence>
        {habits.map((habit, index) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`habit-card ${habit.completed ? 'border-green-500/50' : 'border-gray-500/30'}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{habit.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={habit.completed}
                      onCheckedChange={() => handleToggle(habit.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(habit.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { type: 'exercise', value: habit.exercise, unit: 'min', icon: Activity },
                    { type: 'sleep', value: habit.sleep, unit: 'hrs', icon: Moon },
                    { type: 'water', value: habit.water, unit: 'glasses', icon: Droplets },
                    { type: 'meditation', value: habit.meditation, unit: 'min', icon: Brain }
                  ].map(({ type, value, unit, icon: Icon }) => (
                    <div key={type} className="flex items-center gap-2 text-sm">
                      <Icon className="w-4 h-4 text-blue-400" />
                      <span>{value} {unit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HabitList;
