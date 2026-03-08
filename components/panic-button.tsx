"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Phone, MapPin, Clock } from "lucide-react"

export function PanicButton() {
  const [isActivated, setIsActivated] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)

  const handlePanicActivation = () => {
    if (isActivated) return

    // Start 5-second countdown before activation
    setCountdown(5)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer)
          setIsActivated(true)
          // In real app, this would send emergency alert
          alert(
            "EMERGENCY ALERT ACTIVATED!\n\n" +
              "• Emergency services have been notified\n" +
              "• Your location has been shared\n" +
              "• Campus security is en route\n\n" +
              "Stay calm and follow emergency procedures.",
          )
          return null
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleCancel = () => {
    setCountdown(null)
    setIsActivated(false)
  }

  return (
    <Card className="border-red-300 dark:border-red-700">
      <CardHeader className="text-center">
        <CardTitle className="text-red-700 dark:text-red-300 flex items-center justify-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Emergency Panic Button
        </CardTitle>
        <CardDescription>
          {isActivated
            ? "Emergency alert is active"
            : countdown
              ? `Activating in ${countdown} seconds...`
              : "Press and hold for emergency assistance"}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        {countdown !== null && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center justify-center gap-2 text-yellow-800 dark:text-yellow-200">
              <Clock className="h-5 w-5" />
              <span className="font-bold text-lg">{countdown}</span>
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">
              Emergency services will be contacted automatically
            </p>
          </div>
        )}

        {isActivated && (
          <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center justify-center gap-2 text-red-800 dark:text-red-200 mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-bold">EMERGENCY ALERT ACTIVE</span>
            </div>
            <div className="space-y-2 text-sm text-red-700 dark:text-red-300">
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Emergency services notified</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Location shared with responders</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {!isActivated && countdown === null && (
            <Button
              size="lg"
              className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-bold text-lg"
              onMouseDown={handlePanicActivation}
              onTouchStart={handlePanicActivation}
            >
              <AlertTriangle className="h-6 w-6 mr-2" />
              EMERGENCY
            </Button>
          )}

          {countdown !== null && (
            <Button size="lg" variant="outline" className="w-full bg-transparent" onClick={handleCancel}>
              Cancel Emergency Alert
            </Button>
          )}

          {isActivated && (
            <div className="space-y-2">
              <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white">
                <Phone className="h-5 w-5 mr-2" />
                Call 911 Directly
              </Button>
              <Button size="sm" variant="outline" className="w-full bg-transparent" onClick={handleCancel}>
                Deactivate Alert
              </Button>
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          <p>Only use in genuine emergencies</p>
          <p>False alarms may result in penalties</p>
        </div>
      </CardContent>
    </Card>
  )
}
