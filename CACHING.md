# 캐시 정책 — 재배포 후 옛 화면이 보이는 문제 해결

> 관련 커밋: `b2d39a4 fix(cache): 재배포 후 옛 팝업/이미지가 그대로 보이는 캐시 문제 해결`

## 1. 문제

팝업 이미지를 **같은 파일명으로 교체**하고 재배포해도, 이전에 사이트를 방문한 적 있는
기기에서는 옛 이미지가 계속 보였다. 일반 새로고침으로는 반영되지 않고
강력 새로고침(`Ctrl+Shift+R` / `Cmd+Shift+R`)을 해야만 새 이미지가 나왔다.

## 2. 원인

`public/` 에 있는 파일은 **URL이 영구히 고정**된다.

```
/popup/popup-5.png   ← 내용이 바뀌어도 URL은 그대로
```

브라우저와 CDN 입장에서는 "이미 받아둔 `/popup/popup-5.png` 가 있으니 다시 받을 필요 없다"가
되어 버린다. 서버에 새 파일이 올라가 있어도 요청 자체가 나가지 않는다.

여기에 HTML 문서까지 캐시되면 "옛 HTML → 옛 이미지 URL" 조합이 그대로 고착된다.

## 3. 해결 — 두 축

### 3-1. 팝업 이미지: 내용 해시가 붙은 URL로 서빙

이미지를 `public/` 밖(`assets/popup/`)으로 옮기고, 컴포넌트에서 **정적 import** 한다.

```
public/popup/*.png   →   assets/popup/*.png
```

`components/layout/PopupModal.tsx`

```tsx
import popup1 from "@/assets/popup/popup-1.png";
import popup5 from "@/assets/popup/popup-5.png";
// ...
const IMAGES = [popup5, popup4, popup1, popup2, popup3].map((img) => img.src);
```

이렇게 하면 Next.js가 빌드할 때 **파일 내용의 해시**를 파일명에 붙여 내보낸다.

```
/_next/static/media/popup-5.dc773531.png
                             ^^^^^^^^ 이미지 내용이 바뀌면 이 값이 바뀐다
```

내용이 바뀌면 URL 자체가 달라지므로, 브라우저·CDN에 남아 있던 옛 캐시는 애초에
**참조되지 않는다.** 캐시를 지울 필요가 없고, 반대로 이 파일들은 안심하고
1년 `immutable` 캐시를 걸 수 있어 속도 손해도 없다.

### 3-2. HTML 문서 + `public/` 파일: 항상 재검증

`next.config.mjs` 의 `headers()`

```js
const revalidate = [
  { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
];
```

| 대상 | 정책 | 이유 |
|---|---|---|
| `/`, `/privacy`, `/terms` | `max-age=0, must-revalidate` | 새 빌드의 해시된 자산을 즉시 참조하려면 HTML이 항상 최신이어야 함 |
| `/images/*`, `/clinic/*`, `/media/*` | `max-age=0, must-revalidate` | 같은 이름으로 교체될 수 있는 파일들 |
| `/favicon.ico`, `/site.webmanifest`, `/sitemap.xml`, `/robots.txt` | `max-age=0, must-revalidate` | 수시로 갱신 |
| `/_next/static/*` | Next 기본값 (`immutable`, 1년) | 이미 내용 해시가 붙어 있음 — 건드리지 않음 |

`max-age=0, must-revalidate` 는 **"캐시하지 마라"가 아니라 "쓰기 전에 서버에 물어봐라"** 이다.
파일이 그대로면 서버가 `304 Not Modified`(본문 없음)를 돌려주므로 트래픽 부담은 사실상 없고,
파일이 바뀌었을 때만 새로 내려받는다.

## 4. 운영 가이드

### 팝업 이미지를 교체할 때

1. `assets/popup/` 안의 파일을 **같은 이름으로 덮어쓰기** 한다. (이름 안 바꿔도 됨 — 해시가 알아서 바뀜)
2. 순서를 바꾸거나 장수를 늘리려면 `components/layout/PopupModal.tsx` 상단의
   `import` 목록과 `IMAGES` 배열을 수정한다.
3. 커밋 → 푸시 → 배포. 끝.

> ⚠️ 팝업 이미지를 `public/popup/` 에 다시 넣지 말 것. 그 순간 3-1의 효과가 사라진다.

### 그 밖의 이미지(`public/clinic`, `public/images` 등)를 교체할 때

같은 이름으로 덮어써도 3-2의 재검증 헤더 덕분에 **일반 새로고침으로 반영**된다.

## 5. 검증 방법

```bash
npm run build
npx next start -p 3999

curl -sI http://localhost:3999/                                   | grep -i cache-control
curl -sI http://localhost:3999/clinic/photos/doctor-01.jpg        | grep -i cache-control
curl -sI http://localhost:3999/_next/static/media/popup-5.*.png   | grep -i cache-control
```

기대값

```
/                                → Cache-Control: public, max-age=0, must-revalidate
/clinic/photos/doctor-01.jpg     → Cache-Control: public, max-age=0, must-revalidate
/_next/static/media/popup-5.*    → Cache-Control: public, max-age=31536000, immutable
```

## 6. 알아둘 점

- **이번 배포 직전에 옛 HTML을 캐시해 둔 기기**는, 그 캐시가 만료된 뒤 한 번 더 접속해야
  정상화된다. 이번 조치는 "앞으로의 모든 배포"에 적용되는 예방책이다.
- Cloudflare 등 별도 CDN을 앞단에 두게 되면, 배포 후 캐시 퍼지가 추가로 필요할 수 있다.
  (Vercel 직접 배포는 배포 시 자동 처리)
- `next.config.mjs` 의 `headers()` 에 `/:path*` 같은 **전체 경로 와일드카드를 추가하지 말 것.**
  `/_next/static/*` 의 `immutable` 정책까지 덮어써 사이트 전체가 느려진다.
