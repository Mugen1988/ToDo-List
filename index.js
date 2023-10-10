let myList = []

const saveBtn = document.getElementById("save-btn")
const deleteBtn = document.getElementById("delete-btn")
const inputField = document.getElementById("input-field")
const listedItems = document.getElementById("listed-items")

const listsFromLocalStorage = JSON.parse (localStorage.getItem("myList"))

if (listsFromLocalStorage) {
    myList = listsFromLocalStorage
    renderList()
}

//DELETE BUTTON (REMOVE ALL ITEMS FROM LIST)
deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myList = [];
    renderList()
})

//ADDING INPUT FIELD VALUE WITH ENTER KEY
inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && inputField.value.trim() !== "") {
        myList.push(inputField.value.trim());
        inputField.value = "";
        localStorage.setItem("myList", JSON.stringify(myList));
        renderList();
        event.preventDefault(); // Prevent the default form submission behavior
    }
});

//SAVE THE INPUT VALUE WITH BUTTON CLICK AND DISABLE SAVING EMPTY VALUE
saveBtn.addEventListener("click", function() {
    const inputValue = inputField.value.trim();
    if (inputValue !== "") {
        myList.push(inputValue);
        inputField.value = "";
        localStorage.setItem("myList", JSON.stringify(myList));
        renderList();
    } else {
        // Handle the case when the input field is empty (you can show an error message or take appropriate action)
        alert("Input field cannot be empty!");
    }
})

//FUNCTION TO RENDER TO-DO LIST
function renderList() {
    let listItems = ""
    for (let i = 0; i < myList.length; i++) {
        listItems += `<li>${myList[i]}
                        <span class="remove-icon" data-index="${i}">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </span>
                        <span class ="edit-icon" data-index="${i}">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </span>
                    </li>`;
    }
    listedItems.innerHTML = listItems
    
    editItem()
    removeItem()
}

//FUNCTION FOR EDIT ICON (EDIT ADDED ITEMS)
function editItem() {
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
}

//FUNCTION FOR REMOVE ICON (REMOVE ADDED ITEM)
function removeItem() {
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