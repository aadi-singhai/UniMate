import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, FolderOpen, FileText, Download, Upload, File } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';

interface NotesScreenProps {
  onBack: () => void;
  userRole: 'student' | 'teacher' | 'admin';
}

const subjects = [
  { id: 1, name: 'Data Structures', color: '#335CFF', fileCount: 12 },
  { id: 2, name: 'Machine Learning', color: '#19E68C', fileCount: 8 },
  { id: 3, name: 'Web Development', color: '#F59E0B', fileCount: 15 },
  { id: 4, name: 'Database Systems', color: '#8B5CF6', fileCount: 10 },
  { id: 5, name: 'Operating Systems', color: '#EC4899', fileCount: 9 },
  { id: 6, name: 'Computer Networks', color: '#335CFF', fileCount: 11 },
];

const sampleNotes = {
  1: [
    { id: 1, name: 'Linked Lists - Lecture 1.pdf', type: 'pdf', size: '2.4 MB', date: 'Dec 1, 2024' },
    { id: 2, name: 'Trees and Graphs.pptx', type: 'ppt', size: '3.8 MB', date: 'Nov 28, 2024' },
    { id: 3, name: 'Sorting Algorithms.pdf', type: 'pdf', size: '1.9 MB', date: 'Nov 25, 2024' },
    { id: 4, name: 'Hash Tables.pdf', type: 'pdf', size: '2.1 MB', date: 'Nov 20, 2024' },
  ],
  2: [
    { id: 5, name: 'Introduction to ML.pdf', type: 'pdf', size: '4.2 MB', date: 'Dec 2, 2024' },
    { id: 6, name: 'Supervised Learning.pptx', type: 'ppt', size: '5.1 MB', date: 'Nov 29, 2024' },
  ],
};

export function NotesScreen({ onBack, userRole }: NotesScreenProps) {
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

  const handleSubjectClick = (subjectId: number) => {
    setSelectedSubject(subjectId);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <GlassCard className="p-6 rounded-b-3xl mb-6">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={selectedSubject ? handleBackToSubjects : onBack}
            className="p-2 hover:bg-secondary/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl">
            {selectedSubject
              ? subjects.find((s) => s.id === selectedSubject)?.name
              : 'Notes'}
          </h2>
        </div>
      </GlassCard>

      <div className="px-6">
        <AnimatePresence mode="wait">
          {!selectedSubject ? (
            /* Subject Folders */
            <motion.div
              key="subjects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              {subjects.map((subject, index) => (
                <motion.button
                  key={subject.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSubjectClick(subject.id)}
                  className="bg-card border border-border rounded-3xl p-5 text-left hover:scale-[1.02] transition-transform"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${subject.color}20` }}
                  >
                    <FolderOpen className="w-7 h-7" style={{ color: subject.color }} />
                  </div>
                  <h4 className="mb-2 line-clamp-2">{subject.name}</h4>
                  <p className="text-xs text-muted-foreground">{subject.fileCount} files</p>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            /* Files List */
            <motion.div
              key="files"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {userRole === 'teacher' && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <Button className="w-full rounded-2xl" size="lg">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload New Note
                  </Button>
                </motion.div>
              )}

              <div className="space-y-3">
                {(sampleNotes[selectedSubject as keyof typeof sampleNotes] || []).map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <File className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="truncate mb-1">{note.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {note.size} • {note.date}
                      </p>
                    </div>
                    <button className="p-2 hover:bg-secondary rounded-xl transition-colors">
                      <Download className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="mb-4">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-2xl p-4">
                    <FileText className="w-5 h-5 text-primary mb-2" />
                    <p className="text-2xl mb-1">
                      {(sampleNotes[selectedSubject as keyof typeof sampleNotes] || []).length}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Files</p>
                  </div>
                  <div className="bg-card border border-border rounded-2xl p-4">
                    <Download className="w-5 h-5 text-accent mb-2" />
                    <p className="text-2xl mb-1">
                      {(sampleNotes[selectedSubject as keyof typeof sampleNotes] || []).length * 15}
                    </p>
                    <p className="text-xs text-muted-foreground">Downloads</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}