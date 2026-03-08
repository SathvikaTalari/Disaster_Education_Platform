"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bar, BarChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { GamificationSystem } from "@/components/gamification-system"
import { RealTimeCommunication } from "@/components/real-time-communication"
import { DisasterModules } from "@/components/disaster-modules"
import {
  BookOpen,
  Trophy,
  Play,
  AlertTriangle,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Star,
  FileText,
  Shield,
} from "lucide-react"

// Mock data for student dashboard
const moduleProgressData = [
  { module: "Fire Safety", completed: 8, total: 10, score: 92 },
  { module: "Earthquake Prep", completed: 6, total: 8, score: 85 },
  { module: "Flood Response", completed: 5, total: 7, score: 78 },
  { module: "First Aid", completed: 10, total: 10, score: 96 },
  { module: "Evacuation", completed: 4, total: 6, score: 88 },
]

const scoreDistribution = [
  { range: "90-100", count: 12, color: "#22c55e" },
  { range: "80-89", count: 8, color: "#3b82f6" },
  { range: "70-79", count: 5, color: "#eab308" },
  { range: "60-69", count: 2, color: "#f97316" },
]

const quizzes = [
  { id: 1, title: "Fire Safety Assessment", questions: 20, timeLimit: "30 min", bestScore: 92, attempts: 2 },
  { id: 2, title: "Earthquake Preparedness Quiz", questions: 15, timeLimit: "20 min", bestScore: 85, attempts: 1 },
  { id: 3, title: "First Aid Certification", questions: 25, timeLimit: "45 min", bestScore: 96, attempts: 3 },
  { id: 4, title: "Emergency Communication", questions: 12, timeLimit: "15 min", bestScore: null, attempts: 0 },
]

const virtualDrills = [
  { id: 1, title: "Building Evacuation Simulation", type: "VR", duration: "20 min", completed: true, score: 88 },
  { id: 2, title: "Fire Extinguisher Training", type: "Interactive", duration: "15 min", completed: true, score: 94 },
  { id: 3, title: "Earthquake Drop-Cover-Hold", type: "AR", duration: "10 min", completed: false, score: null },
  { id: 4, title: "CPR Practice Session", type: "Simulation", duration: "25 min", completed: false, score: null },
]

const regionalAlerts = [
  {
    id: 1,
    type: "Weather",
    title: "Severe Thunderstorm Warning",
    region: "Campus Area",
    severity: "High",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "Maintenance",
    title: "Fire Alarm System Test",
    region: "Building C",
    severity: "Low",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "Training",
    title: "Emergency Drill Scheduled Today",
    region: "All Buildings",
    severity: "Medium",
    time: "1 day ago",
  },
]

const emergencyContacts = [
  { name: "Disaster Response Team", number: "112", type: "Emergency" },
  { name: "Fire Response", number: "101", type: "Emergency" },
  { name: "National Ambulance Services", number: "102", type: "Support" }, // Added missing comma
  { name: "Campus Health Center", number: "(555) 123-4567", type: "Medical" },
  { name: "Facilities Management", number: "(555) 123-4568", type: "Maintenance" },
  { name: "Student Services", number: "(555) 123-4569", type: "Support" },
]

export default function StudentDashboard() {
  const totalModules = moduleProgressData.reduce((sum, module) => sum + module.total, 0)
  const completedModules = moduleProgressData.reduce((sum, module) => sum + module.completed, 0)
  const averageScore = Math.round(
    moduleProgressData.reduce((sum, module) => sum + module.score, 0) / moduleProgressData.length,
  )

  return (
    <AuthGuard allowedRoles={["student"]}>
      <DashboardLayout title="Student Portal" role="student" roleColor="bg-blue-600">
        <div className="space-y-6">
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {completedModules}/{totalModules}
                </div>
                <Progress value={(completedModules / totalModules) * 100} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageScore}%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certification Progress</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3/5</div>
                <p className="text-xs text-muted-foreground">Certifications earned</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Module Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Module Progress & Scores</CardTitle>
                <CardDescription>Your completion status and performance across all modules</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    completed: {
                      label: "Completed",
                      color: "hsl(var(--chart-1))",
                    },
                    score: {
                      label: "Score",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={moduleProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="module" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="score" fill="var(--color-score)" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Score Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
                <CardDescription>Your quiz and assessment score breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={scoreDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ range, count }) => `${range}: ${count}`}
                      >
                        {scoreDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="modules" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="modules">Learning Modules</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="drills">Virtual Drills</TabsTrigger>
              <TabsTrigger value="alerts">Regional Alerts</TabsTrigger>
              <TabsTrigger value="gamification">Achievements</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-4">
              <DisasterModules />
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Quizzes</CardTitle>
                  <CardDescription>Test your knowledge with these disaster preparedness quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quizzes.map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-purple-100 text-purple-600 rounded-full">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{quiz.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{quiz.questions} questions</span>
                              <span>{quiz.timeLimit}</span>
                              {quiz.bestScore && (
                                <span className="text-green-600 font-medium">Best: {quiz.bestScore}%</span>
                              )}
                              <span>Attempts: {quiz.attempts}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant={quiz.bestScore ? "outline" : "default"}>
                          {quiz.bestScore ? "Retake" : "Start Quiz"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="drills" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Virtual Emergency Drills</CardTitle>
                  <CardDescription>Practice emergency procedures in safe, simulated environments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {virtualDrills.map((drill) => (
                      <div key={drill.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-full ${drill.completed ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}
                          >
                            {drill.completed ? <CheckCircle className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                          </div>
                          <div>
                            <h3 className="font-medium">{drill.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <Badge variant="outline">{drill.type}</Badge>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {drill.duration}
                              </span>
                              {drill.score && <span className="text-green-600 font-medium">Score: {drill.score}%</span>}
                            </div>
                          </div>
                        </div>
                        <Button variant={drill.completed ? "outline" : "default"}>
                          {drill.completed ? "Replay" : "Start Drill"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Regional Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Regional Alerts</CardTitle>
                    <CardDescription>Current alerts and notifications for your area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {regionalAlerts.map((alert) => (
                        <Alert
                          key={alert.id}
                          className={
                            alert.severity === "High"
                              ? "border-red-200 bg-red-50"
                              : alert.severity === "Medium"
                                ? "border-yellow-200 bg-yellow-50"
                                : "border-blue-200 bg-blue-50"
                          }
                        >
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle className="flex items-center justify-between">
                            <span>{alert.title}</span>
                            <Badge
                              variant={
                                alert.severity === "High"
                                  ? "destructive"
                                  : alert.severity === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {alert.severity}
                            </Badge>
                          </AlertTitle>
                          <AlertDescription>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                              <MapPin className="h-3 w-3" />
                              <span>{alert.region}</span>
                              <span>•</span>
                              <span>{alert.time}</span>
                            </div>
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contacts */}
                <Card>
                  <CardHeader>
                    <CardTitle>One-Tap Emergency Contacts</CardTitle>
                    <CardDescription>Quick access to emergency services and support</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {emergencyContacts.map((contact, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-full ${contact.type === "Emergency" ? "bg-red-100 text-red-600" : contact.type === "Medical" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
                            >
                              {contact.type === "Emergency" ? (
                                <Shield className="h-4 w-4" />
                              ) : (
                                <Phone className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{contact.name}</p>
                              <p className="text-sm text-muted-foreground">{contact.type}</p>
                            </div>
                          </div>
                          <Button size="sm" variant={contact.type === "Emergency" ? "destructive" : "outline"}>
                            <Phone className="h-4 w-4 mr-2" />
                            {contact.number}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="gamification" className="space-y-4">
              <GamificationSystem />
            </TabsContent>

            <TabsContent value="communication" className="space-y-4">
              <RealTimeCommunication />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
