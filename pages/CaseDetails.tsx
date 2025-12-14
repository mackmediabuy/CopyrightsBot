import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/Layout';
import { Button, Card, StatusBadge } from '../components/UI';
import { mockDb } from '../services/mockDb';
import { Case, CaseStatus } from '../types';
import { useParams, useNavigate } from 'react-router-dom';
import { Icons } from '../constants';
import { analyzeInfringement } from '../services/geminiService';

const CaseDetails = ({ logout }: { logout: () => void }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseItem, setCaseItem] = useState<Case | undefined>();
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (id) {
      setCaseItem(mockDb.getCaseById(id));
    }
  }, [id]);

  const handleStatusChange = (newStatus: CaseStatus) => {
    if (caseItem) {
      const updated = mockDb.updateCaseStatus(caseItem.id, newStatus);
      setCaseItem(updated);
    }
  };

  const runAnalysis = async () => {
    if (!caseItem) return;
    setAnalyzing(true);
    const result = await analyzeInfringement(caseItem);
    const updated = mockDb.updateCaseStatus(caseItem.id, CaseStatus.UNDER_REVIEW, result);
    setCaseItem(updated);
    setAnalyzing(false);
  };

  if (!caseItem) return <div className="p-10 text-center text-slate-400">Loading Case...</div>;

  return (
    <DashboardLayout logout={logout}>
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <button onClick={() => navigate('/admin/dashboard')} className="text-slate-500 hover:text-white transition-colors">
                  &larr; Back
               </button>
               <h2 className="text-2xl font-bold text-white">Case Management</h2>
               <StatusBadge status={caseItem.status} />
            </div>
            <p className="text-slate-400 font-mono text-sm">{caseItem.id}</p>
          </div>
          <div className="flex gap-3">
             <Button 
                variant="danger" 
                onClick={() => handleStatusChange(CaseStatus.REJECTED)}
                disabled={caseItem.status === CaseStatus.REJECTED}
             >
                Reject
             </Button>
             <Button 
                variant="primary"
                onClick={() => handleStatusChange(CaseStatus.RESOLVED)}
                className="bg-green-600 hover:bg-green-700"
                disabled={caseItem.status === CaseStatus.RESOLVED}
             >
                Resolve Case
             </Button>
          </div>
       </div>

       <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
             <Card>
                <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-2">Infringement Details</h3>
                <div className="space-y-4">
                   <div>
                      <span className="text-sm text-slate-500 uppercase font-bold">Original URL</span>
                      <a href={caseItem.originalContentUrl} target="_blank" rel="noreferrer" className="block text-brand-blue hover:underline truncate">
                        {caseItem.originalContentUrl}
                      </a>
                   </div>
                   <div>
                      <span className="text-sm text-slate-500 uppercase font-bold">Infringing URL</span>
                      <a href={caseItem.infringingUrl} target="_blank" rel="noreferrer" className="block text-red-400 hover:underline truncate">
                        {caseItem.infringingUrl}
                      </a>
                   </div>
                   <div>
                      <span className="text-sm text-slate-500 uppercase font-bold">Description</span>
                      <p className="text-slate-300 mt-1">{caseItem.description}</p>
                   </div>
                </div>
             </Card>

             {/* AI Analysis Section */}
             <Card className="relative overflow-hidden border-brand-accent/20">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Icons.Sparkles />
                </div>
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-lg font-semibold text-brand-accent flex items-center gap-2">
                      <Icons.Sparkles /> AI Legal Analysis
                   </h3>
                   {!caseItem.aiAnalysis && (
                     <Button onClick={runAnalysis} disabled={analyzing} className="h-8 text-xs">
                        {analyzing ? 'Analyzing...' : 'Run Analysis'}
                     </Button>
                   )}
                </div>
                
                {caseItem.aiAnalysis ? (
                   <div className="bg-slate-950/50 p-4 rounded-lg text-slate-300 text-sm leading-relaxed border border-slate-800">
                      {caseItem.aiAnalysis}
                   </div>
                ) : (
                   <div className="text-center py-6 text-slate-500 text-sm">
                      Click "Run Analysis" to get an automated legal assessment via Gemini API.
                   </div>
                )}
             </Card>
          </div>

          <div className="space-y-6">
             <Card>
                <h3 className="text-sm font-semibold text-slate-400 uppercase mb-4">Actions</h3>
                <Button onClick={() => navigate('/admin/dmca')} variant="secondary" className="w-full mb-3 justify-start">
                   <Icons.DocumentText /> Generate DMCA
                </Button>
                <div className="text-xs text-slate-500 mt-4">
                   Manual removal request required for {caseItem.platform}.
                </div>
             </Card>
          </div>
       </div>
    </DashboardLayout>
  );
};

export default CaseDetails;