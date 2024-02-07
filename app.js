document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("issues.html")) {
        // Load issues only on the issues.html page
        loadIssues();
    }
});

function createIssue() {
    const title = document.getElementById('issueTitle').value;
    const description = document.getElementById('issueDescription').value;
    const assignee = document.getElementById('assignee').value;
    const priority = document.getElementById('priority').value;
    const attachment = document.getElementById('attachment').files[0]; // Get the file

    const newIssue = {
        title,
        description,
        assignee,
        priority,
        attachment: attachment ? URL.createObjectURL(attachment) : null // Convert file to URL
    };

    // Save the issue to local storage
    saveIssue(newIssue);

    // Redirect to the issues page
    window.location.href = "index.html";
}





function deleteIssue(index) {
    let issues = getIssues();

    // Remove the issue from local storage
    issues.splice(index, 1);
    localStorage.setItem('issues', JSON.stringify(issues));

    // Refresh the issue list
    loadIssues();
}

function saveIssue(issue) {
    let issues = getIssues();
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
}

function loadIssues() {
    let issues = getIssues();
    let issueList = document.getElementById('issueList');
    issueList.innerHTML = ""; // Clear the existing list

    issues.forEach((issue, index) => {
        const issueElement = document.createElement('li');
        issueElement.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${issue.title}</strong><br><br>
                    <strong>Description:</strong> ${issue.description}<br>
                    <strong>Assignee:</strong> ${issue.assignee}<br>
                    <strong>Priority:</strong> ${issue.priority}<br>
                    <strong>Attachment:</strong> ${issue.attachment ? `<a href="${issue.attachment}" target="_blank">View Attachment</a>` : 'No attachment'}<br>
                </div>
                <button onclick="deleteIssue(${index})" class="btn btn-danger rounded" >Delete</button>
            </div>
        `;
        issueElement.classList.add('mb-3'); // Add margin-bottom for spacing
        issueList.appendChild(issueElement);
    });
}


function getIssues() {
    return JSON.parse(localStorage.getItem('issues')) || [];
}