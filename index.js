require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Project = require('./models/Project');
const Tech = require('./models/Tech');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { family: 4 })
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// --- Tech Routes ---

// Get all tech stack
app.get('/api/tech', async (req, res) => {
  try {
    const tech = await Tech.find().sort({ createdAt: -1 });
    res.json(tech);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new tech
app.post('/api/tech', async (req, res) => {
  try {
    const newTech = new Tech(req.body);
    const savedTech = await newTech.save();
    res.status(201).json(savedTech);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete tech
app.delete('/api/tech/:id', async (req, res) => {
  try {
    await Tech.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tech deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- Project Routes ---

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new project
app.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
