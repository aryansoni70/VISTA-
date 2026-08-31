import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="page-enter bg-white min-h-screen">
      {/* Top Banner */}
      <div className="w-full bg-[#E6F4EA] text-[#0F7642] py-2 flex items-center justify-center gap-2 text-sm font-medium">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Introducing VISTA 2.0
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden min-h-[85vh] flex flex-col justify-center">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/50 via-white to-purple-50/50"></div>
          
          {/* Left Flow Lines */}
          <svg className="absolute left-0 top-0 h-full w-1/3 animate-flow opacity-40" viewBox="0 0 400 800" preserveAspectRatio="none">
            <path d="M0,0 Q200,200 100,400 T0,800" fill="none" stroke="#22d3ee" strokeWidth="1" />
            <path d="M-50,0 Q150,250 50,450 T-50,800" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            <path d="M-100,0 Q100,300 0,500 T-100,800" fill="none" stroke="#c084fc" strokeWidth="0.5" />
            <path d="M-150,0 Q50,350 -50,550 T-150,800" fill="none" stroke="#22d3ee" strokeWidth="1" />
            <path d="M-200,0 Q0,400 -100,600 T-200,800" fill="none" stroke="#c084fc" strokeWidth="1.5" />
          </svg>

          {/* Right Flow Lines */}
          <svg className="absolute right-0 top-0 h-full w-1/3 animate-flow opacity-40" viewBox="0 0 400 800" preserveAspectRatio="none" style={{ animationDelay: '2s' }}>
            <path d="M400,0 Q200,200 300,400 T400,800" fill="none" stroke="#c084fc" strokeWidth="1" />
            <path d="M450,0 Q250,250 350,450 T450,800" fill="none" stroke="#c084fc" strokeWidth="1.5" />
            <path d="M500,0 Q300,300 400,500 T500,800" fill="none" stroke="#22d3ee" strokeWidth="0.5" />
            <path d="M550,0 Q350,350 450,550 T550,800" fill="none" stroke="#c084fc" strokeWidth="1" />
            <path d="M600,0 Q400,400 500,600 T600,800" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
          {/* Marquee Tags */}
          <div className="w-full max-w-3xl mx-auto overflow-hidden mb-12 relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="animate-marquee flex gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <span className="px-5 py-2 rounded-full bg-gray-100/80 text-gray-500 text-sm font-semibold backdrop-blur-sm whitespace-nowrap border border-gray-200/50 hover:text-[#0F7642] hover:bg-white transition-colors cursor-default">Deepfake Detection</span>
                  <span className="px-5 py-2 rounded-full bg-gray-100/80 text-gray-500 text-sm font-semibold backdrop-blur-sm whitespace-nowrap border border-gray-200/50 hover:text-[#0F7642] hover:bg-white transition-colors cursor-default">Metadata Analysis</span>
                  <span className="px-5 py-2 rounded-full bg-gray-100/80 text-gray-500 text-sm font-semibold backdrop-blur-sm whitespace-nowrap border border-gray-200/50 hover:text-[#0F7642] hover:bg-white transition-colors cursor-default">Audio Verification</span>
                  <span className="px-5 py-2 rounded-full bg-gray-100/80 text-gray-500 text-sm font-semibold backdrop-blur-sm whitespace-nowrap border border-gray-200/50 hover:text-[#0F7642] hover:bg-white transition-colors cursor-default">Blockchain Proof</span>
                </div>
              ))}
            </div>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-bold tracking-tighter text-gray-900 mb-8 leading-[1.05]">
            Premium <br />
            authenticity <span className="italic font-serif text-[#0F7642] font-normal tracking-normal pr-1">layer</span><br />
            on demand.
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-gray-500 font-medium leading-relaxed mb-12 px-4">
            A flexible verification partnership for creators, brands, and
            agencies who want top forensic analysis delivered on their timeline.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/upload"
              className="flex items-center justify-center rounded-full bg-[#0F7642] px-10 py-4 text-sm font-bold text-white hover:bg-black transition-colors shadow-lg hover:shadow-xl sm:w-48"
            >
              View Plans
            </Link>
            <Link
              href="/verify"
              className="flex items-center gap-4 rounded-full border border-gray-200 bg-white px-5 py-3 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm group"
            >
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-lg z-10 group-hover:-translate-y-1 transition-transform">🕵️</div>
                <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-lg z-0 group-hover:-translate-y-1 transition-transform delay-75">🛡️</div>
              </div>
              <div className="text-left pr-3">
                <p className="text-sm font-bold text-gray-900 leading-tight">Verify public record</p>
                <p className="text-xs text-[#0F7642] font-medium flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F7642] animate-pulse"></span> Blockchain live
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Mockup / Dashboard Preview */}
      <section className="relative px-6 pb-20">
        <Link href="/history" className="block mx-auto max-w-6xl group">
          <div className="w-full h-[400px] md:h-[600px] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden flex flex-col transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
             
             {/* Dashboard Header */}
             <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-gray-50/50">
               <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded bg-[#0F7642]/10 flex items-center justify-center">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12 22C12 22 4 16 4 7L12 3L20 7C20 16 12 22 12 22Z" fill="#0F7642"/>
                   </svg>
                 </div>
                 <span className="font-semibold text-gray-800">VISTA Overview</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-32 h-8 bg-gray-100 rounded-full animate-pulse"></div>
                 <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
               </div>
             </div>

             {/* Dashboard Body */}
             <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50/30 overflow-hidden">
                {/* Left Column - Analytics */}
                <div className="md:col-span-2 space-y-6 flex flex-col h-full">
                  {/* Top Stats */}
                  <div className="grid grid-cols-3 gap-4">
                     <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                       <p className="text-xs text-gray-500 font-medium mb-1">Total Verified</p>
                       <p className="text-2xl font-bold text-gray-900">1,284</p>
                       <p className="text-xs text-green-600 mt-2">↑ 12% from last week</p>
                     </div>
                     <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                       <p className="text-xs text-gray-500 font-medium mb-1">Avg Reality Score</p>
                       <p className="text-2xl font-bold text-[#0F7642]">94.2%</p>
                       <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3">
                         <div className="bg-[#0F7642] h-1.5 rounded-full" style={{ width: '94%' }}></div>
                       </div>
                     </div>
                     <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                       <p className="text-xs text-gray-500 font-medium mb-1">Deepfakes Blocked</p>
                       <p className="text-2xl font-bold text-red-600">312</p>
                       <p className="text-xs text-red-500 mt-2">High risk detected</p>
                     </div>
                  </div>

                  {/* Main Chart Area */}
                  <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5 relative overflow-hidden min-h-[200px]">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-semibold text-gray-800">Verification Volume</h4>
                      <div className="flex gap-2">
                        <div className="w-16 h-6 bg-gray-100 rounded text-[10px] flex items-center justify-center text-gray-500">Weekly</div>
                        <div className="w-16 h-6 bg-green-50 text-green-700 rounded text-[10px] flex items-center justify-center font-medium">Monthly</div>
                      </div>
                    </div>
                    
                    {/* Abstract Chart */}
                    <div className="absolute bottom-0 left-0 w-full h-48 flex items-end justify-between px-6 pb-6 gap-2">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
                        <div key={i} className="w-full bg-gradient-to-t from-[#0F7642]/20 to-[#0F7642] rounded-t-sm" style={{ height: `${height}%`, opacity: 0.7 + (i * 0.02) }}></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Recent History */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col h-full">
                  <h4 className="font-semibold text-gray-800 mb-4">Recent Verifications</h4>
                  <div className="flex-1 space-y-4">
                     {[
                       { name: "interview_raw.mp4", score: 98, time: "2m ago", status: "Authentic" },
                       { name: "press_release.pdf", score: 99, time: "15m ago", status: "Authentic" },
                       { name: "evidence_audio.wav", score: 42, time: "1h ago", status: "Manipulated" },
                       { name: "cctv_footage_04.mov", score: 87, time: "3h ago", status: "Authentic" },
                       { name: "profile_pic.jpg", score: 12, time: "5h ago", status: "AI Gen" },
                     ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                         <div className="flex items-center gap-3">
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${item.score > 80 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                             {item.score > 80 ? '✓' : '✕'}
                           </div>
                           <div>
                             <p className="text-sm font-medium text-gray-800 truncate w-[100px] lg:w-32">{item.name}</p>
                             <p className="text-xs text-gray-400">{item.time}</p>
                           </div>
                         </div>
                         <div className="text-right">
                           <p className={`text-sm font-bold ${item.score > 80 ? 'text-[#0F7642]' : 'text-red-600'}`}>{item.score}%</p>
                           <p className="text-[10px] text-gray-500">{item.status}</p>
                         </div>
                       </div>
                     ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <span className="text-sm text-[#0F7642] font-semibold group-hover:underline flex items-center justify-center gap-2">
                      View Full History
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
             </div>

          </div>
        </Link>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-8">
            TRUSTED BY TEAMS AT
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Using text placeholders for logos as we don't have image assets */}
            <span className="text-xl font-bold font-sans">Google</span>
            <span className="text-xl font-bold font-serif">stripe</span>
            <span className="text-xl font-bold font-sans tracking-tighter">OpenAI</span>
            <span className="text-xl font-bold tracking-widest text-red-500">NETFLIX</span>
            <span className="text-xl font-bold font-sans">Linkedin</span>
            <span className="text-xl font-bold font-sans">Vercel</span>
          </div>
        </div>
      </section>

      {/* Flowchart / Multi-agentic Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">
              AUTOMATED AND MULTIMODAL
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              One scan, <br />
              <span className="text-[#0F7642]">a comprehensive report</span> at work
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              VISTA now operates as a team of specialized forensic agents. Make one request and a 
              whole team gets to work, analyzing video frames, audio spectrograms, and metadata all at the same time.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Generate a cryptographically secure blockchain certificate for your authenticated files, ensuring your evidence is tamper-proof forever.
            </p>
            <Link href="/learn-more" className="inline-flex items-center gap-2 text-sm font-semibold border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50">
              Learn more
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex items-center justify-center min-h-[400px]">
            {/* Visual representation of agents flying around like in MagicPath */}
            <div className="relative w-full h-full min-h-[300px]">
               {/* Center Node */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center z-10">
                 <span className="text-2xl font-bold text-[#0F7642]">Core</span>
               </div>
               
               {/* Floating Nodes */}
               <div className="absolute top-10 left-10 flex flex-col items-center">
                 <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shadow text-orange-600 mb-2">📹</div>
                 <span className="text-xs font-semibold bg-orange-500 text-white px-2 py-1 rounded">Video Agent</span>
               </div>

               <div className="absolute bottom-10 right-10 flex flex-col items-center">
                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow text-blue-600 mb-2">🔊</div>
                 <span className="text-xs font-semibold bg-blue-500 text-white px-2 py-1 rounded">Audio Agent</span>
               </div>

               <div className="absolute top-20 right-20 flex flex-col items-center">
                 <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shadow text-purple-600 mb-2">⛓️</div>
                 <span className="text-xs font-semibold bg-purple-500 text-white px-2 py-1 rounded">Blockchain MCP</span>
               </div>

               <div className="absolute bottom-20 left-20 flex flex-col items-center">
                 <div className="w-12 h-12 bg-[#E6F4EA] rounded-full flex items-center justify-center shadow text-[#0F7642] mb-2">📄</div>
                 <span className="text-xs font-semibold bg-[#0F7642] text-white px-2 py-1 rounded">Metadata Agent</span>
               </div>

               {/* Connection Lines (SVG) */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                 <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4 4" />
                 <line x1="75%" y1="75%" x2="50%" y2="50%" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4 4" />
                 <line x1="75%" y1="35%" x2="50%" y2="50%" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4 4" />
                 <line x1="30%" y1="70%" x2="50%" y2="50%" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4 4" />
               </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Layer Integration Flowchart Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-6">
              <span className="text-sm font-semibold text-gray-500">VISTA Frontend</span>
              <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-gray-200 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0F7642" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div className="w-48 bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-left">
                <div className="w-full h-24 bg-gray-100 rounded mb-2 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">User Upload</span>
                </div>
                <div className="w-3/4 h-2 bg-gray-200 rounded mb-1"></div>
                <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
              </div>
              <span className="text-sm font-semibold text-gray-900 mt-2">Client Interface</span>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-gray-300">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-6">
              <span className="text-sm font-semibold text-gray-500">Python AI Engine</span>
              <div className="w-24 h-24 bg-[#E6F4EA] rounded-3xl shadow-sm border border-[#0F7642]/20 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0F7642" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                  <line x1="12" y1="22" x2="12" y2="15.5" />
                  <polyline points="22 8.5 12 15.5 2 8.5" />
                  <polyline points="2 15.5 12 8.5 22 15.5" />
                  <line x1="12" y1="2" x2="12" y2="8.5" />
                </svg>
              </div>
              <div className="w-48 bg-gray-900 rounded-lg shadow-sm p-4 text-left">
                <div className="flex flex-col gap-2">
                  <div className="w-3/4 h-2 bg-green-400 rounded"></div>
                  <div className="w-full h-2 bg-blue-400 rounded"></div>
                  <div className="w-5/6 h-2 bg-orange-400 rounded"></div>
                  <div className="w-1/2 h-2 bg-purple-400 rounded"></div>
                  <div className="w-3/4 h-2 bg-green-400 rounded"></div>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-900 mt-2">Forensic Analysis</span>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-gray-300">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-6">
              <span className="text-sm font-semibold text-gray-500">Polygon Blockchain</span>
              <div className="w-24 h-24 bg-gray-900 rounded-3xl shadow-lg border border-gray-800 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div className="w-48 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden text-left">
                <div className="bg-gray-50 p-2 border-b border-gray-200 flex justify-between items-center">
                  <span className="text-[10px] font-semibold text-gray-500">Smart Contract</span>
                  <span className="bg-green-100 text-green-700 text-[8px] px-1 py-0.5 rounded">+ Verified</span>
                </div>
                <div className="p-3 flex flex-col gap-2">
                   <div className="flex justify-between items-center">
                     <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                     <div className="w-4 h-2 bg-green-400 rounded"></div>
                   </div>
                   <div className="flex justify-between items-center">
                     <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
                     <div className="w-4 h-2 bg-green-400 rounded"></div>
                   </div>
                   <div className="flex justify-between items-center">
                     <div className="w-1/3 h-2 bg-gray-200 rounded"></div>
                     <div className="w-4 h-2 bg-green-400 rounded"></div>
                   </div>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-900 mt-2">Immutable Storage</span>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}
