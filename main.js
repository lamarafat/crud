const name = document.querySelector("#courseName");
const category = document.querySelector("#courseCategory");
const price = document.querySelector("#coursePrice");
const description = document.querySelector("#courseDescription");
const capacity = document.querySelector("#courseCapacity");
const addBtn = document.querySelector("#click");
const invalidName = document.querySelector(".invalid-name");
const invalidCategory = document.querySelector(".invalid-category");
const invalidPrice = document.querySelector(".invalid-price");
const invalidDescription = document.querySelector(".invalid-description");
const deleteBtn = document.querySelector("#deleteBtn");
const search = document.querySelector("#search");

let courses = [];
if (localStorage.getItem("courses") != null) {
    courses = JSON.parse(localStorage.getItem("courses"));
    displayCourses();
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let isValid = true;
    const namePattern = /^[A-Z][a-z]{2,10}$/;
    if (!namePattern.test(name.value)) {
        invalidName.innerHTML = "This is invalid. It must start with a capital letter and contain 2-10 characters.";
        name.classList.add("is-invalid");
        isValid = false;
    }

    const categoryPattern = /^[A-Z][a-z]{2,25}$/;
    if (!categoryPattern.test(category.value)) {
        invalidCategory.innerHTML = "This is invalid. It must start with a capital letter and contain 2-25 characters.";
        category.classList.add("is-invalid");
        isValid = false;
    }

    const pricePattern = /^[0-9]{1,10}$/;
    if (!pricePattern.test(price.value)) {
        invalidPrice.innerHTML = "This is invalid. It must be a number with 1-10 digits.";
        price.classList.add("is-invalid");
        isValid = false;
    }

    const descriptionPattern = /^[a-zA-Z0-9\s]{2,255}$/;
    if (!descriptionPattern.test(description.value)) {
        invalidDescription.innerHTML = "This is invalid. It must contain 2-255 alphanumeric characters.";
        description.classList.add("is-invalid");
        isValid = false;
    }

    if (isValid) {
        const course = {
            name: name.value,
            category: category.value,
            price: price.value,
            description: description.value,
            capacity: capacity.value,
        };
        courses.push(course);
        localStorage.setItem("courses", JSON.stringify(courses));

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        Toast.fire({
            icon: "success",
            title: "New course added successfully"
        });
        displayCourses();
    }
});

function displayCourses() {
    const result = courses.map((course, index) => {
        return `
        <tr>
        <td>${index + 1}</td>
        <td>${course.name}</td>
        <td>${course.category}</td>
        <td>${course.price}</td>
        <td>${course.description}</td>
        <td>${course.capacity}</td>
        <td>
        <button class='btn btn-danger' onclick='deleteCourse(${index})'>Delete</button>
        </td>
        </tr>
        `;
    }).join(' ');
    document.querySelector("#data").innerHTML = result;
}

function deleteCourse(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index, 1);
            localStorage.setItem("courses", JSON.stringify(courses));
            displayCourses();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
}

search.addEventListener("input", (e) => {
    const keyword = search.value.toLowerCase();
    const courseResult = courses.filter((course) => {
        return course.name.toLowerCase().includes(keyword);
    });

    const result = courseResult.map((course, index) => {
        return `
        <tr>
        <td>${index + 1}</td>
        <td>${course.name}</td>
        <td>${course.category}</td>
        <td>${course.price}</td>
        <td>${course.description}</td>
        <td>${course.capacity}</td>
        <td>
        <button class='btn btn-danger' onclick='deleteCourse(${index})'>Delete</button>
        </td>
        </tr>
        `;
    }).join(' ');

    document.querySelector("#data").innerHTML = result;
});

deleteBtn.addEventListener("click", () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            courses = [];
            localStorage.setItem("courses", JSON.stringify(courses));
            displayCourses();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
});

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});
