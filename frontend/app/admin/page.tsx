'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, FolderOpen, Wrench, Trash2, Check, LogOut, RefreshCw, MailOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/toast'

const API = process.env.NEXT_PUBLIC_API_URL
const getToken = () => {
  if (typeof document === 'undefined') return ''
  return document.cookie.split('; ').find(r => r.startsWith('admin_token='))?.split('=')[1] ?? ''
}
const headers = () => ({ 'Content-Type': 'application/json', 'x-admin-token': getToken() })

type Tab = 'messages' | 'projects' | 'skills'

interface Message { id: number; name: string; email: string; subject: string; message: string; read: number; created_at: string }
interface Project { id: number; title: string; description: string; category: string; technologies: string; github: string; live: string; featured: number; overview: string; problem: string; solution: string }
interface Skill { id: number; name: string; category: string; description: string }

export default function AdminDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [tab, setTab] = useState<Tab>('messages')
  const [messages, setMessages] = useState<Message[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)

  const fetchData = useCallback(async (t: Tab) => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/admin/${t}`, { headers: headers() })
      if (!res.ok) { router.push('/admin/login'); return }
      const data = await res.json()
      if (t === 'messages') setMessages(data)
      if (t === 'projects') setProjects(data.map((p: Project) => ({ ...p, technologies: typeof p.technologies === 'string' ? p.technologies : JSON.stringify(p.technologies) })))
      if (t === 'skills') setSkills(data)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { fetchData(tab) }, [tab, fetchData])

  async function deleteMessage(id: number) {
    await fetch(`${API}/api/admin/messages/${id}`, { method: 'DELETE', headers: headers() })
    setMessages(prev => prev.filter(m => m.id !== id))
    toast('success', 'Message deleted')
  }

  async function markRead(id: number) {
    await fetch(`${API}/api/admin/messages/${id}/read`, { method: 'PATCH', headers: headers() })
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: 1 } : m))
  }

  async function saveProject() {
    if (!editingProject) return
    const body = { ...editingProject, technologies: JSON.parse(editingProject.technologies || '[]') }
    const res = await fetch(`${API}/api/admin/projects/${editingProject.id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(body) })
    if (res.ok) { toast('success', 'Project saved'); setEditingProject(null); fetchData('projects') }
    else toast('error', 'Failed to save')
  }

  async function saveSkill() {
    if (!editingSkill) return
    const res = await fetch(`${API}/api/admin/skills/${editingSkill.id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(editingSkill) })
    if (res.ok) { toast('success', 'Skill saved'); setEditingSkill(null); fetchData('skills') }
    else toast('error', 'Failed to save')
  }

  async function deleteSkill(id: number) {
    await fetch(`${API}/api/admin/skills/${id}`, { method: 'DELETE', headers: headers() })
    setSkills(prev => prev.filter(s => s.id !== id))
    toast('success', 'Skill deleted')
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { key: 'messages', label: 'Messages', icon: <Mail className="size-4" />, count: messages.filter(m => !m.read).length || undefined },
    { key: 'projects', label: 'Projects', icon: <FolderOpen className="size-4" /> },
    { key: 'skills', label: 'Skills', icon: <Wrench className="size-4" /> },
  ]

  return (
    <div className="min-h-screen px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">Admin</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground">Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => fetchData(tab)} className="flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent">
              <RefreshCw className="size-4" />
            </button>
            <button onClick={logout} className="flex items-center gap-2 border border-border px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent">
              <LogOut className="size-3.5" /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 border-b border-border">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative flex items-center gap-2 px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${tab === t.key ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {t.icon}{t.label}
              {t.count ? <span className="flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">{t.count}</span> : null}
              {tab === t.key && <motion.div layoutId="admin-tab" className="absolute inset-x-0 -bottom-px h-px bg-accent" />}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center text-muted-foreground">
            <RefreshCw className="size-5 animate-spin" />
          </div>
        ) : (
          <>
            {/* Messages */}
            {tab === 'messages' && (
              <div className="flex flex-col gap-3">
                {messages.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No messages yet.</p>}
                {messages.map(m => (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={`border p-5 transition-colors ${m.read ? 'border-border bg-card/20' : 'border-accent/30 bg-accent/[0.04]'}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {!m.read && <span className="size-1.5 rounded-full bg-accent" />}
                          <p className="font-medium text-foreground">{m.name}</p>
                          <span className="font-mono text-xs text-muted-foreground">{m.email}</span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-foreground">{m.subject}</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{m.message}</p>
                        <p className="mt-3 font-mono text-[10px] text-muted-foreground/60">{new Date(m.created_at).toLocaleString()}</p>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        {!m.read && (
                          <button onClick={() => markRead(m.id)} title="Mark as read" className="flex size-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent">
                            <MailOpen className="size-3.5" />
                          </button>
                        )}
                        <button onClick={() => deleteMessage(m.id)} title="Delete" className="flex size-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive">
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Projects */}
            {tab === 'projects' && (
              <div className="flex flex-col gap-3">
                {projects.map(p => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="border border-border bg-card/20 p-5"
                  >
                    {editingProject?.id === p.id ? (
                      <div className="flex flex-col gap-3">
                        <EditField label="Title" value={editingProject.title} onChange={v => setEditingProject(e => e && ({ ...e, title: v }))} />
                        <EditField label="Description" value={editingProject.description} onChange={v => setEditingProject(e => e && ({ ...e, description: v }))} textarea />
                        <EditField label="Category" value={editingProject.category} onChange={v => setEditingProject(e => e && ({ ...e, category: v }))} />
                        <EditField label='Technologies (JSON array e.g. ["React","Node.js"])' value={editingProject.technologies} onChange={v => setEditingProject(e => e && ({ ...e, technologies: v }))} />
                        <EditField label="GitHub URL" value={editingProject.github ?? ''} onChange={v => setEditingProject(e => e && ({ ...e, github: v }))} />
                        <EditField label="Live URL" value={editingProject.live ?? ''} onChange={v => setEditingProject(e => e && ({ ...e, live: v }))} />
                        <EditField label="Overview" value={editingProject.overview ?? ''} onChange={v => setEditingProject(e => e && ({ ...e, overview: v }))} textarea />
                        <EditField label="Problem" value={editingProject.problem ?? ''} onChange={v => setEditingProject(e => e && ({ ...e, problem: v }))} textarea />
                        <EditField label="Solution" value={editingProject.solution ?? ''} onChange={v => setEditingProject(e => e && ({ ...e, solution: v }))} textarea />
                        <div className="flex gap-2 pt-2">
                          <button onClick={saveProject} className="flex items-center gap-2 bg-accent px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-accent-foreground hover:bg-accent/90">
                            <Check className="size-3.5" /> Save
                          </button>
                          <button onClick={() => setEditingProject(null)} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium text-foreground">{p.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{p.category}</p>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                        </div>
                        <button onClick={() => setEditingProject(p)} className="shrink-0 border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent">
                          Edit
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Skills */}
            {tab === 'skills' && (
              <div className="grid gap-3 sm:grid-cols-2">
                {skills.map(s => (
                  <motion.div key={s.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="border border-border bg-card/20 p-4"
                  >
                    {editingSkill?.id === s.id ? (
                      <div className="flex flex-col gap-3">
                        <EditField label="Name" value={editingSkill.name} onChange={v => setEditingSkill(e => e && ({ ...e, name: v }))} />
                        <EditField label="Category" value={editingSkill.category} onChange={v => setEditingSkill(e => e && ({ ...e, category: v }))} />
                        <EditField label="Description" value={editingSkill.description} onChange={v => setEditingSkill(e => e && ({ ...e, description: v }))} />
                        <div className="flex gap-2 pt-1">
                          <button onClick={saveSkill} className="flex items-center gap-2 bg-accent px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-accent-foreground hover:bg-accent/90">
                            <Check className="size-3" /> Save
                          </button>
                          <button onClick={() => setEditingSkill(null)} className="border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-foreground">{s.name}</p>
                          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">{s.category}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{s.description}</p>
                        </div>
                        <div className="flex shrink-0 gap-1">
                          <button onClick={() => setEditingSkill(s)} className="border border-border px-2.5 py-1 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent">
                            Edit
                          </button>
                          <button onClick={() => deleteSkill(s.id)} className="flex size-7 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive">
                            <Trash2 className="size-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function EditField({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3}
          className="w-full resize-y border border-input bg-transparent px-3 py-2 text-sm text-foreground outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent/20" />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)}
          className="min-h-9 w-full border border-input bg-transparent px-3 text-sm text-foreground outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent/20" />
      )}
    </div>
  )
}
