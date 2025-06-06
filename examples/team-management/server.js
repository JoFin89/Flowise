const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data stores
const members = [];
const tasks = [];
const meetings = [];
let taskId = 1;
let userId = 1;
let meetingId = 1;

// Helper to find by id
function findById(list, id) {
  return list.find(item => item.id === parseInt(id));
}

// Member endpoints
app.get('/api/members', (req, res) => {
  res.json(members);
});

app.post('/api/members', (req, res) => {
  const { name, role } = req.body;
  if (!name) return res.status(400).json({ message: 'Name required' });
  const member = { id: userId++, name, role: role || 'member' };
  members.push(member);
  res.status(201).json(member);
});

// Task endpoints
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title, assigneeId, status } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });
  const task = { id: taskId++, title, assigneeId: assigneeId || null, status: status || 'todo' };
  tasks.push(task);
  res.status(201).json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const task = findById(tasks, req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  const { title, assigneeId, status } = req.body;
  if (title !== undefined) task.title = title;
  if (assigneeId !== undefined) task.assigneeId = assigneeId;
  if (status !== undefined) task.status = status;
  res.json(task);
});

// Meeting endpoints
app.get('/api/meetings', (req, res) => {
  res.json(meetings);
});

app.post('/api/meetings', (req, res) => {
  const { subject, time } = req.body;
  if (!subject) return res.status(400).json({ message: 'Subject required' });
  const meeting = { id: meetingId++, subject, time: time || new Date().toISOString() };
  meetings.push(meeting);
  res.status(201).json(meeting);
});

// Start server
app.listen(PORT, () => {
  console.log(`Team management app listening on port ${PORT}`);
});
