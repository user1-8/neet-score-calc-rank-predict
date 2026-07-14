(() => {

    function getSectionTable(headingText) {

        const heading = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
            .find(el => el.textContent.trim().includes(headingText));

        if (!heading) return null;

        const container = heading.nextElementSibling;
        if (!container) return null;

        return container.querySelector("table");
    }

    // ================= Candidate Details =================

    const candidateDetails = {};

    const candidateTable = getSectionTable("Candidate Details");

    if (candidateTable) {

        candidateTable.querySelectorAll("tr").forEach(row => {

            const cells = [...row.querySelectorAll("td,th")];

            for (let i = 0; i < cells.length - 1; i += 2) {

                const key = cells[i].innerText.trim().replace(/:$/, "");
                const value = cells[i + 1].innerText.trim();

                if (key) candidateDetails[key] = value;
            }

        });

    }

    // ================= Recorded Response =================

    const recordedResponses = [];

    const responseTable = getSectionTable("Recorded Response List");

    if (responseTable) {

        const rows = [...responseTable.rows];

        const headers = [...rows[0].cells].map(c => c.innerText.trim());

        const qIndex = headers.findIndex(h =>
            /Question\s*No/i.test(h)
        );

        const rIndex = headers.findIndex(h =>
            /Recorded Response/i.test(h)
        );

        rows.slice(1).forEach(row => {

            const cells = [...row.cells];

            recordedResponses.push({
                questionNo: cells[qIndex]?.innerText.trim() ?? "",
                recordedResponse: cells[rIndex]?.innerText.trim() ?? ""
            });

        });

    }

    const result = {
        candidateDetails,
        recordedResponses
    };

    console.log(result);

    copy(JSON.stringify(result, null, 2));

    console.log("Copied to clipboard.");

})();
