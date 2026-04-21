import type {
  Article,
  Category,
  WorkflowStage,
  CollaborationRole,
  VersionEntry,
} from '@/types'

export const ARTICLES: Article[] = [
  {
    id: 'KB-004',
    title: 'Diagnosing and Resolving Blue Screen of Death (BSOD) Errors',
    category: 'Troubleshooting',
    subcategory: 'BSOD & System Crashes',
    status: 'review',
    version: 'v1.1',
    author: 'David Chen',
    readTime: '10 min',
    updatedAt: '2026-04-07',
    tags: ['error', 'urgent', 'windows', 'bsod', 'driver'],
    description:
      'A workstation is experiencing random Blue Screen of Death (BSOD) crashes, forcing unexpected reboots and raising potential data loss. BSODs can be triggered by faulty hardware drivers, corrupt system files, failing RAM or storage, overheating, or incompatible Windows updates. Without a structured diagnostic approach, the root cause is...',
    views: 1205,
    helpfulCount: 89,
    content: "## Overview\nThis guide covers common causes for Blue Screen of Death (BSOD) and the steps required to identify and resolve them.\n\n### Step 1: Collect Error Codes\nWhen the BSOD occurs, take note of the stop code (e.g., `IRQL_NOT_LESS_OR_EQUAL` or `CRITICAL_PROCESS_DIED`).\n\n### Step 2: Analyze Minidump Files\nUse WinDbg or BlueScreenView to open the `.dmp` files located in `C:\\Windows\\Minidump`.\n\n### Step 3: Update Drivers\nFaulty drivers are the most common cause. Update display, network, and chipset drivers."
  },
  {
    id: 'KB-006',
    title: 'Active Directory: Password Reset and Account Unlock Procedure',
    category: 'Software',
    subcategory: 'Authentication & Identity',
    status: 'published',
    version: 'v1.3',
    author: 'Michael Torres',
    readTime: '9 min',
    updatedAt: '2026-04-05',
    tags: ['reset', 'urgent', 'active-directory', 'password', 'security'],
    description:
      'A user is locked out of their Windows account or has forgotten their password and cannot log in to their workstation or access domain resources. Account lockouts typically occur due to incorrect password attempts (e.g., old credentials cached on a phone or other device), and must be resolved by a domain administrator with appropriate Active...',
    views: 8932,
    helpfulCount: 412,
    content: "## Overview\nStandard operating procedure for resetting passwords and unlocking accounts in Active Directory.\n\n### Step 1: Verify User Identity\nAlways verify the identity of the user calling the helpdesk using their employee ID and manager's name.\n\n### Step 2: Open Active Directory Users and Computers (ADUC)\nSearch for the user's SAM account name.\n\n### Step 3: Reset Password\nRight-click the user object -> Reset Password. Ensure 'User must change password at next logon' is checked."
  },
  {
    id: 'KB-001',
    title: 'How to Configure DNS Settings on Windows 10',
    category: 'Networking',
    subcategory: 'DNS Configuration',
    status: 'published',
    version: 'v1.2',
    author: 'Sarah Mitchell',
    readTime: '5 min',
    updatedAt: '2026-04-01',
    tags: ['setup', 'beginner', 'windows', 'dns', 'network'],
    description:
      'After a network infrastructure change, users on Windows 10 machines are experiencing slow or failed domain name resolution. Websites fail to load, and internal resources like shared drives or intranet portals are unreachable. This is typically caused by incorrect or outdated DNS server addresses assigned via DHCP, or by a misconfigured static IP...',
    views: 342,
    helpfulCount: 45,
    content: "## Overview\nGuide for manually overriding or flushing DNS settings on Windows 10.\n\n### Step 1: Open Network Connections\nPress Win + R, type `ncpa.cpl` and press Enter.\n\n### Step 2: Modify IPv4 Properties\nRight-click your active adapter -> Properties -> Select Internet Protocol Version 4 (TCP/IPv4) -> Properties.\n\n### Step 3: Set DNS Servers\nSet Preferred DNS to `8.8.8.8` (or internal DNS IP) and Alternate to `8.8.4.4`."
  },
  {
    id: 'KB-002',
    title: 'Troubleshooting: Network Printer Not Found on Windows',
    category: 'Hardware',
    subcategory: 'Printers & Scanners',
    status: 'published',
    version: 'v2.0',
    author: 'James Okeke',
    readTime: '8 min',
    updatedAt: '2026-03-20',
    tags: ['error', 'troubleshooting', 'printer', 'network', 'windows'],
    description:
      'Users report that a shared network printer no longer appears in the printer list or fails to print jobs. This commonly occurs after network changes (new switch/VLAN), printer firmware updates, IP address leases expiring, or Windows Update modifying print spooler settings. The printer may be physically online but unreachable from the workstation.',
    views: 5214,
    helpfulCount: 310,
    content: "## Overview\nSteps to resolve common network printer discovery and connection issues.\n\n### Step 1: Ping the Printer\nOpen Command Prompt and ping the printer's static IP address. If it times out, verify the physical network connection.\n\n### Step 2: Restart Print Spooler\nOpen Services (`services.msc`), locate Print Spooler, right-click and Restart.\n\n### Step 3: Re-add the Printer\nGo to Settings -> Devices -> Printers & Scanners. Remove the offline printer and click 'Add a printer or scanner'."
  },
  {
    id: 'KB-005',
    title: 'Installing and Activating Microsoft 365 Apps for Business',
    category: 'Software',
    subcategory: 'Application Setup',
    status: 'published',
    version: 'v2.1',
    author: 'Emily Rodriguez',
    readTime: '8 min',
    updatedAt: '2026-03-18',
    tags: ['setup', 'beginner', 'office365', 'licensing', 'windows', 'update'],
    description:
      "A new employee's workstation does not have Microsoft 365 applications installed (Word, Excel, Outlook, Teams, etc.). Without the correct licensed installation, the employee cannot access company emails, documents, or collaboration tools. Manual or incorrect installation can cause activation failures, version mismatches, or licence conflicts with other users.",
    views: 1045,
    helpfulCount: 156,
    content: "## Overview\nInstructions for deploying Microsoft 365 Apps on a new workstation.\n\n### Step 1: Sign in to Office Portal\nNavigate to `portal.office.com` and log in with the user's corporate credentials.\n\n### Step 2: Download Installer\nClick 'Install apps' in the top right corner and select 'Microsoft 365 apps'.\n\n### Step 3: Activation\nOnce installed, open Word and accept the license agreement. The suite will activate automatically using Single Sign-On (SSO)."
  },
  {
    id: 'KB-003',
    title: 'Setting Up a VPN Connection on Windows 11',
    category: 'Networking',
    subcategory: 'VPN Setup & Troubleshooting',
    status: 'published',
    version: 'v1.0',
    author: 'Priya Sharma',
    readTime: '7 min',
    updatedAt: '2026-03-15',
    tags: ['setup', 'vpn', 'windows', 'beginner', 'remote'],
    description:
      "Remote employees and travelling staff need secure, encrypted access to the company's internal network from outside the office. Without a VPN, connections over public Wi-Fi or home networks are unencrypted and expose corporate data to interception. IT must provision and document the VPN setup process for end users with minimal technical...",
    views: 7421,
    helpfulCount: 520,
    content: "## Overview\nConfiguring the built-in Windows 11 VPN client for corporate access.\n\n### Step 1: Open VPN Settings\nGo to Settings -> Network & internet -> VPN. Click 'Add VPN'.\n\n### Step 2: Enter Server Details\nSelect 'Windows (built-in)' as the provider. Enter the connection name (e.g., 'Corporate VPN') and the Server name or address provided by IT.\n\n### Step 3: Connect and Authenticate\nEnter your domain credentials and approve the MFA prompt on your mobile device."
  },
]

export const CATEGORIES: Category[] = [
  {
    key: 'networking',
    label: 'Networking',
    icon: '🌐',
    color: '#1971C2',
    bgColor: '#E7F5FF',
    borderColor: '#74C0FC',
    articleCount: 2,
    description:
      'Articles covering network configuration, protocols, VPN, DNS, firewalls, and Wi-Fi troubleshooting',
    subcategories: [
      { name: 'DNS Configuration', count: 3 },
      { name: 'VPN Setup & Troubleshooting', count: 4 },
      { name: 'Firewall & Security', count: 2 },
      { name: 'Wi-Fi & Wireless', count: 5 },
      { name: 'IP Configuration', count: 3 },
      { name: 'LAN / WAN', count: 2 },
    ],
  },
  {
    key: 'hardware',
    label: 'Hardware',
    icon: '🖥️',
    color: '#D9480F',
    bgColor: '#FFF4E6',
    borderColor: '#FFA94D',
    articleCount: 1,
    description:
      'Guides for managing printers, servers, workstations, peripherals, and storage devices',
    subcategories: [
      { name: 'Printers & Scanners', count: 3 },
      { name: 'Storage Devices', count: 2 },
      { name: 'Peripherals', count: 1 },
      { name: 'Workstations', count: 2 },
      { name: 'Servers', count: 1 },
      { name: 'Network Hardware', count: 2 },
      { name: 'Monitors & Displays', count: 1 },
      { name: 'UPS & Power', count: 1 },
    ],
  },
  {
    key: 'software',
    label: 'Software',
    icon: '💾',
    color: '#2F9E44',
    bgColor: '#EBFBEE',
    borderColor: '#8CE99A',
    articleCount: 2,
    description:
      'Instructions for OS installation, application setup, licensing, and patch management',
    subcategories: [
      { name: 'Application Setup', count: 2 },
      { name: 'Authentication & Identity', count: 3 },
      { name: 'OS Management', count: 1 },
      { name: 'Licensing', count: 2 },
      { name: 'Security Software', count: 2 },
      { name: 'Collaboration Tools', count: 3 },
    ],
  },
  {
    key: 'troubleshooting',
    label: 'Troubleshooting',
    icon: '🔧',
    color: '#C92A2A',
    bgColor: '#FFF5F5',
    borderColor: '#FFA8A8',
    articleCount: 1,
    description:
      'Step-by-step guides for diagnosing and resolving common IT issues quickly',
    subcategories: [
      { name: 'BSOD & System Crashes', count: 1 },
      { name: 'Network Issues', count: 3 },
      { name: 'Hardware Failures', count: 2 },
      { name: 'Performance Issues', count: 2 },
      { name: 'Software Errors', count: 3 },
      { name: 'User Account Issues', count: 2 },
      { name: 'Email & Calendar Issues', count: 1 },
      { name: 'Printer Problems', count: 1 },
    ],
  },
]

export const ALL_TAGS = [
  'error', 'setup', 'beginner', 'urgent', 'network', 'windows',
  'linux', 'printer', 'vpn', 'dns', 'active-directory', 'performance',
  'security', 'update', 'patch', 'office365', 'password', 'bsod',
  'driver', 'remote',
]

export const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  error: { bg: 'bg-red-100', text: 'text-red-700' },
  urgent: { bg: 'bg-orange-100', text: 'text-orange-700' },
  setup: { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  beginner: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  network: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  windows: { bg: 'bg-blue-100', text: 'text-blue-700' },
  linux: { bg: 'bg-purple-100', text: 'text-purple-700' },
  printer: { bg: 'bg-rose-100', text: 'text-rose-700' },
  vpn: { bg: 'bg-green-100', text: 'text-green-700' },
  dns: { bg: 'bg-amber-100', text: 'text-amber-700' },
  'active-directory': { bg: 'bg-violet-100', text: 'text-violet-700' },
  performance: { bg: 'bg-teal-100', text: 'text-teal-700' },
  security: { bg: 'bg-red-100', text: 'text-red-700' },
  update: { bg: 'bg-sky-100', text: 'text-sky-700' },
  patch: { bg: 'bg-lime-100', text: 'text-lime-700' },
  office365: { bg: 'bg-orange-100', text: 'text-orange-700' },
  password: { bg: 'bg-pink-100', text: 'text-pink-700' },
  bsod: { bg: 'bg-slate-100', text: 'text-slate-700' },
  driver: { bg: 'bg-zinc-100', text: 'text-zinc-700' },
  remote: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  reset: { bg: 'bg-pink-100', text: 'text-pink-700' },
  troubleshooting: { bg: 'bg-red-100', text: 'text-red-700' },
  licensing: { bg: 'bg-amber-100', text: 'text-amber-700' },
}

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    name: 'draft',
    label: 'Draft',
    icon: '✏️',
    color: '#495057',
    bgColor: '#F1F3F5',
    borderColor: '#CED4DA',
    description:
      'The article is being actively written by the assigned author. Content may be incomplete, unverified, or in progress.',
    permissions: [
      'Author: Full edit access',
      'Reviewer: Read-only',
      'Admin: Full access',
    ],
    rules: [
      'Article exists in system but is not searchable by end-users',
      'Author can invite co-authors for collaboration',
      'All edits are tracked with timestamps',
      'Minimum content requirements must be met before promotion',
    ],
    actions: [
      { label: 'Submit for Review', variant: 'primary' },
      { label: 'Delete Article', variant: 'danger' },
    ],
  },
  {
    name: 'review',
    label: 'Review',
    icon: '🔍',
    color: '#E67700',
    bgColor: '#FFF9DB',
    borderColor: '#FFD43B',
    description:
      'A peer reviewer or Knowledge Manager is checking the article for accuracy, clarity, formatting compliance, and completeness.',
    permissions: [
      'Author: Read + respond to comments',
      'Reviewer: Full review access',
      'Admin: Full access',
    ],
    rules: [
      'Article is not yet published or searchable',
      'Reviewer may add inline comments and change requests',
      'Author receives notifications for feedback',
      'Reviewer must approve before article can be published',
      'Article can be sent back to Draft if major revisions needed',
    ],
    actions: [
      { label: 'Approve → Publish', variant: 'primary' },
      { label: 'Request Changes → Draft', variant: 'secondary' },
    ],
  },
  {
    name: 'published',
    label: 'Published',
    icon: '✅',
    color: '#2B8A3E',
    bgColor: '#EBFBEE',
    borderColor: '#69DB7C',
    description:
      'The article is live and fully accessible to all users. It is indexed by search, visible in category browsing, and available via API.',
    permissions: [
      'End Users: Read-only access',
      'Author: Can submit edits (creates new version)',
      'Admin: Can archive or force update',
    ],
    rules: [
      'Article is indexed in search engines and internal search',
      'Version is locked — edits create a new Draft version',
      'Analytics tracking is active (views, search hits, feedback)',
      'Scheduled reviews are set (e.g., every 6 months)',
      'Change log records all previous versions',
    ],
    actions: [
      { label: 'Create New Version → Draft', variant: 'primary' },
      { label: 'Archive Article', variant: 'secondary' },
    ],
  },
  {
    name: 'archived',
    label: 'Archived',
    icon: '🗄',
    color: '#495057',
    bgColor: '#F8F9FA',
    borderColor: '#DEE2E6',
    description:
      'The article has been retired from active use. It may be outdated, superseded, or no longer relevant. Archived articles are preserved for audit and compliance.',
    permissions: [
      'End Users: Not visible in search',
      'Author: Read-only',
      'Admin: Can restore or permanently delete',
    ],
    rules: [
      'Hidden from all user-facing search and browse views',
      'Retained for audit trail and compliance records',
      'All version history is preserved',
      'Can be restored to Published or Draft by an Admin',
      'Permanent deletion requires Admin approval + audit log entry',
    ],
    actions: [
      { label: 'Restore → Published', variant: 'primary' },
      { label: 'Permanently Delete', variant: 'danger' },
    ],
  },
]

export const COLLABORATION_ROLES: CollaborationRole[] = [
  {
    name: 'Author',
    colorClass: 'bg-indigo-50 border-indigo-300',
    responsibilities: [
      'Creates and writes articles',
      'Owns the Draft and submits for Review',
      'Responds to reviewer feedback',
      'Requests version updates to Published articles',
    ],
    permissions: [
      'Create/Edit own articles',
      'Submit for Review',
      'View all Published articles',
    ],
  },
  {
    name: 'Reviewer',
    colorClass: 'bg-yellow-50 border-yellow-300',
    responsibilities: [
      'Reviews articles for technical accuracy',
      'Checks formatting and style compliance',
      'Adds inline comments and change requests',
    ],
    permissions: [
      'Read articles in any status',
      'Approve/Reject Review submissions',
      'Add review comments',
    ],
  },
  {
    name: 'Admin / Knowledge Manager',
    colorClass: 'bg-purple-50 border-purple-300',
    responsibilities: [
      'Manages the overall knowledge structure',
      'Creates/modifies categories and subcategories',
      'Archives outdated articles',
      'Manages user roles and permissions',
      'Oversees compliance and audit logs',
    ],
    permissions: [
      'Full access to all articles and statuses',
      'Archive, restore, or delete articles',
      'Manage users and roles',
      'Export data and view audit logs',
    ],
  },
]

export const VERSION_ENTRIES: VersionEntry[] = [
  {
    tag: 'v1.0',
    variant: 'initial',
    title: 'Initial publication — first approved version of the article',
    trigger: 'Article moves from Review → Published for the first time',
  },
  {
    tag: 'v1.1, v1.2...',
    variant: 'minor',
    title: 'Minor update — spelling corrections, link fixes, small clarifications',
    trigger: 'Author submits a revision with reviewer approval',
  },
  {
    tag: 'v2.0',
    variant: 'major',
    title:
      'Major update — significant content changes, new sections, or restructured steps',
    trigger:
      'Author creates a new Draft from Published article with major revisions',
  },
  {
    tag: 'v2.1, v2.2...',
    variant: 'minor',
    title: 'Minor updates to the v2 major version',
    trigger: 'Same as v1.x but applied to v2.x baseline',
  },
]
