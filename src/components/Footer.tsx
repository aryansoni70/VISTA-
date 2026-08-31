export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060a14]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Proof-of-Reality
              </span>
            </div>
            <p className="text-sm text-white/40 max-w-xs">
              Creating a verifiable chain of trust around digital content using AI forensics and blockchain technology.
            </p>
          </div>

          {/* Technology */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-4">Technology</h3>
            <ul className="space-y-2 text-sm text-white/40">
              <li>AI Forensic Engine</li>
              <li>SHA-256 Content Fingerprinting</li>
              <li>Polygon Blockchain</li>
              <li>Public Verification</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-white/40">
              <li>
                <a href="https://c2pa.org" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
                  C2PA Standard
                </a>
              </li>
              <li>
                <a href="https://amoy.polygonscan.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
                  Polygon Amoy Explorer
                </a>
              </li>
              <li>
                <a href="https://ethereum.org" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
                  Ethereum Docs
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Proof-of-Reality Network. Built for hackathon demonstration.
          </p>
          <p className="text-xs text-white/30">
            AI Detection • Digital Fingerprinting • Blockchain Provenance
          </p>
        </div>
      </div>
    </footer>
  );
}
