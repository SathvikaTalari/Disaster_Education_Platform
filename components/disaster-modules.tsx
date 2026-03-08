"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Clock,
  CheckCircle,
  Search,
  Star,
  Waves,
  Mountain,
  Radiation,
  Flame,
  Wind,
  AlertTriangle,
  Users,
  Shield,
  Download,
  Eye,
  Bookmark,
} from "lucide-react"

// Disaster-specific module data
const disasterTypes = [
  {
    id: "earthquake",
    name: "Earthquake",
    icon: Mountain,
    color: "bg-amber-500",
    description: "Seismic activity preparedness and response",
    modules: [
      {
        id: 1,
        title: "Understanding Earthquakes",
        type: "preparedness",
        duration: "30 min",
        difficulty: "Beginner",
        completed: true,
        score: 92,
      },
      {
        id: 2,
        title: "Earthquake Safety",
        type: "preparedness",
        duration: "45 min",
        difficulty: "Intermediate",
        completed: true,
        score: 88,
      },
      {
        id: 3,
        title: "Drop, Cover, and Hold On",
        type: "response",
        duration: "20 min",
        difficulty: "Beginner",
        completed: false,
        score: null,
      },
      {
        id: 4,
        title: "Post-Earthquake Safety",
        type: "response",
        duration: "35 min",
        difficulty: "Intermediate",
        completed: false,
        score: null,
      },
      {
        id: 5,
        title: "Evacuation Planning",
        type: "evacuation",
        duration: "40 min",
        difficulty: "Advanced",
        completed: false,
        score: null,
      },
      {
        id: 6,
        title: "Community Response and Coordination",
        type: "evacuation",
        duration: "50 min",
        difficulty: "Advanced",
        completed: false,
        score: null,
      },
    ],
  },
  {
    id: "flood",
    name: "Flood",
    icon: Waves,
    color: "bg-blue-500",
    description: "Water-related emergency management",
    modules: [
      {
        id: 7,
        title: "Understanding Flood",
        type: "preparedness",
        duration: "25 min",
        difficulty: "Beginner",
        completed: true,
        score: 85,
      },
      {
        id: 8,
        title: "Building Safety during Flood",
        type: "preparedness",
        duration: "40 min",
        difficulty: "Intermediate",
        completed: false,
        score: null,
      },
      {
        id: 9,
        title: "Flood Response",
        type: "response",
        duration: "30 min",
        difficulty: "Intermediate",
        completed: false,
        score: null,
      },
      {
        id: 10,
        title: "Flood Safety and Rescue",
        type: "response",
        duration: "45 min",
        difficulty: "Advanced",
        completed: false,
        score: null,
      },
      {
        id: 11,
        title: "Flood Evacuation Procedures",
        type: "evacuation",
        duration: "35 min",
        difficulty: "Intermediate",
        completed: false,
        score: null,
      },
      {
        id: 12,
        title: "Post-Flood Recovery",
        type: "evacuation",
        duration: "50 min",
        difficulty: "Advanced",
        completed: false,
        score: null,
      },
    ],
  },
  {
    id: "tsunami",
    name: "Tsunami",
    icon: Waves,
    color: "bg-teal-500",
    description: "Coastal wave emergency preparedness",
    modules: [
      {
        id: 13,
        title: "Understanding Tsunami",
        type: "preparedness",
        duration: "30 min",
        difficulty: "Beginner",
        completed: false,
        score: null,
      },
      {
        id: 14,
        title: "Tsunami Warning Systems",
        type: "preparedness",
        duration: "35 min",
        difficulty: "Intermediate",
        completed: false,
        score: null,
      },
      {
        id: 15,
        title: "Immediate Response Actions",
        type: "response",
        duration: "25 min",
        difficulty: "Beginner",
        completed: false,
        score: null,
      },
      {
        id: 16,
        title: "Evacuation Strategies",
        type: "evacuation",
        duration: "40 min",
        difficulty: "Advanced",
        completed: false,
        score: null,
      },
    ],
  },
  {
    id: "radioactive",
    name: "Radioactive",
    icon: Radiation,
    color: "bg-yellow-500",
    description: "Nuclear and radiological emergency response",
    modules: [
      {
        id: 17,
        title: "Understanding Radioactive Disaster",
        type: "preparedness",
        duration: "45 min",
        difficulty: "Intermediate",
        completed: false,
        score: null,
      },
      {
        id: 18,
        title: "Safety Measures",
        type: "response",
        duration: "30 min",
        difficulty: "Beginner",
        completed: false,
        score: null,
      },
      {
        id: 19,
        title: "Decontamination Protocols",
        type: "response",
        duration: "50 min",
        difficulty: "Advanced",
        completed: false,
        score: null,
      },
      {
        id: 20,
        title: "Evacuation during Radioactive Disaster",
        type: "evacuation",
        duration: "60 min",
        difficulty: "Advanced",
        completed: false,
        score: null,
      },
    ],
  },
  {
    id: "fire",
    name: "Fire",
    icon: Flame,
    color: "bg-red-500",
    description: "Fire safety and wildfire preparedness",
    modules: [
      {
        id: 21,
        title: "Fire Prevention Basics",
        type: "preparedness",
        duration: "25 min",
        difficulty: "Beginner",
        completed: true,
        score: 94,
      },
      {
        id: 22,
        title: "Smoke Detection Systems",
        type: "preparedness",
        duration: "30 min",
        difficulty: "Intermediate",
        completed: true,
        score: 89,
      },
      {
        id: 23,
        title: "Fire Extinguisher Use",
        type: "response",
        duration: "20 min",
        difficulty: "Beginner",
        completed: false,
        score: null,
      },
      {
        id: 24,
        title: "Building Evacuation",
        type: "evacuation",
        duration: "35 min",
        difficulty: "Intermediate",
        completed: false,
        score: null,
      },
      {
        id: 25,
        title: "Wildfire Defense",
        type: "response",
        duration: "55 min",
        difficulty: "Advanced",
        completed: false,
        score: null,
      },
    ],
  },
  {
    id: "severe-weather",
    name: "Wind",
    icon: Wind,
    color: "bg-purple-500",
    description: "Storm, tornado, and extreme weather response",
    modules: [
      {
        id: 26,
        title: "Weather Pattern Recognition",
        type: "preparedness",
        duration: "40 min",
        difficulty: "Intermediate",
        completed: false,
        score: null,
      },
      {
        id: 27,
        title: "Tornado Safety Procedures",
        type: "response",
        duration: "30 min",
        difficulty: "Beginner",
        completed: false,
        score: null,
      },
      {
        id: 28,
        title: "Hurricane Preparedness",
        type: "preparedness",
        duration: "50 min",
        difficulty: "Advanced",
        completed: false,
        score: null,
      },
      {
        id: 29,
        title: "Cyclone Preparedness",
        type: "evacuation",
        duration: "45 min",
        difficulty: "Intermediate",
        completed: false,
        score: null,
      },
    ],
  },
]

const books = [
  {
    id: 1,
    title: "Complete Guide to Emergency Preparedness",
    author: "Dr. Sarah Sharma",
    category: "General Preparedness",
    pages: 324,
    rating: 4.8,
    downloads: 1250,
    cover: "/emergency-preparedness-book-cover.jpg",
    description: "Comprehensive guide covering all aspects of disaster preparedness for families and communities.",
  },
  {
    id: 2,
    title: "Earthquake Safety Handbook",
    author: "Prof. Michael Jhones",
    category: "Earthquake",
    pages: 186,
    rating: 4.6,
    downloads: 890,
    cover: "/earthquake-safety-handbook-cover.jpg",
    description: "Essential knowledge for earthquake-prone regions, from preparation to recovery.",
  },
  {
    id: 3,
    title: "Flood Response and Recovery",
    author: "Ruskin Bond",
    category: "Flood",
    pages: 245,
    rating: 4.7,
    downloads: 675,
    cover: "/flood-response-book-cover.jpg",
    description: "Practical strategies for flood preparedness, response, and community recovery.",
  },
  {
    id: 4,
    title: "Fire Safety in Buildings",
    author: "Ms. Aarohi Sinha",
    category: "Fire",
    pages: 298,
    rating: 4.9,
    downloads: 1100,
    cover: "/fire-safety-building-book-cover.jpg",
    description: "Professional insights into fire prevention, detection, and evacuation procedures.",
  },
  {
    id: 5,
    title: "Nuclear Emergency Response",
    author: "Dr. Mukesh Chowdhary",
    category: "Radioactive",
    pages: 412,
    rating: 4.5,
    downloads: 320,
    cover: "/nuclear-emergency-response-book-cover.jpg",
    description: "Advanced guide to radiological emergency preparedness and response protocols.",
  },
  {
    id: 6,
    title: "First Aid and Medical Response",
    author: "Mr Anand Singh",
    category: "Medical",
    pages: 356,
    rating: 4.8,
    downloads: 1450,
    cover: "/first-aid-medical-response-book-cover.jpg",
    description: "Essential medical knowledge for emergency situations and disaster response.",
  },
]

export function DisasterModules() {
  const [selectedDisaster, setSelectedDisaster] = useState("earthquake")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const currentDisaster = disasterTypes.find((d) => d.id === selectedDisaster)

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || book.category.toLowerCase().includes(selectedCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  const getModuleTypeIcon = (type: string) => {
    switch (type) {
      case "preparedness":
        return Shield
      case "response":
        return AlertTriangle
      case "evacuation":
        return Users
      default:
        return BookOpen
    }
  }

  const getModuleTypeColor = (type: string) => {
    switch (type) {
      case "preparedness":
        return "bg-green-100 text-green-600"
      case "response":
        return "bg-orange-100 text-orange-600"
      case "evacuation":
        return "bg-blue-100 text-blue-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="modules">Interactive Modules</TabsTrigger>
          <TabsTrigger value="books">Resource Library</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-6">
          {/* Disaster Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Disaster Type</CardTitle>
              <CardDescription>Select a disaster category to access specialized training modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {disasterTypes.map((disaster) => {
                  const IconComponent = disaster.icon
                  const isSelected = selectedDisaster === disaster.id
                  return (
                    <button
                      key={disaster.id}
                      onClick={() => setSelectedDisaster(disaster.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-lg"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full ${disaster.color} flex items-center justify-center mx-auto mb-2`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-medium text-sm text-center">{disaster.name}</h3>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Selected Disaster Modules */}
          {currentDisaster && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${currentDisaster.color} flex items-center justify-center`}>
                    <currentDisaster.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>{currentDisaster.name} Training Modules</CardTitle>
                    <CardDescription>{currentDisaster.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Modules</TabsTrigger>
                    <TabsTrigger value="preparedness">Preparedness</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                    <TabsTrigger value="evacuation">Evacuation</TabsTrigger>
                  </TabsList>

                  {["all", "preparedness", "response", "evacuation"].map((tabValue) => (
                    <TabsContent key={tabValue} value={tabValue} className="space-y-4">
                      <div className="grid gap-4">
                        {currentDisaster.modules
                          .filter((module) => tabValue === "all" || module.type === tabValue)
                          .map((module) => {
                            const TypeIcon = getModuleTypeIcon(module.type)
                            return (
                              <div
                                key={module.id}
                                className="group p-4 border rounded-lg hover:shadow-lg transition-all duration-200 hover:border-primary/50"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-full ${getModuleTypeColor(module.type)}`}>
                                      <TypeIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                      <h3 className="font-medium group-hover:text-primary transition-colors">
                                        {module.title}
                                      </h3>
                                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                        <span className="flex items-center gap-1">
                                          <Clock className="h-3 w-3" />
                                          {module.duration}
                                        </span>
                                        <Badge
                                          variant={
                                            module.difficulty === "Beginner"
                                              ? "secondary"
                                              : module.difficulty === "Intermediate"
                                                ? "default"
                                                : "destructive"
                                          }
                                        >
                                          {module.difficulty}
                                        </Badge>
                                        <Badge variant="outline" className="capitalize">
                                          {module.type}
                                        </Badge>
                                        {module.completed && module.score && (
                                          <span className="text-green-600 font-medium flex items-center gap-1">
                                            <Star className="h-3 w-3" />
                                            {module.score}%
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {module.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                                    <Button
                                      variant={module.completed ? "outline" : "default"}
                                      className="group-hover:scale-105 transition-transform"
                                    >
                                      {module.completed ? "Review" : "Start"}
                                    </Button>
                                  </div>
                                </div>
                                {module.completed && (
                                  <div className="mt-3">
                                    <Progress value={100} className="h-2" />
                                  </div>
                                )}
                              </div>
                            )
                          })}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="books" className="space-y-6">
          {/* Books Section */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Library</CardTitle>
              <CardDescription>Comprehensive collection of disaster preparedness books and guides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search books, authors, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="all">All Categories</option>
                  <option value="general">General Preparedness</option>
                  <option value="earthquake">Earthquake</option>
                  <option value="flood">Flood</option>
                  <option value="fire">Fire</option>
                  <option value="radioactive">Radioactive</option>
                  <option value="medical">Medical</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <Card key={book.id} className="group hover:shadow-lg transition-all duration-200 hover:scale-105">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={book.cover || "/placeholder.svg"}
                          alt={book.title}
                          className="w-16 h-20 object-cover rounded border"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">{book.author}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {book.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{book.pages} pages</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">{book.rating}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{book.downloads} downloads</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{book.description}</p>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Bookmark className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
