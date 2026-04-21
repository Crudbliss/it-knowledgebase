import { Breadcrumb } from '@/components/ui/shared'
import {
  LifecycleDiagram,
  WorkflowStageCards,
  VersioningPolicy,
  CollaborationRoles,
  IntegrationsPanel,
} from '@/components/workflow'

export function WorkflowPage() {
  return (
    <div className="p-5">
      <Breadcrumb items={['Workflow Documentation']} />
      <h1 className="text-[22px] font-semibold text-gray-900 mb-1">
        Workflow & Versioning
      </h1>
      <p className="text-[13px] text-gray-400 leading-relaxed mb-5">
        A complete guide to the article lifecycle, versioning policy,
        collaboration rules, and how this knowledgebase data integrates with
        other IT systems.
      </p>

      {/* Lifecycle diagram */}
      <LifecycleDiagram />

      {/* 4 stage cards */}
      <WorkflowStageCards />

      {/* Versioning */}
      <VersioningPolicy />

      {/* Collaboration roles */}
      <CollaborationRoles />

      {/* Integrations */}
      <IntegrationsPanel />
    </div>
  )
}
