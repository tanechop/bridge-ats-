import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, LogOut, Building2, MapPin, Clock } from 'lucide-react';

const JOBS = [
  {
    id: 1,
    title: "Senior Content Designer",
    company: "Nebula Systems",
    location: "Remote (EST)",
    salary: "$140k - $185k",
    posted: "2 days ago",
    tags: ["UX Writing", "Strategic Design"],
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8U1jHCfp3cDMF6rWQDH849Q9eC5wWvN3SfJ4YYkRpgWZYjgmdqW0L6CJtgK9Wh9Be3U8b5NWI0JbwERByxBuMFEc88ycIjZTWfI8j5h0oxeYcbVn9xvASGF3vdNeCG15fsPAfGGs8nbz4gNC1il2CGGPBeZHnUnp0NijuMrGGPlV95qpnNGX4BhFdiorMTD2nmkBqKoOuq1BL16PSBesb-KrGE275pueBmLgLSJHZY0KgY9mYxK9ZvR6aDjZIBjVKu69jG4CcWqxi"
  },
  {
    id: 2,
    title: "Lead Editorial Strategist",
    company: "Lumina Creative",
    location: "New York, NY",
    salary: "$165k - $210k",
    posted: "4 hours ago",
    tags: ["Leadership", "Editorial Ops"],
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQItQgwOw20EsTsNyThzmD1ID_hG1B9lM0c1VXzyMGT-rDGJRZXQtkuDV7ULJGWNN17AHkGv0Wm6ggqDpyww95tBvw9CDBPfeGk5GPGMRnHnSz3HT9mXi1tnZ5pD6iULI_aW4Hz9bqUTnata6PNEiXtadNKNdsMXdUmAnmFmidT-C5QxDJMca1mwk-IO1yeX-kvTAK3cIeP7L-5MHT_FcgJ8yEQFaW17LT1DTRx7eh0an8PniJ5x9fAK5-WBp0LZGQoN_wFK4yWdjd"
  },
  {
    id: 3,
    title: "UX Research Lead",
    company: "Synthetix Labs",
    location: "Austin, TX (Hybrid)",
    salary: "$155k - $190k",
    posted: "1 week ago",
    tags: ["Research", "Data Viz"],
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBI8x6auzFNKi389iz7vlvhn9qBtQ8O74_yeyFZtEatD0PJLo7vs3fzo4i7JOh3OQvuEv8M-ToA83kkETtZSF0e4S6Pli6TLGKzO-aqwHzBvTMggCOQnq8_m3Fz-Qhc7_8FLvFqOd66Ykse8Uut5TwVzAHYm_JsVEEWLJnDeH8t9JIft6Ocwp-X_z2O8Xz_V2-YSkrdqyuYoawrgvuRuYmVr41WWKxHhRCNcOfnoS-fjSiKHN-kmXHTjW2oIfChy0hsIIHAd5AAmnSb"
  }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6 max-w-7xl mx-auto bg-surface">
      {/* Profile Summary */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
          <div>
            <span className="text-[10px] text-on-surface-variant tracking-[0.2em] uppercase mb-2 block font-bold">CANDIDATE DOSSIER</span>
            <h1 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight mb-2">Alexander Thorne</h1>
            <p className="text-lg text-secondary max-w-lg">Senior Editorial Strategist & Content Designer based in New York. Specializing in high-growth tech narratives.</p>
          </div>
          <div className="flex gap-2">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">Open to Work</span>
            <span className="bg-surface-container-high text-on-surface-variant px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">Product Design</span>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="mb-16">
        <div className="relative group max-w-3xl">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="text-outline" size={24} />
          </div>
          <input 
            className="w-full bg-surface-container-highest border-none outline outline-2 outline-outline-variant/20 rounded-full py-6 pl-16 pr-8 text-lg focus:outline-surface-tint focus:ring-4 focus:ring-surface-tint/5 transition-all placeholder:text-outline" 
            placeholder="Search for jobs, companies, or roles..." 
            type="text"
          />
          <button className="absolute inset-y-2 right-2 px-8 rounded-full bg-hero-gradient text-white font-bold text-sm tracking-tight active:scale-95 transition-transform">
            Discover Roles
          </button>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low rounded-xl p-8 editorial-shadow">
            <h3 className="text-lg font-bold mb-6 text-on-surface">Application Pipeline</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-surface-tint"></div>
                  <span className="text-sm font-medium">Interviews</span>
                </div>
                <span className="font-bold text-surface-tint">04</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></div>
                  <span className="text-sm font-medium">Offer Pending</span>
                </div>
                <span className="font-bold">01</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/10 opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-outline-variant"></div>
                  <span className="text-sm font-medium">Applied</span>
                </div>
                <span className="font-bold">12</span>
              </div>
            </div>
          </div>

          
        </div>

        {/* Right Column: Jobs */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-on-surface">Curated Opportunities</h2>
            <button className="text-surface-tint text-xs font-bold tracking-widest uppercase hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {JOBS.map((job) => (
              <Link to={`/job/${job.id}`} key={job.id} className="block group bg-surface-container-lowest p-6 rounded-xl hover:shadow-lg transition-all border border-transparent hover:border-surface-tint/10">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-16 h-16 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
                    <img 
                      alt={job.company} 
                      className="w-10 h-10 object-contain" 
                      src={job.logo}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-lg font-bold text-on-surface group-hover:text-surface-tint transition-colors">{job.title}</h4>
                      <span className="text-lg font-bold text-on-surface">{job.salary}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                      <div className="flex items-center gap-1 text-secondary text-sm">
                        <Building2 size={14} /> {job.company}
                      </div>
                      <div className="flex items-center gap-1 text-secondary text-sm">
                        <MapPin size={14} /> {job.location}
                      </div>
                      <div className="flex items-center gap-1 text-secondary text-sm">
                        <Clock size={14} /> {job.posted}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {job.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold tracking-widest uppercase rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
