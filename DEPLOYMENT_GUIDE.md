# 🚀 피트니스055 배포 가이드

## 📋 목차
1. [GitHub 저장소 생성](#1-github-저장소-생성)
2. [코드 업로드](#2-코드-업로드)
3. [Netlify 배포](#3-netlify-배포)
4. [도메인 설정](#4-도메인-설정-선택사항)
5. [이미지 최적화](#5-이미지-최적화)

---

## 1. 📂 GitHub 저장소 생성

### 1-1. GitHub에 로그인
- [GitHub.com](https://github.com) 접속 후 로그인

### 1-2. 새 저장소 생성
1. **우상단 "+" 버튼** 클릭 → **"New repository"** 선택
2. **Repository 정보 입력**:
   - **Repository name**: `fitness055-yongho` (또는 원하는 이름)
   - **Description**: `피트니스055 창원 용호점 공식 랜딩페이지`
   - **Public** 선택 (무료 배포를 위해)
   - ❌ **Initialize with README** 체크 해제 (이미 있음)
   - ❌ **.gitignore** 체크 해제 (이미 있음)
   - ❌ **License** 체크 해제
3. **"Create repository"** 클릭

---

## 2. 📤 코드 업로드

### 2-1. 터미널에서 GitHub 연결
```bash
# GitHub 저장소 연결 (YOUR-USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR-USERNAME/fitness055-yongho.git

# 코드 푸시
git push -u origin main
```

### 2-2. 업로드 확인
- GitHub 저장소 페이지에서 파일들이 업로드되었는지 확인

---

## 3. 🌐 Netlify 배포

### 3-1. Netlify 계정 생성
1. [Netlify.com](https://netlify.com) 접속
2. **"Sign up"** 클릭
3. **"Sign up with GitHub"** 선택 (추천)

### 3-2. 저장소 연결
1. Netlify 대시보드에서 **"New site from Git"** 클릭
2. **"GitHub"** 선택
3. **권한 승인** (필요시)
4. **저장소 검색**: `fitness055-yongho` 입력 후 선택
5. **배포 설정**:
   - **Branch**: `main` (기본값)
   - **Build command**: 비워둠 (정적 사이트)
   - **Publish directory**: 비워둠 (루트 디렉토리)
6. **"Deploy site"** 클릭

### 3-3. 배포 완료 대기
- 1-2분 후 **"Site is live"** 메시지 확인
- 자동 생성된 URL 클릭하여 사이트 확인 (예: `https://wonderful-name-123456.netlify.app`)

### 3-4. 사이트 이름 변경 (선택사항)
1. **Site settings** → **General** → **Site information**
2. **"Change site name"** 클릭
3. 원하는 이름 입력 (예: `fitness055-yongho`)
4. **Save** 클릭
5. 새 URL: `https://fitness055-yongho.netlify.app`

---

## 4. 🌍 도메인 설정 (선택사항)

### 4-1. 커스텀 도메인 연결
1. **Site settings** → **Domain management**
2. **"Add custom domain"** 클릭
3. 도메인 입력 (예: `fitness055-yongho.com`)
4. DNS 설정 안내에 따라 설정

### 4-2. SSL 인증서
- Netlify에서 자동으로 Let's Encrypt SSL 인증서 제공
- HTTPS 자동 활성화

---

## 5. 🖼️ 이미지 최적화

### 5-1. 필수 이미지 준비
[`IMAGE_GUIDE.md`](./IMAGE_GUIDE.md)를 참고하여 다음 이미지들을 준비:

```
/images/
├── og-image-fitness055.jpg         (1200x630px) ⭐ 최우선
├── fitness055-yongho-hero.jpg      (1920x1080px)
├── freeweight-zone.jpg             (1000x600px)
├── cardio-zone-rotary-view.jpg     (1000x600px)
├── pt-session.jpg                  (1000x600px)
└── facilities-amenities.jpg        (1000x600px)
```

### 5-2. 이미지 업로드
1. GitHub 저장소에서 **"Create new file"** 클릭
2. **파일명**: `images/og-image-fitness055.jpg`
3. **드래그 앤 드롭**으로 이미지 업로드
4. **커밋 메시지**: "Add: 오픈그래프 이미지 추가"
5. **Commit changes** 클릭
6. 나머지 이미지들도 동일하게 업로드

### 5-3. 자동 재배포
- 이미지 업로드 후 Netlify에서 자동으로 재배포됩니다
- 2-3분 후 사이트에 이미지가 반영됩니다

---

## 🎯 체크리스트

### ✅ 배포 전 확인사항
- [ ] Git 저장소 초기화 완료
- [ ] 모든 파일 커밋 완료
- [ ] GitHub 저장소 생성 완료
- [ ] 코드 푸시 완료

### ✅ 배포 후 확인사항
- [ ] Netlify 배포 성공
- [ ] 사이트 URL 접속 확인
- [ ] 모바일 반응형 작동 확인
- [ ] 무료체험 모달 작동 확인
- [ ] FAQ 아코디언 작동 확인
- [ ] 전화연결 링크 작동 확인

### ✅ 최적화 확인사항
- [ ] 오픈그래프 이미지 업로드 완료
- [ ] 소셜미디어 공유 테스트 완료
- [ ] 모든 시설 이미지 업로드 완료
- [ ] 사이트 속도 테스트 완료

---

## 🚨 문제 해결

### 배포 실패 시
1. **Build log 확인**: Netlify 대시보드 → Deploys → 실패한 배포 클릭
2. **일반적인 해결책**:
   - HTML 문법 오류 확인
   - 이미지 경로 확인
   - 특수문자 인코딩 확인

### 이미지가 안 보일 때
1. 이미지 파일명 정확히 확인
2. 대소문자 구분 확인
3. GitHub에 이미지 업로드 확인

### 모바일에서 레이아웃 깨짐
1. 브라우저 캐시 삭제
2. Netlify 재배포: **"Trigger deploy"** → **"Deploy site"**

---

## 📞 지원

배포 과정에서 문제가 생기면 언제든 말씀해주세요!

**🎉 배포 완료 후 예상 URL**: 
- `https://fitness055-yongho.netlify.app`
- 또는 설정한 커스텀 도메인