"use client";

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUp, ArrowUpRight, Check, ChevronDown, Code2, Copy, Layers3, Menu, Monitor, Mouse, PenTool, Sparkles, X } from 'lucide-react';
import { projects, type Project } from './projects';

const email = 'jcpandi@hotmail.com';
const filters = ['All work', 'WordPress', 'Landing pages'] as const;
type Filter = typeof filters[number];
const ease = [0.22, 1, 0.36, 1] as const;

function Logo() {
  return <a className="logo" href="#home" aria-label="JC Pandi, back to home"><span className="logo-mark" aria-hidden="true">j<span>c</span><i /></span><span>JC PANDI<span className="logo-period">.</span></span></a>;
}
function Reveal({children, className = '', delay = 0}: {children: React.ReactNode; className?: string; delay?: number}) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : {opacity:0, y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true, amount:0.12}} transition={{duration:0.7,delay,ease}}>{children}</motion.div>;
}
function SectionLabel({number, children}:{number:string;children:React.ReactNode}) {
  return <p className="section-label"><span className="section-index">{number}</span><span className="label-dot" />{children}</p>;
}
function ProjectCard({project,index}:{project:Project;index:number}) {
  return <Reveal delay={(index%2)*0.08}>
    <a className={`project-card project-${project.id} group block`} href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} website (opens in a new tab)`}>
      <div className="project-visual">
        <div className="project-window">
          <div className="window-bar"><span className="window-dots"><i/><i/><i/></span><span>{new URL(project.url).hostname}</span><ArrowUpRight size={10}/></div>
          <img src={project.image} alt={`${project.title} website preview`} loading="lazy" width="1440" height="900" />
        </div>
        <span className="project-visit">Explore website <ArrowUpRight size={18}/></span>
        <span className="project-number">0{index+1}</span>
      </div>
      <div className="project-details"><div><p>{project.discipline}</p><h3>{project.title}</h3></div><span className="project-arrow"><ArrowUpRight size={24}/></span></div>
      <p className="project-description">{project.description}</p>
    </a>
  </Reveal>;
}

export default function Home() {
  const [menuOpen,setMenuOpen] = useState(false);
  const [activeSection,setActiveSection] = useState('home');
  const [filter,setFilter] = useState<Filter>('All work');
  const [expanded,setExpanded] = useState(false);
  const [copied,setCopied] = useState(false);
  const [copyError,setCopyError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const {scrollYProgress} = useScroll();
  const progress = useSpring(scrollYProgress,{stiffness:100,damping:30,restDelta:0.001});
  const mx=useMotionValue(0), my=useMotionValue(0);
  const portraitX=useSpring(mx,{stiffness:55,damping:25}), portraitY=useSpring(my,{stiffness:55,damping:25});
  const filtered=projects.filter(p=>filter==='All work'||p.category===filter);
  const featured=filtered.filter(p=>p.image);
  const archive=filtered.filter(p=>!p.image);

  useEffect(()=>{
    const sections = document.querySelectorAll('main section[id]');
    const observer = new IntersectionObserver(entries=>{for(const entry of entries) if(entry.isIntersecting) setActiveSection(entry.target.id);},{rootMargin:'-15% 0px -65% 0px'});
    sections.forEach(s=>observer.observe(s));
    return ()=>{observer.disconnect();if(timer.current)clearTimeout(timer.current);};
  },[]);
  useEffect(()=>{
    if(!menuOpen)return;
    const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape'){setMenuOpen(false);menuButton.current?.focus();}};
    document.addEventListener('keydown',onKey);
    return ()=>document.removeEventListener('keydown',onKey);
  },[menuOpen]);
  async function copyEmail(){
    try{await navigator.clipboard.writeText(email);setCopied(true);setCopyError(false);if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>setCopied(false),4500);}
    catch{setCopyError(true);}
  }
  const selectFilter=(next:Filter)=>{setFilter(next);setExpanded(next!=='All work');};

  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#main">Skip to content</a>
    <motion.div className="reading-progress" style={{scaleX:progress}} />
    <div className="page-grain" aria-hidden="true" />
    <header className="site-header">
      <div className="header-inner container"><Logo/>
        <nav className="desktop-nav" aria-label="Main navigation">{[['about','About'],['work','Work'],['expertise','Expertise'],['contact','Contact']].map(([id,label])=><a className={activeSection===id?'active':''} key={id} href={`#${id}`}>{label}</a>)}</nav>
        <a className="header-cta" href="#contact">Let’s talk <ArrowUpRight size={15}/></a>
        <button className="menu-toggle" ref={menuButton} aria-label={menuOpen?'Close navigation':'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={24}/>:<Menu size={24}/>}</button>
      </div>
      <AnimatePresence>{menuOpen&&<motion.nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}>{[['about','About'],['work','Work'],['expertise','Expertise'],['contact','Contact']].map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)}>{label}<ArrowUpRight size={20}/></a>)}</motion.nav>}</AnimatePresence>
    </header>

    <main id="main" tabIndex={-1}>
      <section id="home" className="hero" onPointerMove={e=>{if(reduced||e.pointerType!=='mouse')return;const r=e.currentTarget.getBoundingClientRect();mx.set(((e.clientX-r.left)/r.width-.5)*15);my.set(((e.clientY-r.top)/r.height-.5)*12);}} onPointerLeave={()=>{mx.set(0);my.set(0);}}>
        <div className="hero-atmosphere" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><span className="star star-one"/><span className="star star-two"/><span className="star star-three"/><span className="star star-four"/></div>
        <div className="hero-inner container">
          <motion.div className="hero-copy" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.9,ease}}>
            <div className="hero-eyebrow"><span className="status-dot"/> DESIGNER’S EYE. DEVELOPER’S MIND.</div>
            <p className="hello">Hey, I’m JC <span className="hello-line"/></p>
            <h1>I BUILD DIGITAL<br/><span>EXPERIENCES</span><br/>THAT MATTER<span className="title-dot">.</span></h1>
            <p className="hero-description">Web designer & front-end developer turning<br className="desktop-break"/> thoughtful ideas into exceptional websites.</p>
            <div className="hero-actions flex flex-wrap items-center gap-3"><a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={19}/></a><a className="button button-outline" href="#contact">Let’s build something <ArrowRight size={18}/></a></div>
            <div className="hero-note"><span/> Good design is good business.</div>
          </motion.div>
          <div className="hero-art" aria-label="Illustrated designer character">
            <div className="hero-disc" aria-hidden="true"/><div className="hero-disc-ring" aria-hidden="true"/>
            <motion.div className="portrait-wrap" style={{x:portraitX,y:portraitY}} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.2,delay:.15}}><img className="hero-portrait" src="/images/designer-character-v2.png" alt="A stylized 3D designer wearing a white polo shirt" width="1024" height="1536" fetchPriority="high"/></motion.div>
            <motion.div className="floating-services" initial={{opacity:0,x:18}} animate={{opacity:1,x:0}} transition={{duration:.8,delay:.5,ease}}>
              <div className="floating-service"><span><Code2 size={22}/></span><div>FRONT-END<br/><strong>DEVELOPER</strong></div></div>
              <div className="floating-service"><span><PenTool size={21}/></span><div>WEB & UI<br/><strong>DESIGNER</strong></div></div>
              <div className="floating-service"><span><Sparkles size={21}/></span><div>CREATIVE<br/><strong>THINKER</strong></div></div>
            </motion.div>
            <div className="art-caption"><span className="caption-line"/> MADE OF CURIOSITY & CODE</div>
          </div>
          <a href="#about" className="scroll-cue"><Mouse size={23}/><span>SCROLL TO EXPLORE</span><ArrowDown size={12}/></a>
        </div>
      </section>

      <section id="about" className="about-section container">
        <Reveal className="about-panel"><div className="about-copy"><SectionLabel number="01">A LITTLE ABOUT ME</SectionLabel><h2>Thoughtful design.<br/>Beautifully <span>built.</span></h2><p>I’m JC Pandi, a web designer and front-end developer. I bring visual thinking and hands-on development together to create websites that feel as good as they work.</p><a className="text-link" href="#expertise">Meet my toolkit <ArrowDownRight size={17}/></a></div>
          <div className="about-stats"><div className="stat"><Layers3 size={22}/><strong>16<span>↗</span></strong><p>Projects to explore</p></div><div className="stat"><Monitor size={22}/><strong>05</strong><p>WordPress websites</p></div><div className="stat"><Code2 size={22}/><strong>11</strong><p>Landing experiences</p></div></div>
        </Reveal>
      </section>
      <div className="tool-strip container" aria-label="Design and development toolkit"><span>IDEAS INTO INTERFACES</span><div>Next.js <i/> React <i/> Tailwind CSS <i/> Framer <i/> WordPress <i/> GSAP</div><span className="tool-strip-star" aria-hidden="true">✳</span></div>

      <section id="work" className="work-section container section-space">
        <Reveal className="section-heading"><div><SectionLabel number="02">SELECTED WORK</SectionLabel><h2>Different ideas.<br/>Same <span>attention to detail.</span></h2></div><p>A selection of websites across industries.<br/>Every project, a new perspective.</p></Reveal>
        <div className="work-toolbar"><div className="filter-list" role="group" aria-label="Filter projects">{filters.map(f=><button key={f} type="button" aria-pressed={f===filter} onClick={()=>selectFilter(f)} className={f===filter?'selected':''}>{f}<span>{f==='All work'?16:f==='WordPress'?5:11}</span></button>)}</div><span className="work-count" aria-live="polite">{String(filtered.length).padStart(2,'0')} PROJECTS</span></div>
        <div className="project-grid" key={filter}>{featured.map((p,i)=><ProjectCard key={p.id} project={p} index={i}/>)}</div>
        {archive.length>0&&<><button className="archive-toggle" aria-expanded={expanded} aria-controls="project-archive" onClick={()=>setExpanded(!expanded)}>{expanded?'Show less':`Explore ${archive.length} more projects`}<ChevronDown size={17} className={expanded?'rotate-180':''}/></button>
        <AnimatePresence initial={false}>{expanded&&<motion.div id="project-archive" className="project-archive" initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} transition={{duration:.35,ease}}>{archive.map((p,i)=><a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${p.title} website (opens in a new tab)`}><span className="archive-index">{String(i+1).padStart(2,'0')}</span><div><h3>{p.title}</h3><p>{p.discipline}</p></div><span className="archive-category">{p.category==='Landing pages'?'Landing page':p.category}</span><ArrowUpRight size={22}/></a>)}</motion.div>}</AnimatePresence></>}
      </section>

      <section id="expertise" className="expertise-section section-space"><div className="container"><Reveal className="section-heading"><div><SectionLabel number="03">WHAT I BRING TO THE TABLE</SectionLabel><h2>From first sketch<br/>to the <span>final pixel.</span></h2></div><p>Design and development, connected.<br/>One considered experience from start to finish.</p></Reveal>
        <div className="expertise-grid">{[
          {icon:PenTool,n:'01',title:'Web & interface design',desc:'Distinctive visual identities translated into intuitive layouts. Every type choice, interaction, and detail has a purpose.',tags:['UI design','Responsive layouts','Visual direction']},
          {icon:Code2,n:'02',title:'Front-end development',desc:'Bringing the design to life with responsive code, purposeful motion, and interactions that make the experience feel effortless.',tags:['Next.js / React','Tailwind CSS','Framer Motion / GSAP']},
          {icon:Layers3,n:'03',title:'WordPress & Framer',desc:'Flexible websites and expressive landing pages that give brands a clear voice and a home they can keep growing.',tags:['WordPress','Framer','Landing pages']},
        ].map(({icon:Icon,n,title,desc,tags},i)=><Reveal key={n} delay={i*.08} className="expertise-card"><div className="expertise-top"><Icon size={27}/><span>{n}</span></div><h3>{title}</h3><p>{desc}</p><div className="expertise-tags">{tags.map(t=><span key={t}>{t}</span>)}</div></Reveal>)}</div>
        <Reveal className="approach"><p>THE WAY I WORK</p><div><span><i>01</i> Understand</span><ArrowRight size={16}/><span><i>02</i> Design</span><ArrowRight size={16}/><span><i>03</i> Develop</span><ArrowRight size={16}/><span><i>04</i> Refine</span></div></Reveal>
      </div></section>

      <section id="contact" className="contact-section container section-space"><Reveal className="contact-panel"><div className="contact-glow" aria-hidden="true"/><SectionLabel number="04">HAVE SOMETHING IN MIND?</SectionLabel><h2>Let’s make<br/>something <span>matter.</span><span className="contact-asterisk" aria-hidden="true">✳</span></h2><div className="contact-bottom"><p>A new website. A fresh perspective. A big idea.<br/>I’d love to hear what you’re thinking.</p><a className="button button-primary" href={`mailto:${email}?subject=Let%E2%80%99s%20build%20something`}>Start a conversation <ArrowUpRight size={20}/></a></div><div className="contact-email"><a href={`mailto:${email}`}>{email}<ArrowUpRight size={19}/></a><button onClick={copyEmail} aria-label={copied?'Email copied':'Copy email address'}>{copied?<Check size={17}/>:<Copy size={17}/>}</button><span className="copy-status" role="status">{copied?'Copied!':copyError?'Please select and copy the address.':''}</span></div></Reveal></section>
    </main>
    <footer className="site-footer container"><Logo/><p>© {new Date().getFullYear()} JC Pandi. Made with intent.</p><a href="#home">Back to top <ArrowUp size={15}/></a></footer>
  </MotionConfig>;
}


