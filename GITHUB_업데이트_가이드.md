# GitHub 업데이트 가이드

이 문서는 GitHub 저장소에 변경사항을 업데이트하는 방법을 단계별로 설명합니다.

## 현재 저장소 정보

- **원격 저장소**: https://github.com/bhher/k-digital.git
- **현재 브랜치**: main

---

## 📋 기본 워크플로우

GitHub에 변경사항을 업데이트하는 기본적인 흐름은 다음과 같습니다:

```
1. 파일 수정/추가/삭제
2. 변경사항 확인 (git status)
3. 변경사항 스테이징 (git add)
4. 커밋 생성 (git commit)
5. GitHub에 푸시 (git push)
```

---

## 🔧 단계별 상세 가이드

### 1단계: 변경사항 확인하기

작업 전후로 현재 상태를 확인합니다.

```bash
# 현재 상태 확인
git status

# 변경된 파일의 차이점 확인
git diff
```

**출력 예시:**
- `modified: App.tsx` - 수정된 파일
- `untracked files: newfile.tsx` - 새로 추가된 파일
- `deleted: oldfile.tsx` - 삭제된 파일

---

### 2단계: 변경사항 스테이징하기 (Staging)

커밋에 포함할 파일을 선택합니다.

#### 모든 변경사항 추가
```bash
git add .
```

#### 특정 파일만 추가
```bash
git add App.tsx
git add components/SlideRenderer.tsx
```

#### 특정 디렉토리 추가
```bash
git add components/
```

**확인:**
```bash
git status
```
스테이징된 파일은 초록색으로 표시됩니다.

---

### 3단계: 커밋 생성하기

변경사항에 대한 설명을 작성하고 커밋을 생성합니다.

```bash
git commit -m "변경사항에 대한 설명"
```

**좋은 커밋 메시지 예시:**
```bash
git commit -m "슬라이드 렌더러 기능 추가"
git commit -m "App.tsx 버그 수정"
git commit -m "새로운 컴포넌트 추가 및 스타일 개선"
```

**상세한 커밋 메시지 작성:**
```bash
git commit
```
이 명령어를 실행하면 에디터가 열리고, 여러 줄의 상세한 설명을 작성할 수 있습니다.

---

### 4단계: GitHub에 푸시하기

로컬의 변경사항을 GitHub 저장소에 업로드합니다.

```bash
git push origin main
```

또는 간단하게:
```bash
git push
```

**처음 푸시하는 경우:**
```bash
git push -u origin main
```
`-u` 옵션은 이후부터 `git push`만 입력해도 자동으로 origin main에 푸시됩니다.

---

## 🚀 전체 예시 시나리오

### 시나리오 1: 파일 수정 후 업데이트

```bash
# 1. 파일 수정 (에디터에서 작업)

# 2. 변경사항 확인
git status

# 3. 모든 변경사항 스테이징
git add .

# 4. 커밋 생성
git commit -m "App.tsx 기능 개선"

# 5. GitHub에 푸시
git push
```

### 시나리오 2: 새 파일 추가 후 업데이트

```bash
# 1. 새 파일 생성 (예: utils.ts)

# 2. 상태 확인
git status

# 3. 새 파일 추가
git add utils.ts

# 4. 커밋
git commit -m "유틸리티 함수 추가"

# 5. 푸시
git push
```

### 시나리오 3: 여러 파일 수정 후 업데이트

```bash
# 1. 여러 파일 수정

# 2. 변경사항 확인
git status

# 3. 특정 파일만 스테이징
git add App.tsx
git add components/SlideRenderer.tsx

# 4. 커밋
git commit -m "UI 컴포넌트 업데이트"

# 5. 푸시
git push
```

---

## 🔍 유용한 Git 명령어

### 상태 확인
```bash
# 현재 상태 확인
git status

# 변경사항 상세 확인
git diff

# 커밋 히스토리 확인
git log

# 간단한 커밋 히스토리
git log --oneline
```

### 원격 저장소 확인
```bash
# 원격 저장소 목록 확인
git remote -v

# 원격 저장소 정보 확인
git remote show origin
```

### 최신 상태로 업데이트
```bash
# GitHub에서 최신 변경사항 가져오기
git pull

# 또는 fetch 후 merge
git fetch
git merge origin/main
```

---

## ⚠️ 주의사항

### 1. 충돌 해결
다른 사람이 같은 파일을 수정한 경우 충돌이 발생할 수 있습니다.

```bash
# 먼저 최신 상태 가져오기
git pull

# 충돌 발생 시
# 1. 충돌 파일을 에디터에서 열기
# 2. <<<<<<< HEAD ... ======= ... >>>>>>> 부분 수정
# 3. 충돌 해결 후 다시 커밋
git add .
git commit -m "충돌 해결"
git push
```

### 2. 커밋 메시지 작성
- 명확하고 간결하게 작성
- 무엇을 변경했는지 설명
- 왜 변경했는지 설명 (필요한 경우)

### 3. 자주 커밋하기
- 작은 단위로 자주 커밋하는 것이 좋습니다
- 큰 변경사항은 여러 개의 작은 커밋으로 나누는 것이 좋습니다

---

## 🔄 일반적인 작업 흐름

### 매일 작업 시작할 때
```bash
# 1. 최신 상태 가져오기
git pull

# 2. 작업 시작
```

### 작업 완료 후
```bash
# 1. 변경사항 확인
git status

# 2. 스테이징
git add .

# 3. 커밋
git commit -m "작업 내용 설명"

# 4. 푸시
git push
```

---

## 🆘 문제 해결

### 푸시가 거부되는 경우
```bash
# 원격 저장소의 최신 변경사항 먼저 가져오기
git pull

# 충돌 해결 후 다시 푸시
git push
```

### 커밋 메시지 수정하기
```bash
# 마지막 커밋 메시지 수정
git commit --amend -m "새로운 메시지"

# 이미 푸시한 경우 강제 푸시 (주의!)
git push --force
```

### 스테이징 취소하기
```bash
# 특정 파일 스테이징 취소
git reset HEAD 파일명

# 모든 스테이징 취소
git reset
```

### 마지막 커밋 취소하기 (로컬에서만)
```bash
# 커밋 취소하지만 변경사항은 유지
git reset --soft HEAD~1

# 커밋 취소하고 변경사항도 취소
git reset --hard HEAD~1
```

---

## 📚 추가 학습 자료

- [Git 공식 문서](https://git-scm.com/doc)
- [GitHub 가이드](https://guides.github.com/)
- [Pro Git 책 (무료)](https://git-scm.com/book)

---

## 💡 팁

1. **작업 전 항상 `git pull`**: 다른 사람의 변경사항을 먼저 가져옵니다
2. **작은 단위로 커밋**: 관련된 변경사항끼리 묶어서 커밋합니다
3. **명확한 커밋 메시지**: 나중에 히스토리를 볼 때 이해하기 쉽습니다
4. **정기적으로 푸시**: 로컬에서만 작업하다가 문제가 생기면 복구가 어렵습니다

---

## 📝 체크리스트

업데이트 전 확인사항:

- [ ] `git status`로 변경사항 확인
- [ ] `git pull`로 최신 상태 확인
- [ ] 변경사항 스테이징 (`git add`)
- [ ] 명확한 커밋 메시지 작성
- [ ] 커밋 생성 (`git commit`)
- [ ] GitHub에 푸시 (`git push`)
- [ ] GitHub 웹사이트에서 확인

---

**마지막 업데이트**: 2024년

