const express = require('express');// 웹 서버 프레임워크
const mongoose = require('mongoose');// MongoDB와 상호작용하기 위한 ODM

const bcrypt = require('bcrypt');// 비밀번호 암호화 라이브러리
const jwt = require('jsonwebtoken');// JWT 토큰 생성 및 검증 라이브러리

const Diary = require('./models/Diary'); // Diary 모델 불러오기
const User = require('./models/User'); // User 모델 불러오기

const cors = require('cors'); //다른주소(프론트엔드)에서 요청을 허용해주는 미들웨어

const app = express();
const port = 3000;

// ⚠️ 이 부분이 중요해요!
// 프론트엔드에서 보내는 JSON 형식의 데이터를 서버가 알아들을 수 있게 설정합니다.
app.use(cors());
app.use(express.json());

// MongoDB 연결 (이전과 동일)
const MONGO_URI = "mongodb+srv://inkyu102077_db_user:shin20032003@cluster0.dxr9vzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // ⚠️ 본인의 연결 정보로 유지하세요.

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB에 성공적으로 연결되었습니다.'))
  .catch(err => console.error('MongoDB 연결 오류:', err));

// --- API 엔드포인트 만들기 ---




// --- 사용자 인증 API ---

// [API] 회원가입
app.post('/api/users/register', async (req, res) => {
    try {
        // 1. 프론트엔드에서 username과 password를 받아옵니다.
        const { username, password } = req.body;
        // 2. User 모델을 사용해 새로운 사용자 문서를 생성합니다.
        // (참고: 비밀번호 암호화는 User.js의 pre('save') 로직에서 자동으로 처리됩니다.)
        const newUser = new User({ username, password });
        // 3. 데이터베이스에 사용자를 저장합니다.
        await newUser.save();
        // 4. 성공 메시지를 응답합니다.
        res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.' });
    } catch (error) {
        res.status(500).send('회원가입 중 오류 발생: ' + error);
    }
});

// [API] 로그인
app.post('/api/users/login', async (req, res) => {
    try {
        // 1. 프론트엔드에서 username과 password를 받아옵니다.
        const { username, password } = req.body;
        // 2. username으로 데이터베이스에서 사용자를 찾습니다.
        const user = await User.findOne({ username });
        if (!user) { // 사용자가 없으면
            return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        // 3. bcrypt.compare로 입력된 비밀번호와 DB의 암호화된 비밀번호를 비교합니다.
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { // 비밀번호가 일치하지 않으면
            return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        // 4. 비밀번호가 일치하면, JWT 토큰(출입증)을 생성합니다.
        // jwt.sign(payload, secretKey, options)
        const token = jwt.sign(
            { userId: user._id }, // 토큰에 담을 정보(사용자 ID)
            'MySecretKey',        // 토큰 암호화를 위한 비밀 키 (실제 프로젝트에서는 더 복잡하게 만드세요)
            { expiresIn: '1h' }    // 토큰 유효기간 (예: 1시간)
        );

        // 5. 생성된 토큰을 프론트엔드에 전달합니다.
        res.json({ token, message: '로그인 성공!' });
    } catch (error) {
        res.status(500).send('로그인 중 오류 발생: ' + error);
    }
});

// [미들웨어] 인증 토큰 검증
const authMiddleware = (req, res, next) => {
    // 1. 요청 헤더에서 'Authorization' 값을 찾습니다. (형식: 'Bearer eyJhbGci...')
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
    }

    // 2. 'Bearer ' 부분을 제외하고 실제 토큰 값만 추출합니다.
    const token = authHeader.split(' ')[1];
    
    try {
        // 3. jwt.verify로 토큰이 유효한지 검증합니다.
        const decoded = jwt.verify(token, 'MySecretKey');
        // 4. 토큰이 유효하면, 토큰에 담겨있던 사용자 ID를 req 객체에 저장합니다.
        req.userId = decoded.userId;
        // 5. 다음 미들웨어 또는 API 로직으로 넘어갑니다.
        next();
    } catch (error) {
        res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
};

// 1. 새 다이어리 기록 생성 API (POST 방식)
// 주석: app.post의 두 번째 인자로 authMiddleware를 추가하면, 이 API는 인증된 사용자만 접근할 수 있습니다.
app.post('/api/diaries', authMiddleware, async (req, res) => {
    try {
        // 주석: req.userId는 authMiddleware가 토큰에서 추출해준 사용자 ID입니다.
        // 새로운 다이어리 데이터에 author 필드를 추가합니다.
        const newDiary = new Diary({ ...req.body, author: req.userId });
        await newDiary.save();
        res.status(201).json(newDiary);
    } catch (error) {
        res.status(500).send('데이터 저장 중 오류 발생: ' + error);
    }
});


// 2. 모든 다이어리 기록 조회 API (GET 방식)
app.get('/api/diaries',authMiddleware, async (req, res) => {
  try {
    // 주석: Diary.find() 대신, author 필드가 현재 로그인된 사용자 ID와 일치하는 기록만 찾습니다.
    const diaries = await Diary.find({author: req.userId}); // 모든 다이어리 기록을 찾음
    res.json(diaries); // 찾은 데이터를 JSON 형태로 응답
  } catch (error) {
    res.status(500).send('데이터 조회 중 오류 발생: ' + error);
  }
});

// 3. 특정 다이어리 기록 삭제 API (DELETE 방식)

app.delete('/api/diaries/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        // 주석: 삭제하려는 기록을 먼저 찾습니다.
        const diary = await Diary.findOne({ _id: id });
        if (!diary) {
            return res.status(404).json({ message: '다이어리를 찾을 수 없습니다.' });
        }
        // 주석: 기록의 작성자(diary.author)와 현재 로그인된 사용자(req.userId)가 같은지 확인합니다.
        if (diary.author.toString() !== req.userId) {
            return res.status(403).json({ message: '삭제 권한이 없습니다.' });
        }

        // 주석: 권한이 확인되면 기록을 삭제합니다.
        await Diary.findByIdAndDelete(id);
        res.json({ message: '다이어리가 성공적으로 삭제되었습니다.' });
    } catch (error) {
        res.status(500).send('데이터 삭제 중 오류 발생: ' + error);
    }
});


// 서버 실행 (이전과 동일)
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
