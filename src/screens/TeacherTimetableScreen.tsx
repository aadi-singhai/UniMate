import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, Edit2, Trash2, Clock, MapPin, Users } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

interface TeacherTimetableScreenProps {
  onBack: () => void;
}

interface TimetableClass {
  id: number;
  time: string;
  subject: string;
  room: string;
  students: number;
  duration: string;
  color: string;
}

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const initialTimetable: Record<string, TimetableClass[]> = {
  Monday: [
    { id: 1, time: '09:00 AM', subject: 'Data Structures', room: 'Lab 301', students: 45, duration: '2h', color: '#335CFF' },
    { id: 2, time: '02:00 PM', subject: 'Machine Learning', room: 'Room 204', students: 38, duration: '1.5h', color: '#19E68C' },
  ],
  Tuesday: [
    { id: 3, time: '10:00 AM', subject: 'Web Development', room: 'Lab 105', students: 42, duration: '2h', color: '#F59E0B' },
    { id: 4, time: '03:00 PM', subject: 'Operating Systems', room: 'Room 301', students: 40, duration: '1h', color: '#8B5CF6' },
  ],
  Wednesday: [
    { id: 5, time: '09:00 AM', subject: 'Data Structures', room: 'Lab 301', students: 45, duration: '2h', color: '#335CFF' },
  ],
  Thursday: [
    { id: 6, time: '11:00 AM', subject: 'Machine Learning', room: 'Room 204', students: 38, duration: '2h', color: '#19E68C' },
    { id: 7, time: '02:00 PM', subject: 'Web Development', room: 'Lab 105', students: 42, duration: '1.5h', color: '#F59E0B' },
  ],
  Friday: [
    { id: 8, time: '10:00 AM', subject: 'Operating Systems', room: 'Room 301', students: 40, duration: '2h', color: '#8B5CF6' },
  ],
};

// Simple helper to assist with sorting modern standard 12-hour or 24-hour time entries
const parseTimeToMinutes = (timeString: string): number => {
  if (!timeString) return 0;
  const match = timeString.match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (!match) return 0;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const modifier = match[3];

  if (modifier) {
    if (modifier.toUpperCase() === 'PM' && hours < 12) hours += 12;
    if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;
  }
  return hours * 60 + minutes;
};

export function TeacherTimetableScreen({ onBack }: TeacherTimetableScreenProps) {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState<TimetableClass | null>(null);
  const [timetable, setTimetable] = useState(initialTimetable);

  const [formData, setFormData] = useState({
    subject: '',
    time: '',
    room: '',
    students: '',
    duration: '',
    color: '#335CFF',
  });

  const handleOpenAdd = () => {
    setEditingClass(null);
    setFormData({ subject: '', time: '', room: '', students: '', duration: '', color: '#335CFF' });
    setShowForm(true);
  };

  const handleOpenEdit = (cls: TimetableClass) => {
    setEditingClass(cls);
    // Convert 12h display time (e.g., '09:00 AM') back to 24h 'hh:mm' input value if necessary
    let inputTime = cls.time;
    if (cls.time.includes('AM') || cls.time.includes('PM')) {
      const match = cls.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (match) {
        let hrs = parseInt(match[1], 10);
        const mins = match[2];
        const ampm = match[3].toUpperCase();
        if (ampm === 'PM' && hrs < 12) hrs += 12;
        if (ampm === 'AM' && hrs === 12) hrs = 0;
        inputTime = `${hrs.toString().padStart(2, '0')}:${mins}`;
      }
    }

    setFormData({
      subject: cls.subject,
      time: inputTime,
      room: cls.room,
      students: cls.students.toString(),
      duration: cls.duration,
      color: cls.color,
    });
    setShowForm(true);
  };

  const handleSaveClass = () => {
    if (!formData.subject || !formData.time) return;

    // Convert raw 24-hour input string '14:30' to user-friendly '02:30 PM' display format
    let displayTime = formData.time;
    if (formData.time.includes(':') && !formData.time.includes('M')) {
      const [hStr, mStr] = formData.time.split(':');
      let h = parseInt(hStr, 10);
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      h = h ? h : 12;
      displayTime = `${h.toString().padStart(2, '0')}:${mStr} ${ampm}`;
    }

    const updatedClassData = {
      subject: formData.subject,
      time: displayTime,
      room: formData.room || 'N/A',
      students: parseInt(formData.students, 10) || 0,
      duration: formData.duration || '1h',
      color: formData.color,
    };

    setTimetable((prev) => {
      const dayClasses = prev[selectedDay] || [];
      let updatedClasses;

      if (editingClass) {
        // Mode: Editing an existing class resource
        updatedClasses = dayClasses.map((cls) =>
          cls.id === editingClass.id ? { ...cls, ...updatedClassData } : cls
        );
      } else {
        // Mode: Adding a completely brand new item
        const newClass = { id: Date.now(), ...updatedClassData };
        updatedClasses = [...dayClasses, newClass];
      }

      // Maintain automated ascending timeline list structure
      updatedClasses.sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time));

      return { ...prev, [selectedDay]: updatedClasses };
    });

    setShowForm(false);
    setEditingClass(null);
    setFormData({ subject: '', time: '', room: '', students: '', duration: '', color: '#335CFF' });
  };

  const handleDeleteClass = (classId: number) => {
    setTimetable((prev) => ({
      ...prev,
      [selectedDay]: (prev[selectedDay] || []).filter((cls) => cls.id !== classId),
    }));
  };

  const currentDayClasses = timetable[selectedDay] || [];

  return (
    <div className="min-h-screen bg-background pb-28 text-foreground">
      {/* Dynamic Header Frame */}
      <GlassCard className="p-6 rounded-b-3xl mb-6 border-x-0 border-t-0 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (showForm) {
                  setShowForm(false);
                } else {
                  onBack();
                }
              }}
              className="p-2 hover:bg-secondary/50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <ArrowLeft className="w-6 h-6 text-foreground/80" />
            </button>
            <h2 className="text-xl font-bold tracking-tight">
              {showForm ? (editingClass ? 'Edit Class Details' : 'Add New Class') : 'My Schedule'}
            </h2>
          </div>
          {!showForm && (
            <button
              onClick={handleOpenAdd}
              className="p-2.5 bg-primary text-primary-foreground rounded-full hover:scale-105 active:scale-95 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </GlassCard>

      <div className="px-6">
        <AnimatePresence mode="wait">
          {showForm ? (
            /* Shared Form View Component */
            <motion.div
              key="schedule-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground/80">Subject Name</Label>
                  <Input
                    placeholder="e.g., Data Structures"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground/80">Start Time</Label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground/80">Duration</Label>
                    <Input
                      placeholder="e.g., 2h or 1.5h"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground/80">Room / Lab Location</Label>
                    <Input
                      placeholder="e.g., Lab 301"
                      value={formData.room}
                      onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                      className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground/80">Total Students</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 45"
                      value={formData.students}
                      onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                      className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground/80">Category Color Tag</Label>
                  <div className="flex gap-3 pt-1">
                    {['#335CFF', '#19E68C', '#F59E0B', '#8B5CF6', '#EC4899'].map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-9 h-9 rounded-full transition-transform ${formData.color === color ? 'scale-110 ring-2 ring-offset-2 ring-offset-background ring-primary' : 'hover:scale-105'
                          }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border-border h-12 text-sm font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveClass}
                  disabled={!formData.subject || !formData.time}
                  className="flex-1 rounded-xl h-12 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {editingClass ? 'Save Changes' : `Add to ${selectedDay}`}
                </Button>
              </div>
            </motion.div>
          ) : (
            /* Timetable Visual Track View */
            <motion.div
              key="timetable-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Day Selector Segment Layout */}
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-none">
                {weekDays.map((day) => {
                  const isActive = selectedDay === day;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${isActive
                          ? 'bg-primary text-primary-foreground border-primary shadow-sm scale-[1.02]'
                          : 'bg-card border-border/60 hover:bg-secondary/60 text-muted-foreground hover:text-foreground'
                        }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Day Cards Stack Wrapper */}
              <div className="space-y-4">
                {currentDayClasses.length === 0 ? (
                  <div className="bg-card border border-border/80 rounded-3xl p-10 text-center shadow-sm">
                    <Clock className="w-12 h-12 text-muted-foreground/60 mx-auto mb-3" />
                    <h3 className="text-base font-semibold mb-1 text-foreground/90">No classes scheduled</h3>
                    <p className="text-sm text-muted-foreground mb-5 max-w-xs mx-auto">
                      Keep your workflow updated by planning your lecture list for {selectedDay}.
                    </p>
                    <Button onClick={handleOpenAdd} variant="secondary" className="rounded-xl text-xs font-semibold px-4">
                      <Plus className="w-4 h-4 mr-1.5" />
                      Add First Class
                    </Button>
                  </div>
                ) : (
                  currentDayClasses.map((cls, index) => (
                    <motion.div
                      key={cls.id}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.04, ease: 'easeOut' }}
                      className="bg-card border border-border rounded-2xl p-5 relative overflow-hidden shadow-sm hover:border-border/80 transition-all group"
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1.5"
                        style={{ backgroundColor: cls.color }}
                      ></div>

                      <div className="flex items-start justify-between gap-4 pl-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-base tracking-tight mb-2.5 text-foreground/90 truncate">
                            {cls.subject}
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 text-muted-foreground/70 shrink-0" />
                              <span className="truncate">{cls.time} • ({cls.duration})</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 text-muted-foreground/70 shrink-0" />
                              <span className="truncate">{cls.room}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                              <Users className="w-4 h-4 text-muted-foreground/70 shrink-0" />
                              <span className="truncate">{cls.students} enrolled students</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-1 shrink-0 opacity-90 md:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleOpenEdit(cls)}
                            className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors focus:outline-none"
                            title="Edit class schedule"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClass(cls.id)}
                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors focus:outline-none"
                            title="Remove class schedule"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Dynamic Dynamic Summary Insights */}
              {currentDayClasses.length > 0 && (
                <motion.div
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="pt-2"
                >
                  <h3 className="text-sm font-semibold mb-3 tracking-tight text-foreground/80">Today's Metrics Summary</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                      <Clock className="w-4 h-4 text-primary mb-2" />
                      <div>
                        <p className="text-xl font-bold tracking-tight">{currentDayClasses.length}</p>
                        <p className="text-[11px] font-medium text-muted-foreground tracking-wide uppercase mt-0.5">Lectures</p>
                      </div>
                    </div>
                    <div className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                      <Users className="w-4 h-4 text-accent mb-2" />
                      <div>
                        <p className="text-xl font-bold tracking-tight">
                          {currentDayClasses.reduce((sum, cls) => sum + cls.students, 0)}
                        </p>
                        <p className="text-[11px] font-medium text-muted-foreground tracking-wide uppercase mt-0.5">Students</p>
                      </div>
                    </div>
                    <div className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                      <MapPin className="w-4 h-4 text-[#F59E0B] mb-2" />
                      <div>
                        <p className="text-xl font-bold tracking-tight">
                          {new Set(currentDayClasses.map((cls) => cls.room)).size}
                        </p>
                        <p className="text-[11px] font-medium text-muted-foreground tracking-wide uppercase mt-0.5">Locations</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}