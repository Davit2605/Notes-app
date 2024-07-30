const addBtn = document.querySelector(".add");

addBtn.addEventListener("click", () => addNewNote());

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
  <div class="tools">
    <button class="edit">
    <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="delete">
    <i class="fa-solid fa-trash"></i>
    </button>
</div>

<div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
  `;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const mainEl = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  mainEl.innerHTML = marked(text); //Markdown

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLS();
  });

  editBtn.addEventListener("click", () => {
    mainEl.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    mainEl.innerHTML = marked(value);

    updateLS();
  });
  document.body.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach((note) => notes.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notes));
}
