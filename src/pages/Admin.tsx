import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Edit,
  Trash2,
  Eye as ShowIcon,
  EyeOff as HideIcon,
  Plus,
  X,
  GripVertical,
} from "lucide-react";
import { Event, Musician } from "@/lib/types/events";
import { eventsAPI, musiciansAPI, uploadAPI } from "@/lib/api";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState(0);

  // Data states
  const [events, setEvents] = useState<Event[]>([]);
  const [musicians, setMusicians] = useState<Musician[]>([]);

  // Modal states
  const [showEventModal, setShowEventModal] = useState(false);
  const [showMusicianModal, setShowMusicianModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingMusician, setEditingMusician] = useState<Musician | null>(null);

  // Form states
  const [eventForm, setEventForm] = useState<Partial<Event>>({
    id: "",
    title: "",
    description: "",
    date: "",
    location: "",
    media: [{ type: "image", url: "", alt: "" }],
    programImage: "",
    musicians: [],
    isUpcoming: true,
    isHidden: false,
    slug: "",
  });

  // Musician search state (for event modal)
  const [musicianSearch, setMusicianSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Musician[]>([]);

  // Search states for main sections
  const [eventSearch, setEventSearch] = useState("");
  const [musicianSectionSearch, setMusicianSectionSearch] = useState("");

  // Tab state
  const [activeTab, setActiveTab] = useState<"events" | "musicians">("events");

  // Drag and drop state
  const [draggedMusician, setDraggedMusician] = useState<Musician | null>(null);
  const [dragOverMusician, setDragOverMusician] = useState<string | null>(null);

  const [musicianForm, setMusicianForm] = useState<Partial<Musician>>({
    id: "",
    name: "",
    role: "",
    instrument: "",
    photo: "",
    bio: "",
    isHidden: false,
    section: "",
    sortOrder: 0,
  });

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
  const MAX_ATTEMPTS = 5;
  const LOCK_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

  const sections = [
    "Rhythm",
    "Saxophones",
    "Trumpets",
    "Trombones",
    "Tuba",
    "French Horns",
    "Percussion",
  ];

  // File upload state
  const [uploading, setUploading] = useState(false);

  // File upload function
  const handleFileUpload = async (
    file: File,
    setUrlField: (url: string) => void,
  ) => {
    if (!file) return;

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("File too large. Maximum size is 10MB.");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      alert("Only image and video files are allowed.");
      return;
    }

    setUploading(true);
    try {
      const result = await uploadAPI.uploadFile(file);
      setUrlField(result.filePath);
    } catch (error) {
      console.error("File upload failed:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Function to reload data from API
  const reloadData = async () => {
    try {
      const [eventsData, musiciansData] = await Promise.all([
        eventsAPI.getAll(),
        musiciansAPI.getAll(),
      ]);
      setEvents(eventsData);
      setMusicians(musiciansData);
    } catch (error) {
      console.error("Failed to load data:", error);
      alert("Failed to load data. Please check if the server is running.");
    }
  };

  useEffect(() => {
    reloadData();

    // Check if user was previously authenticated
    const savedAuth = localStorage.getItem("admin_authenticated");
    const savedTime = localStorage.getItem("admin_auth_time");

    if (savedAuth && savedTime) {
      const authTime = parseInt(savedTime);
      const currentTime = Date.now();
      const sessionDuration = 2 * 60 * 60 * 1000; // 2 hours

      if (currentTime - authTime < sessionDuration) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("admin_authenticated");
        localStorage.removeItem("admin_auth_time");
      }
    }

    // Check if user is locked out
    const lockTime = localStorage.getItem("admin_lock_time");
    if (lockTime) {
      const lockEndTime = parseInt(lockTime);
      const currentTime = Date.now();

      if (currentTime < lockEndTime) {
        setIsLocked(true);
        setLockTime(lockEndTime - currentTime);
      } else {
        localStorage.removeItem("admin_lock_time");
        localStorage.removeItem("admin_attempts");
      }
    }

    // Load previous attempts
    const savedAttempts = localStorage.getItem("admin_attempts");
    if (savedAttempts) {
      setAttempts(parseInt(savedAttempts));
    }
  }, []);

  useEffect(() => {
    if (isLocked && lockTime > 0) {
      const timer = setTimeout(() => {
        setLockTime((prev) => prev - 1000);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isLocked && lockTime <= 0) {
      setIsLocked(false);
      setAttempts(0);
      localStorage.removeItem("admin_lock_time");
      localStorage.removeItem("admin_attempts");
    }
  }, [isLocked, lockTime]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) return;

    // Sanitize input
    const sanitizedPassword = password.trim();

    if (sanitizedPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAttempts(0);
      localStorage.setItem("admin_authenticated", "true");
      localStorage.setItem("admin_auth_time", Date.now().toString());
      localStorage.removeItem("admin_attempts");
      localStorage.removeItem("admin_lock_time");
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem("admin_attempts", newAttempts.toString());

      if (newAttempts >= MAX_ATTEMPTS) {
        const lockEndTime = Date.now() + LOCK_DURATION;
        setIsLocked(true);
        setLockTime(LOCK_DURATION);
        localStorage.setItem("admin_lock_time", lockEndTime.toString());
      }

      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    localStorage.removeItem("admin_auth_time");
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Event Management Functions
  const openEventModal = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setEventForm({ ...event });
    } else {
      setEditingEvent(null);
      setEventForm({
        id: "",
        title: "",
        description: "",
        date: "",
        location: "",
        media: [{ type: "image", url: "", alt: "" }],
        programImage: "",
        musicians: [],
        isUpcoming: true,
        isHidden: false,
        slug: "",
      });
      setMusicianSearch("");
      setSearchResults([]);
    }
    setShowEventModal(true);
  };

  const saveEvent = async () => {
    if (
      !eventForm.title ||
      !eventForm.date ||
      !eventForm.location ||
      !eventForm.slug
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newEvent: Event = {
      id: editingEvent?.id || `event-${Date.now()}`,
      title: eventForm.title!,
      description: eventForm.description!,
      date: eventForm.date!,
      location: eventForm.location!,
      media: eventForm.media || [],
      programImage: eventForm.programImage || "",
      musicians: eventForm.musicians || [],
      isUpcoming: new Date(eventForm.date!) >= new Date(),
      isHidden: eventForm.isHidden || false,
      slug: eventForm.slug!,
    };

    // Optimistic update
    if (editingEvent) {
      setEvents(events.map((e) => (e.id === editingEvent.id ? newEvent : e)));
    } else {
      setEvents([...events, newEvent]);
    }

    // Close modal immediately
    setShowEventModal(false);
    setEditingEvent(null);

    try {
      if (editingEvent) {
        await eventsAPI.update(editingEvent.id, newEvent);
      } else {
        await eventsAPI.create(newEvent);
      }

      // Reload to confirm server state
      await reloadData();
    } catch (error) {
      console.error("Failed to save event:", error);
      alert("Failed to save event. Please try again.");
      // Reload on error to restore correct state
      await reloadData();
    }
  };

  const deleteEvent = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      // Optimistic update
      setEvents(events.filter((e) => e.id !== id));

      try {
        await eventsAPI.delete(id);
        // Reload to confirm server state
        await reloadData();
      } catch (error) {
        console.error("Failed to delete event:", error);
        alert("Failed to delete event. Please try again.");
        // Reload on error to restore correct state
        await reloadData();
      }
    }
  };

  const toggleEventVisibility = async (id: string) => {
    const event = events.find((e) => e.id === id);
    if (!event) return;

    const updatedEvent = { ...event, isHidden: !event.isHidden };

    // Optimistic update
    setEvents(events.map((e) => (e.id === id ? updatedEvent : e)));

    try {
      await eventsAPI.update(id, updatedEvent);
      // Reload to confirm server state
      await reloadData();
    } catch (error) {
      console.error("Failed to toggle event visibility:", error);
      alert("Failed to update event. Please try again.");
      // Reload on error to restore correct state
      await reloadData();
    }
  };

  // Musician Management Functions
  const openMusicianModal = (musician?: Musician) => {
    if (musician) {
      setEditingMusician(musician);
      setMusicianForm({ ...musician });
    } else {
      setEditingMusician(null);
      setMusicianForm({
        id: "",
        name: "",
        role: "",
        instrument: "",
        photo: "",
        bio: "",
        isHidden: false,
        section: "",
      });
    }
    setShowMusicianModal(true);
  };

  const saveMusician = async () => {
    if (
      !musicianForm.name ||
      !musicianForm.instrument ||
      !musicianForm.section
    ) {
      alert("Please fill in name, instrument, and section fields");
      return;
    }

    const newMusician: Musician = {
      id: editingMusician?.id || `musician-${Date.now()}`,
      name: musicianForm.name!,
      role: musicianForm.role!,
      instrument: musicianForm.instrument!,
      photo: musicianForm.photo || "",
      bio: musicianForm.bio || "",
      isHidden: musicianForm.isHidden || false,
      section: musicianForm.section!,
      sortOrder: musicianForm.sortOrder || 0,
    };

    // Optimistic update
    if (editingMusician) {
      setMusicians(
        musicians.map((m) => (m.id === editingMusician.id ? newMusician : m)),
      );
    } else {
      setMusicians([...musicians, newMusician]);
    }

    // Close modal immediately
    setShowMusicianModal(false);
    setEditingMusician(null);

    try {
      if (editingMusician) {
        await musiciansAPI.update(editingMusician.id, newMusician);
      } else {
        await musiciansAPI.create(newMusician);
      }

      // Reload to confirm server state
      await reloadData();
    } catch (error) {
      console.error("Failed to save musician:", error);
      alert("Failed to save musician. Please try again.");
      // Reload on error to restore correct state
      await reloadData();
    }
  };

  const deleteMusician = async (id: string) => {
    if (confirm("Are you sure you want to delete this musician?")) {
      // Optimistic update
      setMusicians(musicians.filter((m) => m.id !== id));

      try {
        await musiciansAPI.delete(id);
        // Reload to confirm server state
        await reloadData();
      } catch (error) {
        console.error("Failed to delete musician:", error);
        alert("Failed to delete musician. Please try again.");
        // Reload on error to restore correct state
        await reloadData();
      }
    }
  };

  const toggleMusicianVisibility = async (id: string) => {
    const musician = musicians.find((m) => m.id === id);
    if (!musician) return;

    const updatedMusician = { ...musician, isHidden: !musician.isHidden };

    // Optimistic update
    setMusicians(musicians.map((m) => (m.id === id ? updatedMusician : m)));

    try {
      await musiciansAPI.update(id, updatedMusician);
      // Reload to confirm server state
      await reloadData();
    } catch (error) {
      console.error("Failed to toggle musician visibility:", error);
      alert("Failed to update musician. Please try again.");
      // Reload on error to restore correct state
      await reloadData();
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, musician: Musician) => {
    setDraggedMusician(musician);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggedMusician(null);
    setDragOverMusician(null);
  };

  const handleMusicianDragOver = (e: React.DragEvent, musicianId: string) => {
    e.preventDefault();
    if (draggedMusician && draggedMusician.id !== musicianId) {
      setDragOverMusician(musicianId);
    }
  };

  const handleMusicianDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverMusician(null);
  };

  const handleMusicianDrop = async (
    e: React.DragEvent,
    targetMusician: Musician,
  ) => {
    e.preventDefault();
    setDragOverMusician(null);

    if (!draggedMusician || draggedMusician.id === targetMusician.id) return;

    const targetSection = targetMusician.section;
    const targetSortOrder = targetMusician.sortOrder;

    // Determine if we're moving up or down in the same section
    const isSameSection = draggedMusician.section === targetSection;
    const movingDown =
      isSameSection && draggedMusician.sortOrder < targetSortOrder;

    // Get all musicians in the target section, sorted by sortOrder
    const sectionMusicians = musicians
      .filter((m) => m.section === targetSection)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    // Find the indices
    const targetIndex = sectionMusicians.findIndex(
      (m) => m.id === targetMusician.id,
    );

    let newSortOrder: number;

    if (movingDown) {
      // Moving down: place after the target
      if (targetIndex === sectionMusicians.length - 1) {
        // Target is last, place after it
        newSortOrder = targetSortOrder + 1;
      } else {
        // Place between target and next
        const nextMusician = sectionMusicians[targetIndex + 1];
        newSortOrder = (targetSortOrder + nextMusician.sortOrder) / 2;
      }
    } else {
      // Moving up or to different section: place at target's position
      if (targetIndex === 0) {
        // Target is first, place before it
        newSortOrder = targetSortOrder - 1;
      } else {
        // Place between previous and target
        const prevMusician = sectionMusicians[targetIndex - 1];
        newSortOrder = (prevMusician.sortOrder + targetSortOrder) / 2;
      }
    }

    const updatedMusician = {
      ...draggedMusician,
      section: targetSection,
      sortOrder: newSortOrder,
    };

    // Optimistic update
    setMusicians(
      musicians.map((m) => (m.id === draggedMusician.id ? updatedMusician : m)),
    );
    setDraggedMusician(null);

    try {
      await musiciansAPI.update(draggedMusician.id, updatedMusician);
      // Reload to confirm server state
      await reloadData();
    } catch (error) {
      console.error("Failed to move musician:", error);
      alert("Failed to move musician. Please try again.");
      // Reload on error to restore correct state
      await reloadData();
    }
  };

  // Media management
  const addMediaItem = () => {
    setEventForm({
      ...eventForm,
      media: [...(eventForm.media || []), { type: "image", url: "", alt: "" }],
    });
  };

  const updateMediaItem = (index: number, field: string, value: string) => {
    const updatedMedia = [...(eventForm.media || [])];
    updatedMedia[index] = { ...updatedMedia[index], [field]: value };
    setEventForm({ ...eventForm, media: updatedMedia });
  };

  const removeMediaItem = (index: number) => {
    const updatedMedia = [...(eventForm.media || [])];
    updatedMedia.splice(index, 1);
    setEventForm({ ...eventForm, media: updatedMedia });
  };

  // Musician search and management
  const handleMusicianSearch = (query: string) => {
    setMusicianSearch(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = musicians.filter((musician) =>
      musician.name.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchResults(results);
  };

  const addMusicianToEvent = (musician: Musician) => {
    if (!eventForm.musicians?.includes(musician.id)) {
      setEventForm({
        ...eventForm,
        musicians: [...(eventForm.musicians || []), musician.id],
      });
    }
    setMusicianSearch("");
    setSearchResults([]);
  };

  const removeMusicianFromEvent = (musicianId: string) => {
    setEventForm({
      ...eventForm,
      musicians: eventForm.musicians?.filter((id) => id !== musicianId) || [],
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Lock className="text-amber-500 mr-2" size={24} />
            <h1 className="text-2xl font-bold text-gray-800">Admin Access</h1>
          </div>

          {isLocked ? (
            <div className="text-center">
              <p className="text-red-600 font-medium mb-4">
                Too many failed attempts. Please try again in:
              </p>
              <p className="text-2xl font-bold text-red-600">
                {formatTime(lockTime)}
              </p>
            </div>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-10"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {attempts > 0 && (
                <p className="text-red-600 text-sm mb-4">
                  Incorrect password. {MAX_ATTEMPTS - attempts} attempts
                  remaining.
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-amber-500 text-black py-2 px-4 rounded-md hover:bg-amber-400 transition-colors font-medium"
              >
                Enter Admin Panel
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-amber-500">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-6 py-3 font-medium transition-colors rounded-none ${
              activeTab === "events"
                ? "bg-amber-500 text-black hover:bg-amber-400"
                : "bg-amber-700 text-white hover:bg-amber-600"
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab("musicians")}
            className={`px-6 py-3 font-medium transition-colors rounded-none ${
              activeTab === "musicians"
                ? "bg-amber-500 text-black hover:bg-amber-400"
                : "bg-amber-700 text-white hover:bg-amber-600"
            }`}
          >
            Musicians
          </button>
        </div>

        {/* Events Management */}
        {activeTab === "events" && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Events Management
              </h2>
              <button
                onClick={() => openEventModal()}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                Create New Event
              </button>
            </div>

            {/* Events Search */}
            <div className="mb-4">
              <input
                type="text"
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                placeholder="Search events by title..."
              />
            </div>

            <div className="space-y-4">
              {events
                .filter((event) =>
                  event.title.toLowerCase().includes(eventSearch.toLowerCase()),
                )
                .map((event) => (
                  <div
                    key={event.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {event.date} • {event.location}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              event.isUpcoming
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {event.isUpcoming ? "Upcoming" : "Past"}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              event.isHidden
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {event.isHidden ? "Hidden" : "Visible"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEventModal(event)}
                          className="bg-amber-500 text-black p-2 rounded-md hover:bg-amber-400 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => toggleEventVisibility(event.id)}
                          className={`p-2 rounded-md transition-colors ${
                            event.isHidden
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {event.isHidden ? (
                            <ShowIcon size={16} />
                          ) : (
                            <HideIcon size={16} />
                          )}
                        </button>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Musicians Management */}
        {activeTab === "musicians" && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Musicians Management
              </h2>
              <button
                onClick={() => openMusicianModal()}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Plus size={16} />
                Add New Musician
              </button>
            </div>

            {/* Musicians Search */}
            <div className="mb-4">
              <input
                type="text"
                value={musicianSectionSearch}
                onChange={(e) => setMusicianSectionSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                placeholder="Search musicians by name..."
              />
            </div>

            <div className="space-y-6">
              {/* Musicians with assigned sections */}
              {sections.map((section) => {
                const sectionMusicians = musicians
                  .filter((musician) => musician.section === section)
                  .filter((musician) =>
                    musician.name
                      .toLowerCase()
                      .includes(musicianSectionSearch.toLowerCase()),
                  )
                  .sort(
                    (a, b) =>
                      a.sortOrder - b.sortOrder || a.name.localeCompare(b.name),
                  );

                if (sectionMusicians.length === 0) return null;

                return (
                  <div key={section}>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">
                      {section}
                    </h3>
                    <div className="space-y-2">
                      {sectionMusicians.map((musician) => (
                        <div
                          key={musician.id}
                          className={`border border-gray-200 rounded-lg p-4 transition-all ${
                            draggedMusician?.id === musician.id
                              ? "opacity-50"
                              : ""
                          } ${
                            dragOverMusician === musician.id
                              ? "border-blue-500 border-2 bg-blue-50"
                              : ""
                          }`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, musician)}
                          onDragEnd={handleDragEnd}
                          onDragOver={(e) =>
                            handleMusicianDragOver(e, musician.id)
                          }
                          onDragLeave={handleMusicianDragLeave}
                          onDrop={(e) => handleMusicianDrop(e, musician)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-2 flex-1">
                              <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 mt-1">
                                <GripVertical size={16} />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-gray-800">
                                  {musician.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {musician.role ? `${musician.role} • ` : ""}
                                  {musician.instrument}
                                </p>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                  {musician.bio}
                                </p>
                              </div>
                            </div>
                            <div
                              className="flex gap-2"
                              onDragStart={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => openMusicianModal(musician)}
                                className="bg-amber-500 text-black p-2 rounded-md hover:bg-amber-400 transition-colors"
                                draggable={false}
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  toggleMusicianVisibility(musician.id)
                                }
                                className={`p-2 rounded-md transition-colors ${
                                  musician.isHidden
                                    ? "bg-green-600 text-white hover:bg-green-700"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                                draggable={false}
                              >
                                {musician.isHidden ? (
                                  <ShowIcon size={16} />
                                ) : (
                                  <HideIcon size={16} />
                                )}
                              </button>
                              <button
                                onClick={() => deleteMusician(musician.id)}
                                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors"
                                draggable={false}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Uncategorized musicians (no section assigned) */}
              {(() => {
                const uncategorizedMusicians = musicians
                  .filter(
                    (musician) => !musician.section || musician.section === "",
                  )
                  .filter((musician) =>
                    musician.name
                      .toLowerCase()
                      .includes(musicianSectionSearch.toLowerCase()),
                  )
                  .sort((a, b) => a.name.localeCompare(b.name));

                if (uncategorizedMusicians.length === 0) return null;

                return (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">
                      Uncategorized
                    </h3>
                    <div className="space-y-2">
                      {uncategorizedMusicians.map((musician) => (
                        <div
                          key={musician.id}
                          className={`border border-gray-200 rounded-lg p-4 transition-all ${
                            draggedMusician?.id === musician.id
                              ? "opacity-50"
                              : ""
                          } ${
                            dragOverMusician === musician.id
                              ? "border-blue-500 border-2 bg-blue-50"
                              : ""
                          }`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, musician)}
                          onDragEnd={handleDragEnd}
                          onDragOver={(e) =>
                            handleMusicianDragOver(e, musician.id)
                          }
                          onDragLeave={handleMusicianDragLeave}
                          onDrop={(e) => handleMusicianDrop(e, musician)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-2 flex-1">
                              <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 mt-1">
                                <GripVertical size={16} />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-gray-800">
                                  {musician.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {musician.role ? `${musician.role} • ` : ""}
                                  {musician.instrument}
                                </p>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                  {musician.bio}
                                </p>
                              </div>
                            </div>
                            <div
                              className="flex gap-2"
                              onDragStart={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => openMusicianModal(musician)}
                                className="bg-amber-500 text-black p-2 rounded-md hover:bg-amber-400 transition-colors"
                                draggable={false}
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  toggleMusicianVisibility(musician.id)
                                }
                                className={`p-2 rounded-md transition-colors ${
                                  musician.isHidden
                                    ? "bg-green-600 text-white hover:bg-green-700"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                                draggable={false}
                              >
                                {musician.isHidden ? (
                                  <ShowIcon size={16} />
                                ) : (
                                  <HideIcon size={16} />
                                )}
                              </button>
                              <button
                                onClick={() => deleteMusician(musician.id)}
                                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors"
                                draggable={false}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {editingEvent ? "Edit Event" : "Create New Event"}
                  </h3>
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={eventForm.title || ""}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      placeholder="Event title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={eventForm.description || ""}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      placeholder="Event description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date *
                      </label>
                      <input
                        type="date"
                        value={
                          eventForm.date ? eventForm.date.split("T")[0] : ""
                        }
                        onChange={(e) => {
                          const time = eventForm.date
                            ? eventForm.date.split("T")[1] || "00:00"
                            : "00:00";
                          setEventForm({
                            ...eventForm,
                            date: `${e.target.value}T${time}`,
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time *
                      </label>
                      <input
                        type="time"
                        value={
                          eventForm.date
                            ? eventForm.date.split("T")[1] || "00:00"
                            : "00:00"
                        }
                        onChange={(e) => {
                          const date = eventForm.date
                            ? eventForm.date.split("T")[0]
                            : "";
                          setEventForm({
                            ...eventForm,
                            date: `${date}T${e.target.value}`,
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug *
                    </label>
                    <input
                      type="text"
                      value={eventForm.slug || ""}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, slug: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      placeholder="url-friendly-slug"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={eventForm.location || ""}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, location: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      placeholder="Event location"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Musicians
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={musicianSearch}
                        onChange={(e) => handleMusicianSearch(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                        placeholder="Search for musicians..."
                      />

                      {searchResults.length > 0 && (
                        <div className="border border-gray-300 rounded-md bg-white max-h-32 overflow-y-auto">
                          {searchResults.map((musician) => (
                            <div
                              key={musician.id}
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                              onClick={() => addMusicianToEvent(musician)}
                            >
                              <div className="font-medium">{musician.name}</div>
                              <div className="text-sm text-gray-600">
                                {musician.role ? `${musician.role} • ` : ""}
                                {musician.instrument}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {eventForm.musicians &&
                        eventForm.musicians.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                              Selected musicians:
                            </p>
                            {eventForm.musicians.map((musicianId) => {
                              const musician = musicians.find(
                                (m) => m.id === musicianId,
                              );
                              return musician ? (
                                <div
                                  key={musicianId}
                                  className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                                >
                                  <div>
                                    <span className="font-medium">
                                      {musician.name}
                                    </span>
                                    <span className="text-sm text-gray-600 ml-2">
                                      ({musician.role || musician.instrument})
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeMusicianFromEvent(musicianId)
                                    }
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ) : null;
                            })}
                          </div>
                        )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Program Image
                    </label>
                    <div className="space-y-2">
                      {/* File upload option */}
                      <div className="flex gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (url) => {
                                setEventForm({
                                  ...eventForm,
                                  programImage: url,
                                });
                              });
                            }
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                          disabled={uploading}
                        />
                        {uploading && (
                          <div className="flex items-center text-sm text-gray-500">
                            Uploading...
                          </div>
                        )}
                      </div>

                      {/* URL input option */}
                      <div className="text-xs text-gray-500 text-center">
                        OR
                      </div>

                      <input
                        type="text"
                        value={eventForm.programImage || ""}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            programImage: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                        placeholder="Enter program image URL or upload file above"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Media Items
                      </label>
                      <button
                        type="button"
                        onClick={addMediaItem}
                        className="text-sm bg-amber-500 text-black px-2 py-1 rounded hover:bg-amber-400"
                      >
                        Add Media
                      </button>
                    </div>
                    {eventForm.media?.map((media, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded p-3 mb-2"
                      >
                        <div className="flex gap-2 mb-2">
                          <select
                            value={media.type}
                            onChange={(e) =>
                              updateMediaItem(index, "type", e.target.value)
                            }
                            className="px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                          >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => removeMediaItem(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="space-y-1">
                          {/* File upload option */}
                          <div className="flex gap-1">
                            <input
                              type="file"
                              accept="image/*,video/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(file, (url) => {
                                    updateMediaItem(index, "url", url);
                                  });
                                }
                              }}
                              className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                              disabled={uploading}
                            />
                          </div>

                          {/* URL input option */}
                          <input
                            type="text"
                            value={media.url}
                            onChange={(e) =>
                              updateMediaItem(index, "url", e.target.value)
                            }
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                            placeholder="Enter media URL or upload file above"
                          />
                        </div>
                        <input
                          type="text"
                          value={media.alt || ""}
                          onChange={(e) =>
                            updateMediaItem(index, "alt", e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                          placeholder="Alt text (optional)"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isHidden"
                      checked={eventForm.isHidden || false}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          isHidden: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    <label htmlFor="isHidden" className="text-sm text-gray-700">
                      Hide this event from the public events page
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={saveEvent}
                    className="flex-1 bg-amber-500 text-black py-2 px-4 rounded-md hover:bg-amber-400 transition-colors font-medium"
                  >
                    {editingEvent ? "Update Event" : "Create Event"}
                  </button>
                  <button
                    onClick={() => {
                      setShowEventModal(false);
                      setMusicianSearch("");
                      setSearchResults([]);
                    }}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Musician Modal */}
        {showMusicianModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {editingMusician ? "Edit Musician" : "Add New Musician"}
                  </h3>
                  <button
                    onClick={() => setShowMusicianModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={musicianForm.name || ""}
                      onChange={(e) =>
                        setMusicianForm({
                          ...musicianForm,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      placeholder="Musician name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        value={musicianForm.role || ""}
                        onChange={(e) =>
                          setMusicianForm({
                            ...musicianForm,
                            role: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                        placeholder="Musician role (optional)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instrument *
                      </label>
                      <input
                        type="text"
                        value={musicianForm.instrument || ""}
                        onChange={(e) =>
                          setMusicianForm({
                            ...musicianForm,
                            instrument: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                        placeholder="Primary instrument"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section *
                    </label>
                    <select
                      value={musicianForm.section || ""}
                      onChange={(e) =>
                        setMusicianForm({
                          ...musicianForm,
                          section: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      <option value="">Select a section</option>
                      {sections.map((section) => (
                        <option key={section} value={section}>
                          {section}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Photo
                    </label>
                    <div className="space-y-2">
                      {/* File upload option */}
                      <div className="flex gap-2">
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (url) => {
                                setMusicianForm({
                                  ...musicianForm,
                                  photo: url,
                                });
                              });
                            }
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                          disabled={uploading}
                        />
                        {uploading && (
                          <div className="flex items-center text-sm text-gray-500">
                            Uploading...
                          </div>
                        )}
                      </div>

                      {/* URL input option */}
                      <div className="text-xs text-gray-500 text-center">
                        OR
                      </div>

                      <input
                        type="text"
                        value={musicianForm.photo || ""}
                        onChange={(e) =>
                          setMusicianForm({
                            ...musicianForm,
                            photo: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                        placeholder="Enter photo URL or upload file above"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={musicianForm.bio || ""}
                      onChange={(e) =>
                        setMusicianForm({
                          ...musicianForm,
                          bio: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      placeholder="Musician biography"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sort Order
                      </label>
                      <input
                        type="number"
                        value={musicianForm.sortOrder || 0}
                        onChange={(e) =>
                          setMusicianForm({
                            ...musicianForm,
                            sortOrder: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                        placeholder="Sort order"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isHiddenMusician"
                      checked={musicianForm.isHidden || false}
                      onChange={(e) =>
                        setMusicianForm({
                          ...musicianForm,
                          isHidden: e.target.checked,
                        })
                      }
                      className="mr-2"
                    />
                    <label
                      htmlFor="isHiddenMusician"
                      className="text-sm text-gray-700"
                    >
                      Hide this musician from the public musicians list
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={saveMusician}
                    className="flex-1 bg-amber-500 text-black py-2 px-4 rounded-md hover:bg-amber-400 transition-colors font-medium"
                  >
                    {editingMusician ? "Update Musician" : "Add Musician"}
                  </button>
                  <button
                    onClick={() => setShowMusicianModal(false)}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
