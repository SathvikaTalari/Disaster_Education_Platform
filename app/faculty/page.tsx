"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Users,
  BookOpen,
  TrendingUp,
  Plus,
  Edit,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Video,
  Award,
} from "lucide-react"

// Mock data for faculty dashboard
const classProgressData = [
  { class: "EMGT 101", enrolled: 45, completed: 38, avgScore: 87 },
  { class: "EMGT 201", enrolled: 32, completed: 28, avgScore: 82 },
  { class: "EMGT 301", enrolled: 28, completed: 25, avgScore: 91 },
  { class: "EMGT 401", enrolled: 22, completed: 20, avgScore: 89 },
]

const studentEngagementData = [
  { week: "Week 1", engagement: 85 },
  { week: "Week 2", engagement: 78 },
  { week: "Week 3", engagement: 92 },
  { week: "Week 4", engagement: 88 },
  { week: "Week 5", engagement: 95 },
  { week: "Week 6", engagement: 82 },
]

const myModules = [
  {
    id: 1,
    title: "Advanced Fire Safety Protocols",
    type: "Interactive",
    students: 156,
    completion: 78,
    avgScore: 87,
    status: "Published",
  },
  {
    id: 2,
    title: "Earthquake Response Planning",
    type: "Video + Quiz",
    students: 134,
    completion: 85,
    avgScore: 82,
    status: "Published",
  },
  {
    id: 3,
    title: "Emergency Communication Systems",
    type: "Simulation",
    students: 0,
    completion: 0,
    avgScore: 0,
    status: "Draft",
  },
  {
    id: 4,
    title: "Flood Evacuation Procedures",
    type: "Interactive",
    students: 89,
    completion: 92,
    avgScore: 91,
    status: "Published",
  },
]

const recentSubmissions = [
  {
    id: 1,
    student: "Alice Johnson",
    module: "Fire Safety Assessment",
    score: 94,
    submittedAt: "2 hours ago",
    status: "Graded",
  },
  {
    id: 2,
    student: "Bob Smith",
    module: "Earthquake Quiz",
    score: 87,
    submittedAt: "4 hours ago",
    status: "Graded",
  },
  {
    id: 3,
    student: "Carol Davis",
    module: "Emergency Response Plan",
    score: null,
    submittedAt: "1 day ago",
    status: "Pending",
  },
  {
    id: 4,
    student: "David Wilson",
    module: "First Aid Certification",
    score: 96,
    submittedAt: "2 days ago",
    status: "Graded",
  },
]

const upcomingDeadlines = [
  { task: "Grade Emergency Response Plans", dueDate: "Tomorrow", priority: "High" },
  { task: "Review Fire Safety Module Updates", dueDate: "Dec 15", priority: "Medium" },
  { task: "Prepare Virtual Drill Session", dueDate: "Dec 18", priority: "High" },
  { task: "Update Course Materials", dueDate: "Dec 20", priority: "Low" },
]

export default function FacultyDashboard() {
  const totalStudents = classProgressData.reduce((sum, cls) => sum + cls.enrolled, 0)
  const totalCompleted = classProgressData.reduce((sum, cls) => sum + cls.completed, 0)
  const overallAvgScore = Math.round(
    classProgressData.reduce((sum, cls) => sum + cls.avgScore, 0) / classProgressData.length,
  )

  return (
    <AuthGuard allowedRoles={["faculty"]}>
      <DashboardLayout title="Faculty Portal" role="faculty" roleColor="bg-green-600">
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
                <p className="text-xs text-muted-foreground">Across all classes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round((totalCompleted / totalStudents) * 100)}%</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallAvgScore}%</div>
                <p className="text-xs text-muted-foreground">+3% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Modules</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{myModules.filter((m) => m.status === "Published").length}</div>
                <p className="text-xs text-muted-foreground">
                  {myModules.filter((m) => m.status === "Draft").length} in draft
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Class Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Class Progress Overview</CardTitle>
                <CardDescription>Student enrollment and completion rates by class</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    enrolled: {
                      label: "Enrolled",
                      color: "hsl(var(--chart-1))",
                    },
                    completed: {
                      label: "Completed",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={classProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="class" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="enrolled" fill="var(--color-enrolled)" radius={4} />
                      <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Student Engagement Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Student Engagement Trends</CardTitle>
                <CardDescription>Weekly engagement rates across all your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    engagement: {
                      label: "Engagement %",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studentEngagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="engagement" stroke="var(--color-engagement)" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="modules" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="modules">My Modules</TabsTrigger>
              <TabsTrigger value="submissions">Recent Submissions</TabsTrigger>
              <TabsTrigger value="create">Create Content</TabsTrigger>
              <TabsTrigger value="schedule">Schedule & Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Learning Modules</h3>
                  <p className="text-sm text-muted-foreground">Manage your disaster preparedness training content</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Module
                </Button>
              </div>

              <div className="grid gap-4">
                {myModules.map((module) => (
                  <Card key={module.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                            {module.type.includes("Video") ? (
                              <Video className="h-5 w-5" />
                            ) : module.type.includes("Simulation") ? (
                              <Eye className="h-5 w-5" />
                            ) : (
                              <BookOpen className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{module.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <Badge variant="outline">{module.type}</Badge>
                              <span>{module.students} students</span>
                              {module.status === "Published" && (
                                <>
                                  <span>{module.completion}% completion</span>
                                  <span>Avg: {module.avgScore}%</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={module.status === "Published" ? "default" : "secondary"}>
                            {module.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                      {module.status === "Published" && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Student Progress</span>
                            <span>{module.completion}%</span>
                          </div>
                          <Progress value={module.completion} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="submissions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Student Submissions</CardTitle>
                  <CardDescription>Latest assignments and assessments requiring your attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSubmissions.map((submission) => (
                      <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-full ${submission.status === "Graded" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}
                          >
                            {submission.status === "Graded" ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <AlertCircle className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{submission.student}</h4>
                            <p className="text-sm text-muted-foreground">{submission.module}</p>
                            <p className="text-xs text-muted-foreground">{submission.submittedAt}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {submission.score && (
                            <Badge
                              variant={
                                submission.score >= 90
                                  ? "default"
                                  : submission.score >= 80
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {submission.score}%
                            </Badge>
                          )}
                          <Badge variant={submission.status === "Graded" ? "default" : "destructive"}>
                            {submission.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            {submission.status === "Graded" ? "Review" : "Grade"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Learning Content</CardTitle>
                  <CardDescription>Design interactive disaster preparedness training materials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="module-title">Module Title</Label>
                        <Input id="module-title" placeholder="e.g., Advanced Earthquake Response" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="module-type">Content Type</Label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Interactive Module</option>
                          <option>Video + Quiz</option>
                          <option>Virtual Simulation</option>
                          <option>Assessment Only</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulty Level</Label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Estimated Duration</Label>
                        <Input id="duration" placeholder="e.g., 45 minutes" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="learning-objectives">Learning Objectives</Label>
                        <Textarea
                          id="learning-objectives"
                          placeholder="List the key learning outcomes for this module..."
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="module-description">Module Description</Label>
                    <Textarea
                      id="module-description"
                      placeholder="Provide a detailed description of the module content and activities..."
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Module
                    </Button>
                    <Button variant="outline">Save as Draft</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Deadlines */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Deadlines</CardTitle>
                    <CardDescription>Tasks and assignments requiring your attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingDeadlines.map((deadline, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-full ${deadline.priority === "High" ? "bg-red-100 text-red-600" : deadline.priority === "Medium" ? "bg-yellow-100 text-yellow-600" : "bg-blue-100 text-blue-600"}`}
                            >
                              <Clock className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">{deadline.task}</p>
                              <p className="text-sm text-muted-foreground">Due: {deadline.dueDate}</p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              deadline.priority === "High"
                                ? "destructive"
                                : deadline.priority === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {deadline.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      <Button variant="outline" className="justify-start bg-transparent">
                        <FileText className="h-4 w-4 mr-2" />
                        Create New Assignment
                      </Button>
                      <Button variant="outline" className="justify-start bg-transparent">
                        <Users className="h-4 w-4 mr-2" />
                        View Student Progress
                      </Button>
                      <Button variant="outline" className="justify-start bg-transparent">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Update Course Materials
                      </Button>
                      <Button variant="outline" className="justify-start bg-transparent">
                        <Award className="h-4 w-4 mr-2" />
                        Generate Progress Reports
                      </Button>
                      <Button variant="outline" className="justify-start bg-transparent">
                        <Video className="h-4 w-4 mr-2" />
                        Schedule Virtual Drill
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
