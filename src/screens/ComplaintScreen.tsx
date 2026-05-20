import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { StatusChip } from '../components/StatusChip';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface ComplaintScreenProps {
  onBack: () => void;
  userRole: 'student' | 'teacher' | 'admin';
}

const sampleComplaints = [
  {
    id: 1,
    title: 'Broken AC in Lab 301',
    category: 'Infrastructure',
    description: 'The air conditioning system in Computer Lab 301 has not been working for the past 3 days.',
    status: 'in-review' as const,
    date: 'Dec 1, 2024',
    submittedBy: 'John Doe',
  },
  {
    id: 2,
    title: 'Library WiFi Issues',
    category: 'Network',
    description: 'WiFi connection in the main library keeps disconnecting. Unable to access online resources.',
    status: 'pending' as const,
    date: 'Nov 30, 2024',
    submittedBy: 'Jane Smith',
  },
  {
    id: 3,
    title: 'Cafeteria Menu Variety',
    category: 'Food Services',
    description: 'Request for more vegetarian and vegan options in the cafeteria menu.',
    status: 'resolved' as const,
    date: 'Nov 28, 2024',
    submittedBy: 'Mike Johnson',
  },
  {
    id: 4,
    title: 'Parking Space Shortage',
    category: 'Parking',
    description: 'Insufficient parking spaces during peak hours. Students arriving after 9 AM struggle to find parking.',
    status: 'in-review' as const,
    date: 'Nov 27, 2024',
    submittedBy: 'Sarah Williams',
  },
];

export function ComplaintScreen({ onBack, userRole }: ComplaintScreenProps) {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<typeof sampleComplaints[0] | null>(null);

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <GlassCard className="p-6 rounded-b-3xl mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (selectedComplaint) {
                  setSelectedComplaint(null);
                } else if (showSubmitForm) {
                  setShowSubmitForm(false);
                } else {
                  onBack();
                }
              }}
              className="p-2 hover:bg-secondary/50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-2xl">
              {selectedComplaint
                ? 'Complaint Details'
                : showSubmitForm
                ? 'Submit Complaint'
                : 'Complaints'}
            </h2>
          </div>
          {!selectedComplaint && !showSubmitForm && userRole !== 'admin' && (
            <button
              onClick={() => setShowSubmitForm(true)}
              className="p-2 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform"
            >
              <Plus className="w-6 h-6" />
            </button>
          )}
        </div>
      </GlassCard>

      <div className="px-6">
        <AnimatePresence mode="wait">
          {showSubmitForm ? (
            /* Submit Form */
            <motion.div
              key="submit-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="bg-card border border-border rounded-3xl p-6 space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Complaint Title</label>
                  <Input placeholder="Brief title of your complaint" className="h-12 rounded-2xl" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Category</label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="network">Network</SelectItem>
                      <SelectItem value="food">Food Services</SelectItem>
                      <SelectItem value="parking">Parking</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Description</label>
                  <Textarea
                    placeholder="Describe your complaint in detail"
                    className="rounded-2xl min-h-[120px]"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => setShowSubmitForm(false)}
                    variant="outline"
                    className="flex-1 rounded-2xl"
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1 rounded-2xl">Submit Complaint</Button>
                </div>
              </div>
            </motion.div>
          ) : selectedComplaint ? (
            /* Complaint Detail */
            <motion.div
              key="complaint-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-3xl p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3>{selectedComplaint.title}</h3>
                  <StatusChip status={selectedComplaint.status} />
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>{selectedComplaint.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedComplaint.date}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="mb-2">Description</h4>
                  <p className="text-muted-foreground leading-relaxed">{selectedComplaint.description}</p>
                </div>

                {userRole !== 'admin' && (
                  <div className="pt-4 border-t border-border">
                    <h4 className="mb-2">Submitted By</h4>
                    <p className="text-muted-foreground">{selectedComplaint.submittedBy}</p>
                  </div>
                )}

                {userRole === 'admin' && (
                  <div className="pt-4 border-t border-border space-y-3">
                    <h4>Admin Actions</h4>
                    <Select>
                      <SelectTrigger className="h-12 rounded-2xl">
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-review">In Review</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full rounded-2xl">Update Status</Button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Complaints List */
            <motion.div
              key="complaints-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Filter Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-card border border-border rounded-2xl p-3 text-center">
                  <p className="text-2xl mb-1">
                    {sampleComplaints.filter((c) => c.status === 'pending').length}
                  </p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-3 text-center">
                  <p className="text-2xl mb-1">
                    {sampleComplaints.filter((c) => c.status === 'in-review').length}
                  </p>
                  <p className="text-xs text-muted-foreground">In Review</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-3 text-center">
                  <p className="text-2xl mb-1">
                    {sampleComplaints.filter((c) => c.status === 'resolved').length}
                  </p>
                  <p className="text-xs text-muted-foreground">Resolved</p>
                </div>
              </div>

              {/* Complaints */}
              <div className="space-y-3">
                {sampleComplaints.map((complaint, index) => (
                  <motion.button
                    key={complaint.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedComplaint(complaint)}
                    className="w-full bg-card border border-border rounded-2xl p-4 text-left hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h4 className="flex-1">{complaint.title}</h4>
                      <StatusChip status={complaint.status} />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4" />
                        <span>{complaint.category}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{complaint.date}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
