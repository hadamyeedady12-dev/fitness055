#!/bin/bash

# 🚀 피트니스055 창원 용호점 배포 스크립트

echo "🏋️ 피트니스055 창원 용호점 배포 시작..."

# Git 상태 확인
echo "📋 Git 상태 확인 중..."
git status

# 변경사항이 있다면 커밋
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 변경사항 발견, 커밋 중..."
    git add .
    
    # 커밋 메시지 입력받기
    echo "💬 커밋 메시지를 입력하세요:"
    read -r commit_message
    
    if [ -z "$commit_message" ]; then
        commit_message="Update: 사이트 업데이트"
    fi
    
    git commit -m "$commit_message

🚀 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
    
    echo "✅ 커밋 완료!"
else
    echo "✅ 변경사항 없음, 커밋 스킵"
fi

# GitHub에 푸시
echo "📤 GitHub에 푸시 중..."
if git push origin main; then
    echo "🎉 GitHub 푸시 성공!"
    echo ""
    echo "🌐 배포 완료!"
    echo "📍 사이트 URL: https://fitness055-yongho.netlify.app"
    echo "⏰ Netlify 자동 배포는 1-2분 소요됩니다"
    echo ""
    echo "📱 다음 단계:"
    echo "1. GitHub 저장소 확인: https://github.com/YOUR-USERNAME/fitness055-yongho"
    echo "2. Netlify 배포 상태 확인: https://app.netlify.com"  
    echo "3. 사이트 테스트: 모바일/데스크톱에서 동작 확인"
    echo "4. 이미지 업로드: IMAGE_GUIDE.md 참고"
else
    echo "❌ GitHub 푸시 실패"
    echo "💡 해결 방법:"
    echo "1. GitHub 저장소가 생성되었는지 확인"
    echo "2. git remote -v로 원격 저장소 URL 확인"
    echo "3. GitHub 권한 확인"
    exit 1
fi

echo ""
echo "🎯 체크리스트:"
echo "□ GitHub 저장소에 코드 업로드 완료"
echo "□ Netlify에서 자동 배포 진행 중"
echo "□ 이미지 파일 업로드 필요 (IMAGE_GUIDE.md 참고)"
echo "□ 소셜미디어 공유 테스트 필요"
echo ""
echo "✨ 피트니스055 창원 용호점 랜딩페이지 배포 준비 완료!"