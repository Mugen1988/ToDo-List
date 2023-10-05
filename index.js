let myList = []

const saveBtn = document.getElementById("save-btn")
const deleteBtn = document.getElementById("delete-btn")
const inputField = document.getElementById("input-field")
const listedItems = document.getElementById("listed-items")

let listsFromLocalStorage = JSON.parse (localStorage.getItem("myList"))

if (listsFromLocalStorage) {
    myList = listsFromLocalStorage
    renderList()
}

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myList = [];
    renderList()
})

saveBtn.addEventListener("click", function() {
    myList.push(inputField.value)
    inputField.value = ""
    localStorage.setItem("myList", JSON.stringify(myList))
    renderList()
})

function renderList() {
    let listItems = ""
    for (let i = 0; i < myList.length; i++) {
        listItems += `<li>${myList[i]} <span class="remove-icon" data-index="${i}">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </span>
                        <span class ="edit-icon" data-index="${i}">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </span>
                    </li>`;
    }
    listedItems.innerHTML = listItems
    
    // Attach click event listeners to edit icons
    const editIcons = document.querySelectorAll(".edit-icon");
    editIcons.forEach((icon) => {
        icon.addEventListener("click", function () {
            const indexToEdit = parseInt(icon.getAttribute("data-index"));
            if (!isNaN(indexToEdit)) {
                // Allow the user to edit the item
                const newValue = prompt("Edit item:", myList[indexToEdit]);
                if (newValue !== null) {
                    myList[indexToEdit] = newValue;
                    localStorage.setItem("myList", JSON.stringify(myList));
                    renderList();
                }
            }
        });
    });

    // Attach click event listeners to remove icons
    const removeIcons = document.querySelectorAll(".remove-icon");
    removeIcons.forEach((icon) => {
        icon.addEventListener("click", function () {
            const indexToRemove = parseInt(icon.getAttribute("data-index"));
            if (!isNaN(indexToRemove)) {
                // Remove the item from myList and update localStorage
                myList.splice(indexToRemove, 1);
                localStorage.setItem("myList", JSON.stringify(myList));
                renderList();
            }
        });
    });
}