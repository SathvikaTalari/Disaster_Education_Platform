"use client"
import { EmergencyContactWidget } from "@/components/emergency-contact-widget"
import { PanicButton } from "@/components/panic-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, MapPin, Clock, Navigation, Info } from "lucide-react"

const currentAlerts = [
  {
    id: 1,
    title: "Severe Weather Warning",
    message: "Thunderstorm with high winds expected. Avoid outdoor areas.",
    severity: "High" as const,
    region: "Campus Area",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Building Maintenance",
    message: "Elevator maintenance in Building C. Use stairs.",
    severity: "Low" as const,
    region: "Building C",
    time: "4 hours ago",
  },
]

const evacuationRoutes = [
  { building: "Main Building", route: "Exit via north stairwell to Assembly Point A" },
  { building: "Science Building", route: "Exit via east and west exits to Assembly Point B" },
  { building: "Library", route: "Exit via main entrance to Assembly Point C" },
  { building: "Student Center", route: "Exit via multiple exits to Assembly Point D" },
]

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-700 rounded-full">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Emergency Response Center</h1>
              <p className="text-red-100">Quick access to emergency services and safety information</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Emergency Actions */}
          <div className="lg:col-span-1 space-y-6">
            <PanicButton />
            <EmergencyContactWidget />
          </div>

          {/* Right Column - Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Current Alerts
                </CardTitle>
                <CardDescription>Active emergency notifications for your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentAlerts.map((alert) => (
                    <Alert
                      key={alert.id}
                      className={
                        alert.severity === "High"
                          ? "border-red-200 bg-red-50 dark:bg-red-950"
                          : "border-yellow-200 bg-yellow-50 dark:bg-yellow-950"
                      }
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle className="flex items-center justify-between">
                        <span>{alert.title}</span>
                        <Badge variant={alert.severity === "High" ? "destructive" : "secondary"}>
                          {alert.severity}
                        </Badge>
                      </AlertTitle>
                      <AlertDescription>
                        <p className="mb-2">{alert.message}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.region}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {alert.time}
                          </span>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Evacuation Routes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-blue-600" />
                  Evacuation Routes
                </CardTitle>
                <CardDescription>Emergency evacuation procedures by building</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {evacuationRoutes.map((route, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{route.building}</h4>
                          <p className="text-sm text-muted-foreground">{route.route}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Navigation className="h-4 w-4 mr-2" />
                          View Map
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Procedures */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-green-600" />
                  Emergency Procedures
                </CardTitle>
                <CardDescription>Quick reference for emergency situations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-red-700 mb-2">Fire Emergency</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Pull fire alarm</li>
                      <li>• Exit via nearest safe route</li>
                      <li>• Close doors behind you</li>
                      <li>• Go to assembly point</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-orange-700 mb-2">Earthquake</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Drop, Cover, Hold On</li>
                      <li>• Stay away from windows</li>
                      <li>• Wait for shaking to stop</li>
                      <li>• Exit if building is damaged</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-blue-700 mb-2">Severe Weather</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Move to interior room</li>
                      <li>• Stay away from windows</li>
                      <li>• Listen for updates</li>
                      <li>• Wait for all-clear</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-purple-700 mb-2">Medical Emergency</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Call 911 immediately</li>
                      <li>• Provide first aid if trained</li>
                      <li>• Stay with the person</li>
                      <li>• Guide responders to location</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
