import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Users, CheckCircle2, XCircle, Calendar as CalendarIcon, Search, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { GlassCard } from '../components/GlassCard';
import { Input } from '../components/ui/input';
import { StatusChip } from '../components/StatusChip';

interface TeacherAttendanceScreenProps {
  onBack: () => void;
}

const classes = [
  { id: 1, name: 'Data Structures', code: 'CS301', students: 45, color: '#335CFF' },
  { id: 2, name: 'Machine Learning', code: 'CS401', students: 38, color: '#19E68C' },
  { id: 3, name: 'Web Development', code: 'CS302', students: 42, color: '#F59E0B' },
  { id: 4, name: 'Operating Systems', code: 'CS303', students: 40, color: '#8B5CF6' },
];

const studentsList = [
  { id: 1, name: 'Alex Johnson', rollNo: '2021001', avatar: 'AJ' },
  { id: 2, name: 'Sarah Williams', rollNo: '2021002', avatar: 'SW' },
  { id: 3, name: 'Michael Brown', rollNo: '2021003', avatar: 'MB' },
  { id: 4, name: 'Emily Davis', rollNo: '2021004', avatar: 'ED' },
  { id: 5, name: 'James Wilson', rollNo: '2021005', avatar: 'JW' },
  { id: 6, name: 'Emma Martinez', rollNo: '2021006', avatar: 'EM' },
  { id: 7, name: 'David Anderson', rollNo: '2021007', avatar: 'DA' },
  { id: 8, name: 'Olivia Taylor', rollNo: '2021008', avatar: 'OT' },
  { id: 9, name: 'Daniel Thomas', rollNo: '2021009', avatar: 'DT' },
  { id: 10, name: 'Sophia Moore', rollNo: '2021010', avatar: 'SM' },
];

export function TeacherAttendanceScreen({ onBack }: TeacherAttendanceScreenProps) {
  const [selectedClass, setSelectedClass] = useState<typeof classes[0] | null>(null);
  const [attendance, setAttendance] = useState<{ [key: number]: 'present' | 'absent' }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  const handleMarkAttendance = (studentId: number, status: 'present' | 'absent') => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleMarkAll = (status: 'present' | 'absent') => {
    const newAttendance: { [key: number]: 'present' | 'absent' } = {};
    // Changes from filteredStudents to studentsList
    studentsList.forEach((student) => {
      newAttendance[student.id] = status;
    });
    setAttendance(newAttendance);
  };

  const handleSubmit = () => {
    setShowSummary(true);
  };

  const filteredStudents = studentsList.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.includes(searchQuery)
  );

  // Change filteredStudents.length to studentsList.length
  const presentCount = Object.values(attendance).filter((status) => status === 'present').length;
  const absentCount = Object.values(attendance).filter((status) => status === 'absent').length;
  const unmarkedCount = studentsList.length - presentCount - absentCount;

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <GlassCard className="p-6 rounded-b-3xl mb-6">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => {
              if (selectedClass) {
                setSelectedClass(null);
                setAttendance({});
                setShowSummary(false);
              } else {
                onBack();
              }
            }}
            className="p-2 hover:bg-secondary/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl">
            {selectedClass ? 'Mark Attendance' : 'Select Class'}
          </h2>
        </div>
        {selectedClass && (
          <div className="mt-4 bg-background/50 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3>{selectedClass.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedClass.code}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl">{selectedClass.students}</p>
              </div>
            </div>
          </div>
        )}
      </GlassCard>

      <div className="px-6">
        <AnimatePresence mode="wait">
          {!selectedClass ? (
            /* Class Selection */
            <motion.div
              key="class-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {classes.map((cls, index) => (
                <motion.button
                  key={cls.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedClass(cls)}
                  className="w-full bg-card border border-border rounded-3xl p-6 text-left hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${cls.color}20` }}
                    >
                      <Users className="w-7 h-7" style={{ color: cls.color }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1">{cls.name}</h4>
                      <p className="text-sm text-muted-foreground">{cls.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl">{cls.students}</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : showSummary ? (
            /* Summary View */
            <motion.div
              key="summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-card border border-border rounded-2xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-accent mb-2" />
                  <p className="text-2xl mb-1">{presentCount}</p>
                  <p className="text-xs text-muted-foreground">Present</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-4">
                  <XCircle className="w-5 h-5 text-destructive mb-2" />
                  <p className="text-2xl mb-1">{absentCount}</p>
                  <p className="text-xs text-muted-foreground">Absent</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-4">
                  <CalendarIcon className="w-5 h-5 text-primary mb-2" />
                  <p className="text-2xl mb-1">{Math.round((presentCount / filteredStudents.length) * 100)}%</p>
                  <p className="text-xs text-muted-foreground">Rate</p>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
                <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
                <h3 className="mb-2">Attendance Submitted!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Attendance for {selectedClass.name} has been recorded.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-2xl"
                    onClick={() => {
                      setSelectedClass(null);
                      setAttendance({});
                      setShowSummary(false);
                    }}
                  >
                    Done
                  </Button>
                  <Button className="flex-1 rounded-2xl">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Student List with Attendance Marking */
            <motion.div
              key="attendance-marking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Search and Quick Actions */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or roll number..."
                    className="pl-12 rounded-2xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAll('present')}
                    className="flex-1 rounded-2xl"
                  >
                    Mark All Present
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAll('absent')}
                    className="flex-1 rounded-2xl"
                  >
                    Mark All Absent
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-accent/10 border border-accent/20 rounded-2xl p-3 text-center">
                  <p className="text-lg">{presentCount}</p>
                  <p className="text-xs text-muted-foreground">Present</p>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-3 text-center">
                  <p className="text-lg">{absentCount}</p>
                  <p className="text-xs text-muted-foreground">Absent</p>
                </div>
                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-3 text-center">
                  <p className="text-lg">{unmarkedCount}</p>
                  <p className="text-xs text-muted-foreground">Unmarked</p>
                </div>
              </div>

              {/* Student List */}
              <div className="space-y-3">
                {filteredStudents.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm text-primary">{student.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="truncate">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">{student.rollNo}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMarkAttendance(student.id, 'present')}
                        className={`p-2 rounded-xl transition-all ${attendance[student.id] === 'present'
                          ? 'bg-accent text-white scale-110'
                          : 'bg-accent/10 text-accent hover:bg-accent/20'
                          }`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleMarkAttendance(student.id, 'absent')}
                        className={`p-2 rounded-xl transition-all ${attendance[student.id] === 'absent'
                          ? 'bg-destructive text-white scale-110'
                          : 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                          }`}
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="sticky bottom-24 pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={unmarkedCount > 0}
                  className="w-full rounded-2xl"
                  size="lg"
                >
                  Submit Attendance
                  {unmarkedCount > 0 && ` (${unmarkedCount} unmarked)`}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
