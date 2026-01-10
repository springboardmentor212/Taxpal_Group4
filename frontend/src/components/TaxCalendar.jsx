import { useEffect, useState, useCallback } from "react";
import API from "../api/api";

const TaxCalendar = () => {
  const currentYear = new Date().getFullYear();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    quarter: "Q1",
  });

  // ===============================
  // Fetch calendar (SYSTEM + CUSTOM)
  // ===============================
  const fetchCalendar = useCallback(async () => {
    try {
      const res = await API.get(
        `/tax/estimates/calendar/demo-user-id?year=${currentYear}`
      );
      setEvents(res.data.events || []);
    } catch (error) {
      console.error("Failed to fetch calendar", error);
    } finally {
      setLoading(false);
    }
  }, [currentYear]);

  useEffect(() => {
    fetchCalendar();
  }, [fetchCalendar]);

  // ===============================
  // Group by month
  // ===============================
  const groupedByMonth = events.reduce((acc, event) => {
    const month = new Date(event.date).toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    });

    if (!acc[month]) acc[month] = [];
    acc[month].push(event);
    return acc;
  }, {});

  // ===============================
  // Create / Update reminder
  // ===============================
  const handleSaveReminder = async () => {
    try {
      if (editingId) {
        await API.put(`/tax/estimates/reminders/${editingId}`, {
          title: form.title,
          description: form.description,
          date: form.date,
          quarter: form.quarter,
          year: currentYear,
        });
      } else {
        await API.post("/tax/estimates/reminders", {
          user_id: "demo-user-id",
          title: form.title,
          description: form.description,
          date: form.date,
          quarter: form.quarter,
          year: currentYear,
          type: "reminder",
        });
      }

      setShowForm(false);
      setEditingId(null);
      setForm({
        title: "",
        description: "",
        date: "",
        quarter: "Q1",
      });

      fetchCalendar();
    } catch (error) {
      console.error("Failed to save reminder", error);
      alert("Failed to save reminder");
    }
  };

  // ===============================
  // Delete reminder
  // ===============================
  const handleDeleteReminder = async (id) => {
    if (!window.confirm("Delete this reminder?")) return;

    try {
      await API.delete(`/tax/estimates/reminders/${id}`);
      fetchCalendar();
    } catch (error) {
      console.error("Failed to delete reminder", error);
      alert("Failed to delete reminder");
    }
  };

  // ===============================
  // Edit reminder
  // ===============================
  const handleEditReminder = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      date: event.date.split("T")[0],
      quarter: event.quarter || "Q1",
    });
    setEditingId(event._id);
    setShowForm(true);
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div className="mt-6 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-2">
        Tax Calendar ({currentYear})
      </h2>

      <p className="text-gray-500 mb-4">
        Government tax deadlines and your custom reminders
      </p>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
        }}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add Reminder
      </button>

      {/* ================= FORM ================= */}
      {showForm && (
        <div className="bg-white p-4 rounded border mb-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className="border p-2 rounded"
            />

            <select
              value={form.quarter}
              onChange={(e) =>
                setForm({ ...form, quarter: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option>Q1</option>
              <option>Q2</option>
              <option>Q3</option>
              <option>Q4</option>
            </select>

            <input
              type="text"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border p-2 rounded"
            />
          </div>

          <button
            onClick={handleSaveReminder}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editingId ? "Update Reminder" : "Save Reminder"}
          </button>
        </div>
      )}

      {/* ================= STATE ================= */}
      {loading && (
        <p className="text-gray-500 italic">
          Loading upcoming tax events…
        </p>
      )}

      {!loading && events.length === 0 && (
        <p className="text-gray-500">
          No tax events found for this year.
        </p>
      )}

      {/* ================= CALENDAR ================= */}
      {!loading &&
        Object.keys(groupedByMonth).map((month) => (
          <div key={month} className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {month}
            </h3>

            <div className="space-y-4">
              {groupedByMonth[month].map((event) => (
                <div
                  key={event._id || event.id}
                  className="bg-white p-5 rounded-lg border flex justify-between items-start"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {event.title}
                    </p>

                    {event._id && (
                      <span className="text-xs text-green-600 font-semibold">
                        CUSTOM
                      </span>
                    )}

                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(event.date).toDateString()}
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold uppercase
                        ${
                          event.type === "payment"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      `}
                    >
                      {event.type}
                    </span>

                    {event._id && (
                      <>
                        <button
                          onClick={() => handleEditReminder(event)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteReminder(event._id)
                          }
                          className="text-xs text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default TaxCalendar;