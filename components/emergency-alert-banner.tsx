"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, X, Phone, MapPin } from "lucide-react"

interface EmergencyAlert {
  id: number
  title: string
  message: string
  severity: "Low" | "Medium" | "High" | "Critical"
  region: string
  type: string
}

export function EmergencyAlertBanner() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([])
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([])

  useEffect(() => {
    // Mock emergency alerts - in real app, fetch from API
    const mockAlerts: EmergencyAlert[] = [
      {
        id: 1,
        title: "Severe Weather Alert",
        message: "Thunderstorm warning in effect. Seek indoor shelter immediately.",
        severity: "High",
        region: "Campus Area",
        type: "Weather",
      },
    ]

    setAlerts(mockAlerts)
  }, [])

  const dismissAlert = (alertId: number) => {
    setDismissedAlerts([...dismissedAlerts, alertId])
  }

  const activeAlerts = alerts.filter((alert) => !dismissedAlerts.includes(alert.id))

  if (activeAlerts.length === 0) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 space-y-2 p-4">
      {activeAlerts.map((alert) => (
        <Alert
          key={alert.id}
          className={`${
            alert.severity === "Critical"
              ? "border-red-600 bg-red-50 dark:bg-red-950"
              : alert.severity === "High"
                ? "border-orange-500 bg-orange-50 dark:bg-orange-950"
                : "border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
          } shadow-lg animate-pulse`}
        >
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="flex items-center justify-between">
            <span className="font-bold">{alert.title}</span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-6 px-2 bg-transparent">
                <Phone className="h-3 w-3 mr-1" />
                911
              </Button>
              <Button size="sm" variant="ghost" onClick={() => dismissAlert(alert.id)} className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          </AlertTitle>
          <AlertDescription>
            <p className="font-medium">{alert.message}</p>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <MapPin className="h-3 w-3" />
              <span>{alert.region}</span>
              <span>•</span>
              <span className="font-medium">{alert.severity} Priority</span>
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}
