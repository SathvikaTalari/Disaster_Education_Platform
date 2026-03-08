"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageCircle,
  Send,
  Users,
  AlertTriangle,
  Megaphone,
  Clock,
  CheckCircle,
  Radio,
  Smartphone,
} from "lucide-react"

interface Message {
  id: string
  sender: string
  role: "student" | "faculty" | "admin" | "emergency"
  content: string
  timestamp: string
  priority: "low" | "medium" | "high" | "emergency"
  channel: string
}

interface EmergencyBroadcast {
  id: string
  title: string
  message: string
  sender: string
  timestamp: string
  severity: "info" | "warning" | "critical"
  region: string
  acknowledged: boolean
}

const messages: Message[] = [
  {
    id: "1",
    sender: "Dr. Sarah Johnson",
    role: "faculty",
    content: "Great job on the fire safety quiz everyone! Remember to practice the evacuation routes we discussed.",
    timestamp: "2 minutes ago",
    priority: "low",
    channel: "Fire Safety Class",
  },
  {
    id: "2",
    sender: "Campus Security",
    role: "admin",
    content: "Reminder: Emergency drill scheduled for tomorrow at 2 PM. Please participate actively.",
    timestamp: "15 minutes ago",
    priority: "medium",
    channel: "Campus Announcements",
  },
  {
    id: "3",
    sender: "Emergency Response Team",
    role: "emergency",
    content: "Weather alert: Severe thunderstorm approaching. Seek shelter in designated areas.",
    timestamp: "1 hour ago",
    priority: "emergency",
    channel: "Emergency Alerts",
  },
]

const emergencyBroadcasts: EmergencyBroadcast[] = [
  {
    id: "1",
    title: "Severe Weather Alert",
    message: "Thunderstorm warning in effect. All outdoor activities suspended. Seek shelter immediately.",
    sender: "Emergency Management",
    timestamp: "5 minutes ago",
    severity: "critical",
    region: "Campus Wide",
    acknowledged: false,
  },
  {
    id: "2",
    title: "Scheduled Maintenance",
    message: "Fire alarm system testing in Building C from 2-4 PM today. Expect brief alarm sounds.",
    sender: "Facilities",
    timestamp: "2 hours ago",
    severity: "info",
    region: "Building C",
    acknowledged: true,
  },
]

export function RealTimeCommunication() {
  const [newMessage, setNewMessage] = useState("")
  const [selectedChannel, setSelectedChannel] = useState("Fire Safety Class")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the server
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleAcknowledgeBroadcast = (id: string) => {
    // In a real app, this would update the server
    console.log("Acknowledging broadcast:", id)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="broadcasts">Emergency Broadcasts</TabsTrigger>
          <TabsTrigger value="channels">Communication Channels</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Class & Campus Messages
              </CardTitle>
              <CardDescription>Real-time communication with faculty and peers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {message.sender
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{message.sender}</span>
                        <Badge
                          variant={
                            message.role === "emergency"
                              ? "destructive"
                              : message.role === "admin"
                                ? "default"
                                : message.role === "faculty"
                                  ? "secondary"
                                  : "outline"
                          }
                        >
                          {message.role}
                        </Badge>
                        <Badge
                          variant={
                            message.priority === "emergency"
                              ? "destructive"
                              : message.priority === "high"
                                ? "default"
                                : "outline"
                          }
                        >
                          {message.priority}
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{message.content}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{message.timestamp}</span>
                        <span>•</span>
                        <span>{message.channel}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="broadcasts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5" />
                Emergency Broadcasts
              </CardTitle>
              <CardDescription>Critical alerts and announcements from emergency management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyBroadcasts.map((broadcast) => (
                  <Alert
                    key={broadcast.id}
                    className={
                      broadcast.severity === "critical"
                        ? "border-red-200 bg-red-50"
                        : broadcast.severity === "warning"
                          ? "border-yellow-200 bg-yellow-50"
                          : "border-blue-200 bg-blue-50"
                    }
                  >
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="flex items-center justify-between">
                      <span>{broadcast.title}</span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            broadcast.severity === "critical"
                              ? "destructive"
                              : broadcast.severity === "warning"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {broadcast.severity}
                        </Badge>
                        {broadcast.acknowledged && <CheckCircle className="h-4 w-4 text-green-600" />}
                      </div>
                    </AlertTitle>
                    <AlertDescription>
                      <p className="mb-3">{broadcast.message}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          <span>
                            {broadcast.sender} • {broadcast.timestamp} • {broadcast.region}
                          </span>
                        </div>
                        {!broadcast.acknowledged && (
                          <Button size="sm" variant="outline" onClick={() => handleAcknowledgeBroadcast(broadcast.id)}>
                            Acknowledge
                          </Button>
                        )}
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Available Channels
                </CardTitle>
                <CardDescription>Join communication channels for different topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Fire Safety Class", members: 24, active: true },
                    { name: "First Aid Training", members: 18, active: false },
                    { name: "Campus Announcements", members: 156, active: true },
                    { name: "Emergency Alerts", members: 200, active: true },
                    { name: "Study Groups", members: 12, active: false },
                  ].map((channel) => (
                    <div key={channel.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{channel.name}</h3>
                        <p className="text-sm text-muted-foreground">{channel.members} members</p>
                      </div>
                      <Button variant={channel.active ? "default" : "outline"} size="sm">
                        {channel.active ? "Active" : "Join"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5" />
                  Emergency Communication
                </CardTitle>
                <CardDescription>Direct lines for emergency situations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Emergency Hotline
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Campus Security Chat
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    <Users className="h-4 w-4 mr-2" />
                    Emergency Response Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
