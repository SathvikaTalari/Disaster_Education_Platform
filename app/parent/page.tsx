"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import {
  Users,
  TrendingUp,
  Shield,
  AlertTriangle,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle,
  Clock,
  BookOpen,
  Trophy,
} from "lucide-react"

// Mock data for parent dashboard
const childrenData = [
  {
    id: 1,
    name: "Emma Johnson",
    grade: "Grade 8",
    school: "Lincoln Middle School",
    overallProgress: 85,
    modulesCompleted: 12,
    totalModules: 15,
    averageScore: 92,
    lastActivity: "2 hours ago",
    emergencyContactsUpdated: true,
  },
  {
    id: 2,
    name: "Alex Johnson",
    grade: "Grade 5",
    school: "Lincoln Elementary",
    overallProgress: 78,
    modulesCompleted: 8,
    totalModules: 12,
    averageScore: 88,
    lastActivity: "1 day ago",
    emergencyContactsUpdated: false,
  },
]

const preparednessScores = [
  { category: "Fire Safety", emma: 95, alex: 82 },
  { category: "Earthquake", emma: 88, alex: 85 },
  { category: "First Aid", emma: 92, alex: 75 },
  { category: "Evacuation", emma: 90, alex: 88 },
  { category: "Communication", emma: 85, alex: 80 },
]

const upcomingEvents = [
  {
    id: 1,
    title: "School-wide Emergency Drill",
    date: "March 15, 2024",
    time: "2:00 PM",
    school: "Lincoln Middle School",
    type: "drill",
  },
  {
    id: 2,
    title: "Parent Safety Workshop",
    date: "March 20, 2024",
    time: "6:30 PM",
    school: "Community Center",
    type: "workshop",
  },
  {
    id: 3,
    title: "First Aid Certification",
    date: "March 25, 2024",
    time: "10:00 AM",
    school: "Lincoln Elementary",
    type: "certification",
  },
]

export default function ParentDashboard() {
  return (
    <AuthGuard allowedRoles={["parent"]}>
      <DashboardLayout title="Parent Portal" role="parent" roleColor="bg-green-600">
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Children Enrolled</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{childrenData.length}</div>
                <p className="text-xs text-muted-foreground">Active in program</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    childrenData.reduce((sum, child) => sum + child.overallProgress, 0) / childrenData.length,
                  )}
                  %
                </div>
                <p className="text-xs text-muted-foreground">Across all children</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Safety Score</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">A+</div>
                <p className="text-xs text-muted-foreground">Family preparedness</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingEvents.length}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Children Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Children's Progress</CardTitle>
              <CardDescription>Track your children's disaster preparedness learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {childrenData.map((child) => (
                  <div key={child.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{child.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {child.grade} • {child.school}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Score: {child.averageScore}%</Badge>
                        <Badge variant={child.emergencyContactsUpdated ? "default" : "destructive"}>
                          {child.emergencyContactsUpdated ? "Contacts Updated" : "Update Needed"}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Overall Progress</p>
                        <Progress value={child.overallProgress} className="mb-1" />
                        <p className="text-xs text-muted-foreground">{child.overallProgress}% complete</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Modules Completed</p>
                        <div className="text-2xl font-bold">
                          {child.modulesCompleted}/{child.totalModules}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Last Activity</p>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          {child.lastActivity}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message Teacher
                      </Button>
                      {!child.emergencyContactsUpdated && (
                        <Button size="sm" variant="default">
                          Update Contacts
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="preparedness" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="preparedness">Preparedness Scores</TabsTrigger>
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
              <TabsTrigger value="communication">Family Communication</TabsTrigger>
            </TabsList>

            <TabsContent value="preparedness" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Family Preparedness Comparison</CardTitle>
                  <CardDescription>Compare your children's progress across different safety categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      emma: {
                        label: "Emma",
                        color: "hsl(var(--chart-1))",
                      },
                      alex: {
                        label: "Alex",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={preparednessScores}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="emma" fill="var(--color-emma)" radius={4} />
                        <Bar dataKey="alex" fill="var(--color-alex)" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events & Activities</CardTitle>
                  <CardDescription>Stay informed about school safety events and workshops</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-full ${
                              event.type === "drill"
                                ? "bg-orange-100 text-orange-600"
                                : event.type === "workshop"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-green-100 text-green-600"
                            }`}
                          >
                            {event.type === "drill" ? (
                              <Shield className="h-5 w-5" />
                            ) : event.type === "workshop" ? (
                              <Users className="h-5 w-5" />
                            ) : (
                              <Trophy className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {event.date} at {event.time} • {event.school}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Add to Calendar
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="communication" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Communication Plan</CardTitle>
                    <CardDescription>Your family's emergency contact strategy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Family Plan Status: Complete</AlertTitle>
                        <AlertDescription>
                          Your emergency communication plan is up to date. Last reviewed: March 1, 2024
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <span>Primary Contact</span>
                          <span className="font-medium">Mom: (555) 123-4567</span>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <span>Secondary Contact</span>
                          <span className="font-medium">Dad: (555) 123-4568</span>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <span>Out-of-State Contact</span>
                          <span className="font-medium">Grandma: (555) 123-4569</span>
                        </div>
                      </div>

                      <Button className="w-full">Update Communication Plan</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Emergency communication tools</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                        <Phone className="h-4 w-4 mr-2" />
                        Emergency Services
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" size="lg">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact School
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" size="lg">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Report Emergency
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" size="lg">
                        <Users className="h-4 w-4 mr-2" />
                        Family Check-in
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
