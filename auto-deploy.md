# 자동 배포 설정 가이드

## GitHub Actions를 통한 Netlify 자동 배포가 설정되었습니다.

### 1. Netlify 사이트 생성
1. https://netlify.com 에서 로그인
2. "New site from Git" 클릭
3. GitHub 리포지토리 연결: `fitness055-yongho`
4. 배포 설정:
   - Branch: `main`
   - Build command: (비워둠)
   - Publish directory: `.`

### 2. Netlify 토큰 및 사이트 ID 설정
배포 후 다음 정보를 GitHub Repository Settings > Secrets에 추가:

1. **NETLIFY_AUTH_TOKEN**:
   - Netlify > User Settings > Applications > Personal Access Tokens
   - "New access token" 생성

2. **NETLIFY_SITE_ID**:
   - Netlify 사이트 > Site Settings > General > Site Information
   - API ID 복사

### 3. GitHub Secrets 설정
GitHub 리포지토리에서:
1. Settings > Secrets and variables > Actions
2. "New repository secret" 클릭
3. 위의 토큰들을 각각 추가

### 4. 자동 배포 완료
이제 `main` 브랜치에 푸시할 때마다 자동으로 Netlify에 배포됩니다.