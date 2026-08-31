import Link from "next/link";
import React from "react";

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-gray-50 selection:bg-[#0F7642] selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F4EA] text-[#0F7642] text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F7642] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F7642]"></span>
            </span>
            Proof-of-Reality Architecture
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            One Scan. Multiple Checks. <br className="hidden md:block" />
            <span className="text-[#0F7642]">One Verifiable Proof.</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-500 font-medium leading-relaxed mb-10">
            Proof-of-Reality is an AI-powered digital authenticity system designed to analyze videos, images, audio, and documents for signs of manipulation.
          </p>
          <div className="max-w-4xl mx-auto bg-gray-900 text-gray-300 p-6 rounded-2xl shadow-2xl text-left border border-gray-800 italic">
             &ldquo;AI detects suspicious content. Cryptography identifies the exact content. Blockchain preserves the verification proof.&rdquo;
          </div>
        </div>
      </section>

      {/* 2. OVERALL FLOW */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-500 text-lg">The end-to-end journey from upload to blockchain verification.</p>
          </div>
          
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
            {/* Visual Flow diagram abstract representation */}
            <div className="min-w-[800px] flex flex-col items-center gap-6">
              
              <div className="w-64 bg-gray-50 border border-gray-200 p-4 rounded-xl text-center shadow-sm">
                <div className="font-bold text-gray-900">UPLOAD CONTENT</div>
                <div className="text-sm text-gray-500">Video / Image / PDF / Audio</div>
              </div>
              
              <div className="h-8 border-l-2 border-dashed border-gray-300"></div>
              
              <div className="w-64 bg-gray-50 border border-gray-200 p-4 rounded-xl text-center shadow-sm">
                <div className="font-bold text-gray-900">CONTENT ANALYSIS</div>
                <div className="text-sm text-gray-500">Extract frames/audio + metadata</div>
              </div>

              <div className="h-8 border-l-2 border-dashed border-gray-300 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 border-t-2 border-dashed border-gray-300"></div>
              </div>

              <div className="flex gap-8 justify-center w-full">
                <div className="w-48 bg-orange-50 border border-orange-200 p-3 rounded-xl text-center shadow-sm text-orange-900 font-semibold text-sm">VIDEO AGENT</div>
                <div className="w-48 bg-[#E6F4EA] border border-[#0F7642]/20 p-3 rounded-xl text-center shadow-sm text-[#0F7642] font-semibold text-sm">METADATA AGENT</div>
                <div className="w-48 bg-blue-50 border border-blue-200 p-3 rounded-xl text-center shadow-sm text-blue-900 font-semibold text-sm">AUDIO AGENT</div>
              </div>

              <div className="h-8 flex justify-center w-full relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 border-t-2 border-dashed border-gray-300"></div>
                <div className="border-l-2 border-dashed border-gray-300 h-full"></div>
              </div>

              <div className="w-64 bg-gray-900 border border-gray-800 p-4 rounded-xl text-center shadow-md">
                <div className="font-bold text-white">AI FORENSIC CORE</div>
                <div className="text-sm text-gray-400">Combine all signals</div>
              </div>

              <div className="h-8 border-l-2 border-dashed border-gray-300"></div>

              <div className="w-64 bg-white border-2 border-[#0F7642] p-4 rounded-xl text-center shadow-lg transform hover:scale-105 transition-transform">
                <div className="font-bold text-gray-900">REALITY SCORE</div>
                <div className="text-lg text-[#0F7642] font-black">96% Authentic</div>
              </div>

              <div className="h-8 border-l-2 border-dashed border-gray-300"></div>

              <div className="w-64 bg-gray-50 border border-gray-200 p-4 rounded-xl text-center shadow-sm">
                <div className="font-bold text-gray-900">SHA-256 HASH</div>
                <div className="text-xs text-gray-500 font-mono mt-1 break-all">A91F7C82D9E4...</div>
              </div>

              <div className="h-8 border-l-2 border-dashed border-gray-300"></div>

              <div className="w-64 bg-purple-50 border border-purple-200 p-4 rounded-xl text-center shadow-sm">
                <div className="font-bold text-purple-900">SMART CONTRACT</div>
                <div className="text-sm text-purple-700">Hash + Score + Time</div>
              </div>

              <div className="h-8 border-l-2 border-dashed border-gray-300"></div>

              <div className="w-64 bg-white border border-gray-200 p-4 rounded-xl text-center shadow-sm">
                <div className="font-bold text-gray-900 flex justify-center items-center gap-2">
                  <span className="text-xl">⛓️</span> BLOCKCHAIN
                </div>
              </div>

              <div className="h-8 border-l-2 border-dashed border-gray-300"></div>

              <div className="w-64 bg-yellow-50 border border-yellow-300 p-4 rounded-xl text-center shadow-md relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-12 h-12 bg-yellow-200 rotate-45"></div>
                <div className="font-bold text-yellow-900">AUTHENTICITY CERTIFICATE</div>
              </div>

              <div className="h-8 border-l-2 border-dashed border-gray-300"></div>

              <div className="text-sm font-bold text-gray-500 tracking-widest uppercase">
                PUBLIC VERIFICATION
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIX LAYERS */}
      <section className="py-24 bg-white border-y border-gray-100 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Six Layers of Verification</h2>
            <p className="text-gray-500 text-lg max-w-2xl">A step-by-step breakdown of how the Proof-of-Reality architecture establishes trust.</p>
          </div>

          <div className="space-y-24">
            {/* Layer 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Layer 1</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Content Ingestion</h3>
                <h4 className="text-xl font-semibold text-[#0F7642] mb-4">Your Content Enters the System</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Users can upload Video, Audio, Image, or PDF documents. The system first creates a secure processing session and records basic information such as file type, size, name, and upload time. 
                  <br/><br/>
                  The original file can remain off-chain while the blockchain only stores its cryptographic fingerprint, preserving privacy and saving space.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 font-mono text-sm text-gray-700 shadow-inner">
                <div className="text-gray-400 mb-2">// Session Initialization</div>
                <div className="flex justify-between border-b border-gray-200 py-2"><span>File Type:</span> <span className="font-bold text-blue-600">video/mp4</span></div>
                <div className="flex justify-between border-b border-gray-200 py-2"><span>File Size:</span> <span className="font-bold">24.5 MB</span></div>
                <div className="flex justify-between border-b border-gray-200 py-2"><span>Upload Time:</span> <span className="font-bold">2026-08-27T10:00:00Z</span></div>
                <div className="flex justify-between py-2"><span>Initial Hash:</span> <span className="font-bold text-green-600 truncate max-w-[150px]">A91F7C82...</span></div>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
              <div className="order-2 md:order-1 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative">
                 <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-[#0F7642] to-blue-500 rounded-3xl blur opacity-20"></div>
                 <div className="relative bg-white rounded-2xl p-6">
                    <h5 className="font-bold text-gray-900 mb-4 border-b pb-2">Forensic Agents</h5>
                    
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1"><span className="text-orange-500">🎥</span> <strong className="text-gray-800">Video Agent</strong></div>
                      <p className="text-xs text-gray-500 pl-6">Frame consistency, face manipulation, lighting artifacts.</p>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1"><span className="text-blue-500">🎙️</span> <strong className="text-gray-800">Audio Agent</strong></div>
                      <p className="text-xs text-gray-500 pl-6">Voice consistency, synthetic patterns, spectrogram anomalies.</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1"><span className="text-[#0F7642]">📋</span> <strong className="text-gray-800">Metadata Agent</strong></div>
                      <p className="text-xs text-gray-500 pl-6">Creation timestamps, device info, encoding inconsistencies.</p>
                    </div>
                 </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Layer 2</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Multimodal Forensic Analysis</h3>
                <h4 className="text-xl font-semibold text-[#0F7642] mb-4">One File. Multiple Forensic Agents.</h4>
                <p className="text-gray-600 leading-relaxed">
                  Instead of asking one AI model to decide everything, different analyzers examine different evidence. This multi-agent approach provides <strong>multiple independent signals</strong> instead of relying on a single prediction, drastically reducing false positives and identifying complex manipulation techniques like deepfakes and audio cloning.
                </p>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Layer 3</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">AI Forensic Core</h3>
                <h4 className="text-xl font-semibold text-[#0F7642] mb-4">Turning Evidence Into a Reality Score</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  The different analysis results are sent to a central forensic engine. The core orchestrator combines the confidence levels of the different agents into a single <strong>Reality Score</strong>.
                </p>
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                  <p className="text-sm text-orange-900">
                    <strong>Important:</strong> The Reality Score is a <em>confidence assessment</em> based on available forensic evidence, not an absolute proof that something is real.
                  </p>
                </div>
              </div>
              <div className="bg-gray-900 text-gray-300 p-6 rounded-2xl font-mono text-sm shadow-2xl">
                <div className="flex justify-between py-1"><span>Source Authenticity</span> <span className="text-green-400">96%</span></div>
                <div className="flex justify-between py-1"><span>Device Consistency</span> <span className="text-green-400">99%</span></div>
                <div className="flex justify-between py-1"><span>Temporal Consistency</span> <span className="text-green-400">94%</span></div>
                <div className="flex justify-between py-1"><span>Metadata Integrity</span> <span className="text-green-400">100%</span></div>
                <div className="flex justify-between py-1 border-b border-gray-700 pb-3 mb-3"><span>AI Manipulation</span> <span className="text-red-400">3%</span></div>
                <div className="flex justify-between text-lg font-bold text-white"><span>REALITY SCORE:</span> <span>96%</span></div>
              </div>
            </div>

            {/* Layer 4 */}
            <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
              <div className="order-2 md:order-1 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-gray-700">Original File</span>
                  <span className="text-2xl">📄</span>
                </div>
                <div className="text-center text-gray-400 mb-2">↓ SHA-256 ↓</div>
                <div className="bg-white border border-gray-200 p-3 rounded text-center font-mono text-green-600 font-bold mb-6 break-all shadow-sm">
                  A91F7C82D9E4...
                </div>
                
                <div className="border-t border-gray-200 my-4"></div>

                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-gray-700">Modified File (1 pixel changed)</span>
                  <span className="text-2xl">📄<span className="text-red-500">*</span></span>
                </div>
                <div className="text-center text-gray-400 mb-2">↓ SHA-256 ↓</div>
                <div className="bg-white border border-gray-200 p-3 rounded text-center font-mono text-red-600 font-bold break-all shadow-sm">
                  72BC19F4A821...
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Layer 4</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Cryptographic Fingerprinting</h3>
                <h4 className="text-xl font-semibold text-[#0F7642] mb-4">Every File Gets a Digital Fingerprint</h4>
                <p className="text-gray-600 leading-relaxed">
                  This is where the cryptography starts. Your system generates a strict SHA-256 hash. Think of this as the digital fingerprint of the exact file. If a single pixel or audio byte changes, the entire fingerprint changes. This ensures the system can verify if a presented file is the exact same one that was originally analyzed.
                </p>
              </div>
            </div>

            {/* Layer 5 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Layer 5</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Blockchain Verification</h3>
                <h4 className="text-xl font-semibold text-[#0F7642] mb-4">Blockchain Doesn't Decide Reality</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Blockchain does <strong>not</strong> look at a video and say "This video is real." Your AI system does that. 
                  <br/><br/>
                  The blockchain's job is simple but critical: <em>"Preserve a tamper-resistant record of what was analyzed, what fingerprint it had, what result was produced, and when it happened."</em>
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-100 p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-purple-200 rounded-bl-full opacity-50"></div>
                <div className="relative z-10 font-mono text-sm text-purple-900">
                  <div className="text-purple-500 mb-4">// Smart Contract Entry</div>
                  <div className="mb-2"><strong>ID:</strong> POR-00124</div>
                  <div className="mb-2"><strong>Hash:</strong> A91F7C82D9E4...</div>
                  <div className="mb-2"><strong>Score:</strong> 96%</div>
                  <div className="mb-2"><strong>Verdict:</strong> High Confidence Authentic</div>
                  <div className="mb-2"><strong>Timestamp:</strong> 27 Aug 2026</div>
                </div>
              </div>
            </div>

            {/* Layer 6 */}
            <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
              <div className="order-2 md:order-1 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-4">
                <div className="flex justify-between items-center bg-green-50 p-4 rounded-xl border border-green-200">
                   <div className="flex flex-col">
                     <span className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Match Successful</span>
                     <span className="font-mono text-sm text-green-700">Current = Blockchain Hash</span>
                   </div>
                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl">✓</div>
                </div>
                <div className="flex justify-between items-center bg-red-50 p-4 rounded-xl border border-red-200">
                   <div className="flex flex-col">
                     <span className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Hash Mismatch</span>
                     <span className="font-mono text-sm text-red-700">Current ≠ Blockchain Hash</span>
                   </div>
                   <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xl">✕</div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Layer 6</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Public Verification</h3>
                <h4 className="text-xl font-semibold text-[#0F7642] mb-4">Verify the Proof Anytime</h4>
                <p className="text-gray-600 leading-relaxed">
                  Anyone can later enter the Verification ID or upload the file again. The system recalculates the hash and compares it with the blockchain record. If it matches, the content is exactly as originally analyzed. If it doesn't, the content has been modified since it was verified.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. AI VS BLOCKCHAIN */}
      <section className="py-24 bg-gray-900 text-white px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Three Technologies, Three Jobs.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Understanding the separation of concerns in our architecture.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
             <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors">
               <div className="text-4xl mb-4">🤖</div>
               <h3 className="text-xl font-bold text-white mb-2">AI Layer</h3>
               <p className="text-gray-400 text-sm mb-4 italic">"Analyze Reality"</p>
               <p className="text-gray-300">Detect manipulation and calculate Reality Score using multimodal forensic signals.</p>
             </div>
             
             <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors">
               <div className="text-4xl mb-4">🔐</div>
               <h3 className="text-xl font-bold text-white mb-2">Cryptographic Layer</h3>
               <p className="text-gray-400 text-sm mb-4 italic">"Identify Content"</p>
               <p className="text-gray-300">Create a strict, unique SHA-256 fingerprint of the exact file structure.</p>
             </div>

             <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors">
               <div className="text-4xl mb-4">⛓️</div>
               <h3 className="text-xl font-bold text-white mb-2">Blockchain Layer</h3>
               <p className="text-gray-400 text-sm mb-4 italic">"Preserve Proof"</p>
               <p className="text-gray-300">Preserve and verify the immutable fingerprint and verification record forever.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 5. REAL-WORLD EXAMPLE & CERTIFICATE */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Scenario: News Video</h2>
              <div className="prose prose-lg text-gray-600">
                <p>A journalist receives a suspicious video claiming to show an important event. They upload it.</p>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 my-4 text-sm font-mono text-gray-700">
                  Video → AI Forensic Core → Reality Score: 92% → SHA-256 Hash → Blockchain → Certificate
                </div>
                <p>Later, someone downloads the verified video, edits a few frames to change the context, and uploads the edited version to social media.</p>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 my-4 text-sm font-mono text-gray-700">
                  Edited Video → New SHA-256 Hash → Blockchain Comparison → ❌ HASH MISMATCH
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6 rounded-r-lg">
                  <p className="text-blue-900 m-0">
                    The blockchain hasn't "detected the fake." It has helped prove: <strong>The file currently being presented is not the same file that was previously registered by the journalist.</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              {/* Authenticity Certificate Mockup */}
              <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="bg-[#0F7642] p-6 text-center text-white relative">
                   <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-bl-full"></div>
                   <h3 className="text-lg font-bold tracking-widest uppercase mb-1">Proof-of-Reality</h3>
                   <p className="text-sm text-green-100">Authenticity Certificate</p>
                </div>
                <div className="p-6 space-y-4 font-mono text-sm">
                  <div>
                    <div className="text-gray-400 text-xs mb-1 uppercase">Verification ID</div>
                    <div className="font-bold text-gray-900">POR-2026-00124</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1 uppercase">Reality Score</div>
                    <div className="font-bold text-[#0F7642] text-xl">96%</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1 uppercase">Verdict</div>
                    <div className="font-bold text-gray-900">HIGH CONFIDENCE AUTHENTIC</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1 uppercase">Content Hash</div>
                    <div className="text-gray-600 break-all text-xs">A91F7C82D9E4B3F1...</div>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-gray-400 text-xs uppercase">Blockchain Status</div>
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span> VERIFIED
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-32 bg-[#0F7642] text-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Don't Just See It. <span className="text-green-300 italic">Prove It.</span></h2>
          <p className="text-xl text-green-50 mb-10">Upload a file, get your Reality Score, and create a verifiable proof.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload" className="bg-white text-[#0F7642] font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl text-lg">
              Start Verification
            </Link>
            <Link href="/verify" className="bg-transparent border border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-colors text-lg">
              Verify Existing Record
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
