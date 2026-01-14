import { Zap, X } from "lucide-react";
export default function Sidebar({ sidebarClosed, toggleSidebar }) {
    return (
        <aside
            id="sidebar"
            className={`fixed left-0 top-0 h-screen w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200${sidebarClosed ? " -translate-x-full" : ""}`}
            style={{ transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
        >
            <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                            <Zap className="w-4 h-4" />
                        </div>
                        <span className="text-lg font-bold">
                            Estimate<span className="text-indigo-600">AI</span>
                        </span>
                    </div>
                    <button className="p-1 hover:bg-slate-100 rounded-md" onClick={toggleSidebar}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Saved Projects
                </p>
                <div className="space-y-2">
                    <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                        <p className="text-xs font-bold text-indigo-700">
                            Project_Delta_Spec
                        </p>
                        <p className="text-[9px] text-indigo-400 font-medium">
                            184h • 4 Modules
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}