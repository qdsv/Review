/* ===== 정규식 (요청사항) ===== */
    const regexMail = /^([a-z]+\d*)+(\.?\w+)+@\w+(\.\w{2,3})+$/;
    const regexId   = /^\w{8,20}$/;
    const regexPw   = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    /* ===== 기존 로그인 검증 로직 유지(정규식만 적용) ===== */
    const form = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const pw = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const pwError = document.getElementById('passwordError');

    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      emailError.textContent = '';
      pwError.textContent = '';

      if(!regexMail.test(email.value.trim())){
        emailError.textContent = '이메일 형식을 확인해주세요. (예: name@example.com)';
        return;
      }
      if(!regexPw.test(pw.value.trim())){
        pwError.textContent = '비밀번호는 8~20자, 영문 대/소문자, 숫자, 특수문자(@$!%*?&)를 모두 포함해야 합니다.';
        return;
      }
      const remember = document.getElementById('remember').checked;
      alert(`로그인 시도: ${email.value}\n기억하기: ${remember ? '예' : '아니오'}`);
    });

    /* ===== 모달 제어 공통 ===== */
    function openModal(id){
      const m = document.getElementById(id);
      if(!m) return;
      m.classList.add('show');
      m.setAttribute('aria-hidden','false');
      const firstInput = m.querySelector('input');
      if(firstInput){ setTimeout(()=> firstInput.focus(), 0); }
    }
    function closeModal(id){
      const m = document.getElementById(id);
      if(!m) return;
      m.classList.remove('show');
      m.setAttribute('aria-hidden','true');
    }
    document.querySelectorAll('.modal-backdrop').forEach(b=>{
      b.addEventListener('click', (e)=>{
        if(e.target === b){ b.classList.remove('show'); b.setAttribute('aria-hidden','true'); }
      });
    });
    document.querySelectorAll('[data-close]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        closeModal(btn.getAttribute('data-close'));
      });
    });
    window.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){
        document.querySelectorAll('.modal-backdrop.show').forEach(m=>{
          m.classList.remove('show'); m.setAttribute('aria-hidden','true');
        });
      }
    });

    /* 열기 트리거 */
    document.getElementById('openFindId').addEventListener('click', (e)=>{ e.preventDefault(); openModal('modalFindId'); });
    document.getElementById('openFindPw').addEventListener('click', (e)=>{ e.preventDefault(); openModal('modalFindPw'); });

    /* 아이디 찾기 (데모) - 현재 입력은 이름/전화만 */
    document.getElementById('submitFindId').addEventListener('click', ()=>{
      const name = document.getElementById('findIdName').value.trim();
      const phone = document.getElementById('findIdPhone').value.trim();
      if(!name || !phone){
        alert('이름과 휴대전화 번호를 입력해주세요.');
        return;
      }
      closeModal('modalFindId');
      alert(`입력하신 정보로 가입된 아이디(이메일)를 안내드렸습니다. (데모)\n이름: ${name}\n전화: ${phone}`);
    });

    /* 비밀번호 찾기 (데모) - 이메일 정규식 적용 */
    document.getElementById('submitFindPw').addEventListener('click', ()=>{
      const targetEmail = document.getElementById('findPwEmail').value.trim();
      if(!regexMail.test(targetEmail)){
        alert('이메일 형식을 확인해주세요. (예: name@example.com)');
        return;
      }
      closeModal('modalFindPw');
      alert(`비밀번호 재설정 메일을 보냈습니다. (데모)\n이메일: ${targetEmail}`);
    });