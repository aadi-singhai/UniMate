import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, FolderOpen, FileText, Download, Upload, File, Plus, X } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface NotesScreenProps {
  onBack: () => void;
  userRole: 'student' | 'teacher' | 'admin';
}

const INITIAL_SUBJECTS = [
  { id: 1, name: 'Data Structures', color: '#335CFF' },
  { id: 2, name: 'Machine Learning', color: '#19E68C' },
  { id: 3, name: 'Web Development', color: '#F59E0B' },
  { id: 4, name: 'Database Systems', color: '#8B5CF6' },
  { id: 5, name: 'Operating Systems', color: '#EC4899' },
  { id: 6, name: 'Computer Networks', color: '#335CFF' },
];

const INITIAL_NOTES: Record<number, Array<{ id: number; name: string; type: string; size: string; date: string }>> = {
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
  const [subjects] = useState(INITIAL_SUBJECTS);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

  // Upload workflow management states
  const [isUploading, setIsUploading] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const currentSubjectNotes = selectedSubject ? notes[selectedSubject] || [] : [];

  const handleSubjectClick = (subjectId: number) => {
    setSelectedSubject(subjectId);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setIsUploading(false);
  };

  const handleUploadNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !newFileName.trim()) return;

    const extension = newFileName.includes('.') ? newFileName.split('.').pop() || 'pdf' : 'pdf';
    const cleanName = newFileName.includes('.') ? newFileName : `${newFileName}.pdf`;

    const newNote = {
      id: Date.now(),
      name: cleanName,
      type: extension.toLowerCase(),
      size: `${(Math.random() * 4 + 1).toFixed(1)} MB`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    setNotes((prev) => ({
      ...prev,
      [selectedSubject]: [newNote, ...(prev[selectedSubject] || [])],
    }));

    setNewFileName('');
    setIsUploading(false);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <GlassCard className="p-6 rounded-b-3xl mb-6">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={selectedSubject ? handleBackToSubjects : onBack}
            className="p-2 hover:bg-secondary/50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {selectedSubject
              ? subjects.find((s) => s.id === selectedSubject)?.name
              : 'Notes'}
          </h2>
        </div>
      </GlassCard>

      <div className="px-6">
        <AnimatePresence mode="wait">
          {!selectedSubject ? (
            /* Subject Folders Overview Grid */
            <motion.div
              key="subjects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              {subjects.map((subject, index) => {
                const fileCount = notes[subject.id]?.length || 0;
                return (
                  <motion.button
                    key={subject.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() => handleSubjectClick(subject.id)}
                    className="bg-card border border-border rounded-3xl p-5 text-left hover:scale-[1.02] active:scale-[0.99] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 block w-full"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${subject.color}15` }}
                    >
                      <FolderOpen className="w-7 h-7" style={{ color: subject.color }} />
                    </div>
                    <p className="font-semibold text-base text-card-foreground mb-1 line-clamp-2 leading-snug">
                      {subject.name}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">{fileCount} files</p>
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            /* Selected Folder Repository View */
            <motion.div
              key="files"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {userRole === 'teacher' && (
                <div className="space-y-3">
                  {!isUploading ? (
                    <Button
                      className="w-full rounded-2xl h-12 shadow-sm font-medium"
                      size="lg"
                      onClick={() => setIsUploading(true)}
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload New Note
                    </Button>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleUploadNote}
                      className="bg-card border border-border rounded-2xl p-4 space-y-3 shadow-inner"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <Plus className="w-3.5 h-3.5 text-primary" /> Document Parameters
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsUploading(false)}
                          className="text-muted-foreground p-1 hover:bg-secondary rounded-md"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newFileName}
                          onChange={(e) => setNewFileName(e.target.value)}
                          placeholder="Filename (e.g. Graph Theory.pdf)"
                          className="h-10 rounded-xl"
                          required
                          autoFocus
                        />
                        <Button type="submit" size="sm" className="rounded-xl px-4 h-10">
                          Save
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </div>
              )}

              {/* Files Array Stream Context */}
              <div className="space-y-3">
                {currentSubjectNotes.length === 0 ? (
                  <div className="text-center py-10 bg-card border border-dashed border-border rounded-2xl">
                    <FileText className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2.5" />
                    <p className="text-sm font-medium text-muted-foreground">No notes available inside this catalog.</p>
                  </div>
                ) : (
                  currentSubjectNotes.map((note, index) => (
                    <motion.div
                      key={note.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.04 }}
                      className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-sm"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <File className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium text-sm text-card-foreground mb-0.5">{note.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {note.size} • {note.date}
                        </p>
                      </div>
                      <button
                        className="p-2.5 hover:bg-secondary rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary/10"
                        aria-label={`Download ${note.name}`}
                      >
                        <Download className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Dynamic Storage & Catalog Metrics */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="pt-2"
              >
                <h3 className="font-semibold text-sm text-foreground mb-3 uppercase tracking-wider text-muted-foreground">
                  Folder Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                    <FileText className="w-5 h-5 text-primary mb-2.5" />
                    <p className="text-2xl font-bold tracking-tight text-card-foreground mb-0.5">
                      {currentSubjectNotes.length}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">Total Managed Files</p>
                  </div>
                  <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                    <Download className="w-5 h-5 text-emerald-500 mb-2.5" />
                    <p className="text-2xl font-bold tracking-tight text-card-foreground mb-0.5">
                      {currentSubjectNotes.length * 14}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground">Total Access Downloads</p>
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