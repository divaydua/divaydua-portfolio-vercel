"use client";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { AuthContext } from "./AuthProvider";

// Helper to format date as MM/YYYY
function formatMonthYear(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { month: "2-digit", year: "numeric" });
}

export default function Home() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [name, setName] = useState("Divay Dua");
  const [bio, setBio] = useState("I'm a software engineer with a love for building beautiful, functional, and impactful digital experiences. My journey spans web development, UI/UX design, and creative coding. I thrive on solving problems and bringing ideas to life.");
  const [avatarUrl, setAvatarUrl] = useState("/profile-placeholder.png");

  // Projects state
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Project 1",
      description: "Description for Project 1",
      url: "https://example.com/project1",
      imageUrl: "/project-placeholder.png",
      techStack: "React, Node.js, MongoDB",
    },
    {
      id: 2,
      name: "Project 2",
      description: "Description for Project 2",
      url: "https://example.com/project2",
      imageUrl: "/project-placeholder.png",
      techStack: "Next.js, Tailwind CSS",
    },
  ]);

  // Experience state
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "Software Engineer",
      company: "Acme Corp",
      location: "Remote",
      startDate: "2022-01-01",
      endDate: "2023-01-01",
      description: "Worked on building scalable web applications and leading a small team of developers.",
    },
  ]);

  // Skills state
  const [skills, setSkills] = useState([
    { id: 1, name: "JavaScript", level: "Expert" },
    { id: 2, name: "React", level: "Advanced" },
    { id: 3, name: "Node.js", level: "Advanced" },
    { id: 4, name: "UI/UX Design", level: "Intermediate" },
  ]);

  // Education state
  const [educations, setEducations] = useState([
    {
      id: 1,
      school: "XYZ University",
      degree: "B.Tech in Computer Science",
      field: "Software Engineering",
      startDate: "2018-08-01",
      endDate: "2022-06-01",
      description: "Graduated with honors, specialized in software engineering and web development.",
    },
  ]);

  // Trainings state
  const [trainings, setTrainings] = useState([
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon",
      issueDate: "2023-01-01",
      expiryDate: "2026-01-01",
      url: "https://aws.amazon.com/certification/",
    },
  ]);

  // Languages state
  const [languages, setLanguages] = useState([
    { id: 1, name: "English", proficiency: "Fluent" },
    { id: 2, name: "Hindi", proficiency: "Native" },
  ]);

  // All add/edit/delete handlers for each section should update the above state directly.
  // Remove all fetch, API, and Prisma logic from the file.

  // Project modal state
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<typeof projects[0] | null>(null);
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    url: "",
    imageUrl: "",
    techStack: "",
  });

  // Experience modal state
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<typeof experiences[0] | null>(null);
  const [experienceForm, setExperienceForm] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // Skills modal state
  const [skillsModalOpen, setSkillsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<typeof skills[0] | null>(null);
  const [skillForm, setSkillForm] = useState({
    name: "",
    level: "",
  });

  // Education modal state
  const [educationModalOpen, setEducationModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<typeof educations[0] | null>(null);
  const [educationForm, setEducationForm] = useState({
    school: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // Training modal state
  const [trainingModalOpen, setTrainingModalOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState<typeof trainings[0] | null>(null);
  const [trainingForm, setTrainingForm] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    url: "",
  });

  // Language modal state
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<typeof languages[0] | null>(null);
  const [languageForm, setLanguageForm] = useState({
    name: "",
    proficiency: "",
  });

  // --- Projects Handlers ---
  const openAddProject = () => {
    setEditingProject(null);
    setProjectForm({ name: "", description: "", url: "", imageUrl: "", techStack: "" });
    setProjectModalOpen(true);
  };
  const openEditProject = (project: typeof projects[0]) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      description: project.description,
      url: project.url,
      imageUrl: project.imageUrl,
      techStack: project.techStack,
    });
    setProjectModalOpen(true);
  };
  const handleProjectFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleProjectSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingProject) {
      setProjects((prev) => prev.map((p) => (p.id === editingProject.id ? { ...p, ...projectForm } : p)));
    } else {
      setProjects((prev) => [...prev, { id: Date.now(), ...projectForm }]);
    }
    setProjectModalOpen(false);
  };
  const handleDeleteProject = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // --- Experience Handlers ---
  const openAddExperience = () => {
    setEditingExperience(null);
    setExperienceForm({ title: "", company: "", location: "", startDate: "", endDate: "", description: "" });
    setExperienceModalOpen(true);
  };
  const openEditExperience = (exp: typeof experiences[0]) => {
    setEditingExperience(exp);
    setExperienceForm({
      title: exp.title,
      company: exp.company,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
    });
    setExperienceModalOpen(true);
  };
  const handleExperienceFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExperienceForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleExperienceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingExperience) {
      setExperiences((prev) => prev.map((exp) => (exp.id === editingExperience.id ? { ...exp, ...experienceForm } : exp)));
    } else {
      setExperiences((prev) => [...prev, { id: Date.now(), ...experienceForm }]);
    }
    setExperienceModalOpen(false);
  };
  const handleDeleteExperience = (id: number) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  // --- Skills Handlers ---
  const openAddSkill = () => {
    setEditingSkill(null);
    setSkillForm({ name: "", level: "" });
    setSkillsModalOpen(true);
  };
  const openEditSkill = (skill: typeof skills[0]) => {
    setEditingSkill(skill);
    setSkillForm({ name: skill.name, level: skill.level });
    setSkillsModalOpen(true);
  };
  const handleSkillFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSkillForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSkillSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingSkill) {
      setSkills((prev) => prev.map((s) => (s.id === editingSkill.id ? { ...s, ...skillForm } : s)));
    } else {
      setSkills((prev) => [...prev, { id: Date.now(), ...skillForm }]);
    }
    setSkillsModalOpen(false);
  };
  const handleDeleteSkill = (id: number) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  // --- Education Handlers ---
  const openAddEducation = () => {
    setEditingEducation(null);
    setEducationForm({ school: "", degree: "", field: "", startDate: "", endDate: "", description: "" });
    setEducationModalOpen(true);
  };
  const openEditEducation = (edu: typeof educations[0]) => {
    setEditingEducation(edu);
    setEducationForm({
      school: edu.school,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate,
      endDate: edu.endDate,
      description: edu.description,
    });
    setEducationModalOpen(true);
  };
  const handleEducationFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEducationForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleEducationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingEducation) {
      setEducations((prev) => prev.map((edu) => (edu.id === editingEducation.id ? { ...edu, ...educationForm } : edu)));
    } else {
      setEducations((prev) => [...prev, { id: Date.now(), ...educationForm }]);
    }
    setEducationModalOpen(false);
  };
  const handleDeleteEducation = (id: number) => {
    setEducations((prev) => prev.filter((edu) => edu.id !== id));
  };

  // --- Trainings Handlers ---
  const openAddTraining = () => {
    setEditingTraining(null);
    setTrainingForm({ name: "", issuer: "", issueDate: "", expiryDate: "", url: "" });
    setTrainingModalOpen(true);
  };
  const openEditTraining = (training: typeof trainings[0]) => {
    setEditingTraining(training);
    setTrainingForm({
      name: training.name,
      issuer: training.issuer,
      issueDate: training.issueDate,
      expiryDate: training.expiryDate,
      url: training.url,
    });
    setTrainingModalOpen(true);
  };
  const handleTrainingFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTrainingForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleTrainingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingTraining) {
      setTrainings((prev) => prev.map((t) => (t.id === editingTraining.id ? { ...t, ...trainingForm } : t)));
    } else {
      setTrainings((prev) => [...prev, { id: Date.now(), ...trainingForm }]);
    }
    setTrainingModalOpen(false);
  };
  const handleDeleteTraining = (id: number) => {
    setTrainings((prev) => prev.filter((t) => t.id !== id));
  };

  // --- Languages Handlers ---
  const openAddLanguage = () => {
    setEditingLanguage(null);
    setLanguageForm({ name: "", proficiency: "" });
    setLanguageModalOpen(true);
  };
  const openEditLanguage = (lang: typeof languages[0]) => {
    setEditingLanguage(lang);
    setLanguageForm({ name: lang.name, proficiency: lang.proficiency });
    setLanguageModalOpen(true);
  };
  const handleLanguageFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLanguageForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleLanguageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingLanguage) {
      setLanguages((prev) => prev.map((l) => (l.id === editingLanguage.id ? { ...l, ...languageForm } : l)));
    } else {
      setLanguages((prev) => [...prev, { id: Date.now(), ...languageForm }]);
    }
    setLanguageModalOpen(false);
  };
  const handleDeleteLanguage = (id: number) => {
    setLanguages((prev) => prev.filter((l) => l.id !== id));
  };

  // Projects localStorage
  useEffect(() => {
    const saved = localStorage.getItem('projects');
    if (saved) setProjects(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);
  // Experience localStorage
  useEffect(() => {
    const saved = localStorage.getItem('experiences');
    if (saved) setExperiences(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('experiences', JSON.stringify(experiences));
  }, [experiences]);
  // Skills localStorage
  useEffect(() => {
    const saved = localStorage.getItem('skills');
    if (saved) setSkills(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(skills));
  }, [skills]);
  // Educations localStorage
  useEffect(() => {
    const saved = localStorage.getItem('educations');
    if (saved) setEducations(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('educations', JSON.stringify(educations));
  }, [educations]);
  // Trainings localStorage
  useEffect(() => {
    const saved = localStorage.getItem('trainings');
    if (saved) setTrainings(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('trainings', JSON.stringify(trainings));
  }, [trainings]);
  // Languages localStorage
  useEffect(() => {
    const saved = localStorage.getItem('languages');
    if (saved) setLanguages(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('languages', JSON.stringify(languages));
  }, [languages]);

  // About Me localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('aboutName');
    if (savedName) setName(savedName);
    const savedBio = localStorage.getItem('aboutBio');
    if (savedBio) setBio(savedBio);
    const savedAvatar = localStorage.getItem('aboutAvatar');
    if (savedAvatar) setAvatarUrl(savedAvatar);
  }, []);
  useEffect(() => {
    localStorage.setItem('aboutName', name);
  }, [name]);
  useEffect(() => {
    localStorage.setItem('aboutBio', bio);
  }, [bio]);
  useEffect(() => {
    localStorage.setItem('aboutAvatar', avatarUrl);
  }, [avatarUrl]);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur shadow-sm flex justify-between items-center px-8 py-4 border-b border-slate-100">
        <h1 className="text-2xl font-extrabold tracking-tight text-blue-600">Divay Dua</h1>
        <nav className="space-x-8 text-base font-medium flex items-center">
          <a href="#about" className="hover:text-blue-600 transition">About</a>
          <a href="#projects" className="hover:text-blue-600 transition">Projects</a>
          <a href="#experience" className="hover:text-blue-600 transition">Experience</a>
          <a href="#skills" className="hover:text-blue-600 transition">Skills</a>
          <a href="#education" className="hover:text-blue-600 transition">Education</a>
          <a href="#trainings" className="hover:text-blue-600 transition">Trainings</a>
          <a href="#languages" className="hover:text-blue-600 transition">Languages</a>
          {!isAuthenticated ? (
            <button
              className="ml-6 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          ) : (
            <button
              className="ml-6 px-4 py-2 bg-slate-200 text-blue-700 rounded-full font-semibold hover:bg-slate-300 transition"
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto py-20 px-6 gap-12 md:gap-0">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-700 leading-tight">Hi, I'm Divay Dua</h2>
          <p className="text-xl md:text-2xl mb-6 text-slate-700 max-w-xl">A passionate developer, creator, and innovator. Welcome to my portfolio!</p>
          <a href="#projects" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold shadow hover:bg-teal-500 transition">See My Work</a>
        </div>
        <div className="flex-1 flex justify-center md:justify-end mb-8 md:mb-0">
          <Image
            src="/profile-placeholder.png"
            alt="Profile Picture"
            width={240}
            height={240}
            className="rounded-full aspect-square object-cover border-4 border-blue-100 shadow-xl bg-white"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto py-16 px-4">
        <div className="bg-slate-100 rounded-2xl shadow p-8 relative">
          <h3 className="text-2xl font-bold mb-4 text-blue-600">About Me</h3>
          <p className="text-lg leading-relaxed text-slate-700 whitespace-pre-line">{bio}</p>
          {isAuthenticated && (
            <button onClick={() => setAboutModalOpen(true)} className="absolute top-6 right-6 px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition">Edit</button>
          )}
        </div>
        <Modal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4 text-blue-700">Edit About</h2>
          <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); setAboutModalOpen(false); }}>
            <label className="font-medium">Name
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" />
            </label>
            <label className="font-medium">Bio
              <textarea value={bio} onChange={e => setBio(e.target.value)} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" rows={4} />
            </label>
            <label className="font-medium">Avatar URL
              <input type="text" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" />
            </label>
            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition">Save</button>
          </form>
        </Modal>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-6xl mx-auto py-16 px-4">
        <div className="flex items-center mb-8">
          <h3 className="text-2xl font-bold text-blue-600 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-9 5.25H15a2.25 2.25 0 002.25-2.25V15a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v.75m15 0A2.25 2.25 0 0118 15V9.75m-15 0A2.25 2.25 0 003 12v.75m15 0v-.375A2.25 2.25 0 0018 9.75m-15 0h15a2.25 2.25 0 012.25 2.25v.375" /></svg> Projects</h3>
          {isAuthenticated && (
            <button onClick={openAddProject} className="ml-4 px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition">Add Project</button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project.id} className="bg-white/60 backdrop-blur border border-slate-100 shadow-md rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition relative">
              <h4 className="text-xl font-semibold mb-2 text-blue-700">{project.name}</h4>
              <p className="mb-4 text-slate-700">{project.description}</p>
              {project.url && <a href={project.url} className="text-teal-500 hover:underline font-medium" target="_blank" rel="noopener noreferrer">View Project →</a>}
              {isAuthenticated && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => openEditProject(project)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs">Edit</button>
                  <button onClick={() => handleDeleteProject(project.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs">Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
        <Modal isOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4 text-blue-700">{editingProject ? "Edit Project" : "Add Project"}</h2>
          <form className="flex flex-col gap-4" onSubmit={handleProjectSubmit}>
            <label className="font-medium">Name
              <input name="name" type="text" value={projectForm.name} onChange={handleProjectFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" required />
            </label>
            <label className="font-medium">Description
              <textarea name="description" value={projectForm.description} onChange={handleProjectFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" rows={3} required />
            </label>
            <label className="font-medium">Project URL
              <input name="url" type="url" value={projectForm.url} onChange={handleProjectFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" />
            </label>
            <label className="font-medium">Image URL
              <input name="imageUrl" type="text" value={projectForm.imageUrl} onChange={handleProjectFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" />
            </label>
            <label className="font-medium">Tech Stack
              <input name="techStack" type="text" value={projectForm.techStack} onChange={handleProjectFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" />
            </label>
            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition">Save</button>
          </form>
        </Modal>
      </section>

      {/* Experience Section */}
      <section id="experience" className="max-w-4xl mx-auto py-16 px-4">
        <div className="bg-slate-100 rounded-2xl shadow p-8 relative">
          <div className="flex items-center mb-4">
            <h3 className="text-2xl font-bold text-blue-600 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-9 5.25H15a2.25 2.25 0 002.25-2.25V15a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v.75m15 0A2.25 2.25 0 0118 15V9.75m-15 0A2.25 2.25 0 003 12v.75m15 0v-.375A2.25 2.25 0 0018 9.75m-15 0h15a2.25 2.25 0 012.25 2.25v.375" /></svg> Experience</h3>
            {isAuthenticated && (
              <button onClick={openAddExperience} className="ml-4 px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition">Add Experience</button>
            )}
          </div>
          <ul className="space-y-6">
            {experiences.map(exp => (
              <li key={exp.id} className="bg-white/60 backdrop-blur border border-slate-100 shadow-md rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition relative">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <span className="font-semibold text-lg text-blue-700">{exp.title}</span>
                  <span className="text-sm text-slate-500">{exp.company} &middot; {exp.startDate ? formatMonthYear(exp.startDate) : ""} - {exp.endDate ? formatMonthYear(exp.endDate) : "Present"}</span>
                </div>
                <div className="text-slate-700 whitespace-pre-line">{exp.description}</div>
                {isAuthenticated && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={() => openEditExperience(exp)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs">Edit</button>
                    <button onClick={() => handleDeleteExperience(exp.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs">Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <Modal isOpen={experienceModalOpen} onClose={() => setExperienceModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4 text-blue-700">{editingExperience ? "Edit Experience" : "Add Experience"}</h2>
          <form className="flex flex-col gap-4" onSubmit={handleExperienceSubmit}>
            <label className="font-medium">Title
              <input name="title" type="text" value={experienceForm.title} onChange={handleExperienceFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" required />
            </label>
            <label className="font-medium">Company
              <input name="company" type="text" value={experienceForm.company} onChange={handleExperienceFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" required />
            </label>
            <label className="font-medium">Location
              <input name="location" type="text" value={experienceForm.location} onChange={handleExperienceFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" />
            </label>
            <label className="font-medium">Start Date
              <input name="startDate" type="date" value={experienceForm.startDate?.slice(0, 10) || ""} onChange={handleExperienceFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" required />
            </label>
            <label className="font-medium">End Date
              <input name="endDate" type="date" value={experienceForm.endDate?.slice(0, 10) || ""} onChange={handleExperienceFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" />
            </label>
            <label className="font-medium">Description
              <textarea name="description" value={experienceForm.description} onChange={handleExperienceFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" rows={4} />
            </label>
            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition">Save</button>
          </form>
        </Modal>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-4xl mx-auto py-16 px-4">
        <div className="bg-slate-100 rounded-2xl shadow p-8 relative">
          <h3 className="text-2xl font-bold mb-4 text-blue-600 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-9 5.25H15a2.25 2.25 0 002.25-2.25V15a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v.75m15 0A2.25 2.25 0 0118 15V9.75m-15 0A2.25 2.25 0 003 12v.75m15 0v-.375A2.25 2.25 0 0018 9.75m-15 0h15a2.25 2.25 0 012.25 2.25v.375" /></svg> Skills {isAuthenticated && <button onClick={openAddSkill} className="ml-4 px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition">Edit</button>}</h3>
          <ul className="flex flex-wrap gap-4">
            {skills.map(skill => (
              <li key={skill.id} className="bg-white/60 backdrop-blur border border-slate-100 shadow-md rounded-full px-6 py-2 hover:shadow-xl hover:scale-[1.02] transition text-blue-700 font-medium">
                {skill.name} ({skill.level})
                {isAuthenticated && (
                  <button onClick={() => openEditSkill(skill)} className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200">Edit</button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <Modal isOpen={skillsModalOpen} onClose={() => setSkillsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4 text-blue-700">{editingSkill ? "Edit Skill" : "Add Skill"}</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSkillSubmit}>
            <label className="font-medium">Name
              <input name="name" type="text" value={skillForm.name} onChange={handleSkillFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" required />
            </label>
            <label className="font-medium">Level
              <select name="level" value={skillForm.level} onChange={handleSkillFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </label>
            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition">Save</button>
          </form>
        </Modal>
      </section>

      {/* Education Section */}
      <section id="education" className="max-w-4xl mx-auto py-16 px-4">
        <div className="bg-slate-100 rounded-2xl shadow p-8 relative">
          <h3 className="text-2xl font-bold mb-4 text-blue-600 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-9 5.25H15a2.25 2.25 0 002.25-2.25V15a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v.75m15 0A2.25 2.25 0 0118 15V9.75m-15 0A2.25 2.25 0 003 12v.75m15 0v-.375A2.25 2.25 0 0018 9.75m-15 0h15a2.25 2.25 0 012.25 2.25v.375" /></svg> Education {isAuthenticated && <button onClick={openAddEducation} className="ml-4 px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition">Edit</button>}</h3>
          <ul className="space-y-6">
            {educations.map(edu => (
              <li key={edu.id} className="bg-white/60 backdrop-blur border border-slate-100 shadow-md rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <span className="font-semibold text-lg text-blue-700">{edu.degree}</span>
                  <span className="text-sm text-slate-500">{edu.school} &middot; {edu.startDate ? formatMonthYear(edu.startDate) : ""} - {edu.endDate ? formatMonthYear(edu.endDate) : "Present"}</span>
                </div>
                <div className="text-slate-700 whitespace-pre-line">{edu.description}</div>
                {isAuthenticated && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={() => openEditEducation(edu)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs">Edit</button>
                    <button onClick={() => handleDeleteEducation(edu.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs">Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <Modal isOpen={educationModalOpen} onClose={() => setEducationModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4 text-blue-700">{editingEducation ? "Edit Education" : "Add Education"}</h2>
          <form className="flex flex-col gap-4" onSubmit={handleEducationSubmit}>
            <label className="font-medium">School
              <input name="school" type="text" value={educationForm.school} onChange={handleEducationFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" required />
            </label>
            <label className="font-medium">Degree
              <input name="degree" type="text" value={educationForm.degree} onChange={handleEducationFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" required />
            </label>
            <label className="font-medium">Field of Study
              <input name="field" type="text" value={educationForm.field} onChange={handleEducationFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" />
            </label>
            <label className="font-medium">Start Date
              <input name="startDate" type="date" value={educationForm.startDate} onChange={handleEducationFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" required />
            </label>
            <label className="font-medium">End Date
              <input name="endDate" type="date" value={educationForm.endDate} onChange={handleEducationFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" />
            </label>
            <label className="font-medium">Description
              <textarea name="description" value={educationForm.description} onChange={handleEducationFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" rows={4} />
            </label>
            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition">Save</button>
          </form>
        </Modal>
      </section>

      {/* Trainings & Certificates Section */}
      <section id="trainings" className="max-w-4xl mx-auto py-16 px-4">
        <div className="bg-slate-100 rounded-2xl shadow p-8 relative">
          <h3 className="text-2xl font-bold mb-4 text-blue-600 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-9 5.25H15a2.25 2.25 0 002.25-2.25V15a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v.75m15 0A2.25 2.25 0 0118 15V9.75m-15 0A2.25 2.25 0 003 12v.75m15 0v-.375A2.25 2.25 0 0018 9.75m-15 0h15a2.25 2.25 0 012.25 2.25v.375" /></svg> Trainings & Certificates {isAuthenticated && <button onClick={openAddTraining} className="ml-4 px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition">Edit</button>}</h3>
          <ul className="space-y-6">
            {trainings.map(training => (
              <li key={training.id} className="bg-white/60 backdrop-blur border border-slate-100 shadow-md rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <span className="font-semibold text-lg text-blue-700">{training.name}</span>
                  <span className="text-sm text-slate-500">{training.issuer} &middot; Issued {training.issueDate ? formatMonthYear(training.issueDate) : ""}</span>
                </div>
                <div className="text-slate-700 whitespace-pre-line">Credential ID: {training.url ? <a href={training.url} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline">{training.url}</a> : "N/A"}</div>
                {isAuthenticated && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={() => openEditTraining(training)} className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs">Edit</button>
                    <button onClick={() => handleDeleteTraining(training.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs">Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <Modal isOpen={trainingModalOpen} onClose={() => setTrainingModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4 text-blue-700">{editingTraining ? "Edit Training" : "Add Training"}</h2>
          <form className="flex flex-col gap-4" onSubmit={handleTrainingSubmit}>
            <label className="font-medium">Name
              <input name="name" type="text" value={trainingForm.name} onChange={handleTrainingFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" required />
            </label>
            <label className="font-medium">Issuer
              <input name="issuer" type="text" value={trainingForm.issuer} onChange={handleTrainingFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" required />
            </label>
            <label className="font-medium">Issue Date
              <input name="issueDate" type="date" value={trainingForm.issueDate?.slice(0, 10) || ""} onChange={handleTrainingFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" required />
            </label>
            <label className="font-medium">Expiry Date
              <input name="expiryDate" type="date" value={trainingForm.expiryDate?.slice(0, 10) || ""} onChange={handleTrainingFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" />
            </label>
            <label className="font-medium">URL
              <input name="url" type="url" value={trainingForm.url} onChange={handleTrainingFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" />
            </label>
            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition">Save</button>
          </form>
        </Modal>
      </section>

      {/* Languages Section */}
      <section id="languages" className="max-w-4xl mx-auto py-16 px-4">
        <div className="bg-slate-100 rounded-2xl shadow p-8 relative">
          <h3 className="text-2xl font-bold mb-4 text-blue-600 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-9 5.25H15a2.25 2.25 0 002.25-2.25V15a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v.75m15 0A2.25 2.25 0 0118 15V9.75m-15 0A2.25 2.25 0 003 12v.75m15 0v-.375A2.25 2.25 0 0018 9.75m-15 0h15a2.25 2.25 0 012.25 2.25v.375" /></svg> Languages {isAuthenticated && <button onClick={openAddLanguage} className="ml-4 px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition">Edit</button>}</h3>
          <ul className="flex flex-wrap gap-4">
            {languages.map(lang => (
              <li key={lang.id} className="bg-white/60 backdrop-blur border border-slate-100 shadow-md rounded-full px-6 py-2 hover:shadow-xl hover:scale-[1.02] transition text-blue-700 font-medium">
                {lang.name} ({lang.proficiency})
                {isAuthenticated && (
                  <button onClick={() => openEditLanguage(lang)} className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200">Edit</button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <Modal isOpen={languageModalOpen} onClose={() => setLanguageModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4 text-blue-700">{editingLanguage ? "Edit Language" : "Add Language"}</h2>
          <form className="flex flex-col gap-4" onSubmit={handleLanguageSubmit}>
            <label className="font-medium">Name
              <input name="name" type="text" value={languageForm.name} onChange={handleLanguageFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2" required />
            </label>
            <label className="font-medium">Proficiency
              <select name="proficiency" value={languageForm.proficiency} onChange={handleLanguageFormChange} className="mt-1 w-full border border-slate-200 rounded px-3 py-2">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Native">Native</option>
              </select>
            </label>
            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition">Save</button>
          </form>
        </Modal>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-6xl mx-auto py-16 px-4">
        <h3 className="text-2xl font-bold text-blue-600 mb-6 text-center">Contact Me</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/60 backdrop-blur border border-slate-100 shadow-md rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition text-center flex flex-col items-center">
            <h4 className="text-lg font-semibold text-blue-700 mb-2 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.876 1.797l-7.5 6a2.25 2.25 0 01-2.748 0l-7.5-6A2.25 2.25 0 012.25 6.993V6.75" /></svg>
              Email
            </h4>
            <a href="mailto:duadivay@gmail.com" className="text-blue-600 hover:underline flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.876 1.797l-7.5 6a2.25 2.25 0 01-2.748 0l-7.5-6A2.25 2.25 0 012.25 6.993V6.75" /></svg>
              duadivay@gmail.com
            </a>
            <h4 className="text-lg font-semibold text-blue-700 mb-2 mt-4 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15 .621 0 1.125-.504 1.125-1.125v-2.25a1.125 1.125 0 00-1.125-1.125c-1.636 0-3.21-.316-4.687-.9a1.125 1.125 0 00-1.09.21l-2.25 1.8a.563.563 0 01-.75-.062l-2.25-2.25a.563.563 0 01-.062-.75l1.8-2.25a1.125 1.125 0 00.21-1.09c-.584-1.477-.9-3.051-.9-4.687A1.125 1.125 0 004.5 3.375h-2.25A1.125 1.125 0 001.125 4.5v2.25z" /></svg>
              Phone
            </h4>
            <a href="tel:+4917632442535" className="text-blue-600 hover:underline flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15 .621 0 1.125-.504 1.125-1.125v-2.25a1.125 1.125 0 00-1.125-1.125c-1.636 0-3.21-.316-4.687-.9a1.125 1.125 0 00-1.09.21l-2.25 1.8a.563.563 0 01-.75-.062l-2.25-2.25a.563.563 0 01-.062-.75l1.8-2.25a1.125 1.125 0 00.21-1.09c-.584-1.477-.9-3.051-.9-4.687A1.125 1.125 0 004.5 3.375h-2.25A1.125 1.125 0 001.125 4.5v2.25z" /></svg>
              +49 176 32442535
            </a>
          </div>
          <div className="bg-white/60 backdrop-blur border border-slate-100 shadow-md rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition text-center flex flex-col items-center">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">Social</h4>
            <div className="flex flex-col gap-3 items-center">
              <a href="https://github.com/divaydua" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/divay-dua-085415101/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.599v5.597z"/></svg>
                LinkedIn
              </a>
              <a href="https://www.xing.com/profile/Dua_Divay" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M17.817 3.549c-.273 0-.5.125-.646.363-.146.238-.125.527.021.765l3.146 5.438-5.396 9.396c-.146.238-.125.527.021.765.146.238.396.363.646.363h3.146c.438 0 .813-.238 1.021-.625l5.396-9.396-3.146-5.438c-.208-.387-.583-.625-1.021-.625zm-10.646 2.021c-.438 0-.813.238-1.021.625l-5.396 9.396 3.146 5.438c.208.387.583.625 1.021.625h3.146c.273 0 .5-.125.646-.363.146-.238.125-.527-.021-.765l-3.146-5.438 5.396-9.396c.146-.238.125-.527-.021-.765-.146-.238-.396-.363-.646-.363z"/></svg>
                XING
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-400 text-sm bg-slate-50 border-t border-slate-100 mt-8">
        © {new Date().getFullYear()} Divay Dua. All rights reserved.
      </footer>
    </div>
  );
}
