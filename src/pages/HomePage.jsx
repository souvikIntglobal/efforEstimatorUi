import React, { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
// Add lucide-react imports
import {
  Zap, AlignLeft, ShieldCheck, User, Workflow, Network, GitBranch, Activity, BarChart3, CalendarCheck,
  UploadCloud, Command, Palette, Code, Database, Sparkles, MapPinned, ChevronDown, CheckCircle2, ChevronRight,
  Share2, Github, Trello, ListTree, Layers, Maximize2, Layout, Send, Download
} from "lucide-react";

export default function HomePage() {
  // Sidebar state
  const [sidebarClosed, setSidebarClosed] = useState(true);
  const [result, setResult] = useState(null);
  // File upload state
  const [fileName, setFileName] = useState("");
  // Analysis overlay and results state
  const [analysisOverlay, setAnalysisOverlay] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const fileInputRef = useRef(null);
  const uploadStageRef = useRef(null);
  const resultsRef = useRef(null);

  // Toggle sidebar
  function toggleSidebar() {
    setSidebarClosed((prev) => !prev);
  }

  // Update file status
  function updateFileStatus(e) {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  }
  // Trigger analysis
  async function triggerAnalysis() {
    console.log("Triggering AI analysis...");
    setAnalysisOverlay(true);
    try {
      console.log("Triggering AI analysis... for api");
      const response = await fetch("http://localhost:3000/api/analyze-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      });
      const data = await response.json();
      setResult(data.structureAnalysisData);
      setShowResults(true);
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: "smooth" });
      }
      // Log the fetch response for debugging
      console.log("AI Analysis Response:", data.structureAnalysisData);

      // CORS warning is only a browser info message if you get a valid response and data.
      // If status is 200 and ok is true, you can proceed as normal.
    } catch (err) {
      alert("Service is currently unavailable. Please try again later.");
      console.error("Error during analysis:", err);
    }
    setAnalysisOverlay(false);
  }

  // Toggle details for roadmap items
  function toggleDetails(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle("hidden");
    }
  }

  // Utility function to convert hours (float) to "X hrs Y mins"
  function formatHoursMinutes(hours) {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h} hrs${m > 0 ? ` ${m} mins` : ""}`;
  }

  return (
    <>
      <div className="bokeh" style={{ top: "-100px", left: "-100px" }} />
      <div className="bokeh" style={{ bottom: "-100px", right: "-100px", animationDelay: "-5s" }} />
      <Sidebar sidebarClosed={sidebarClosed} toggleSidebar={toggleSidebar} />
      <main className="transition-all duration-400">
        <nav className="px-8 py-4 flex justify-between items-center glass-header sticky top-0 z-40">
          <div className="flex items-center gap-6">
            <button className="p-2 hover:bg-slate-100 rounded-xl transition-all" onClick={toggleSidebar}>
              <AlignLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div className="hidden md:flex items-center gap-4 text-xs font-bold text-slate-400 border-l pl-6 border-slate-200">
              <div className="flex items-center gap-2 status-pill px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                AI CORE: ONLINE
              </div>
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-slate-500 border border-slate-200">
                <ShieldCheck className="w-3 h-3" /> ENCRYPTED
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Usage Quota
              </p>
              <div className="w-24 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                <div className="bg-indigo-500 h-full w-2/3" />
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
              <User className="w-5 h-5" />
            </div>
          </div>
        </nav>
        <div className="px-8 pt-8">
          <div className="pro-banner rounded-[3rem] p-12 text-white relative shadow-2xl shadow-indigo-200/20">
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <pattern id="grid" width={40} height={40} patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="flex-1">
                <h1 className="text-5xl font-black mb-4 tracking-tight">
                  Intelligent Effort <br />
                  <span className="text-indigo-400">Synthesis.</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                  Upload your PRD, technical docs, or wireframes. Our AI deconstructs your vision into actionable modules, time stamps, and technical stories in seconds.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 text-center w-36">
                  <p className="text-[10px] font-bold text-indigo-300 uppercase">Tokens</p>
                  <p className="text-3xl font-bold">14.2k</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 text-center w-36">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase">Accuracy</p>
                  <p className="text-3xl font-bold">99%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section id="upload-stage" className={`max-w-6xl mx-auto px-8 py-16${showResults ? " hidden" : ""}`} ref={uploadStageRef}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div
              id="dropzone"
              className="bg-white/60 backdrop-blur-md rounded-[3rem] p-12 border-2 border-dashed border-indigo-100 hover:border-indigo-400 transition-all cursor-pointer text-center group flex flex-col justify-center min-h-[450px]"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <input
                type="file"
                id="fileInput"
                className="hidden"
                ref={fileInputRef}
                onChange={updateFileStatus}
              />
              <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-indigo-600 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Requirements Document
              </h3>
              <p className="text-slate-400 text-sm mb-10">
                Drop PDF, DOCX or JPG here
              </p>
              {fileName && (
                <div
                  id="file-name-display"
                  className="mb-6 p-3 bg-indigo-600 text-white text-xs font-bold rounded-2xl shadow-lg"
                >
                  STAGED: {fileName}
                </div>
              )}
              <button
                className="px-8 py-4 bg-white border-2 border-slate-100 rounded-2xl text-sm font-bold hover:shadow-xl transition-all"
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  fileInputRef.current && fileInputRef.current.click();
                }}
              >
                Browse Explorer
              </button>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-[3rem] p-12 flex flex-col min-h-[450px]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                  <Command className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  Prompt Engineering
                </h3>
              </div>
              <textarea
                id="userInstructions"
                className="custom-input flex-1 w-full bg-white/50 rounded-3xl p-6 text-sm text-slate-600 border border-slate-100 placeholder:text-slate-300 resize-none transition-all"
                placeholder="Define specific constraints... e.g. 'Use AWS Lambda infrastructure, prioritize high-security authentication modules first...'"
                defaultValue={""}
              />
              <button
                className="mt-10 w-full py-5 bg-indigo-600 text-white rounded-3xl font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center gap-4"
                type="button"
                onClick={triggerAnalysis}
              >
                GENERATE EXTRACTION
                <Zap className="w-6 h-6" />
              </button>
            </div>
          </div>
          {/* Analysis Overlay */}
          {analysisOverlay && (
            <div
              id="analysis-overlay"
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[200] flex items-center justify-center"
            >
              <div className="bg-white p-12 rounded-[3rem] text-center max-w-sm mx-4 shadow-2xl">
                <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">
                  Processing Context
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  The AI is cross-referencing your instructions with the provided
                  documentation...
                </p>
              </div>
            </div>
          )}
        </section>
        {result && (
          <section
            id="analysis-results"
            className={`${showResults ? "show-section" : "hidden-section"} px-8 py-12 max-w-7xl mx-auto`}
            ref={resultsRef}
          >
            <div class="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
              <div class="animate-in fade-in duration-700">
                <div class="flex items-center gap-3 mb-2">
                  <span
                    class="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-full uppercase tracking-tighter">Analysis
                    Complete</span>
                  <span class="text-slate-400 text-xs font-medium italic">Ref: {result?.projectId}</span>
                </div>
                <h2 class="text-4xl font-black text-slate-900 tracking-tight">Intelligence Dashboard</h2>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
                <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 text-center min-w-[120px]">
                  <p class="text-[9px] font-bold text-slate-400 uppercase mb-1">Total Effort</p>
                  <p class="text-xl font-black text-indigo-600">{result?.totalProjectEffort}h</p>
                </div>
                <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 text-center min-w-[120px]">
                  <p class="text-[9px] font-bold text-slate-400 uppercase mb-1">Timeline</p>
                  <p class="text-xl font-black text-rose-500">{result?.totalProjectEffort / 8}d</p>
                </div>
                <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 text-center min-w-[120px]">
                  <p class="text-[9px] font-bold text-slate-400 uppercase mb-1">Sprints</p>
                  <p class="text-xl font-black text-slate-900">{result?.roadmap.length}</p>
                </div>
                <div class="bg-indigo-600 p-5 rounded-3xl shadow-lg text-center min-w-[120px] text-white">
                  <p class="text-[9px] font-bold text-indigo-200 uppercase mb-1">Challenging</p>
                  <p class="text-xl font-black">{result?.totalProjectEffort}%</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-8">

              {/* PARENT COLUMN 1: Technical & Engineering */}
              <div className="col-span-12 lg:col-span-8 space-y-6 overflow-hidden">

                {/* THE SLIDER CONTAINER */}
                <div className="flex flex-nowrap gap-6 overflow-x-auto pb-10 snap-x no-scrollbar">

                  {result.optimizedModules.map((module, index) => {
                    const totalHours = module.total_estimated_hours;

                    return (
                      <div
                        key={index}
                        className="w-[350px] min-w-[350px] bg-white rounded-[3rem] border-4 border-slate-100 shadow-sm hover:shadow-2xl transition-all snap-start shrink-0 flex flex-col"
                      >
                        {/* Header Section - Fixed Height */}
                        <div className="p-8 pb-4">
                          <div className="flex justify-between items-start mb-6">
                            <div className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500 uppercase rounded-2xl">
                              {module.category || 'Module'}
                            </div>
                          </div>
                          <h3 className="font-black text-xl text-slate-800 leading-tight h-14 line-clamp-2">
                            {module.module_name}
                          </h3>
                        </div>

                        {/* Sub-Tasks Section - Uniform Height with internal scroll if tasks are many */}
                        <div className="px-8 flex-grow">
                          <div className="space-y-3 h-48 overflow-y-auto pr-2 no-scrollbar">

                            <div className="flex flex-col gap-1 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="flex justify-between items-center">
                                  <span className="text-[11px] font-bold text-slate-700 w-4/5">
                                    Project Understanding & Requirement Analysis Timeline
                                  </span>
                                  <span className="text-[11px] font-black text-indigo-600">
                                    {module.requirement_analysis_hours}hrs
                                  </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="flex justify-between items-center">
                                  <span className="text-[11px] font-bold text-slate-700 w-4/5">
                                    Project Setup & Initial Architecture Design Timeline
                                  </span>
                                  <span className="text-[11px] font-black text-indigo-600">
                                    {module.basic_setup_hours}hrs
                                  </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                              <div className="flex justify-between items-start">
                                
                                {/* Container for Task Names */}
                                <div className="flex flex-wrap gap-2 w-4/5">
                                  {module?.sub_tasks.map((subtask, subIndex) => (
                                    <span 
                                      key={subIndex}
                                      className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-medium rounded-md shadow-sm"
                                    >
                                      {subtask.task_name}
                                    </span>
                                  ))}
                                </div>

                                {/* Time Badge */}
                                <span className="text-[11px] font-black text-indigo-600">
                                  {module.task_effort_hours}hrs
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Footer Section - Fixed at bottom */}
                        <div className="p-8 pt-4">
                          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400 uppercase">Est. Total</span>
                            <span className="text-2xl font-black text-slate-900">
                              {totalHours}<span className="text-sm font-bold text-slate-400 ml-1">hrs</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="col-span-12 lg:col-span-4 space-y-6">
                <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 blur-3xl" />

                  <div>
                    <div className="flex justify-between items-start mb-10 relative z-10">
                      <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-500/50">
                        <Sparkles />
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Experimental</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">AI ENGINE</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-2xl mb-2">User Intelligence</h3>
                    <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                      Behavior tracking, ML recommendation engine, and automated user journey optimization.
                    </p>

                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-slate-300">
                        <span>Data Analytics</span>
                        <span className="font-mono">18h</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-300">
                        <span>ML Integration</span>
                        <span className="font-mono">25h</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-6 border-t border-slate-700 flex justify-between items-end font-bold">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase mb-1">Total AI Effort</p>
                      <span className="text-3xl text-indigo-400">43 Hours</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-1 rounded">High Accuracy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 space-y-8">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <MapPinned className="text-indigo-600 w-7 h-7" />
                Strategic Implementation Roadmap
              </h3>
              <div className="space-y-6">
                {result.roadmap.map((item, idx) => {
                  return (
                    <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden">
                      <div className="p-8">
                        <div className="flex flex-col lg:flex-row justify-between gap-6">
                          <div className="flex gap-6">
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-200">
                                {idx + 1}
                              </div>
                              <div className="w-1 h-full bg-slate-50 mt-4 rounded-full" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-md border border-rose-100 uppercase">
                                  {item.priority || 'Medium Priority'}
                                </span>
                                <span className="text-slate-400 text-xs font-medium">
                                  {item.sprint} • {item.sprint_module}
                                </span>
                              </div>
                              <h4 className="text-xl font-bold text-slate-800">
                                {item.title}
                              </h4>
                              <p className="text-sm text-slate-500 mt-2 max-w-xl">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex lg:flex-col justify-between items-end text-right min-w-[140px]">
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Est. Effort
                              </p>
                              <p className="text-2xl font-black text-indigo-600">
                                {formatHoursMinutes(result.totalProjectEffort * item.effort_percentage / 100)} 
                              </p>
                            </div>
                            <button
                              //onClick={() => setRoadmap('details-1')}
                              className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 bg-slate-50 px-4 py-2 rounded-xl transition-all"
                            >
                              More Details{" "}
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div
                        id="details-1"
                        className=" bg-slate-50/50 border-t border-slate-100 p-8 animate-in slide-in-from-top-4 duration-300"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div>
                            <h5 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                              Acceptance Criteria
                            </h5>
                            <ul className="space-y-3">
                              {item?.acceptanceCriteria?.map((criteria, idx) => (
                              <li className="flex items-start gap-3 text-sm text-slate-600">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                                <span>
                                  {criteria}
                                </span>
                              </li>
                              ))}
                            </ul>
                          </div>
                          {item?.subTimeline && (
                          <div>
                            <h5 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                              Sub-Task Timeline
                            </h5>
                            <div className="space-y-4">
                              {item.subTimeline.map((subtask, subIdx) =>(
                              <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                                <span className="text-xs font-bold text-slate-700">
                                  {subtask.task}
                                </span>
                              </div>
                              ))}
                            </div>
                          </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}

              </div>
            </div>
          </section>
        )}

      </main>
    </>
  );
}
