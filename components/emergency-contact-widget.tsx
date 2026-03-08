"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Shield, Heart, Wrench, HelpCircle, ChevronDown, ChevronUp } from "lucide-react"

interface EmergencyContact {
  name: string
  number: string
  type: "Emergency" | "Medical" | "Maintenance" | "Support"
  description: string
}

const emergencyContacts: EmergencyContact[] = [
  {
    name: "Emergency Services",
    number: "112",
    type: "Emergency",
    description: "For life-threatening emergencies and immediate danger",
  },
  {
    name: "Campus Security",
    number: "(555) 123-4567",
    type: "Emergency",
    description: "Campus security and non-life-threatening emergencies",
  },
  {
    name: "Health Center",
    number: "(555) 123-4568",
    type: "Medical",
    description: "Medical emergencies and health services",
  },
  {
    name: "Facilities",
    number: "(555) 123-4569",
    type: "Maintenance",
    description: "Building maintenance and facility issues",
  },
  {
    name: "Student Support",
    number: "(555) 123-4570",
    type: "Support",
    description: "Counseling and student support services",
  },
]

export function EmergencyContactWidget() {
  const [isExpanded, setIsExpanded] = useState(false)

  const getContactIcon = (type: string) => {
    switch (type) {
      case "Emergency":
        return <Shield className="h-4 w-4" />
      case "Medical":
        return <Heart className="h-4 w-4" />
      case "Maintenance":
        return <Wrench className="h-4 w-4" />
      case "Support":
        return <HelpCircle className="h-4 w-4" />
      default:
        return <Phone className="h-4 w-4" />
    }
  }

  const getContactColor = (type: string) => {
    switch (type) {
      case "Emergency":
        return "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
      case "Medical":
        return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
      case "Maintenance":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
      case "Support":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const handleCall = (number: string, name: string) => {
    // In a real app, this would initiate a call
    if (number === "911") {
      alert(`Calling ${name} at ${number}\n\nThis would dial emergency services in a real application.`)
    } else {
      alert(`Calling ${name} at ${number}`)
    }
  }

  const emergencyContact = emergencyContacts[0] // 911
  const otherContacts = emergencyContacts.slice(1)

  return (
    <Card className="border-red-200 dark:border-red-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-red-700 dark:text-red-300 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Emergency Contacts
        </CardTitle>
        <CardDescription>Quick access to emergency services and support</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Primary Emergency Contact */}
        <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600 rounded-full">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-red-800 dark:text-red-200">{emergencyContact.name}</p>
                <p className="text-sm text-red-600 dark:text-red-400">{emergencyContact.description}</p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold"
              onClick={() => handleCall(emergencyContact.number, emergencyContact.name)}
            >
              <Phone className="h-5 w-5 mr-2" />
              {emergencyContact.number}
            </Button>
          </div>
        </div>

        {/* Other Contacts */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full justify-between p-2 h-auto"
          >
            <span className="text-sm font-medium">Other Emergency Contacts</span>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {isExpanded && (
            <div className="space-y-2 mt-2">
              {otherContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${getContactColor(contact.type)}`}>
                      {getContactIcon(contact.type)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {contact.type}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCall(contact.number, contact.name)}
                      className="h-8"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
