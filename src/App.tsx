import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Palette, 
  Globe, 
  Video, 
  Cpu, 
  Terminal, 
  Settings, 
  ArrowRight, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Star, 
  Share2, 
  AtSign,
  ChevronDown,
  Layout,
  Smartphone,
  Zap
} from 'lucide-react';
import { AITools } from './components/AITools';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter text-white bg-clip-text bg-gradient-to-r from-primary-container to-secondary-container font-headline">
          Craftforge.studio
        </div>
        <div className="hidden md:flex items-center space-x-8 font-headline font-bold tracking-tight">
          <a href="#" className="text-white border-b-2 border-primary-container pb-1">Home</a>
          <a href="#services" className="text-on-surface-variant hover:text-white transition-colors">Services</a>
          <a href="#portfolio" className="text-on-surface-variant hover:text-white transition-colors">Portfolio</a>
          <a href="#pricing" className="text-on-surface-variant hover:text-white transition-colors">Pricing</a>
          <a href="#contact" className="text-on-surface-variant hover:text-white transition-colors">Contact</a>
        </div>
        <button className="bg-gradient-to-r from-primary-container to-secondary-container text-white px-6 py-2 rounded-xl font-bold hover:scale-105 transition-transform duration-300 active:scale-95 shadow-lg shadow-primary/20">
          Start Project
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden hero-gradient grid-bg">
      <motion.div style={{ y: y1, opacity }} className="relative z-10 text-center max-w-5xl mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container border border-outline-variant/20 mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse shadow-[0_0_8px_rgba(66,47,246,0.8)]"></span>
          <span className="text-xs font-bold tracking-widest text-primary uppercase">Forge Your Vision</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-black font-headline tracking-tighter leading-none text-white"
        >
          One Creator.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Infinite Solutions.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed"
        >
          UI/UX · Graphic Design · AI Visuals · Video · Full-Stack Dev · Deployment
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
        >
          <a href="#portfolio" className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(125,60,152,0.4)] transition-all transform hover:-translate-y-1">
            See My Work
          </a>
          <a href="#contact" className="w-full sm:w-auto px-10 py-4 rounded-xl bg-surface-variant/40 backdrop-blur-md border border-white/10 text-white font-bold text-lg hover:bg-surface-variant/60 transition-all transform hover:-translate-y-1">
            Let's Build Together
          </a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40"
      >
        <ChevronDown className="w-10 h-10 text-white" />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative order-2 lg:order-1"
        >
          <div className="aspect-square rounded-3xl overflow-hidden glass-panel p-2">
            <img 
              src="https://picsum.photos/seed/studio/800/800" 
              alt="Digital Alchemy" 
              className="w-full h-full object-cover rounded-2xl opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 glass-panel p-8 rounded-2xl max-w-xs hidden md:block">
            <span className="text-5xl font-black text-primary font-headline">10+</span>
            <p className="text-on-surface-variant mt-2 font-bold uppercase tracking-tighter">Years of digital excellence</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2 space-y-8"
        >
          <h2 className="text-5xl font-black font-headline tracking-tighter text-white">The Digital Alchemist</h2>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            In a world of templated solutions, Craftforge.studio offers bespoke digital craftsmanship. I merge artistic intuition with technical precision to build experiences that don't just work—they resonate.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-white font-bold">AI Integrated Workflow</h4>
                <p className="text-on-surface-variant text-sm">Leveraging cutting-edge AI to accelerate production without losing the human soul.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center shrink-0">
                <Terminal className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h4 className="text-white font-bold">Full-Stack Mastery</h4>
                <p className="text-on-surface-variant text-sm">From pixel-perfect UI designs to robust backend deployment architectures.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-32 px-6 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-5xl font-black font-headline tracking-tighter text-white">Mastered Crafts</h2>
            <p className="text-on-surface-variant mt-4">A specialized ecosystem of creative and technical services.</p>
          </div>
          <span className="text-primary font-headline font-bold text-xl tracking-widest uppercase">Expertise</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 md:row-span-1 glass-panel p-8 rounded-3xl flex flex-col justify-end group hover:bg-surface-container-high transition-all"
          >
            <Palette className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Visual Identity</h3>
            <p className="text-on-surface-variant">Forging iconic brands that stand the test of time and digital noise.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-primary-container to-surface-container glass-panel p-8 rounded-3xl flex flex-col justify-between group"
          >
            <Layout className="w-12 h-12 text-white" />
            <h3 className="text-xl font-bold text-white">UI/UX Strategy</h3>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-1 md:row-span-2 glass-panel p-8 rounded-3xl flex flex-col group hover:border-secondary transition-all"
          >
            <Video className="w-12 h-12 text-secondary mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Motion & Video</h3>
            <p className="text-on-surface-variant text-sm">High-end editing and motion graphics that tell a compelling narrative.</p>
            <div className="mt-auto pt-8">
              <img 
                src="https://picsum.photos/seed/video/400/300" 
                alt="Video Work" 
                className="rounded-xl grayscale group-hover:grayscale-0 transition-all"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-1 md:row-span-1 glass-panel p-8 rounded-3xl flex flex-col justify-center text-center group"
          >
            <Cpu className="w-12 h-12 text-primary mx-auto mb-2" />
            <h3 className="text-lg font-bold text-white">AI Visuals</h3>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 md:row-span-1 glass-panel p-8 rounded-3xl flex items-center gap-8 group overflow-hidden"
          >
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">Full-Stack Dev</h3>
              <p className="text-on-surface-variant">Modern, scalable web applications built with React, Tailwind, and Node.</p>
            </div>
            <div className="w-32 h-32 shrink-0 bg-surface-container-highest rounded-full flex items-center justify-center border-4 border-outline-variant/10">
              <Settings className="w-16 h-16 text-secondary animate-spin-slow" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    { title: "LuxeAura Identity", category: "E-Commerce", color: "text-primary", seed: "luxury" },
    { title: "Nexus Data Engine", category: "Web App", color: "text-secondary", seed: "data" },
    { title: "Synapse Branding", category: "AI Visuals", color: "text-tertiary", seed: "abstract" }
  ];

  return (
    <section id="portfolio" className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-5xl font-black font-headline tracking-tighter text-white">Recent Forges</h2>
      </div>
      <div className="flex gap-8 px-4 md:px-32 overflow-x-auto no-scrollbar pb-12">
        {projects.map((p, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            className="min-w-[350px] md:min-w-[600px] group cursor-pointer"
          >
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden glass-panel border-white/5 transition-all group-hover:border-primary/50">
              <img 
                src={`https://picsum.photos/seed/${p.seed}/1200/750`} 
                alt={p.title} 
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <span className={`text-xs font-bold tracking-widest ${p.color} uppercase`}>{p.category}</span>
                <h3 className="text-3xl font-black text-white font-headline mt-1">{p.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 px-6 bg-surface-container-lowest relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary-container/5 blur-[150px] -z-10"></div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl font-black font-headline tracking-tighter text-white">Transparent Alchemy</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">No hidden costs. No bloated agencies. Just high-impact results directly from the creator.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sprint */}
          <div className="glass-panel p-8 rounded-[2.5rem] flex flex-col border-white/5 hover:border-white/20 transition-all">
            <h4 className="text-on-surface-variant font-bold uppercase tracking-widest text-xs mb-4">Sprint</h4>
            <div className="text-4xl font-black text-white font-headline mb-6">$1,499<span className="text-lg text-on-surface-variant font-normal">/project</span></div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Single Page App/Landing</li>
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> Visual Branding</li>
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> 3-Day Turnaround</li>
            </ul>
            <button className="w-full py-4 rounded-xl bg-surface-variant text-white font-bold hover:bg-surface-bright transition-colors">Start Sprint</button>
          </div>
          
          {/* Pro */}
          <div className="glass-panel p-8 rounded-[2.5rem] flex flex-col border-primary/30 relative scale-105 shadow-2xl shadow-primary-container/20">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-on-primary text-[10px] font-black uppercase tracking-widest">Most Popular</div>
            <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">The Forge</h4>
            <div className="text-4xl font-black text-white font-headline mb-6">$3,999<span className="text-lg text-on-surface-variant font-normal">/month</span></div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-primary fill-primary/20" /> Unlimited Requests</li>
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-primary fill-primary/20" /> Full-Stack Development</li>
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-primary fill-primary/20" /> Video & Motion Design</li>
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-primary fill-primary/20" /> AI Creative Direction</li>
            </ul>
            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-white font-bold shadow-lg shadow-primary-container/30 hover:scale-105 transition-transform">Begin Forge</button>
          </div>
          
          {/* Custom */}
          <div className="glass-panel p-8 rounded-[2.5rem] flex flex-col border-white/5 hover:border-white/20 transition-all">
            <h4 className="text-on-surface-variant font-bold uppercase tracking-widest text-xs mb-4">Enterprise</h4>
            <div className="text-4xl font-black text-white font-headline mb-6">Custom</div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /> Long-term Partnerships</li>
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /> CTO Advisory</li>
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /> Scale & Deployment</li>
            </ul>
            <button className="w-full py-4 rounded-xl bg-surface-variant text-white font-bold hover:bg-surface-bright transition-colors">Book a Call</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="glass-panel p-12 md:p-20 rounded-[4rem] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/20 rounded-full blur-[80px]"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          <div className="space-y-8">
            <h2 className="text-6xl font-black font-headline tracking-tighter text-white">Let’s Forge Something Iconic.</h2>
            <p className="text-xl text-on-surface-variant">Ready to elevate your digital presence? Send a message and I'll get back to you within 24 hours.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Mail className="w-5 h-5 text-on-surface" />
                </div>
                <span className="text-white font-bold">hello@craftforge.studio</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-secondary transition-colors">
                  <Clock className="w-5 h-5 text-on-surface" />
                </div>
                <span className="text-white font-bold">Mon - Fri: 09:00 - 18:00 EST</span>
              </div>
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Name</label>
                <input className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/40 text-white placeholder:text-on-surface-variant/40" placeholder="John Doe" type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email</label>
                <input className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-secondary/40 text-white placeholder:text-on-surface-variant/40" placeholder="john@example.com" type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Service</label>
              <select className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/40 text-white">
                <option>UI/UX Design</option>
                <option>Full-Stack Web Dev</option>
                <option>Visual Identity</option>
                <option>Monthly Retainer</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Message</label>
              <textarea className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/40 text-white placeholder:text-on-surface-variant/40" placeholder="Briefly describe your vision..." rows={4}></textarea>
            </div>
            <button className="w-full py-5 rounded-xl bg-white text-background font-black text-lg uppercase tracking-widest hover:bg-primary transition-colors hover:text-white group flex items-center justify-center gap-3">
              Initiate Transmission
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest w-full rounded-t-[4rem] border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-20 max-w-7xl mx-auto">
        <div className="col-span-1 md:col-span-2">
          <div className="text-2xl font-black text-white mb-4 font-headline">Craftforge.studio</div>
          <p className="text-on-surface-variant text-sm max-w-sm">Merging digital art with technical excellence to create future-proof web experiences. Forge your next reality with us.</p>
          <div className="flex gap-4 mt-8">
            <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface hover:text-primary transition-colors"><Share2 className="w-4 h-4" /></a>
            <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface hover:text-primary transition-colors"><AtSign className="w-4 h-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Navigation</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform inline-block">Home</a></li>
            <li><a href="#services" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform inline-block">Services</a></li>
            <li><a href="#portfolio" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform inline-block">Portfolio</a></li>
            <li><a href="#pricing" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform inline-block">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Social</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform inline-block">Twitter</a></li>
            <li><a href="#" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform inline-block">LinkedIn</a></li>
            <li><a href="#" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform inline-block">Dribbble</a></li>
            <li><a href="#" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-transform inline-block">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-8 text-center px-6">
        <p className="text-sm text-on-surface-variant">© 2024 Craftforge.studio. Forged in Digital Alchemy.</p>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <AITools />
    </div>
  );
}
