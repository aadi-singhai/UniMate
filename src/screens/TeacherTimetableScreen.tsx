import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, Edit2, Trash2, Clock, MapPin, Users } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface TeacherTimetableScreenProps {
  onBack: () => void;
}

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const initialTimetable = {
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

export function TeacherTimetableScreen({ onBack }: TeacherTimetableScreenProps) {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showAddClass, setShowAddClass] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [timetable, setTimetable] = useState(initialTimetable);

  const [formData, setFormData] = useState({
    subject: '',
    time: '',
    room: '',
    students: '',
    duration: '',
    color: '#335CFF',
  });

  const handleAddClass = () => {
    const newClass = {
      id: Date.now(),
      ...formData,
      students: parseInt(formData.students),
    };

    setTimetable((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay as keyof typeof prev] || []), newClass].sort((a, b) => {
        const timeA = new Date(`1970/01/01 ${a.time}`).getTime();
        const timeB = new Date(`1970/01/01 ${b.time}`).getTime();
        return timeA - timeB;
      }),
    }));

    setShowAddClass(false);
    setFormData({ subject: '', time: '', room: '', students: '', duration: '', color: '#335CFF' });
  };

  const handleDeleteClass = (classId: number) => {
    setTimetable((prev) => ({
      ...prev,
      [selectedDay]: prev[selectedDay as keyof typeof prev].filter((cls: any) => cls.id !== classId),
    }));
  };

  const currentDayClasses = timetable[selectedDay as keyof typeof timetable] || [];

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <GlassCard className="p-6 rounded-b-3xl mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (showAddClass) {
                  setShowAddClass(false);
                } else {
                  onBack();
                }
              }}
              className="p-2 hover:bg-secondary/50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl">{showAddClass ? 'Add Class' : 'My Schedule'}</h2>
          </div>
          {!showAddClass && (
            <button
              onClick={() => setShowAddClass(true)}
              className="p-2 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform"
            >
              <Plus className="w-6 h-6" />
            </button>
          )}
        </div>
      </GlassCard>

      <div className="px-6">
        <AnimatePresence mode="wait">
          {showAddClass ? (
            /* Add Class Form */
            <motion.div
              key="add-class"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-3xl p-6 space-y-4">
                <div className="space-y-2">
                  <Label>Subject Name</Label>
                  <Input
                    placeholder="e.g., Data Structures"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="rounded-2xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      placeholder="e.g., 2h"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="rounded-2xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Room</Label>
                    <Input
                      placeholder="e.g., Lab 301"
                      value={formData.room}
                      onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Students</Label>
                    <Input
                      type="number"
                      placeholder="45"
                      value={formData.students}
                      onChange={(e) => setFormData({ ...formData, students: e.target.value })}
                      className="rounded-2xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex gap-2">
                    {['#335CFF', '#19E68C', '#F59E0B', '#8B5CF6', '#EC4899'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-10 h-10 rounded-full transition-transform ${
                          formData.color === color ? 'scale-125 ring-2 ring-offset-2 ring-primary' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Button onClick={handleAddClass} className="w-full rounded-2xl" size="lg">
                Add to {selectedDay}
              </Button>
            </motion.div>
          ) : (
            /* Timetable View */
            <motion.div
              key="timetable"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Day Selector */}
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6">
                {weekDays.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-6 py-3 rounded-2xl whitespace-nowrap transition-all ${
                      selectedDay === day
                        ? 'bg-primary text-primary-foreground scale-105'
                        : 'bg-card border border-border hover:bg-secondary'
                    }`}
                  >
                    {day.substring(0, 3)}
                  </button>
                ))}
              </div>

              {/* Classes List */}
              <div className="space-y-4">
                {currentDayClasses.length === 0 ? (
                  <div className="bg-card border border-border rounded-3xl p-12 text-center">
                    <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="mb-2">No classes scheduled</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Add your first class for {selectedDay}
                    </p>
                    <Button onClick={() => setShowAddClass(true)} className="rounded-2xl">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Class
                    </Button>
                  </div>
                ) : (
                  currentDayClasses.map((cls: any, index: number) => (
                    <motion.div
                      key={cls.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-card border border-border rounded-3xl p-5 relative overflow-hidden"
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1.5"
                        style={{ backgroundColor: cls.color }}
                      ></div>
                      <div className="flex items-start justify-between gap-4 pl-4">
                        <div className="flex-1">
                          <h4 className="mb-2">{cls.subject}</h4>
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>
                                {cls.time} ({cls.duration})
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{cls.room}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="w-4 h-4" />
                              <span>{cls.students} students</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleDeleteClass(cls.id)}
                            className="p-2 hover:bg-destructive/10 text-destructive rounded-xl transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Weekly Summary */}
              {currentDayClasses.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="mb-4">Today's Summary</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-card border border-border rounded-2xl p-4">
                      <Clock className="w-5 h-5 text-primary mb-2" />
                      <p className="text-2xl mb-1">{currentDayClasses.length}</p>
                      <p className="text-xs text-muted-foreground">Classes</p>
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-4">
                      <Users className="w-5 h-5 text-accent mb-2" />
                      <p className="text-2xl mb-1">
                        {currentDayClasses.reduce((sum: number, cls: any) => sum + cls.students, 0)}
                      </p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-4">
                      <MapPin className="w-5 h-5 text-[#F59E0B] mb-2" />
                      <p className="text-2xl mb-1">
                        {new Set(currentDayClasses.map((cls: any) => cls.room)).size}
                      </p>
                      <p className="text-xs text-muted-foreground">Rooms</p>
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
