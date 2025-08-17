// src/utils/JsonViewer.ts
export function tryFormatJson(content: string): string {
  try {
    // 문자열을 JSON 객체로 파싱
    const parsed = JSON.parse(content);
    // 들여쓰기 2로 포맷
    return JSON.stringify(parsed, null, 2);
  } catch {
    // JSON 파싱 실패하면 원본문자열 그대로 반환
    return content;
  }
}
