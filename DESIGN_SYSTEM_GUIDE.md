# 디자인 시스템 가이드

이 문서는 `code.txt` 파일에서 추출한 핵심 디자인 요소를 정리한 스타일 가이드입니다.

## 1. Color Palette (색상 팔레트)

### Toastify 색상 변수

```css
:root {
  /* 기본 색상 */
  --toastify-color-light: #fff;
  --toastify-color-dark: #121212;
  --toastify-color-transparent: rgba(255, 255, 255, 0.7);
  
  /* 상태별 색상 */
  --toastify-color-info: #3498db;
  --toastify-color-success: #07bc0c;
  --toastify-color-warning: #f1c40f;
  --toastify-color-error: hsl(6, 78%, 57%);
  
  /* 아이콘 색상 (상태별 색상과 동일) */
  --toastify-icon-color-info: var(--toastify-color-info);
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-warning: var(--toastify-color-warning);
  --toastify-icon-color-error: var(--toastify-color-error);
  
  /* 텍스트 색상 */
  --toastify-text-color-light: #757575;
  --toastify-text-color-dark: #fff;
  --toastify-text-color-info: #fff;
  --toastify-text-color-success: #fff;
  --toastify-text-color-warning: #fff;
  --toastify-text-color-error: #fff;
  
  /* 스피너 색상 */
  --toastify-spinner-color: #616161;
  --toastify-spinner-color-empty-area: #e0e0e0;
}
```

### Progress Bar 그라데이션

**Light 테마 진행바:**
```css
--toastify-color-progress-light: linear-gradient(
  to right, 
  #4cd964,  /* 초록 */
  #5ac8fa,  /* 하늘색 */
  #007aff,  /* 파랑 */
  #34aadc,  /* 청록 */
  #5856d6,  /* 보라 */
  #ff2d55   /* 빨강 */
);
```

**Dark 테마 진행바:**
```css
--toastify-color-progress-dark: #bb86fc;
```

**상태별 진행바 색상:**
- Info: `var(--toastify-color-info)` (#3498db)
- Success: `var(--toastify-color-success)` (#07bc0c)
- Warning: `var(--toastify-color-warning)` (#f1c40f)
- Error: `var(--toastify-color-error)` (hsl(6, 78%, 57%))

**진행바 배경 투명도:**
```css
--toastify-color-progress-bgo: 0.2;
```

## 2. UI Components 스타일

### Toast 알림 시스템

#### 컨테이너 설정
```css
--toastify-container-width: fit-content;
--toastify-toast-width: 320px;
--toastify-toast-offset: 16px;
--toastify-z-index: 9999;
```

#### 위치 설정 (Safe Area 고려)
```css
--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));
--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));
--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));
--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));
```

#### Toast 카드 스타일
```css
--toastify-toast-background: #fff;
--toastify-toast-padding: 14px;
--toastify-toast-min-height: 64px;
--toastify-toast-max-height: 800px;
--toastify-toast-bd-radius: 6px;
--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
```

#### 폰트 설정
```css
--toastify-font-family: sans-serif;
```

#### 닫기 버튼
```css
/* 위치 */
top: 6px;
right: 6px; /* RTL: left: 6px */

/* 스타일 */
opacity: 0.7;
transition: 0.3s ease;
z-index: 1;

/* 아이콘 크기 */
width: 14px;
height: 16px;

/* 호버 상태 */
opacity: 1;
```

#### 진행바 스타일
```css
/* 진행바 래퍼 */
height: 5px;
border-bottom-left-radius: var(--toastify-toast-bd-radius);
border-bottom-right-radius: var(--toastify-toast-bd-radius);

/* 진행바 애니메이션 */
opacity: 0.7;
transform-origin: left; /* RTL: right */
```

#### 그림자 (Shadow)
- Toast 카드: `0px 4px 12px rgba(0, 0, 0, 0.1)`
- 노드 호버: `0 1px 4px 1px rgba(0, 0, 0, 0.08)`
- 노드 선택: `0 0 0 0.5px #1a192b`
- 컨트롤 버튼: `0 0 2px 1px rgba(0, 0, 0, 0.08)`

#### 모서리 곡률 (Border Radius)
- Toast 카드: `6px`
- 노드: `3px`
- 스피너: `100%` (원형)

#### 패딩 (Padding)
- Toast 카드: `14px`
- 컨텐츠 수평: `4px`
- 컨텐츠 수직: `4px`
- 닫기 버튼 영역: `0`

#### 마진 (Margin)
- Toast 간격: `1rem` (16px)
- 아이콘 마진: `10px` (margin-inline-end)

## 3. Responsive Design (반응형 디자인)

### 모바일 화면 (480px 이하)

```css
@media only screen and (max-width: 480px) {
  /* 컨테이너 */
  .Toastify__toast-container {
    width: 100vw;
    left: env(safe-area-inset-left);
    margin: 0;
  }
  
  /* 위치별 컨테이너 */
  .Toastify__toast-container--top-left,
  .Toastify__toast-container--top-center,
  .Toastify__toast-container--top-right {
    top: env(safe-area-inset-top);
    transform: translate(0); /* 기존 transform 제거 */
  }
  
  .Toastify__toast-container--bottom-left,
  .Toastify__toast-container--bottom-center,
  .Toastify__toast-container--bottom-right {
    bottom: env(safe-area-inset-bottom);
    transform: translate(0); /* 기존 transform 제거 */
  }
  
  /* RTL 지원 */
  .Toastify__toast-container--rtl {
    right: env(safe-area-inset-right);
    left: initial;
  }
  
  /* Toast 카드 */
  .Toastify__toast {
    --toastify-toast-width: 100%;
    margin-bottom: 0;
    border-radius: 0; /* 모서리 곡률 제거 */
  }
}
```

### 주요 반응형 규칙 요약

1. **너비 변경**
   - 데스크톱: `320px` (고정)
   - 모바일: `100vw` (전체 너비)

2. **위치 조정**
   - 데스크톱: `transform: translate(-50%)` (중앙 정렬용)
   - 모바일: `transform: translate(0)` (변환 제거)

3. **간격 조정**
   - 데스크톱: `margin-bottom: 1rem`
   - 모바일: `margin-bottom: 0`

4. **모서리 곡률**
   - 데스크톱: `border-radius: 6px`
   - 모바일: `border-radius: 0`

5. **Safe Area 지원**
   - 모든 위치값에 `env(safe-area-inset-*)` 사용
   - 노치나 홈 인디케이터 영역 자동 대응

## 4. 애니메이션

### 진입/퇴장 애니메이션

**Bounce 애니메이션:**
- 진입: `Toastify__bounceIn*` (0.5s)
- 퇴장: `Toastify__bounceOut*` (0.5s)
- 타이밍: `cubic-bezier(0.215, 0.61, 0.355, 1)`

**Slide 애니메이션:**
- 진입: `Toastify__slideIn*` (0.5s)
- 퇴장: `Toastify__slideOut*` (0.3s, ease-in)

**Zoom 애니메이션:**
- 진입: `Toastify__zoomIn` (0.5s)
- 퇴장: `Toastify__zoomOut` (0.5s)

**Flip 애니메이션:**
- 진입: `Toastify__flipIn` (0.5s)
- 퇴장: `Toastify__flipOut` (0.5s)

### 진행바 애니메이션
```css
@keyframes Toastify__trackProgress {
  0% { transform: scaleX(1); }
  to { transform: scaleX(0); }
}
```

### 스피너 애니메이션
```css
@keyframes Toastify__spin {
  0% { transform: rotate(0); }
  to { transform: rotate(360deg); }
}
/* duration: 0.65s, linear, infinite */
```

## 5. Z-Index 계층 구조

```css
--toastify-z-index: 9999;
/* 컨테이너: z-index: 9999 */
/* Toast 카드: z-index: 0 */
/* 진행바: z-index: 1 */
/* 닫기 버튼: z-index: 1 */
```

## 6. 리팩토링 가이드

### 현대적인 CSS 변수 체계 제안

```css
:root {
  /* 색상 시스템 */
  --color-primary: #3498db;
  --color-success: #07bc0c;
  --color-warning: #f1c40f;
  --color-error: hsl(6, 78%, 57%);
  --color-light: #fff;
  --color-dark: #121212;
  
  /* 텍스트 색상 */
  --text-primary: #333;
  --text-secondary: #757575;
  --text-on-dark: #fff;
  
  /* 간격 시스템 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 14px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
  
  /* 모서리 곡률 */
  --radius-sm: 3px;
  --radius-md: 6px;
  --radius-full: 100%;
  
  /* 그림자 */
  --shadow-sm: 0 1px 4px 1px rgba(0, 0, 0, 0.08);
  --shadow-md: 0px 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 0 2px 1px rgba(0, 0, 0, 0.08);
  
  /* Z-Index */
  --z-toast: 9999;
  --z-modal: 10000;
  
  /* 반응형 브레이크포인트 */
  --breakpoint-mobile: 480px;
}
```

### 컴포넌트 기반 접근법

1. **Tailwind CSS 사용 시**
   - 유틸리티 클래스로 변환
   - 커스텀 테마 설정으로 색상 팔레트 관리

2. **CSS Modules 사용 시**
   - 컴포넌트별 스타일 파일 분리
   - CSS 변수는 전역에서 관리

3. **Styled Components 사용 시**
   - 테마 객체로 색상/간격 관리
   - 반응형은 props로 처리

## 7. 접근성 고려사항

- Safe Area 지원으로 노치/홈 인디케이터 대응
- RTL (Right-to-Left) 언어 지원
- 키보드 접근성 (닫기 버튼 focus 상태)
- 스크린 리더 대응 (ARIA 속성 필요)

## 8. 브라우저 호환성

- `env()` 함수: iOS Safari 11.1+, Chrome 69+
- CSS 변수: 모든 모던 브라우저
- `transform3d`: 하드웨어 가속 활용

---

이 가이드를 참고하여 일관된 디자인 시스템을 구축하세요.
