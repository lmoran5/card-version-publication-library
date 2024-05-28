document.addEventListener("DOMContentLoaded", function() {
    history.pushState({}, "", "/scientific-publication-library-test");
    updateResultsCount();
});

let filters = {
    tagSearch: '',
    journalNameSearch: '',
    subSpecialty: '',
    productDropdown: '',
    authorDropdown: ''
};

function normalizeText(text) {
    return text.toLowerCase().replace(/'/g, "").replace(/-/g, "");
}

function updateResultsCount() {
    const cards = document.querySelectorAll(".card");
    let visibleCount = 0;

    cards.forEach(card => {
        if (card.style.display !== "none") {
            visibleCount++;
        }
    });

    document.getElementById("resultsCount").textContent = `Results Found: ${visibleCount}`;
}

function applyFilters() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const cardContent = card.querySelector(".card-content");
        const tagText = cardContent.querySelector("p:nth-child(3)").textContent;
        const journalNameText = cardContent.querySelector("h3").textContent;
        const subSpecialtyText = cardContent.querySelector("p:nth-child(4)").textContent;
        const productText = cardContent.querySelector("p:nth-child(5)").textContent;
        const authorText = cardContent.querySelector("p:nth-child(6)").textContent;

        const tagMatch = !filters.tagSearch || normalizeText(tagText).includes(normalizeText(filters.tagSearch));
        const journalNameMatch = !filters.journalNameSearch || normalizeText(journalNameText).includes(normalizeText(filters.journalNameSearch));
        const subSpecialtyMatch = !filters.subSpecialty || normalizeText(subSpecialtyText).includes(normalizeText(filters.subSpecialty));
        const productMatch = !filters.productDropdown || normalizeText(productText).includes(normalizeText(filters.productDropdown));
        const authorMatch = !filters.authorDropdown || normalizeText(authorText).includes(normalizeText(filters.authorDropdown));

        if (tagMatch && journalNameMatch && subSpecialtyMatch && productMatch && authorMatch) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });

    updateResultsCount();
}

function searchByField(fieldId) {
    const input = document.getElementById(fieldId);
    filters[fieldId] = input.value.toLowerCase();
    applyFilters();
}

function filterByDropdown(fieldId) {
    const dropdown = document.getElementById(fieldId);
    filters[fieldId] = dropdown.value.toLowerCase();
    applyFilters();
}

function clearFilters() {
    document.getElementById('tagSearch').value = '';
    document.getElementById('journalNameSearch').value = '';
    document.getElementById('subSpecialty').selectedIndex = 0;
    document.getElementById('productDropdown').selectedIndex = 0;
    document.getElementById('authorDropdown').selectedIndex = 0;

    filters = {
        tagSearch: '',
        journalNameSearch: '',
        subSpecialty: '',
        productDropdown: '',
        authorDropdown: ''
    };

    applyFilters();
}


document.getElementById('tagSearch').addEventListener('input', () => searchByField('tagSearch'));
document.getElementById('journalNameSearch').addEventListener('input', () => searchByField('journalNameSearch'));
document.getElementById('subSpecialty').addEventListener('change', () => filterByDropdown('subSpecialty'));
document.getElementById('productDropdown').addEventListener('change', () => filterByDropdown('productDropdown'));
document.getElementById('authorDropdown').addEventListener('change', () => filterByDropdown('authorDropdown'));
document.getElementById('clearFiltersButton').addEventListener('click', clearFilters);

