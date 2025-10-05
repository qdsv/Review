document.getElementById("dt").valueAsDate = new Date();

    let selectedRating = 0;

    const stars = document.querySelectorAll(".star");

    stars.forEach(star => {
        star.addEventListener("click", function () {
            selectedRating = parseInt(this.dataset.rating);
            updateStarDisplay();
        });
    });

    function updateStarDisplay() {
        const ratingText = document.getElementById("rating-text");

        stars.forEach((star, index) => {
            if (index < selectedRating) {
                star.textContent = "★";
            } 
            else {
                star.textContent = "☆";
            }
        });

        ratingText.textContent = selectedRating > 0
            ? `(${selectedRating}점)`
            : "(평점을 선택하세요)";
    }

    function diary(e){
        e.preventDefault();

        const title = document.querySelector("input[type='text']").value;
        const typeText = document.querySelector("select").options[
            document.querySelector("select").selectedIndex
        ].text;
        const date = document.querySelector("input[type='date']").value;
        const memo = document.querySelector("textarea").value;

        if (!title || !typeText || !date || selectedRating === 0) {
            alert("평점을 입력해주세요")
            return;
        }

        const diaryList = document.getElementById("diary-list");
        const emptyMessage = document.getElementById("empty");

        if (emptyMessage && diaryList.children.length === 0) {
            emptyMessage.style.display = "none";
        }
        
        const container = document.getElementById("diary-list");

        const main = document.createElement("div");
        main.className = "fx3";
        main.setAttribute("data-name", typeText);
        main.innerHTML = `
            <div>
                <strong>${typeText}</strong> ${title} (${date})<br>
                평점: ${"★".repeat(selectedRating)}${"☆".repeat(5 - selectedRating)}<br>
                메모: ${memo || "(없음)"}
            </div>
            <button class="delete-btn">🗑️</button>
        `;

        main.style.padding = "1rem";
        main.style.background = "white";
        main.style.marginBottom = "1rem";
        main.style.borderRadius = "0.7rem";
        main.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
        
        const deleteBtn = main.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            main.remove();

            if (diaryList.children.length === 0) {
                emptyMessage.style.display = "block";
            }

            updateStats();
        });

        container.appendChild(main);

        document.querySelector("input[type='text']").value = "";
        document.querySelector("select").value = "";
        document.querySelector("input[type='date']").valueAsDate = new Date();
        document.querySelector("textarea").value = "";
        selectedRating = 0;
        updateStarDisplay();
        updateStats();
    }

    document.getElementById("diary-form").addEventListener("submit", diary);

    const buttons = document.querySelectorAll("#btn-all .btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.textContent;
            const diaryAll = document.querySelectorAll("#diary-list .fx3");

            buttons.forEach(btn => btn.classList.remove("frist"));
            button.classList.add("frist");

            diaryAll.forEach(data => {
                const dataName = data.getAttribute("data-name");

                if (category === "전체" || dataName === category) {
                    data.style.display = "flex";
                } 
                else {
                    data.style.display = "none";
                }
            });
        });
    });

    function updateStats() {
        const diaryAll = document.querySelectorAll("#diary-list .fx3");
        const total = diaryAll.length;

        let totalScore = 0;
        let monthCount = 0;
        const genreCount = {};

        const today = new Date();
        const thisMonth = today.getMonth();
        const thisYear = today.getFullYear();

        diaryAll.forEach(item => {
            const text = item.innerText;
            const dateMatch = text.match(/\((\d{4}-\d{2}-\d{2})\)/);
            const stars = text.match(/★/g);
            const genre = item.getAttribute("data-name");

            if (dateMatch && stars) {
                const writtenDate = new Date(dateMatch[1]);
                totalScore += stars.length;

                if (writtenDate.getFullYear() === thisYear && writtenDate.getMonth() === thisMonth) {
                    monthCount++;
                }

                if (genre) {
                    genreCount[genre] = (genreCount[genre] || 0) + 1;
                }
            }
        });

        const avg = total ? (totalScore / total).toFixed(1) : "0.0";
        const favoriteGenre = Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

        document.querySelector(".page-box1 .page-box2:nth-child(1) .num").textContent = total;
        document.querySelector(".page-box1 .page-box2:nth-child(2) .num").textContent = avg;
        document.querySelector(".page-box1 .page-box2:nth-child(3) .num").textContent = monthCount;
        document.querySelector(".page-box1 .page-box2:nth-child(4) .num").textContent = favoriteGenre;
    }