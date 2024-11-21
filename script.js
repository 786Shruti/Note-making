const form = document.getElementById('noteForm');
const notesContainer = document.getElementById('notes');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Render notes on page load
window.onload = renderNotes;

// Handle form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('noteTitle').value.trim();
    const description = document.getElementById('noteDescription').value.trim();

    if (title && description) {
        const note = { title, description };
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
        form.reset();
    } else {
        alert('Please fill out both fields.');
    }
});

// Render notes dynamically
function renderNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';

        noteCard.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.description}</p>
            <button class="delete-btn" onclick="deleteNote(${index})">x</button>
        `;
        notesContainer.appendChild(noteCard);
    });
}

// Delete a note
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}
