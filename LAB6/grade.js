/* ============================================================================
   PART 1: LIST OF ERRORS FOUND IN GIVEN CODE
   ============================================================================
   // Error 1 (grade.html, Line 9): Missing 'return' in onsubmit="checkMark()", causing the form to submit and refresh the page immediately.
   // Error 2 (grade.html, Line 17): Function call onclick="showtable()" uses lowercase 't', which does not match function showTable() in grade.js.
   // Error 3 (grade.html, Line 19): Script src is "grades.js" instead of the actual filename "grade.js".
   // Error 4 (grade.js, Line 5): Assignment operator (=) used instead of comparison operator (===) in if (name = ""), which overwrites name with empty string.
   // Error 5 (grade.js, Line 9): Typo in function name isNan(mark); JavaScript requires capital 'N' in isNaN(mark).
   // Error 6 (grade.js, Line 14): Logical AND (&&) used instead of logical OR (||) in if (mark < 0 && mark > 100); a number cannot be both < 0 and > 100.
   // Error 7 (grade.js, Line 28): Typo in document.getElementByID("result"); JavaScript requires lowercase 'd' in getElementById.
   // Error 8 (grade.js, Line 30): British spelling style.colour used instead of CSS property style.color.
   // Error 9 (grade.js, Line 31): Returns true on valid input, causing the form to submit and reload the page so the result disappears immediately.
   // Error 10 (grade.js, Line 38): Loop starts at i = 1 instead of i = 0, skipping the first grade ("A" / "80-100").
   // Error 11 (grade.js, Line 42): Typo in property name .innerHtml; JavaScript requires capital HTML in .innerHTML.
   ============================================================================ */

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let mark = document.forms["gradeForm"]["mark"].value.trim();

    // Part 1 Fix (Error 4): Use === to check if name is empty
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Part 2 (Task 5): Check if mark field is empty before checking isNaN
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Part 1 Fix (Error 5): Corrected spelling to isNaN()
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = parseInt(mark, 10);

    // Part 1 Fix (Error 6): Use || (OR) to check if mark is outside 0-100 range
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    let grade;
    let resultColor;

    // Determine grade and Part 2 (Task 6): Set color based on grade
    if (mark >= 80) {
        grade = "A";
        resultColor = "green";
    } else if (mark >= 65) {
        grade = "B";
        resultColor = "green";
    } else if (mark >= 50) {
        grade = "C";
        resultColor = "orange";
    } else {
        grade = "F";
        resultColor = "red";
    }

    // Part 1 Fix (Errors 7 & 8): Fixed getElementById and style.color
    const resultEl = document.getElementById("result");
    resultEl.innerHTML = name + " got grade " + grade;
    resultEl.style.color = resultColor;

    // Part 2 (Task 8): Display the date and time the grade was checked
    document.getElementById("checkedTime").innerHTML = "Checked on: " + new Date();

    // Part 1 Fix (Error 9): Return false so the form does not refresh and erase the result
    return false;
}

// Part 2 (Task 7): Generate a random integer from 0 to 100 and put it in the mark field
function generateRandomMark() {
    const randomScore = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomScore;
}

function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    // Added table header row for clean styling
    let tableHTML = "<table><thead><tr><th>Grade</th><th>Mark Range</th></tr></thead><tbody>";

    // Part 1 Fix (Error 10): Start loop at i = 0 so grade "A" is included
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</tbody></table>";

    // Part 1 Fix (Error 11): Corrected property name to .innerHTML
    document.getElementById("tableContainer").innerHTML = tableHTML;
}
