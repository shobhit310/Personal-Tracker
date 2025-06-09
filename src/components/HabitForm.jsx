
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const HabitForm = ({ onAddHabit }) => {
  const [habitName, setHabitName] = useState('');
  const [exerciseMinutes, setExerciseMinutes] = useState([30]);
  const [sleepHours, setSleepHours] = useState([8]);
  const [waterGlasses, setWaterGlasses] = useState([8]);
  const [meditationMinutes, setMeditationMinutes] = useState([10]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!habitName.trim()) {
      toast({
        title: "Oops!",
        description: "Please enter a habit name.",
        variant: "destructive"
      });
      return;
    }

    const newHabit = {
      id: Date.now(),
      name: habitName,
      exercise: exerciseMinutes[0],
      sleep: sleepHours[0],
      water: waterGlasses[0],
      meditation: meditationMinutes[0],
      completed: false,
      createdAt: new Date().toISOString()
    };

    onAddHabit(newHabit);
    
    // Reset form
    setHabitName('');
    setExerciseMinutes([30]);
    setSleepHours([8]);
    setWaterGlasses([8]);
    setMeditationMinutes([10]);

    toast({
      title: "Awesome! 🎉",
      description: "Your habit has been added successfully!"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-effect border-green-500/30">
        <CardHeader>
          <CardTitle className="gradient-text text-center">
            Create Your Daily Habits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="habitName">Habit Name</Label>
              <Input
                id="habitName"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="e.g., Morning Routine, Healthy Day"
                className="bg-background/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label>Exercise (minutes): {exerciseMinutes[0]}</Label>
                <Slider
                  value={exerciseMinutes}
                  onValueChange={setExerciseMinutes}
                  max={120}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label>Sleep (hours): {sleepHours[0]}</Label>
                <Slider
                  value={sleepHours}
                  onValueChange={setSleepHours}
                  max={12}
                  min={4}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label>Water (glasses): {waterGlasses[0]}</Label>
                <Slider
                  value={waterGlasses}
                  onValueChange={setWaterGlasses}
                  max={15}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label>Meditation (minutes): {meditationMinutes[0]}</Label>
                <Slider
                  value={meditationMinutes}
                  onValueChange={setMeditationMinutes}
                  max={60}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Habit
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HabitForm;
