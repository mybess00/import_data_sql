const formFile = document.getElementById("fileForm");
const formDB = document.getElementById("bdForm");
const responseCt = document.getElementById("response");
const allSelect = document.querySelectorAll(".select-column")
const newConsultBtn = document.getElementById("new-consult")
const inputFile = document.getElementById("input-file")

let dataFile = {}

const setOptions = (options) => {
    if (!options || options.length === 0) {
        alert("Columns on excel file are empty")
        throw new Error(`Columns on excel file are empty`);
    }
    allSelect.forEach(select => {
        select.innerHTML = "";
        options.forEach(column => {
            const option = document.createElement("option");
            option.value = column;
            option.textContent = column;
            select.appendChild(option);
        });
    });
}
const clearForms = () => {
    formDB.classList.add("hidden")
    formDB.classList.remove("grid")
    allSelect.forEach(select => {
        select.innerHTML = "";
    });
    inputFile.value = "";
    responseCt.innerHTML = "<p>Please upload a file and push to see the imported data.</p>";
}

formFile.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(formFile);
    try {
        const response = await fetch("/api/file/excel", {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.error) {
            responseCt.innerHTML = `<p class="error">An error has occurred</p>`;
        } else {
            if (!result.data || !result.data.column || !result.data.data) {
                throw new Error(`Data from API is invalid`);
            }
            const data = result.data.column;
            dataFile = result.data.data
            formDB.classList.remove("hidden")
            formDB.classList.add("grid")
            setOptions(data)
        }
    } catch (err) {
        console.error(err)
        responseCt.innerHTML = `<p class="error">An error has occurred</p>`;
    }
});

formDB.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(formDB);
    if (!dataFile || Object.keys(dataFile).length === 0) {
        responseCt.innerHTML = `<p class="error">No data available to send</p>`;
        return;
    }
    formData.append("data", JSON.stringify(dataFile))
    try {
        const response = await fetch("/api/file/database", {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.error) {
            responseCt.innerHTML = `<p class="error">An error has occurred</p>`;
        } else {
            responseCt.innerHTML = `<h3>Data inserted:</h3><pre>${JSON.stringify(result.data, null, 2)}</pre>`;
        }
    } catch (err) {
        console.error(err)
        responseCt.innerHTML = `<p class="error">An error has occurred</p>`;
    }
})

newConsultBtn.addEventListener("click", clearForms)