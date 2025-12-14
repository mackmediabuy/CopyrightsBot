import React, { useState } from 'react';
import { DashboardLayout } from '../components/Layout';
import { Button, Input, Select, Textarea, Card } from '../components/UI';
import { Platform } from '../types';
import { mockDb } from '../services/mockDb';
import { useNavigate } from 'react-router-dom';

const NewCase = ({ logout }: { logout: () => void }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    originalContentUrl: '',
    infringingUrl: '',
    platform: Platform.YOUTUBE,
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      mockDb.addCase(formData);
      setLoading(false);
      navigate('/admin/dashboard');
    }, 800);
  };

  return (
    <DashboardLayout logout={logout}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Register New Case</h2>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
             <Input 
               label="Original Content URL"
               placeholder="https://your-site.com/original-work"
               required
               value={formData.originalContentUrl}
               onChange={e => setFormData({...formData, originalContentUrl: e.target.value})}
             />
             
             <div className="grid grid-cols-2 gap-6">
                <Select 
                   label="Platform" 
                   options={Object.values(Platform)} 
                   value={formData.platform}
                   onChange={e => setFormData({...formData, platform: e.target.value as Platform})}
                />
                <Input 
                  label="Suspected Infringing URL"
                  placeholder="https://facebook.com/pirated-video"
                  required
                  value={formData.infringingUrl}
                  onChange={e => setFormData({...formData, infringingUrl: e.target.value})}
                />
             </div>

             <Textarea 
               label="Description / Details"
               placeholder="Describe the infringement (e.g. they copied 3 minutes of my video...)"
               rows={4}
               required
               value={formData.description}
               onChange={e => setFormData({...formData, description: e.target.value})}
             />

             <div className="bg-brand-accent/5 border border-brand-accent/10 rounded-lg p-4">
               <label className="flex items-start gap-3 cursor-pointer">
                 <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-brand-blue focus:ring-brand-blue" />
                 <span className="text-sm text-slate-300">
                   I declare under penalty of perjury that I am the copyright owner or authorized to act on their behalf, and the information provided is accurate.
                 </span>
               </label>
             </div>

             <div className="flex justify-end gap-4 pt-2">
                <Button type="button" variant="ghost" onClick={() => navigate('/admin/dashboard')}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Register Case'}
                </Button>
             </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NewCase;