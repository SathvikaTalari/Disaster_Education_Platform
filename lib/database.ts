// Database utility functions for disaster management system
// Note: This is a mock implementation since no database integration was added

export interface User {
  id: number
  email: string
  role: "admin" | "student" | "faculty"
  firstName: string
  lastName: string
  createdAt: string
}

export interface LearningModule {
  id: number
  title: string
  description: string
  contentType: string
  difficultyLevel: string
  estimatedDuration: number
  createdBy: number
  isPublished: boolean
}

export interface StudentProgress {
  id: number
  studentId: number
  moduleId: number
  status: "not_started" | "in_progress" | "completed"
  score?: number
  startedAt?: string
  completedAt?: string
}

export interface Quiz {
  id: number
  moduleId: number
  title: string
  description: string
  timeLimit: number
  totalQuestions: number
  passingScore: number
}

export interface RegionalAlert {
  id: number
  title: string
  message: string
  alertType: string
  severity: "Low" | "Medium" | "High" | "Critical"
  region: string
  isActive: boolean
  createdAt: string
  expiresAt?: string
}

export interface EmergencyContact {
  id: number
  name: string
  phoneNumber: string
  contactType: string
  description: string
  isActive: boolean
}

// Mock database functions - replace with actual database calls when integration is added
export const db = {
  // User management
  async getUserByEmail(email: string): Promise<User | null> {
    // Mock implementation
    return null
  },

  async createUser(userData: Omit<User, "id" | "createdAt">): Promise<User> {
    // Mock implementation
    return { ...userData, id: Date.now(), createdAt: new Date().toISOString() }
  },

  // Learning modules
  async getLearningModules(): Promise<LearningModule[]> {
    // Mock implementation
    return []
  },

  async createLearningModule(moduleData: Omit<LearningModule, "id">): Promise<LearningModule> {
    // Mock implementation
    return { ...moduleData, id: Date.now() }
  },

  // Student progress
  async getStudentProgress(studentId: number): Promise<StudentProgress[]> {
    // Mock implementation
    return []
  },

  async updateStudentProgress(progressData: Partial<StudentProgress>): Promise<StudentProgress> {
    // Mock implementation
    return progressData as StudentProgress
  },

  // Regional alerts
  async getActiveAlerts(): Promise<RegionalAlert[]> {
    // Mock implementation
    return []
  },

  async createAlert(alertData: Omit<RegionalAlert, "id" | "createdAt">): Promise<RegionalAlert> {
    // Mock implementation
    return { ...alertData, id: Date.now(), createdAt: new Date().toISOString() }
  },

  // Emergency contacts
  async getEmergencyContacts(): Promise<EmergencyContact[]> {
    // Mock implementation
    return []
  },

  // Analytics
  async getSystemMetrics(): Promise<Record<string, number>> {
    // Mock implementation
    return {
      totalStudents: 350,
      activeParticipation: 79,
      modulesCompleted: 1247,
      activeAlerts: 3,
    }
  },
}
