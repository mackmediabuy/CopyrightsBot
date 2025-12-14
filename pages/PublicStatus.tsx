import React, { useState, useEffect } from 'react';
import { PublicLayout } from '../components/Layout';
import { Input, Button, Card, StatusBadge } from '../components/UI';
import { Icons } from '../constants';
import { mockDb } from '../services/mockDb';
import { useSearchParams } from 'react-router-dom';
import { Case } from '../types';

const PublicStatus = () => {
  const [searchParams] = useSearchParams();
  const [searchId, setSearchId] = useState(searchParams.get('id') || '');
  const [result, setResult] = useState<Case | null | 'not_found'>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId) return;

    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const found = mockDb.getCaseById(searchId.trim());
      setResult(found || 'not_found');
      setLoading(false);
    }, 600);
  };

  useEffect(() => {
    if(searchParams.get('id')) {
        // Auto trigger search if ID in URL
        const id = searchParams.get('id');
        if(id) {
           setLoading(true);
           setTimeout(() => {
            const found = mockDb.getCaseById(id);
            setResult(found || 'not_found');
            setLoading(false);
           }, 500);
        }
    }
  }, [searchParams]);

  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-6 py-20 min-h-[60vh]">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">Case Status Tracker</h2>
          <p className="text-slate-400">Enter a Case ID to verify the status of a copyright claim.</p>
        </div>

        <Card className="mb-8">
           <form onSubmit={handleSearch} className="flex gap-4">
             <Input 
               placeholder="Enter Case ID (e.g. CASE-8821)" 
               value={searchId}
               onChange={(e) => setSearchId(e.target.value)}
               className="h-12"
             />
             <Button type="submit" disabled={loading} className="w-32">
               {loading ? 'Checking...' : 'Track'}
             </Button>
           </form>
        </Card>

        {result === 'not_found' && (
           <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
              <p className="text-red-400 font-medium">No record found for Case ID "{searchId}"</p>
           </div>
        )}

        {result && typeof result !== 'string' && (
           <Card className="border-t-4 border-t-brand-blue animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h3 className="text-xl font-bold text-white mb-1">Case Details</h3>
                    <p className="text-sm text-slate-400">ID: <span className="font-mono text-brand-blue">{result.id}</span></p>
                 </div>
                 <StatusBadge status={result.status} />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                 <div>
                    <span className="block text-xs font-semibold uppercase text-slate-500 mb-1">Platform</span>
                    <span className="text-slate-200">{result.platform}</span>
                 </div>
                 <div>
                    <span className="block text-xs font-semibold uppercase text-slate-500 mb-1">Date Submitted</span>
                    <span className="text-slate-200">{new Date(result.dateSubmitted).toLocaleDateString()}</span>
                 </div>
              </div>

              <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
                 <p className="text-sm text-slate-400 mb-2 font-semibold">Public Note:</p>
                 <p className="text-sm text-slate-300 italic">
                    {result.status === 'Resolved' 
                      ? "This case has been successfully closed. The infringing content has been removed or authorized." 
                      : result.status === 'Rejected'
                      ? "This case was reviewed and determined not to meet the criteria for action, or evidence was insufficient."
                      : "This case is currently being processed by our automated systems and administrative review team."}
                 </p>
              </div>
           </Card>
        )}
      </div>
    </PublicLayout>
  );
};

export default PublicStatus;