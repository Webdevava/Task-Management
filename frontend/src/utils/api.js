const API_URL = "https://task-management-woad-alpha.vercel.app/api/tasks";

export const fetchTasks = async () => {
  try {
    const response = await fetch(API_URL);
    console.log('Fetch Tasks Response:', response);
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    console.log('Create Task Response:', response);
    if (!response.ok) {
      throw new Error(`Failed to create task: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (id, taskUpdate) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskUpdate),
    });
    console.log('Update Task Response:', response);
    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    console.log('Delete Task Response:', response);
    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
