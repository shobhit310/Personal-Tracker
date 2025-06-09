
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Zap, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ChallengeSystem = ({ challenges, onJoinChallenge, onCompleteChallenge }) => {
  const availableChallenges = [
    {
      id: 'hydration-hero',
      title: 'Hydration Hero',
      description: 'Drink 10+ glasses of water daily for 7 days',
      icon: Zap,
      difficulty: 'Easy',
      points: 50,
      duration: '7 days'
    },
    {
      id: 'meditation-master',
      title: 'Meditation Master',
      description: 'Meditate for 20+ minutes daily for 14 days',
      icon: Target,
      difficulty: 'Medium',
      points: 100,
      duration: '14 days'
    }
  ];

  const handleJoinChallenge = (challengeId) => {
    const challenge = availableChallenges.find(c => c.id === challengeId);
    const newChallenge = {
      ...challenge,
      joinedAt: new Date().toISOString(),
      completed: false,
      progress: 0
    };
    
    onJoinChallenge(newChallenge);
    toast({
      title: "Challenge Joined! 🚀",
      description: `You've joined the ${challenge.title} challenge!`
    });
  };

  const handleCompleteChallenge = (challengeId) => {
    onCompleteChallenge(challengeId);
    const challenge = challenges.find(c => c.id === challengeId);
    toast({
      title: "Challenge Completed! 🏆",
      description: `Congratulations! You earned ${challenge.points} points!`
    });
  };

  const joinedChallengeIds = challenges.map(c => c.id);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold gradient-text">Challenges</h2>
      
      {/* Available Challenges */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Challenges</h3>
        <div className="grid gap-4">
          {availableChallenges.map((challenge, index) => {
            const isJoined = joinedChallengeIds.includes(challenge.id);
            const IconComponent = challenge.icon;
            
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="challenge-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-6 h-6 text-blue-400" />
                        <div>
                          <CardTitle className="text-lg">{challenge.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{challenge.description}</p>
                        </div>
                      </div>
                      <Badge variant={challenge.difficulty === 'Easy' ? 'secondary' : 'default'}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>🏆 {challenge.points} points</span>
                        <span>⏱️ {challenge.duration}</span>
                      </div>
                      <Button
                        onClick={() => handleJoinChallenge(challenge.id)}
                        disabled={isJoined}
                        variant={isJoined ? "secondary" : "default"}
                      >
                        {isJoined ? "Joined" : "Join Challenge"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Active Challenges */}
      {challenges.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Active Challenges</h3>
          <div className="grid gap-4">
            {challenges.map((challenge, index) => {
              const IconComponent = challenge.icon;
              
              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`challenge-card ${challenge.completed ? 'border-green-500/50' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-6 h-6 text-blue-400" />
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {challenge.title}
                              {challenge.completed && <CheckCircle className="w-5 h-5 text-green-400" />}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">{challenge.description}</p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Joined: {new Date(challenge.joinedAt).toLocaleDateString()}
                        </div>
                        {!challenge.completed && (
                          <Button
                            onClick={() => handleCompleteChallenge(challenge.id)}
                            variant="outline"
                            size="sm"
                          >
                            Mark Complete
                          </Button>
                        )}
                        {challenge.completed && (
                          <Badge className="bg-green-500/20 text-green-400">
                            Completed! +{challenge.points} pts
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeSystem;
