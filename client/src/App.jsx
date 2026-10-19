import { useEffect, useMemo, useState } from 'react'
import {
  Shield, Code2, Terminal, Database, Globe, BookOpen, Trophy, LogOut,
  Menu, X, Search, CheckCircle2, Circle, LockKeyhole, ArrowRight, Play,
  LayoutDashboard, UserRound, ChevronRight, Flame, Clock3, Sparkles
} from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const fallbackCourses = [
  { id:'ethical-hacking', title:'Ethical Hacking', category:'Cybersecurity', level:'Beginner → Advanced', icon:'shield', description:'Learn security foundations, networking, Linux, and web security in authorized labs.', lessons:[
    {id:'eh1',title:'Introduction to Ethical Hacking',duration:'12 min',level:'Beginner',summary:'Understand ethical hacking, permission, scope, and responsible disclosure.'},
    {id:'eh2',title:'Computer & Operating System Basics',duration:'18 min',level:'Beginner',summary:'Learn operating systems, files, processes, and the command line.'},
    {id:'eh3',title:'Networking Fundamentals',duration:'22 min',level:'Beginner',summary:'Explore IP addresses, DNS, HTTP/HTTPS, ports, and protocols.'},
    {id:'eh4',title:'Linux Command Line',duration:'20 min',level:'Beginner',summary:'Practice navigation, files, permissions, and processes in a safe environment.'},
    {id:'eh5',title:'Security Fundamentals',duration:'24 min',level:'Intermediate',summary:'Learn authentication, authorization, encryption, hashing, and risk.'},
    {id:'eh6',title:'Web Security & OWASP',duration:'30 min',level:'Intermediate',summary:'Study common web risks using intentionally vulnerable training apps only.'},
  ]},
  { id:'python', title:'Python', category:'Programming', level:'Beginner → Advanced', icon:'code', description:'Build a strong Python foundation and progress to automation and projects.', lessons:[
    {id:'py1',title:'Python: First Steps',duration:'10 min',level:'Beginner',summary:'What Python is, where it is used, and how a program runs.'},
    {id:'py2',title:'Variables & Data Types',duration:'16 min',level:'Beginner',summary:'Store text, numbers, booleans, and understand basic types.'},
    {id:'py3',title:'Input, Output & Operators',duration:'14 min',level:'Beginner',summary:'Read input, display output, and work with operators.'},
    {id:'py4',title:'Conditions & Loops',duration:'22 min',level:'Beginner',summary:'Use if/elif/else, for loops, and while loops.'},
    {id:'py5',title:'Functions & Collections',duration:'28 min',level:'Intermediate',summary:'Create reusable functions and work with lists and dictionaries.'},
    {id:'py6',title:'Files, Errors & Projects',duration:'30 min',level:'Intermediate',summary:'Read files, handle exceptions, and build a small project.'},
  ]},
  { id:'web-dev', title:'HTML & CSS', category:'Web Development', level:'Beginner → Intermediate', icon:'globe', description:'Create accessible, responsive websites from the ground up.', lessons:[
    {id:'web1',title:'How the Web Works',duration:'10 min',level:'Beginner',summary:'Understand browsers, websites, URLs, and HTML documents.'},
    {id:'web2',title:'HTML Elements & Forms',duration:'20 min',level:'Beginner',summary:'Build page structure with semantic elements, links, and forms.'},
    {id:'web3',title:'CSS Fundamentals',duration:'24 min',level:'Beginner',summary:'Style text, colors, spacing, borders, and layouts.'},
    {id:'web4',title:'Flexbox, Grid & Responsive Design',duration:'30 min',level:'Intermediate',summary:'Create layouts that adapt to different screen sizes.'},
  ]},
  { id:'javascript', title:'JavaScript', category:'Programming', level:'Beginner → Advanced', icon:'code', description:'Add interactivity and learn modern JavaScript fundamentals.', lessons:[
    {id:'js1',title:'JavaScript Basics',duration:'16 min',level:'Beginner',summary:'Variables, values, operators, and expressions.'},
    {id:'js2',title:'Functions & Arrays',duration:'22 min',level:'Beginner',summary:'Write functions and manipulate arrays and objects.'},
    {id:'js3',title:'DOM & Events',duration:'25 min',level:'Intermediate',summary:'Respond to user actions and update web pages.'},
    {id:'js4',title:'Async JavaScript & APIs',duration:'30 min',level:'Intermediate',summary:'Learn promises, async/await, and fetch.'},
  ]},
  { id:'java', title:'Java', category:'Programming', level:'Beginner → Advanced', icon:'code', description:'Learn object-oriented programming and build Java applications.', lessons:[
    {id:'ja1',title:'Java Setup & First Program',duration:'15 min',level:'Beginner',summary:'Understand the JDK and create your first Java program.'},
    {id:'ja2',title:'Types, Conditions & Loops',duration:'22 min',level:'Beginner',summary:'Work with variables, branching, and iteration.'},
    {id:'ja3',title:'Object-Oriented Programming',duration:'30 min',level:'Intermediate',summary:'Learn classes, objects, inheritance, and encapsulation.'},
  ]},
  { id:'sql', title:'SQL & Databases', category:'Database', level:'Beginner → Intermediate', icon:'database', description:'Query data, connect tables, and understand relational databases.', lessons:[
    {id:'sql1',title:'Database Fundamentals',duration:'12 min',level:'Beginner',summary:'Tables, rows, columns, keys, and relational data.'},
    {id:'sql2',title:'SELECT, WHERE & ORDER BY',duration:'18 min',level:'Beginner',summary:'Retrieve, filter, and sort records.'},
    {id:'sql3',title:'JOINs & Aggregations',duration:'26 min',level:'Intermediate',summary:'Combine related tables and summarize results.'},
  ]},
  { id:'linux', title:'Linux', category:'Operating Systems', level:'Beginner → Intermediate', icon:'terminal', description:'Practice Linux fundamentals and system administration basics.', lessons:[
    {id:'li1',title:'Linux Basics',duration:'14 min',level:'Beginner',summary:'Understand distributions, shell, and filesystem structure.'},
    {id:'li2',title:'Commands & Permissions',duration:'22 min',level:'Beginner',summary:'Navigate directories, manage files, and inspect permissions.'},
    {id:'li3',title:'Processes & Services',duration:'24 min',level:'Intermediate',summary:'Inspect processes and understand services safely.'},
  ]},
  { id:'networking', title:'Networking', category:'Cybersecurity', level:'Beginner → Intermediate', icon:'globe', description:'Learn the core concepts behind modern computer networks.', lessons:[
    {id:'net1',title:'Network Models',duration:'16 min',level:'Beginner',summary:'Understand LAN, WAN, and the OSI/TCP-IP models.'},
    {id:'net2',title:'IP, DNS & Ports',duration:'20 min',level:'Beginner',summary:'Learn addressing, name resolution, and common ports.'},
    {id:'net3',title:'HTTP, TLS & Troubleshooting',duration:'25 min',level:'Intermediate',summary:'Understand web traffic and basic diagnostics.'},
  ]},
]

const iconFor = (name) => {
  const props = { size:22, strokeWidth:1.8 }
  if (name === 'shield') return <Shield {...props}/>
  if (name === 'terminal') return <Terminal {...props}/>
  if (name === 'database') return <Database {...props}/>
  if (name === 'globe') return <Globe {...props}/>
  return <Code2 {...props}/>
}

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('cybernex_token') || '')
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cybernex_user') || 'null') } catch { return null }
  })
  const [page, setPage] = useState('dashboard')
  const [activeCourse, setActiveCourse] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)
  const [courses, setCourses] = useState(fallbackCourses)
  const [progress, setProgress] = useState({})
  const [search, setSearch] = useState('')
  const [authMode, setAuthMode] = useState('login')
  const [authForm, setAuthForm] = useState({name:'',email:'',password:''})
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    fetch(`${API}/courses`).then(r => r.ok ? r.json() : Promise.reject()).then(data => {
      if (Array.isArray(data) && data.length) setCourses(data)
    }).catch(() => {})
  }, [])

  useEffect(() => {
    if (!token) return
    fetch(`${API}/progress`, {headers:{Authorization:`Bearer ${token}`}})
      .then(r => r.ok ? r.json() : Promise.reject()).then(setProgress).catch(() => {})
  }, [token])

  const allLessons = courses.reduce((sum,c) => sum + (c.lessons?.length || 0), 0)
  const completedCount = Object.values(progress).filter(Boolean).length
  const overall = allLessons ? Math.round(completedCount / allLessons * 100) : 0
  const filteredCourses = useMemo(() => courses.filter(c =>
    `${c.title} ${c.category} ${c.description}`.toLowerCase().includes(search.toLowerCase())
  ), [courses, search])

  async function handleAuth(e) {
    e.preventDefault(); setAuthError(''); setLoading(true)
    try {
      const endpoint = authMode === 'login' ? '/auth/login' : '/auth/register'
      const res = await fetch(`${API}${endpoint}`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify(authForm)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not sign in.')
      localStorage.setItem('cybernex_token', data.token)
      localStorage.setItem('cybernex_user', JSON.stringify(data.user))
      setToken(data.token); setUser(data.user); setPage('dashboard')
    } catch (err) {
      setAuthError(`${err.message}. Is the backend running on port 5000?`)
    } finally { setLoading(false) }
  }

  function logout() {
    localStorage.removeItem('cybernex_token'); localStorage.removeItem('cybernex_user')
    setToken(''); setUser(null); setProgress({}); setPage('dashboard')
  }

  async function completeLesson(course, lesson) {
    if (!token) { setNotice('Log in to save your learning progress.'); return }
    try {
      const res = await fetch(`${API}/progress/${encodeURIComponent(lesson.id)}`, {
        method:'POST', headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},
        body:JSON.stringify({courseId:course.id})
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to save progress')
      setProgress(data.progress)
      setNotice('Lesson completed — progress saved!')
    } catch (err) { setNotice(`${err.message}. Check that the backend is running.`) }
  }

  function openCourse(course) {
    setActiveCourse(course); setActiveLesson(null); setPage('course'); setMobileNav(false)
  }

  const navItems = [
    {id:'dashboard',label:'Dashboard',icon:<LayoutDashboard size={18}/>},
    {id:'courses',label:'Explore Courses',icon:<BookOpen size={18}/>},
    {id:'progress',label:'My Progress',icon:<Trophy size={18}/>},
  ]

  if (!token || !user) return (
    <div className="auth-shell">
      <div className="auth-left">
        <div className="brand"><span className="brand-mark"><Shield size={24}/></span><span>CYBERNEX<span className="brand-light"> ACADEMY</span></span></div>
        <div className="auth-copy">
          <div className="eyebrow"><span className="pulse-dot"></span> YOUR LEARNING JOURNEY STARTS HERE</div>
          <h1>Learn skills.<br/><span>Build your future.</span></h1>
          <p>One learning platform for cybersecurity, programming, and practical projects — from your first lesson to your next milestone.</p>
          <div className="auth-points">
            <div><CheckCircle2 size={17}/> Structured learning roadmaps</div>
            <div><CheckCircle2 size={17}/> Lessons, quizzes and practical tasks</div>
            <div><CheckCircle2 size={17}/> Track progress as you learn</div>
          </div>
        </div>
        <div className="auth-footer">LEARN ETHICALLY. BUILD CONFIDENTLY. <span>© 2026 CYBERNEX</span></div>
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <div className="mobile-brand brand"><span className="brand-mark"><Shield size={22}/></span><span>CYBERNEX<span className="brand-light"> ACADEMY</span></span></div>
          <div className="auth-heading"><div className="eyebrow">MEMBER ACCESS</div><h2>{authMode === 'login' ? 'Welcome back' : 'Create your account'}</h2><p>{authMode === 'login' ? 'Sign in to continue your learning journey.' : 'Join the academy and start learning today.'}</p></div>
          <form onSubmit={handleAuth}>
            {authMode === 'register' && <label>Full name<input required minLength="2" placeholder="Your name" value={authForm.name} onChange={e=>setAuthForm({...authForm,name:e.target.value})}/></label>}
            <label>Email address<input type="email" required placeholder="you@example.com" value={authForm.email} onChange={e=>setAuthForm({...authForm,email:e.target.value})}/></label>
            <label>Password<input type="password" required minLength="8" placeholder="At least 8 characters" value={authForm.password} onChange={e=>setAuthForm({...authForm,password:e.target.value})}/></label>
            {authError && <div className="error-box">{authError}</div>}
            <button className="primary-btn full-btn" disabled={loading}>{loading ? 'Please wait…' : authMode === 'login' ? 'Sign in' : 'Create account'} <ArrowRight size={17}/></button>
          </form>
          <div className="auth-switch">{authMode === 'login' ? "Don't have an account?" : 'Already have an account?'} <button onClick={()=>{setAuthMode(authMode==='login'?'register':'login');setAuthError('')}}>{authMode === 'login' ? 'Create account' : 'Sign in'}</button></div>
          <div className="auth-security"><LockKeyhole size={14}/> Your password is hashed by the backend before storage.</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav?'sidebar-open':''}`}>
        <div className="brand sidebar-brand"><span className="brand-mark"><Shield size={22}/></span><span>CYBERNEX<span className="brand-light"> ACADEMY</span></span><button className="close-nav" onClick={()=>setMobileNav(false)}><X size={18}/></button></div>
        <div className="side-label">LEARNING SPACE</div>
        <nav>{navItems.map(n=><button key={n.id} className={`nav-item ${page===n.id?'active':''}`} onClick={()=>{setPage(n.id);setActiveLesson(null);setMobileNav(false)}}>{n.icon}<span>{n.label}</span>{page===n.id&&<span className="nav-active-mark"/>}</button>)}</nav>
        <div className="side-label section-label">COURSE CATEGORIES</div>
        <nav>{[
          {id:'ethical-hacking',label:'Ethical Hacking',icon:<Shield size={18}/>},
          {id:'programming',label:'Programming',icon:<Code2 size={18}/>},
          {id:'web',label:'Web Development',icon:<Globe size={18}/>},
          {id:'database',label:'Database & SQL',icon:<Database size={18}/>},
          {id:'linux',label:'Linux & Systems',icon:<Terminal size={18}/>},
        ].map(n=><button key={n.id} className="nav-item" onClick={()=>{setPage('courses');setSearch(n.id==='ethical-hacking'?'Ethical Hacking':n.id==='programming'?'Python':n.id==='web'?'HTML':n.id==='database'?'SQL':'Linux');setMobileNav(false)}}>{n.icon}<span>{n.label}</span></button>)}</nav>
        <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><Sparkles size={18}/></div><b>Keep learning</b><p>Small steps every day lead to big progress.</p></div><div className="profile-mini"><div className="avatar">{user.name?.slice(0,1).toUpperCase() || 'U'}</div><div className="profile-info"><b>{user.name}</b><span>{user.email}</span></div><button className="icon-btn" title="Log out" onClick={logout}><LogOut size={17}/></button></div></div>
      </aside>
      {mobileNav && <div className="nav-scrim" onClick={()=>setMobileNav(false)}/>}
      <main className="main-area">
        <header className="topbar"><button className="mobile-menu icon-btn" onClick={()=>setMobileNav(true)}><Menu size={20}/></button><div className="breadcrumb">Academy <ChevronRight size={14}/> <span>{page==='dashboard'?'Dashboard':page==='course'?activeCourse?.title:page==='progress'?'My Progress':'Explore Courses'}</span></div><div className="topbar-right"><div className="status-pill"><span className="pulse-dot"/> Learning mode</div><div className="avatar top-avatar">{user.name?.slice(0,1).toUpperCase() || 'U'}</div></div></header>
        <div className="content">
          {notice && <button className="notice" onClick={()=>setNotice('')}>{notice}<X size={14}/></button>}
          {page==='dashboard' && <>
            <div className="welcome-row"><div><div className="eyebrow">YOUR PERSONAL LEARNING SPACE</div><h1>Welcome back, {user.name?.split(' ')[0]} <span className="wave">✦</span></h1><p>Ready to build something great? Pick up where you left off.</p></div><div className="date-chip"><Flame size={17}/> Keep your momentum</div></div>
            <section className="hero-banner"><div className="hero-grid-art"><div className="orb orb-one"/><div className="orb orb-two"/><div className="hero-ring"/></div><div className="hero-content"><div className="hero-tag"><Shield size={14}/> SKILLS FOR THE REAL WORLD</div><h2>Knowledge is your<br/><span>strongest tool.</span></h2><p>Learn cybersecurity and programming through structured roadmaps, practical tasks, and consistent practice.</p><button className="primary-btn" onClick={()=>setPage('courses')}>Explore learning paths <ArrowRight size={17}/></button></div><div className="hero-stat"><div className="stat-icon"><Trophy size={20}/></div><span>YOUR PROGRESS</span><strong>{overall}%</strong><div className="mini-progress"><span style={{width:`${overall}%`}}/></div><small>{completedCount} of {allLessons} lessons completed</small></div></section>
            <div className="section-heading"><div><h2>Learning overview</h2><p>Your progress at a glance</p></div><button className="text-btn" onClick={()=>setPage('progress')}>View details <ArrowRight size={15}/></button></div>
            <div className="stats-grid"><div className="stat-card"><div className="stat-top"><span>Lessons completed</span><span className="stat-icon green"><CheckCircle2 size={18}/></span></div><strong>{completedCount}<small> / {allLessons}</small></strong><div className="stat-foot">Keep moving forward</div></div><div className="stat-card"><div className="stat-top"><span>Courses available</span><span className="stat-icon purple"><BookOpen size={18}/></span></div><strong>{courses.length}</strong><div className="stat-foot">Choose your next skill</div></div><div className="stat-card"><div className="stat-top"><span>Learning status</span><span className="stat-icon orange"><Flame size={18}/></span></div><strong className="status-text">In progress</strong><div className="stat-foot">Every lesson counts</div></div></div>
            <div className="section-heading"><div><h2>Recommended learning paths</h2><p>Start with a roadmap that matches your goals</p></div><button className="text-btn" onClick={()=>setPage('courses')}>All courses <ArrowRight size={15}/></button></div>
            <div className="course-grid">{courses.slice(0,4).map((c,i)=><CourseCard key={c.id} course={c} index={i} progress={progress} onClick={()=>openCourse(c)}/>)}</div>
          </>}
          {page==='courses' && <><div className="page-heading"><div className="eyebrow">BUILD YOUR SKILLS</div><h1>Explore courses</h1><p>Structured roadmaps from beginner foundations to practical projects.</p></div><div className="search-row"><div className="search-box"><Search size={18}/><input placeholder="Search courses, topics, skills..." value={search} onChange={e=>setSearch(e.target.value)}/>{search&&<button onClick={()=>setSearch('')}><X size={15}/></button>}</div><span className="result-count">{filteredCourses.length} learning paths</span></div><div className="course-grid all-courses">{filteredCourses.map((c,i)=><CourseCard key={c.id} course={c} index={i} progress={progress} onClick={()=>openCourse(c)}/>)}</div>{filteredCourses.length===0&&<div className="empty-state">No courses match that search. Try another keyword.</div>}</>}
          {page==='course' && activeCourse && <CourseView course={activeCourse} progress={progress} activeLesson={activeLesson} setActiveLesson={setActiveLesson} completeLesson={completeLesson}/>}
          {page==='progress' && <><div className="page-heading"><div className="eyebrow">YOUR LEARNING JOURNEY</div><h1>My progress</h1><p>Celebrate completed lessons and see what to learn next.</p></div><div className="progress-summary"><div><span>Overall completion</span><strong>{overall}%</strong><div className="progress-track"><span style={{width:`${overall}%`}}/></div></div><div><span>Lessons completed</span><strong>{completedCount}<small> / {allLessons}</small></strong></div><div><span>Available courses</span><strong>{courses.length}</strong></div></div><div className="section-heading"><div><h2>Course progress</h2><p>Progress is saved to your account when you complete a lesson.</p></div></div><div className="progress-list">{courses.map(c=>{const done=(c.lessons||[]).filter(l=>progress[l.id]).length;const pct=c.lessons?.length?Math.round(done/c.lessons.length*100):0;return <button className="progress-course" key={c.id} onClick={()=>openCourse(c)}><div className="course-icon">{iconFor(c.icon)}</div><div className="progress-course-main"><b>{c.title}</b><span>{done} of {c.lessons?.length||0} lessons complete</span><div className="progress-track"><span style={{width:`${pct}%`}}/></div></div><strong>{pct}%</strong><ChevronRight size={18}/></button>})}</div></>}
        </div>
        <footer className="app-footer"><span>© 2026 CYBERNEX ACADEMY</span><span>Learn ethically. Build confidently.</span></footer>
      </main>
    </div>
  )
}

function CourseCard({course,index,progress,onClick}) {
  const done=(course.lessons||[]).filter(l=>progress[l.id]).length
  const pct=course.lessons?.length?Math.round(done/course.lessons.length*100):0
  return <button className={`course-card accent-${index%4}`} onClick={onClick}><div className="course-card-top"><div className="course-icon">{iconFor(course.icon)}</div><span className="level-badge">{course.level}</span></div><div className="course-category">{course.category}</div><h3>{course.title}</h3><p>{course.description}</p><div className="course-card-meta"><span><BookOpen size={14}/> {course.lessons?.length||0} lessons</span><span><Clock3 size={14}/> Self-paced</span></div><div className="course-progress-row"><div className="progress-track"><span style={{width:`${pct}%`}}/></div><span>{pct}%</span></div><div className="card-bottom"><span>{done ? 'Continue learning' : 'Start learning'}</span><ArrowRight size={16}/></div></button>
}

function CourseView({course,progress,activeLesson,setActiveLesson,completeLesson}) {
  const lessons=course.lessons||[]
  const done=lessons.filter(l=>progress[l.id]).length
  const pct=lessons.length?Math.round(done/lessons.length*100):0
  const lesson=activeLesson ? lessons.find(l=>l.id===activeLesson) : null
  return <div className="course-view"><button className="back-link" onClick={()=>{setActiveLesson(null);window.history.length>1&&window.history.back()}}><ChevronRight size={15} className="back-chevron"/> Learning paths</button><div className="course-detail-hero"><div className="course-detail-icon">{iconFor(course.icon)}</div><div className="course-detail-copy"><div className="eyebrow">{course.category.toUpperCase()} ROADMAP</div><h1>{course.title}</h1><p>{course.description}</p><div className="detail-meta"><span><BookOpen size={15}/>{lessons.length} lessons</span><span><Clock3 size={15}/>Self-paced</span><span><Trophy size={15}/>{pct}% complete</span></div></div><div className="detail-progress"><strong>{pct}%</strong><span>completed</span><div className="progress-track"><span style={{width:`${pct}%`}}/></div></div></div>
    {lesson ? <div className="lesson-layout"><div className="lesson-main"><div className="lesson-kicker">LESSON {lessons.findIndex(l=>l.id===lesson.id)+1} · {lesson.level}</div><h2>{lesson.title}</h2><div className="lesson-meta"><span><Clock3 size={14}/>{lesson.duration}</span><span><BookOpen size={14}/>Reading lesson</span></div><div className="lesson-content"><h3>What you will learn</h3><p>{lesson.summary}</p><div className="learning-note"><Sparkles size={18}/><div><b>Learning tip</b><p>Read the concept carefully, write down key terms, and try a small practice task before moving on.</p></div></div><h3>Practice task</h3><p>Write a short explanation of this topic in your own words. List three important ideas you learned and one question you still have.</p>{course.id==='ethical-hacking'&&<div className="safety-note"><Shield size={17}/><span>Practice security skills only on systems you own or have explicit permission to test. Use approved training labs.</span></div>}</div><button className="primary-btn" onClick={()=>completeLesson(course,lesson)}>{progress[lesson.id]?'Completed ✓ — save again':'Mark lesson complete'} <CheckCircle2 size={17}/></button></div><aside className="lesson-sidebar"><h3>Course content</h3><span className="lesson-sidebar-sub">{done} of {lessons.length} completed</span>{lessons.map((l,i)=><button key={l.id} className={`lesson-nav ${lesson.id===l.id?'selected':''}`} onClick={()=>setActiveLesson(l.id)}><span className="lesson-check">{progress[l.id]?<CheckCircle2 size={17}/>:<Circle size={17}/>}</span><span><small>LESSON {i+1}</small><b>{l.title}</b><em>{l.duration}</em></span></button>)}</aside></div>
    : <div className="roadmap-layout"><div className="roadmap-main"><div className="section-heading"><div><h2>Your learning roadmap</h2><p>Complete lessons in order and build your skills step by step.</p></div></div><div className="roadmap-list">{lessons.map((l,i)=><div className={`roadmap-item ${progress[l.id]?'is-done':''}`} key={l.id}><div className="roadmap-line"><div className="roadmap-node">{progress[l.id]?<CheckCircle2 size={18}/>:String(i+1).padStart(2,'0')}</div>{i<lessons.length-1&&<div className="node-line"/>}</div><div className="roadmap-card"><div className="roadmap-card-top"><span className="lesson-level">{l.level}</span><span className="duration"><Clock3 size={13}/>{l.duration}</span></div><h3>{l.title}</h3><p>{l.summary}</p><button className="text-btn" onClick={()=>setActiveLesson(l.id)}>{progress[l.id]?'Review lesson':'Start lesson'} <ArrowRight size={15}/></button></div></div>)}</div></div><aside className="roadmap-aside"><div className="aside-panel"><div className="aside-icon"><Trophy size={20}/></div><h3>Course progress</h3><strong>{pct}%</strong><div className="progress-track"><span style={{width:`${pct}%`}}/></div><p>{done} of {lessons.length} lessons completed</p></div><div className="aside-panel"><div className="aside-icon"><Sparkles size={20}/></div><h3>Learning checklist</h3><ul><li><CheckCircle2 size={15}/> Read the lesson</li><li><CheckCircle2 size={15}/> Try the practice task</li><li><Circle size={15}/> Complete the assessment</li></ul><p className="small-muted">Assessments and certificates are planned for the next build stage.</p></div></aside></div>}
  </div>
}
