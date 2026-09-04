import React, { useState, useEffect } from 'react';
import { PortfolioTemplateId, DriveFile } from '../types';
import {
  X,
  HardDrive,
  Folder,
  FileText,
  FileSpreadsheet,
  File,
  Search,
  RefreshCw,
  Trash2,
  ExternalLink,
  FolderPlus,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Plus,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Lock
} from 'lucide-react';
import { auth, googleSignIn, getAccessToken, logout } from '../lib/firebase';
import {
  listDriveFiles,
  createDriveFolder,
  uploadDriveTextFile,
  deleteDriveFile,
  fetchDriveAbout,
  DriveAboutInfo
} from '../lib/googleDrive';
import { GoogleSignInButton } from './GoogleSignInButton';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentTemplate: PortfolioTemplateId;
  initialAuditToExport?: any;
}

export const GoogleDriveHubModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentTemplate,
  initialAuditToExport
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [driveAbout, setDriveAbout] = useState<DriveAboutInfo | null>(null);

  // Files state
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(undefined);
  const [currentFolderName, setCurrentFolderName] = useState<string>('My Drive');
  const [folderHistory, setFolderHistory] = useState<{ id?: string; name: string }[]>([
    { id: undefined, name: 'My Drive' }
  ]);

  // Action modals / state
  const [isCreatingFolder, setIsCreatingFolder] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>('SEOWebFly Growth Assets');
  const [isUploadingNote, setIsUploadingNote] = useState<boolean>(false);
  const [newNoteTitle, setNewNoteTitle] = useState<string>('SEO Strategy Brief');
  const [newNoteContent, setNewNoteContent] = useState<string>(
    '# SEOWebFly Strategic Growth Brief\n\n- Organic Traffic Expansion Targets: +300% YoY\n- Core Priority: Technical Web Vitals 95+ & Programmatic SEO\n- Status: In Progress'
  );

  // MANDATORY Destructive Operation Confirmation Dialog state
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Feedback notifications
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Check auth state on open
  useEffect(() => {
    if (!isOpen) return;

    const checkToken = async () => {
      setIsLoadingAuth(true);
      const token = await getAccessToken();
      const currentUser = auth.currentUser;

      if (token && currentUser) {
        setIsAuthenticated(true);
        loadDriveInfo();
        loadFiles();
      } else {
        setIsAuthenticated(false);
      }
      setIsLoadingAuth(false);
    };

    checkToken();
  }, [isOpen]);

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleSignIn = async () => {
    setIsLoadingAuth(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setIsAuthenticated(true);
        loadDriveInfo();
        loadFiles();
        showStatus('success', 'Connected to Google Drive successfully!');
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      showStatus('error', err.message || 'Failed to authenticate with Google Drive.');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const loadDriveInfo = async () => {
    const about = await fetchDriveAbout();
    if (about) {
      setDriveAbout(about);
    }
  };

  const loadFiles = async (folderId?: string, search?: string, filter?: string) => {
    setIsLoadingFiles(true);
    try {
      const result = await listDriveFiles({
        folderId: folderId ?? currentFolderId,
        searchTerm: search !== undefined ? search : searchTerm,
        mimeFilter: (filter !== undefined ? filter : filterType) === 'all' ? undefined : (filter || filterType),
      });
      setFiles(result.files);
    } catch (err: any) {
      console.error('Error listing files:', err);
      showStatus('error', err.message || 'Could not load Google Drive files.');
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleOpenFolder = (folder: DriveFile) => {
    const newHistory = [...folderHistory, { id: folder.id, name: folder.name }];
    setFolderHistory(newHistory);
    setCurrentFolderId(folder.id);
    setCurrentFolderName(folder.name);
    loadFiles(folder.id, searchTerm, filterType);
  };

  const handleNavigateHistory = (index: number) => {
    const target = folderHistory[index];
    const newHistory = folderHistory.slice(0, index + 1);
    setFolderHistory(newHistory);
    setCurrentFolderId(target.id);
    setCurrentFolderName(target.name);
    loadFiles(target.id, searchTerm, filterType);
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    try {
      const created = await createDriveFolder(newFolderName.trim(), currentFolderId);
      setIsCreatingFolder(false);
      setNewFolderName('');
      showStatus('success', `Created folder "${created.name}" in Google Drive.`);
      loadFiles();
    } catch (err: any) {
      console.error('Error creating folder:', err);
      showStatus('error', err.message || 'Failed to create folder.');
    }
  };

  const handleUploadNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;

    try {
      const fileName = newNoteTitle.endsWith('.md') ? newNoteTitle : `${newNoteTitle}.md`;
      const uploaded = await uploadDriveTextFile(fileName, newNoteContent, 'text/markdown', currentFolderId);
      setIsUploadingNote(false);
      setNewNoteTitle('');
      setNewNoteContent('');
      showStatus('success', `Exported "${uploaded.name}" directly to Google Drive!`);
      loadFiles();
    } catch (err: any) {
      console.error('Error uploading file:', err);
      showStatus('error', err.message || 'Failed to upload document.');
    }
  };

  // Explicit confirmation dialog handler for file deletion
  const handleConfirmDelete = async () => {
    if (!fileToDelete) return;
    setIsDeleting(true);

    try {
      await deleteDriveFile(fileToDelete.id);
      showStatus('success', `Removed "${fileToDelete.name}" from Google Drive.`);
      setFileToDelete(null);
      loadFiles();
    } catch (err: any) {
      console.error('Error deleting file:', err);
      showStatus('error', err.message || 'Failed to delete file.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  const formatFileSize = (bytes?: string) => {
    if (!bytes) return '—';
    const num = parseInt(bytes, 10);
    if (isNaN(num)) return '—';
    if (num < 1024) return `${num} B`;
    if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
    return `${(num / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '—';
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return '—';
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('folder')) {
      return <Folder className="w-5 h-5 text-teal-400" />;
    }
    if (mimeType.includes('spreadsheet') || mimeType.includes('csv')) {
      return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
    }
    if (mimeType.includes('document') || mimeType.includes('text') || mimeType.includes('markdown')) {
      return <FileText className="w-5 h-5 text-cyan-400" />;
    }
    return <File className="w-5 h-5 text-slate-400" />;
  };

  return (
    <div
      id="google-drive-hub-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-5xl bg-[#0F1015] border border-[#1E202D] rounded-2xl shadow-2xl overflow-hidden text-[#E2E8F0] my-8 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E202D] bg-[#0A0A0B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-space text-white tracking-tight">
                  Google Drive Workspace Hub
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/30">
                  Google Workspace
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Direct access to client deliverables, SEO roadmaps, and instant export audits
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              id="drive-modal-close-btn"
              className="w-8 h-8 rounded-lg bg-[#181A24] hover:bg-[#202330] text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-[#2A2D3D]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Notification Toast */}
        {statusMessage && (
          <div
            className={`px-6 py-2.5 text-xs font-medium flex items-center gap-2 border-b ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40'
                : 'bg-red-950/60 text-red-300 border-red-800/40'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {!isAuthenticated ? (
            /* Unauthenticated View: Connect Google Drive with official Google button */
            <div className="py-12 px-4 max-w-lg mx-auto text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#12131A] border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-xl">
                <HardDrive className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold font-space text-white">
                  Connect Your Google Drive
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Sign in with your Google account to browse SEO deliverables, access keyword performance reports, and 1-click export your Gemini AI site audits directly into your Google Drive storage.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#12131A] border border-[#1E202D] text-left space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-teal-300 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Configured Workspace Permissions</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  With your permission, this integration allows viewing and saving SEO strategy documents, audits, and deliverables directly within your Google Drive account.
                </p>
              </div>

              <div className="pt-2 flex justify-center">
                <GoogleSignInButton
                  onClick={handleSignIn}
                  isLoading={isLoadingAuth}
                  text="Connect with Google Drive"
                  className="w-full max-w-xs justify-center"
                />
              </div>
            </div>
          ) : (
            /* Authenticated View: Drive Explorer, Quota, Tools */
            <div className="space-y-6">
              
              {/* Account & Storage Info Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#12131A] border border-[#1E202D]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center font-bold text-white text-sm shadow">
                    {driveAbout?.user?.displayName ? driveAbout.user.displayName.charAt(0) : 'U'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{driveAbout?.user?.displayName || auth.currentUser?.displayName || 'Google Drive User'}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {driveAbout?.user?.emailAddress || auth.currentUser?.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setIsCreatingFolder(true)}
                    id="drive-create-folder-btn"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1A1C28] hover:bg-[#222536] text-teal-300 border border-teal-500/30 transition-all cursor-pointer"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>New Folder</span>
                  </button>

                  <button
                    onClick={() => setIsUploadingNote(true)}
                    id="drive-upload-doc-btn"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#006a66] to-[#008f89] hover:from-[#34a29d] hover:to-[#006a66] text-white border border-teal-400/30 transition-all cursor-pointer shadow"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Create / Save Doc</span>
                  </button>

                  <button
                    onClick={() => loadFiles()}
                    title="Refresh Files"
                    disabled={isLoadingFiles}
                    id="drive-refresh-btn"
                    className="p-1.5 rounded-lg bg-[#181A24] hover:bg-[#202330] text-slate-400 hover:text-white transition-colors border border-[#2A2D3D]"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Breadcrumb Navigation & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                {/* Folder Breadcrumb */}
                <div className="flex items-center gap-1 text-xs text-slate-400 overflow-x-auto py-1">
                  {folderHistory.map((item, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <span className="text-slate-600">/</span>}
                      <button
                        onClick={() => handleNavigateHistory(index)}
                        className={`hover:text-teal-300 transition-colors whitespace-nowrap ${
                          index === folderHistory.length - 1 ? 'font-bold text-white' : ''
                        }`}
                      >
                        {item.name}
                      </button>
                    </React.Fragment>
                  ))}
                </div>

                {/* Filter Tabs & Search */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative flex-1 sm:w-48">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search Drive files..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        loadFiles(currentFolderId, e.target.value, filterType);
                      }}
                      className="w-full bg-[#12131A] border border-[#1E202D] rounded-lg pl-8 pr-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <select
                    value={filterType}
                    onChange={(e) => {
                      setFilterType(e.target.value);
                      loadFiles(currentFolderId, searchTerm, e.target.value);
                    }}
                    className="bg-[#12131A] border border-[#1E202D] rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-teal-400"
                  >
                    <option value="all">All Files</option>
                    <option value="docs">Docs & Markdown</option>
                    <option value="sheets">Sheets & CSV</option>
                    <option value="folders">Folders Only</option>
                    <option value="pdfs">PDFs</option>
                  </select>
                </div>
              </div>

              {/* Files Table / List */}
              <div className="border border-[#1E202D] rounded-xl overflow-hidden bg-[#0A0A0B]">
                {isLoadingFiles ? (
                  <div className="py-16 text-center space-y-3">
                    <Loader2 className="w-8 h-8 text-teal-400 animate-spin mx-auto" />
                    <p className="text-xs text-slate-400">Loading files from Google Drive...</p>
                  </div>
                ) : files.length === 0 ? (
                  <div className="py-16 text-center space-y-3 px-4">
                    <Folder className="w-10 h-10 text-slate-600 mx-auto" />
                    <div className="text-sm font-semibold text-slate-300">No files found</div>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      This folder is empty or no files match your search filter. Create a folder or save an SEO brief to get started.
                    </p>
                    <button
                      onClick={() => setIsUploadingNote(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 text-teal-300 border border-teal-500/30 rounded-lg text-xs font-semibold hover:bg-teal-500/20 transition-all cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Save First Deliverable</span>
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-[#1E202D]">
                    <div className="grid grid-cols-12 px-4 py-2.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-[#0d0f15]">
                      <div className="col-span-6 sm:col-span-6">Name</div>
                      <div className="col-span-3 sm:col-span-3">Modified</div>
                      <div className="col-span-3 sm:col-span-3 text-right">Actions</div>
                    </div>

                    {files.map((file) => {
                      const isFolder = file.mimeType === 'application/vnd.google-apps.folder';

                      return (
                        <div
                          key={file.id}
                          className="grid grid-cols-12 px-4 py-3 items-center text-xs hover:bg-[#12131A] transition-colors group"
                        >
                          {/* File Name & Icon */}
                          <div className="col-span-6 sm:col-span-6 flex items-center gap-2.5 min-w-0 pr-2">
                            <div className="shrink-0">{getFileIcon(file.mimeType)}</div>
                            <div className="truncate min-w-0">
                              {isFolder ? (
                                <button
                                  onClick={() => handleOpenFolder(file)}
                                  className="font-medium text-white hover:text-teal-300 transition-colors truncate block text-left cursor-pointer"
                                >
                                  {file.name}
                                </button>
                              ) : (
                                <span className="text-slate-200 truncate block">{file.name}</span>
                              )}
                              <span className="text-[10px] text-slate-500 block">
                                {isFolder ? 'Folder' : formatFileSize(file.size)}
                              </span>
                            </div>
                          </div>

                          {/* Modified Date */}
                          <div className="col-span-3 sm:col-span-3 text-slate-400 text-[11px]">
                            {formatDate(file.modifiedTime)}
                          </div>

                          {/* Action Buttons */}
                          <div className="col-span-3 sm:col-span-3 flex items-center justify-end gap-2">
                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Open in Google Drive"
                                className="p-1.5 rounded-lg bg-[#181A24] hover:bg-teal-500/20 text-slate-400 hover:text-teal-300 transition-all border border-[#2A2D3D]"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}

                            {/* Delete Button triggering MANDATORY explicit confirmation dialog */}
                            <button
                              onClick={() => setFileToDelete(file)}
                              title="Delete File (requires confirmation)"
                              id={`delete-file-${file.id}`}
                              className="p-1.5 rounded-lg bg-[#181A24] hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all border border-[#2A2D3D] cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Create Folder Modal Overlay */}
        {isCreatingFolder && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 flex items-center justify-center p-4">
            <form
              onSubmit={handleCreateFolder}
              className="bg-[#12131A] border border-[#1E202D] rounded-xl p-6 w-full max-w-md space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#1E202D] pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <FolderPlus className="w-4 h-4 text-teal-400" />
                  <span>Create New Folder in Drive</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreatingFolder(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Folder Name</label>
                <input
                  type="text"
                  required
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="e.g. SEOWebFly Q3 Deliverables"
                  className="w-full bg-[#0A0A0B] border border-[#1E202D] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingFolder(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs transition-all shadow"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Upload / Save Document Modal Overlay */}
        {isUploadingNote && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 flex items-center justify-center p-4">
            <form
              onSubmit={handleUploadNote}
              className="bg-[#12131A] border border-[#1E202D] rounded-xl p-6 w-full max-w-lg space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#1E202D] pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Export Document to Google Drive</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsUploadingNote(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Document File Name</label>
                <input
                  type="text"
                  required
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="e.g. Technical SEO Audit - Q3.md"
                  className="w-full bg-[#0A0A0B] border border-[#1E202D] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Content (Markdown / Text)</label>
                <textarea
                  rows={6}
                  required
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#1E202D] rounded-lg p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-teal-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadingNote(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs transition-all shadow"
                >
                  Save to Google Drive
                </button>
              </div>
            </form>
          </div>
        )}

        {/* MANDATORY EXPLICIT CONFIRMATION DIALOG FOR DESTRUCTIVE OPERATIONS */}
        {fileToDelete && (
          <div
            id="drive-delete-confirmation-dialog"
            className="absolute inset-0 bg-black/85 backdrop-blur-sm z-40 flex items-center justify-center p-4"
          >
            <div className="bg-[#12131A] border border-red-500/30 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 text-red-400">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Delete File from Google Drive?</h4>
                  <p className="text-xs text-slate-400">This action cannot be undone.</p>
                </div>
              </div>

              <div className="p-3 bg-[#0A0A0B] rounded-xl border border-[#1E202D] space-y-1 text-xs">
                <div className="text-slate-400">Target Item:</div>
                <div className="font-semibold text-white break-all flex items-center gap-2">
                  <File className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{fileToDelete.name}</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Type: {fileToDelete.mimeType}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Are you sure you want to permanently remove this file from your Google Drive account?
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setFileToDelete(null)}
                  disabled={isDeleting}
                  id="cancel-delete-btn"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#181A24] hover:bg-[#202330] border border-[#2A2D3D] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  id="confirm-delete-btn"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition-colors shadow flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Confirm & Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
