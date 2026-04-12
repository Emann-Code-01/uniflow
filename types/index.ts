// src/types/index.ts

export type UserRole = "student" | "lecturer" | "admin";

export interface Profile {
  id: string;
  matric_number?: string; // For students
  staff_id?: string; // For lecturers
  full_name: string;
  email?: string;
  department?: string;
  faculty?: string;
  level?: number; // e.g., 100, 200, 300, 400
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

export interface TimetableSlot {
  id: string;
  course_code: string;
  course_title: string;
  lecturer_name?: string;
  day: string; // "Monday", "Tuesday", etc.
  start_time: string; // "08:00"
  end_time: string; // "10:00"
  venue: string;
  faculty?: string;
  department?: string;
  status?: "ontime" | "late" | "canceled" | "rescheduled" | "outage";
  status_note?: string;
  updated_by?: string; // lecturer or admin id
  updated_at?: string;
}

export interface LiveReport {
  id: string;
  slot_id?: string;
  course_code: string;
  type: "late" | "canceled" | "venue_change" | "outage" | "other";
  message: string;
  reported_by: string;
  reported_at: string;
  is_verified: boolean;
}

// For Supabase Auth + Profile
export interface AppUser {
  id: string;
  email?: string;
  role: UserRole;
  profile: Profile | null;
}
