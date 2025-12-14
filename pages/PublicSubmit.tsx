import React, { useState } from 'react';
import { PublicLayout } from '../components/Layout';
import { Button, Input, Select, Textarea, Card } from '../components/UI';
import { Platform } from '../types';
import { mockDb } from '../services/mockDb';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../constants';

const PublicSubmit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  
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
      const newCase = mockDb.addCase(formData);
      setLoading(false);
      setSubmittedId(newCase.id);
    }, 1200);
  };

  if (submittedId) {
    return (
      <PublicLayout>
         <div className="max-w-2xl mx-auto px-6 py-20">
            <Card className="text-center py-12 border-green-500/30 bg-green-500/5">
               <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                  <Icons.ShieldCheck />
               </div>
               <h2 className="text-3xl font-bold text-white mb-4">Complaint Received</h2>
               <p className="text-slate-300 mb-8 max-w-md mx-auto">
                  Your takedown request has been securely submitted to our system. Our bots and admin team will review it shortly.
               </p>
               
               <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 inline-block text-left mb-8">
                  <p className="text-slate-500 text-xs uppercase font-bold mb-2">Save your Tracking ID</p>
                  <p className="text-3xl font-mono text-brand-blue font-bold tracking-wider">{submittedId}</p>
               </div>

               <div className="flex justify-center gap-4">
                  <Button onClick={() => navigate('/')} variant="secondary">Return Home</Button>
                  <Button onClick={() => navigate(`/status?id=${submittedId}`)}>Track Status</Button>
               </div>
            </Card>
         </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
           <h2 className="text-3xl font-bold text-white mb-3">Submit a Copyright Complaint</h2>
           <p className="text-slate-400">Fill out the details below to initiate an automated takedown request.</p>
        </div>

        <Card className="border-t-4 border-t-brand-blue">
          <form onSubmit={handleSubmit} className="space-y-6">
             <div className="p-4 bg-brand-blue/10 border border-brand-blue/20 rounded-lg mb-6">
                <p className="text-sm text-brand-blue flex items-start gap-2">
                   <Icons.Sparkles />
                   <span><strong>AI Analysis:</strong> Our system will automatically scan the infringing URL to verify content matches before taking action.</span>
                </p>
             </div>

             <Input 
               label="Where is your original content?"
               placeholder="https://your-site.com/original-work or YouTube URL"
               required
               value={formData.originalContentUrl}
               onChange={e => setFormData({...formData, originalContentUrl: e.target.value})}
             />
             
             <div className="grid md:grid-cols-2 gap-6">
                <Select 
                   label="Infringement Platform" 
                   options={Object.values(Platform)} 
                   value={formData.platform}
                   onChange={e => setFormData({...formData, platform: e.target.value as Platform})}
                />
                <Input 
                  label="URL of Stolen Content"
                  placeholder="https://facebook.com/pirated-video"
                  required
                  value={formData.infringingUrl}
                  onChange={e => setFormData({...formData, infringingUrl: e.target.value})}
                />
             </div>

             <Textarea 
               label="Additional Details"
               placeholder="Please describe what was copied (e.g. 'They used my thumbnail', 'Re-uploaded entire video', etc.)"
               rows={4}
               required
               value={formData.description}
               onChange={e => setFormData({...formData, description: e.target.value})}
             />

             <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
               <label className="flex items-start gap-3 cursor-pointer">
                 <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-800 text-brand-blue focus:ring-brand-blue" />
                 <span className="text-sm text-slate-400">
                   I am the owner of this content or authorized to act on behalf of the owner. I understand that submitting false claims is a violation of our terms.
                 </span>
               </label>
             </div>

             <div className="pt-2">
                <Button type="submit" disabled={loading} className="w-full h-12 text-lg">
                  {loading ? 'Processing Submission...' : 'Submit Complaint'}
                </Button>
             </div>
          </form>
        </Card>
      </div>
    </PublicLayout>
  );
};

export default PublicSubmit;