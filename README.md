<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📚 나의 콘텐츠 다이어리</title>
    <style>
        *{
            margin: 0;
            padding: 0;
        }

        body{
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 1rem;
        }

        #page-wrapper1{
            max-width: 53.7rem;
            margin: 1rem auto;
            padding: 0.6rem;
            background: white;
            border-radius: 1.2rem;
            box-shadow: 0px 2px 6px rgba(100, 100, 100, 0.3);
        }

        #page-wrapper2{
            max-width: 48rem;
            margin: 2rem auto;
            padding: 1.5rem;
            background: #f8f9fa;
            border: 0.17rem solid #e9ecef;
            border-radius: 1rem;
        }

        #page-wrapper3{
            max-width: 48rem;
            margin: 1.5rem auto;
            padding: 1.6rem;
            background: #e3f2fd;
            border: none;
            border-radius: 0.7rem;
        }

        h1{
            text-align: center;
            font-size: 2.5rem;
            margin-top: 1.5rem;
        }

        .fx{
            display: flex;
            align-items: center;
            gap: 1.7rem;
        }

        .fx2{
            display: flex;
            align-items: center;
        }

        .fx, .fx2{
            margin-bottom: 1rem;
        }

        .fx input, select, textarea{
            flex: 1;
            font-size: 1rem;
            padding: 0.8rem;
            border: 0.15rem solid #dee2e6;
            border-radius: 0.5rem;
        }

        #plus{
            font-size: 1rem;
            color: white;
            background: linear-gradient(45deg, #667eea, #764ba2);
            width: 100%;
            margin-top: 0.9rem;
            border: none;
            padding: 0.8rem;
            border-radius: 2rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        #plus:hover{
            transform: translateY(-2px);
            box-shadow: 0 0.01rem 1.5rem rgba(102, 126, 234, 0.4);
        }

        .page-box1{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            text-align: center;
        }

        .page-box2{
            background-color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
        }

        .num{
            font-size: 2rem;
            font-weight: bold;
            color: #667eea
        }

        .num-text{
            color: #666;
            font-size: 0.9rem;
            margin-top: 0.2rem;
        }

        #btn-all{
            text-align: center;
            margin-bottom: 1.5rem;
        }

        .btn.frist, .btn:hover{
            background-color: #667eea;
            color: white;
        }

        .btn{
            background-color: white;
            color: #667eea;
            border: 0.15rem solid #667eea;
            padding: 0.4rem 0.8rem;
            border-radius: 2rem;
            cursor: pointer;
            margin: 0 0.3rem;
            transition: all 0.3s ease;
        }

        .delete-btn {
            background: none;
            border: none;
            font-size: 1.3rem;
            cursor: pointer;
            padding: 0.2rem 0.4rem;
            margin-left: 0.5rem;
        }

        #line{
            color: #333;
            margin-bottom: 1rem;
            padding-bottom: 0.7rem;
            border-bottom: 0.15rem solid #f0f0f0;
        }

        .star{
            cursor: pointer;
            font-size: 1.3rem;
        }

        .fx3{
                display: flex;
                justify-content: space-between;
            }

        @media (max-width: 768px) {
            #page-wrapper1,
            #page-wrapper2,
            #page-wrapper3 {
                width: 95%;
                max-width: none; 
                padding: 1rem;
                margin: 1rem auto;
                box-sizing: border-box;
            }

            h1 {
                font-size: 1.8rem;
            }

            .fx {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
            }

            .fx input,
            .fx select,
            .fx textarea {
                width: 100%;
                box-sizing: border-box;
            }

            #btn-all .btn {
                margin-bottom: 0.5rem;
            }

            .page-box1 {
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            }
        }
    </style>
</head>
<body>
    <div id="page-wrapper1">
        <h1 style="color: #333;">📚 나의 콘텐츠 다이어리</h1>
        <div id="page-wrapper2">
            <form id="diary-form">
                <div class="fx">
                    <div style="margin-right: 2rem; font-weight: bold; color: #495057;">제목:</div> <input type="text" placeholder="영화, 드라마, 웹툰 ,책 제목을 입력하세요" required>
                </div>
                <div class="fx">
                    <div style="margin-right: 2rem; font-weight: bold; color: #495057;">종류:</div>
                    <select name="" id="" required>
                        <option value="">선택하세요</option>
                        <option value="movie">🎬 영화</option>
                        <option value="drama">📺 드라마</option>
                        <option value="webtoon">📱 웹툰</option>
                        <option value="book">📖 책</option>
                    </select>
                </div>
                <div class="fx">
                    <div style="margin-right: 2rem; font-weight: bold; color: #495057;">날짜:</div> <input type="date" id="dt" required>
                </div>
                <div class="fx2">
                    <div style="margin-right: 3.7rem; font-weight: bold; color: #495057;">평점:</div>
                    <div class="star-rating">
                        <span class="star" data-rating="1">☆</span>
                        <span class="star" data-rating="2">☆</span>
                        <span class="star" data-rating="3">☆</span>
                        <span class="star" data-rating="4">☆</span>
                        <span class="star" data-rating="5">☆</span>
                        <span id="rating-text">(평점을 선택하세요)</span>
                    </div>
                </div>
                <div class="fx">
                    <div style="margin-right: 2rem; font-weight: bold; color: #495057;">메모:</div> <textarea name="" id="" placeholder="감상평이나 기억하고 싶은 내용을 적어보세요..." style="height: 3rem;"></textarea>
                </div>
                <input type="submit" id="plus" value="📝 다이어리 추가하기">
            </form>
        </div>
        <div id="page-wrapper3">
            <h3 style="text-align: center; margin-bottom: 1.2rem;">📊 나의 콘텐츠 통계</h3>
            <div class="page-box1">
                <div class="page-box2">
                    <div class="num">0</div>
                    <div class="num-text">총 개수</div>
                </div>
                <div class="page-box2">
                    <div class="num">0.0</div>
                    <div class="num-text">평균 평점</div>
                </div>
                <div class="page-box2">
                    <div class="num">0</div>
                    <div class="num-text">이번 달</div>
                </div>
                <div class="page-box2">
                    <div class="num">-</div>
                    <div class="num-text">최애 장르</div>
                </div>
            </div>
        </div>
        <div id="btn-all">
            <button class="btn frist">전체</button>
            <button class="btn">🎬 영화</button>
            <button class="btn">📺 드라마</button>
            <button class="btn">📱 웹툰</button>
            <button class="btn">📖 책</button>
        </div>
        <div style="margin-left: 1rem; margin-right: 1rem; margin-bottom: 1rem;">
            <h3 id="line">📖 내가 본 콘텐츠들</h3>
            <div id="empty" style="text-align: center; font-size: 1rem;">
                <div style="font-size: 3rem;">📝</div>
                <p>아직 기록된 콘텐츠가 없어요!</p>
                <p>위에서 첫 번째 다이어리를 작성해보세요 😊</p>
            </div>
            <div id="diary-list"></div>
        </div>
    </div>

   <script>
    // --- 기본 설정 ---
    // 백엔드 서버의 API 기본 주소를 상수로 저장합니다.
    // 나중에 서버 주소가 바뀌면 이 부분만 수정하면 되어서 편리합니다.
    const API_URL = 'http://localhost:3000/api/diaries';

    // 페이지가 처음 로드될 때 날짜 입력창의 기본값을 오늘 날짜로 설정합니다.
    document.getElementById("dt").valueAsDate = new Date();
    
    // 사용자가 클릭한 별점(rating)을 저장하기 위한 변수입니다.
    // 아무것도 선택하지 않았을 때의 기본값은 0입니다.
    let selectedRating = 0;

    // --- 이벤트 리스너 설정 ---
    // 'DOMContentLoaded'는 웹 브라우저가 HTML 문서를 전부 읽고解析한 후 발생하는 이벤트입니다.
    // 즉, 페이지가 준비되자마자 fetchDiaries 함수를 실행해서 서버로부터 데이터를 불러옵니다.
    document.addEventListener('DOMContentLoaded', fetchDiaries);

    // 'diary-form'이라는 id를 가진 폼(form)에서 'submit' 이벤트(추가하기 버튼 클릭)가 발생했을 때,
    // handleFormSubmit 함수를 실행하도록 연결합니다.
    document.getElementById("diary-form").addEventListener("submit", handleFormSubmit);

    // 별점(star)으로 사용되는 모든 span 태그들을 찾아서 각각 클릭 이벤트를 설정합니다.
    document.querySelectorAll(".star").forEach(star => {
        star.addEventListener("click", function () {
            // 클릭된 별의 data-rating 값을 가져와서 selectedRating 변수에 저장합니다.
            selectedRating = parseInt(this.dataset.rating);
            // 화면에 보이는 별 모양을 업데이트합니다. (예: 3점을 누르면 별 3개가 채워짐)
            updateStarDisplay();
        });
    });

    // --- 함수 정의 ---

    // 1. 서버에서 모든 다이어리 기록을 가져와서 화면에 그리는 함수
    async function fetchDiaries() {
        try {
            // fetch 함수를 사용해 API_URL에 GET 요청을 보냅니다.
            // await는 서버의 응답이 올 때까지 기다리게 합니다.
            const response = await fetch(API_URL);
            // 서버가 보낸 JSON 형식의 응답 데이터를 실제 자바스크립트 객체 배열로 변환합니다.
            const diaries = await response.json();

            const diaryList = document.getElementById("diary-list");
            const emptyMessage = document.getElementById("empty");
            
            // 새로운 목록을 그리기 전에 기존에 있던 목록을 깨끗하게 비웁니다.
            diaryList.innerHTML = ''; 

            if (diaries.length === 0) {
                // 받아온 데이터가 하나도 없으면 "기록된 콘텐츠가 없어요!" 메시지를 보여줍니다.
                emptyMessage.style.display = "block";
            } else {
                // 데이터가 있으면 메시지를 숨깁니다.
                emptyMessage.style.display = "none";
                // diaries 배열의 각 항목(diary)에 대해 반복 실행합니다.
                diaries.forEach(diary => {
                    // 각 다이어리 데이터로 HTML 요소를 생성합니다.
                    const diaryElement = createDiaryElement(diary);
                    // 생성된 HTML 요소를 화면의 목록(diaryList)에 추가합니다.
                    diaryList.appendChild(diaryElement);
                });
            }
            // 목록을 그린 후, 통계를 다시 계산해서 화면에 업데이트합니다.
            updateStats(diaries);
        } catch (error) {
            // fetch 과정에서 네트워크 오류 등이 발생하면 콘솔에 에러를 출력합니다.
            console.error('데이터를 불러오는 중 오류 발생:', error);
        }
    }

    // 2. 폼 제출(다이어리 추가) 시 실행될 함수
    async function handleFormSubmit(e) {
        // e.preventDefault()는 폼 제출 시 발생하는 페이지 새로고침 현상을 막습니다.
        e.preventDefault();

        // 폼 입력 요소들로부터 값을 읽어와서 서버로 보낼 객체(newDiary)를 만듭니다.
        const newDiary = {
            title: document.querySelector("input[type='text']").value,
            type: document.querySelector("select").options[
                document.querySelector("select").selectedIndex
            ].text,
            date: document.querySelector("input[type='date']").value,
            rating: selectedRating,
            memo: document.querySelector("textarea").value
        };

        // 필수 항목들이 모두 입력되었는지 확인합니다.
        if (!newDiary.title || !newDiary.type || !newDiary.date || newDiary.rating === 0) {
            alert("제목, 종류, 날짜, 평점을 모두 입력해주세요.");
            return; // 함수 실행을 중단합니다.
        }

        try {
            // API_URL에 POST 방식으로 newDiary 객체를 서버로 전송합니다.
            await fetch(API_URL, {
                method: 'POST', // 요청 방식은 POST
                headers: { 'Content-Type': 'application/json' }, // 보내는 데이터의 형식은 JSON
                body: JSON.stringify(newDiary) // 자바스크립트 객체를 JSON 문자열로 변환
            });
            // 데이터 저장이 성공하면, 목록을 다시 불러와 화면을 최신 상태로 업데이트합니다.
            fetchDiaries();
            // 입력 폼의 내용을 모두 초기화합니다.
            resetForm();
        } catch (error) {
            console.error('데이터 저장 중 오류 발생:', error);
        }
    }

    // 3. 다이어리 데이터 하나를 받아 HTML 요소를 생성하는 함수
    function createDiaryElement(diary) {
        const main = document.createElement("div");
        main.className = "fx3";
        // diary 객체의 정보를 사용해 innerHTML로 내부 구조를 만듭니다.
        // toLocaleDateString()은 날짜 형식을 'YYYY. MM. DD.'와 같이 보기 좋게 바꿔줍니다.
        main.innerHTML = `
            <div>
                <strong>${diary.type}</strong> ${diary.title} (${new Date(diary.date).toLocaleDateString()})<br>
                평점: ${"★".repeat(diary.rating)}${"☆".repeat(5 - diary.rating)}<br>
                메모: ${diary.memo || "(없음)"}
            </div>
            <button class="delete-btn">🗑️</button>
        `;
        
        // 방금 만든 요소 안에서 삭제 버튼을 찾아 클릭 이벤트를 추가합니다.
        main.querySelector(".delete-btn").addEventListener("click", async () => {
            if (confirm('정말로 이 기록을 삭제하시겠습니까?')) {
                try {
                    // 삭제 API 주소(${API_URL}/${diary._id})에 DELETE 요청을 보냅니다.
                    // diary._id는 MongoDB가 각 데이터에 부여한 고유 ID입니다.
                    await fetch(`${API_URL}/${diary._id}`, { method: 'DELETE' });
                    // 삭제 성공 후, 목록을 다시 불러와 화면을 업데이트합니다.
                    fetchDiaries();
                } catch (error) {
                    console.error('데이터 삭제 중 오류 발생:', error);
                }
            }
        });

        main.style.padding = "1rem";
        main.style.background = "white";
        // ... (이하 스타일링 코드)
        
        return main; // 완성된 HTML 요소를 반환합니다.
    }

    // 4. 입력 폼을 초기화하는 함수
    function resetForm() {
        document.querySelector("input[type='text']").value = "";
        document.querySelector("select").value = "";
        document.querySelector("input[type='date']").valueAsDate = new Date();
        document.querySelector("textarea").value = "";
        selectedRating = 0;
        updateStarDisplay();
    }
    
    // (기존 함수들: updateStarDisplay, updateStats)
    // 별점 표시를 업데이트하는 함수
    function updateStarDisplay() {
        // ...
    }

    // 통계 정보를 계산하고 업데이트하는 함수
    function updateStats(diaries) {
        // ...
    }
</script>
</body>
</html>
