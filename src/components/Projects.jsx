import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api";

function Projects() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);

  // Fetch tasks when the component loads
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);

      const data = await getTasks();

      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Create a new task
  async function handleCreateTask(e) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const newTask = await createTask({
        title: title.trim(),
        description: description.trim(),
      });

      setTasks((currentTasks) => [
        ...currentTasks,
        newTask,
      ]);

      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  // Start editing a task
  function startEditing(task) {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditCompleted(task.completed);
    setError(null);
  }

  // Cancel editing
  function cancelEditing() {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditCompleted(false);
  }

  // Update a task
  async function handleUpdateTask(id) {
    if (!editTitle.trim() || !editDescription.trim()) {
      setError("Title and description are required.");
      return;
    }

    try {
      setError(null);

      const updatedTask = await updateTask(id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        completed: editCompleted,
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === id ? updatedTask : task
        )
      );

      cancelEditing();
    } catch (err) {
      setError(err.message);
    }
  }

  // Delete a task
  async function handleDeleteTask(id) {
    try {
      setError(null);

      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <section className="page-shell">
        <div className="container">
          <div className="card-section">
            <h2>Loading tasks...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="container">
        <div className="card-section">

          <div className="section-heading">
            <p className="eyebrow">Task Manager</p>
            <h2>Manage Your Tasks</h2>
          </div>

          {error && (
            <div className="card-section">
              <h3>Error</h3>
              <p>{error}</p>
            </div>
          )}

          {/* CREATE TASK */}
          <form onSubmit={handleCreateTask}>
            <div>
              <label htmlFor="task-title">
                Title
              </label>

              <input
                id="task-title"
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label htmlFor="task-description">
                Description
              </label>

              <textarea
                id="task-description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Enter task description"
                rows="4"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
            >
              {saving ? "Adding..." : "Add Task"}
            </button>
          </form>

          {/* TASK LIST */}
          <div className="repo-list">
            {tasks.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              tasks.map((task) => (
                <article
                  className="repo-card"
                  key={task._id}
                >
                  {editingId === task._id ? (
                    <>
                      <h3>Edit Task</h3>

                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) =>
                          setEditTitle(e.target.value)
                        }
                      />

                      <textarea
                        value={editDescription}
                        onChange={(e) =>
                          setEditDescription(e.target.value)
                        }
                        rows="4"
                      />

                      <label>
                        <input
                          type="checkbox"
                          checked={editCompleted}
                          onChange={(e) =>
                            setEditCompleted(
                              e.target.checked
                            )
                          }
                        />

                        Completed
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateTask(task._id)
                        }
                      >
                        Save Changes
                      </button>

                      <button
                        type="button"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="repo-meta">
                        <h3>{task.title}</h3>

                        <span className="pill">
                          {task.completed
                            ? "Completed"
                            : "Pending"}
                        </span>
                      </div>

                      <p>{task.description}</p>

                      <p>
                        Created:{" "}
                        {new Date(
                          task.createdAt
                        ).toLocaleString()}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          startEditing(task)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteTask(task._id)
                        }
                      >
                        Delete
                      </button>
                    </>
                  )}
                </article>
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Projects;