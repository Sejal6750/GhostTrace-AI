import React, { useState } from 'react';
import { TabType, AuditCase } from './types/ghosttrace';
import { INITIAL_CASES } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { RequestsView } from './components/RequestsView';
import { InspectView } from './components/InspectView';
import { EvidenceView } from './components/EvidenceView';
import { PoliciesView } from './components/PoliciesView';
import { SchemaValidatorModal } from './components/SchemaValidatorModal';
import { ModelTelemetryModal } from './components/ModelTelemetryModal';
import { ThreeMerkleVault } from './components/ThreeMerkleVault';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const { isDark } = useTheme();
  const [currentTab, setCurrentTab] = useState<TabType>('dash');
  const [cases] = useState<AuditCase[]>(INITIAL_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('#GT-9483');

  // Modal states
  const [isSchemaOpen, setIsSchemaOpen] = useState(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [isThreeVaultOpen, setIsThreeVaultOpen] = useState(false);

  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        isDark
          ? 'bg-[#0b0f14] text-[#e0e2ea] selection:bg-[#10b981]/30 selection:text-[#4edea3]'
          : 'bg-[#FFFFFF] text-[#111713] selection:bg-[#138443]/20 selection:text-[#138443]'
      }`}
    >
      {/* Top Application Header with Theme Toggle */}
      <Header
        currentTab={currentTab}
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
        onOpenSchema={() => setIsSchemaOpen(true)}
        onOpenThreeVault={() => setIsThreeVaultOpen(true)}
        isThreeVaultOpen={isThreeVaultOpen}
        onSelectTab={setCurrentTab}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-4 pb-16">
        {currentTab === 'dash' && (
          <DashboardView
            onSelectTab={setCurrentTab}
            onSelectCase={handleSelectCase}
            onOpenSchema={() => setIsSchemaOpen(true)}
          />
        )}

        {currentTab === 'requests' && (
          <RequestsView
            cases={cases}
            onSelectCase={handleSelectCase}
            onNavigateInspect={() => setCurrentTab('inspect')}
          />
        )}

        {currentTab === 'inspect' && (
          <InspectView
            caseId={selectedCaseId}
            onOpenEvidence={(evidenceId) => {
              setCurrentTab('evidence');
            }}
          />
        )}

        {currentTab === 'evidence' && (
          <EvidenceView
            onSelectCase={handleSelectCase}
            onNavigateInspect={() => setCurrentTab('inspect')}
          />
        )}

        {currentTab === 'policies' && <PoliciesView />}
      </main>

      {/* Bottom Sticky Navigation */}
      <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Modals */}
      <SchemaValidatorModal
        isOpen={isSchemaOpen}
        onClose={() => setIsSchemaOpen(false)}
      />

      <ModelTelemetryModal
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
      />

      <ThreeMerkleVault
        isOpen={isThreeVaultOpen}
        onClose={() => setIsThreeVaultOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
