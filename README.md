# 🚀 API Client (Electron + React + Vite)

이 프로젝트는 **Electron + React + Vite + TypeScript** 기반의 크로스플랫폼 API Client 애플리케이션입니다.  
모든 과정을 LLM 로만 함께 진행했습니다.

---

## ✨ 주요 기능

- REST API 테스트 (GET/POST/PUT/DELETE 등 요청 전송)
- WebSocket 클라이언트 탭 지원
- 요청/응답 내역 저장 (히스토리 패널)
- JSON 응답 하이라이트 뷰어(JsonViewer)
- 애플리케이션 자동 업데이트 (electron-updater)
- React + Vite 기반 UI, Electron 메인 프로세스 분리
- GitHub Actions를 통한 빌드 & 배포 지원

---

## 📂 프로젝트 구조

```plain
api-client/
├── electron/ # Electron main process 코드
│ ├── main.ts
│ └── preload.ts
├── src/ # React 앱 (Vite)
│ ├── components/
│ │ ├── RestClient/
│ │ │ └── RestClient.tsx
│ │ ├── WebSocketClient/
│ │ │ └── WebSocketClient.tsx
│ │ ├── HistoryPanel.tsx
│ │ └── Common/JsonViewer.tsx
│ ├── App.tsx
│ └── types/
├── dist/ # vite build 결과
├── dist-electron/ # electron 빌드 결과
├── tsconfig.web.json
├── tsconfig.electron.json
├── vite.config.ts
└── package.json
```

---

## 🛠 개발 환경

### 1. 설치

`npm install`

### 2. 개발 모드 실행 (Vite + Electron)

`npm run dev:electron`

- Vite Dev 서버 실행 (`http://localhost:5173`)
- `tsc -w`로 `main.ts` + `preload.ts`를 `dist-electron/`에 빌드
- Electron이 해당 `dist-electron/main.js` 실행

### 3. 프로덕션 빌드

```sh
npm run build:web # React/Vite 빌드
npm run build:electron # Electron(main) 빌드, preload 없음.
npm run dist # electron-builder로 최종 패키징
```

빌드 결과:

- **Windows**: `.exe`
- **macOS**: `.dmg`
- **Linux**: `.AppImage`

---

## 📑 주요 컴포넌트

### RestClient

- REST API 요청 전송
- Headers/Body 입력
- 응답 상태/시간/헤더 표시
- JSON 응답은 prettify 후 **JsonViewer**로 하이라이트 표시

### WebSocketClient

- WebSocket 연결
- 실시간 메시지 송수신 테스트 (기본 구조 제공)

---

## 📌 앞으로 확장할 수 있는 기능

- Requests Collection (Postman Workspace 유사)
- Auth 관리 (Bearer Token 저장)
- UI/UX 개선 (다크모드, 코드 하이라이트 강화)

---
