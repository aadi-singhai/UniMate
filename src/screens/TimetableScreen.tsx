import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, MapPin } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface TimetableScreenProps {
  onBack: () => void;
}

const timetableData = {
  Monday: [
    { time: '09:00 - 10:00', subject: 'Data Structures', room: 'Lab 301', teacher: 'Dr. Smith', color: '#335CFF' },
    { time: '10:00 - 11:00', subject: 'Algorithms', room: 'Room 204', teacher: 'Prof. Johnson', color: '#19E68C' },
    { time: '11:30 - 12:30', subject: 'Database Systems', room: 'Lab 105', teacher: 'Dr. Williams', color: '#F59E0B' },
    { time: '02:00 - 03:00', subject: 'Web Development', room: 'Lab 201', teacher: 'Prof. Brown', color: '#8B5CF6' },
  ],
  Tuesday: [
    { time: '09:00 - 10:00', subject: 'Machine Learning', room: 'Room 301', teacher: 'Dr. Davis', color: '#EC4899' },
    { time: '10:00 - 11:00', subject: 'Computer Networks', room: 'Lab 202', teacher: 'Prof. Miller', color: '#335CFF' },
    { time: '11:30 - 12:30', subject: 'Operating Systems', room: 'Room 105', teacher: 'Dr. Wilson', color: '#19E68C' },
  ],
  Wednesday: [
    { time: '09:00 - 10:00', subject: 'Software Engineering', room: 'Room 204', teacher: 'Prof. Moore', color: '#F59E0B' },
    { time: '10:00 - 11:00', subject: 'Data Structures', room: 'Lab 301', teacher: 'Dr. Smith', color: '#335CFF' },
    { time: '02:00 - 03:00', subject: 'Web Development', room: 'Lab 201', teacher: 'Prof. Brown', color: '#8B5CF6' },
  ],
  Thursday: [
    { time: '09:00 - 10:00', subject: 'Algorithms', room: 'Room 204', teacher: 'Prof. Johnson', color: '#19E68C' },
    { time: '10:00 - 11:00', subject: 'Machine Learning', room: 'Room 301', teacher: 'Dr. Davis', color: '#EC4899' },
    { time: '11:30 - 12:30', subject: 'Database Systems', room: 'Lab 105', teacher: 'Dr. Williams', color: '#F59E0B' },
    { time: '02:00 - 03:00', subject: 'Computer Networks', room: 'Lab 202', teacher: 'Prof. Miller', color: '#335CFF' },
  ],
  Friday: [
    { time: '09:00 - 10:00', subject: 'Operating Systems', room: 'Room 105', teacher: 'Dr. Wilson', color: '#19E68C' },
    { time: '10:00 - 11:00', subject: 'Software Engineering', room: 'Room 204', teacher: 'Prof. Moore', color: '#F59E0B' },
    { time: '11:30 - 12:30', subject: 'Web Development', room: 'Lab 201', teacher: 'Prof. Brown', color: '#8B5CF6' },
  ],
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Helper function to convert "HH:MM" string to absolute minutes from midnight
const timeToMinutes = (timeStr: string) => {
  const [hours, minutes] = timeStr.trim().split(':').map(Number);
  return hours * 60 + minutes;
};

export function TimetableScreen({ onBack }: TimetableScreenProps) {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const currentTime = new Date();
  const currentDay = days[currentTime.getDay() - 1] || 'Monday';

  // Get current time in minutes from midnight
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <GlassCard className="p-6 rounded-b-3xl mb-6">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={onBack} className="p-2 hover:bg-secondary/50 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl">Timetable</h2>
        </div>
      </GlassCard>

      <div className="px-6 space-y-6">
        {/* Day Selector */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        >
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-3 rounded-2xl whitespace-nowrap transition-all ${selectedDay === day
                ? 'bg-primary text-primary-foreground scale-105'
                : 'bg-card border border-border text-muted-foreground hover:border-primary'
                }`}
            >
              {day}
            </button>
          ))}
        </motion.div>

        {/* Classes */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {timetableData[selectedDay as keyof typeof timetableData].map((cls, index) => {
            // Split "09:00 - 10:00" into start and end strings
            const [startTimeStr, endTimeStr] = cls.time.split(' - ');

            const startMinutes = timeToMinutes(startTimeStr);
            const endMinutes = timeToMinutes(endTimeStr);

            const isCurrentClass =
              selectedDay === currentDay &&
              currentMinutes >= startMinutes &&
              currentMinutes < endMinutes;

            return (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={`bg-card border rounded-3xl p-5 flex gap-4 ${isCurrentClass ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]' : 'border-border'
                  } transition-all`}
              >
                <div className="w-1.5 rounded-full" style={{ backgroundColor: cls.color }}></div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="mb-1">{cls.subject}</h4>
                      <p className="text-sm text-muted-foreground">{cls.teacher}</p>
                    </div>
                    {isCurrentClass && (
                      <span className="bg-accent text-white text-xs px-3 py-1 rounded-full animate-pulse">
                        Now
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{cls.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>{cls.room}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Weekly Summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="mb-4">Weekly Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl mb-1">18</p>
              <p className="text-xs text-muted-foreground">Classes This Week</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <p className="text-2xl mb-1">7</p>
              <p className="text-xs text-muted-foreground">Unique Subjects</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}