// models/Diary.js

const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  rating: { type: Number, required: true },
  memo: { type: String },
  // ⭐️ 이 부분이 추가되었습니다.
  author: { 
    type: mongoose.Schema.Types.ObjectId, // 주석: MongoDB의 고유 ID 데이터 타입
    ref: 'User',                          // 주석: 'User' 모델을 참조한다는 의미
    required: true                        // 주석: 작성자는 필수 항목
  }
});

const Diary = mongoose.model('Diary', diarySchema);
module.exports = Diary;
