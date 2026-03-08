"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Trophy, Star, Target, Zap, Award, Medal, Crown, Flame } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  earned: boolean
  earnedDate?: string
  points: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface Challenge {
  id: string
  title: string
  description: string
  progress: number
  target: number
  reward: number
  timeLeft: string
  difficulty: "easy" | "medium" | "hard"
}

const achievements: Achievement[] = [
  {
    id: "first-module",
    title: "First Steps",
    description: "Complete your first learning module",
    icon: <Star className="h-5 w-5" />,
    earned: true,
    earnedDate: "2024-01-15",
    points: 50,
    rarity: "common",
  },
  {
    id: "quiz-master",
    title: "Quiz Master",
    description: "Score 90% or higher on 5 quizzes",
    icon: <Trophy className="h-5 w-5" />,
    earned: true,
    earnedDate: "2024-01-20",
    points: 200,
    rarity: "rare",
  },
  {
    id: "drill-sergeant",
    title: "Drill Sergeant",
    description: "Complete 10 virtual emergency drills",
    icon: <Target className="h-5 w-5" />,
    earned: false,
    points: 300,
    rarity: "epic",
  },
  {
    id: "safety-champion",
    title: "Safety Champion",
    description: "Maintain a 95% average across all modules",
    icon: <Crown className="h-5 w-5" />,
    earned: false,
    points: 500,
    rarity: "legendary",
  },
]

const challenges: Challenge[] = [
  {
    id: "weekly-streak",
    title: "Weekly Learning Streak",
    description: "Complete at least one activity every day this week",
    progress: 4,
    target: 7,
    reward: 100,
    timeLeft: "3 days",
    difficulty: "medium",
  },
  {
    id: "fire-safety-expert",
    title: "Fire Safety Expert",
    description: "Complete all fire safety modules with 85% or higher",
    progress: 2,
    target: 3,
    reward: 150,
    timeLeft: "1 week",
    difficulty: "hard",
  },
]

export function GamificationSystem() {
  const totalPoints = achievements.filter((a) => a.earned).reduce((sum, a) => sum + a.points, 0)
  const earnedAchievements = achievements.filter((a) => a.earned).length
  const currentLevel = Math.floor(totalPoints / 100) + 1
  const pointsToNextLevel = currentLevel * 100 - totalPoints

  return (
    <div className="space-y-6">
      {/* Player Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level</CardTitle>
            <Zap className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentLevel}</div>
            <Progress value={totalPoints % 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{pointsToNextLevel} XP to next level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Star className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPoints}</div>
            <p className="text-xs text-muted-foreground">XP earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {earnedAchievements}/{achievements.length}
            </div>
            <p className="text-xs text-muted-foreground">Unlocked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Days active</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Challenges */}
      <Card>
        <CardHeader>
          <CardTitle>Active Challenges</CardTitle>
          <CardDescription>Complete these challenges to earn bonus points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{challenge.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        challenge.difficulty === "easy"
                          ? "secondary"
                          : challenge.difficulty === "medium"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="outline">+{challenge.reward} XP</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <Progress value={(challenge.progress / challenge.target) * 100} />
                    <p className="text-xs text-muted-foreground mt-1">
                      {challenge.progress}/{challenge.target} • {challenge.timeLeft} left
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements Gallery */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Your disaster preparedness accomplishments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 border rounded-lg ${achievement.earned ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200" : "opacity-60"}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`p-2 rounded-full ${
                      achievement.rarity === "legendary"
                        ? "bg-purple-100 text-purple-600"
                        : achievement.rarity === "epic"
                          ? "bg-orange-100 text-orange-600"
                          : achievement.rarity === "rare"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {achievement.earned ? achievement.icon : <Medal className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{achievement.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {achievement.rarity} • {achievement.points} XP
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                {achievement.earned && achievement.earnedDate && (
                  <p className="text-xs text-green-600">Earned on {achievement.earnedDate}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
