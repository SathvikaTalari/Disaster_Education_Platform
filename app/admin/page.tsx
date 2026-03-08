"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Users, TrendingUp, BookOpen, AlertTriangle, CheckCircle, Clock } from "lucide-react"

// Mock data for admin dashboard
const studentRegistrationData = [
  { month: "Jan", students: 120 },
  { month: "Feb", students: 145 },
  { month: "Mar", students: 180 },
  { month: "Apr", students: 220 },
  { month: "May", students: 280 },
  { month: "Jun", students: 350 },
]

const participationData = [
  { activity: "Learning Modules", completed: 85, total: 100 },
  { activity: "Virtual Drills", completed: 72, total: 100 },
  { activity: "Quizzes", completed: 91, total: 100 },
  { activity: "Emergency Training", completed: 68, total: 100 },
]

const moduleCompletionData = [
  { name: "Fire Safety", value: 92, color: "#ef4444" },
  { name: "Earthquake Prep", value: 78, color: "#f97316" },
  { name: "Flood Response", value: 85, color: "#eab308" },
  { name: "First Aid", value: 96, color: "#22c55e" },
  { name: "Evacuation", value: 73, color: "#3b82f6" },
]

const recentAlerts = [
  {
    id: 1,
    type: "Weather",
    message: "Severe thunderstorm warning for Region A",
    time: "2 hours ago",
    severity: "high",
  },
  { id: 2, type: "Drill", message: "Fire drill scheduled for Building C", time: "4 hours ago", severity: "medium" },
  { id: 3, type: "Training", message: "New earthquake safety module available", time: "1 day ago", severity: "low" },
]

export default function AdminDashboard() {
  return (
    <AuthGuard allowedRoles={["admin"]}>
      <DashboardLayout title="Admin Portal" role="admin" roleColor="bg-red-600">
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">350</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Participation</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">79%</div>
                <p className="text-xs text-muted-foreground">+5% from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 high priority</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Registration Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Student Registration Trend</CardTitle>
                <CardDescription>Monthly student registrations over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    students: {
                      label: "Students",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studentRegistrationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="students" stroke="var(--color-students)" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Participation Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Student Participation Rates</CardTitle>
                <CardDescription>Completion rates across different activities</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    completed: {
                      label: "Completed",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={participationData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="activity" type="category" width={120} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Module Completion and Recent Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Module Completion Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Module Completion by Category</CardTitle>
                <CardDescription>Percentage of students who completed each module type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={moduleCompletionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {moduleCompletionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent System Alerts</CardTitle>
                <CardDescription>Latest notifications and system updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className="flex-shrink-0 mt-1">
                        {alert.severity === "high" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                        {alert.severity === "medium" && <Clock className="h-4 w-4 text-yellow-500" />}
                        {alert.severity === "low" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>{alert.type}</Badge>
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-gray-100">{alert.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Training Progress</CardTitle>
              <CardDescription>System-wide completion rates for disaster preparedness training</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {participationData.map((item) => (
                  <div key={item.activity} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.activity}</span>
                      <span className="text-muted-foreground">{item.completed}% complete</span>
                    </div>
                    <Progress value={item.completed} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
