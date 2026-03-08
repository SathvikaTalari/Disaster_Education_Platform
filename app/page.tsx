"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Users, GraduationCap, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
  }, [])

  const handleLogin = (role: string) => {
    // Mock authentication - in real app, validate credentials
    if (credentials.email && credentials.password) {
      localStorage.setItem("userRole", role)
      localStorage.setItem("userEmail", credentials.email)

      switch (role) {
        case "admin":
          router.push("/admin")
          break
        case "student":
          router.push("/student")
          break
        case "faculty":
          router.push("/faculty")
          break
        case "parent":
          router.push("/parent")
          break
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950 dark:via-orange-950 dark:to-yellow-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-red-600 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-red-800 dark:text-red-200">Disaster Management</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive disaster management and emergency preparedness training platform
          </p>
        </div>

        {/* Login Cards */}
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Student
              </TabsTrigger>
              <TabsTrigger value="faculty" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Faculty
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </TabsTrigger>
              <TabsTrigger value="parent" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Parent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader className="text-center">
                  <CardTitle className="text-blue-700 dark:text-blue-300">Login Portal</CardTitle>
                  <CardDescription>Access learning modules, quizzes, and emergency resources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-email">{"Email "}</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="student@university.edu"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleLogin("student")}>
                    Login as Student
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faculty">
              <Card className="border-green-200 dark:border-green-800">
                <CardHeader className="text-center">
                  <CardTitle className="text-green-700 dark:text-green-300">Faculty Portal</CardTitle>
                  <CardDescription>Manage courses, track student progress, and create content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="faculty-email">Email</Label>
                    <Input
                      id="faculty-email"
                      type="email"
                      placeholder="faculty@university.edu"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faculty-password">Password</Label>
                    <Input
                      id="faculty-password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleLogin("faculty")}>
                    Login as Faculty
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <Card className="border-red-200 dark:border-red-800">
                <CardHeader className="text-center">
                  <CardTitle className="text-red-700 dark:text-red-300">Admin Portal</CardTitle>
                  <CardDescription>System administration, analytics, and user management</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@university.edu"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => handleLogin("admin")}>
                    Login as Admin
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="parent">
              <Card className="border-green-200 dark:border-green-800">
                <CardHeader className="text-center">
                  <CardTitle className="text-green-700 dark:text-green-300">Parent Portal</CardTitle>
                  <CardDescription>Monitor your children's disaster preparedness progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="parent-email">Email</Label>
                    <Input
                      id="parent-email"
                      type="email"
                      placeholder="parent@email.com"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent-password">Password</Label>
                    <Input
                      id="parent-password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleLogin("parent")}>
                    Login as Parent
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Emergency Alert Banner */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <AlertTriangle className="h-8 w-8 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-1">
                    Emergency Preparedness Notice
                  </h3>
                  <p className="text-orange-700 dark:text-orange-300 text-sm">
                    Stay informed about disaster preparedness protocols. Access emergency contacts and safety procedures
                    through your dashboard.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
