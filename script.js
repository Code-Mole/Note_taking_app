document.addEventListener("DOMContentLoaded", loadNotes);

const titleInput = document.getElementById("note-title");
const contentInput = document.getElementById("note-content");
const saveButton = document.getElementById("save-note");
const notesList = document.getElementById("notes-list");
const searchInput = document.getElementById("search");

let editIndex = null; // Track note being edited

saveButton.addEventListener("click", saveNote);
searchInput.addEventListener("input", filterNotes);

// Function to save or update a note
function saveNote() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title === "" || content === "") {
    alert("Please enter both a title and note content.");
    return;
  }

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  if (editIndex !== null) {
    notes[editIndex] = { title, content }; // Update existing note
    editIndex = null;
    saveButton.textContent = "Save Note"; // Reset button text
  } else {
    notes.push({ title, content }); // Add new note
  }

  localStorage.setItem("notes", JSON.stringify(notes));

  titleInput.value = "";
  contentInput.value = "";

  loadNotes();
}

// Function to load notes from localStorage
function loadNotes() {
  notesList.innerHTML = ""; // Clear previous list
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.forEach((note, index) => {
    const noteItem = document.createElement("div");
    noteItem.classList.add("note");

    noteItem.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button id="edit" onclick="editNote(${index})">Edit</button>
            <button onclick="deleteNote(${index})">Delete</button>
        `;

    notesList.appendChild(noteItem);
  });
}

// Function to delete a note
function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1); // Remove note at index
  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes();
}

// Function to edit a note
function editNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  titleInput.value = notes[index].title;
  contentInput.value = notes[index].content;
  editIndex = index;
  saveButton.textContent = "Update Note";
}

// Function to filter notes
function filterNotes() {
  const searchValue = searchInput.value.toLowerCase();
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  notesList.innerHTML = ""; // Clear previous list

  notes
    .filter((note) => note.title.toLowerCase().includes(searchValue))
    .forEach((note, index) => {
      const noteItem = document.createElement("div");
      noteItem.classList.add("note");

      noteItem.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <button onclick="editNote(${index})">Edit</button>
                <button onclick="deleteNote(${index})">Delete</button>
            `;

      notesList.appendChild(noteItem);
    });
}

const darkModeToggle = document.getElementById("toggle-dark-mode");

// Load dark mode preference from localStorage
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️ Light Mode";
  }
  loadNotes();
});

// Toggle Dark Mode
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    darkModeToggle.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem("darkMode", "disabled");
    darkModeToggle.textContent = "🌙 Dark Mode";
  }
});
