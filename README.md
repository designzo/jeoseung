# 주식회사 저승성 (冥府錄)

Next.js(App Router) + TypeScript로 만든 한 페이지 사이트입니다.

## 내용을 고칠 곳

| 고칠 것 | 파일 / 폴더 |
|---|---|
| 캐릭터 (이름·계급·기수·대사·초상·링크·Suno) | `data/characters.ts` |
| 캐릭터 초상 이미지 (1:1) | `public/img/characters/` 에 넣고 `image: "/img/characters/파일명.webp"` |
| 배경음악 4곡 | `public/audio/` 에 mp3를 넣고 `data/playlist.ts` 에 파일명·곡 이름 |
| 배경음악 음량, 두드리는 소리 켜고 끄기 | `data/settings.ts` |
| 색·글꼴·간격 | `app/globals.css` 맨 위 `:root` |
| 화면 구성 | `components/` (Splash, SiteHeader, BgmPlayer, Hero, Emblem, OrgChart, Board, Staff, CharacterCard, SiteFooter) |

## 내 컴퓨터에서 보기

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다. 파일을 고치면 바로 반영됩니다.

## 버셀에 배포하기

### 방법 1. GitHub에 올리고 버셀에서 가져오기 (추천)

한 번만 설정해 두면, 이후에는 GitHub에 올릴 때마다 자동으로 다시 배포됩니다.

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/내아이디/저장소이름.git
git push -u origin main
```

1. https://vercel.com 에 로그인
2. **Add New… → Project**
3. 방금 올린 GitHub 저장소 옆 **Import**
4. Framework Preset이 **Next.js** 로 잡혀 있는지 확인 (나머지 설정은 그대로)
5. **Deploy** → 끝나면 `프로젝트이름.vercel.app` 주소가 생깁니다

이후 수정 → `git add . && git commit -m "수정" && git push` 하면 자동 배포.

### 방법 2. 터미널에서 바로 올리기 (Vercel CLI)

```bash
npm i -g vercel
vercel          # 처음 한 번: 로그인하고 프로젝트 연결, 미리보기 주소가 나옴
vercel --prod   # 실제 주소로 배포
```

## 참고

- GitHub는 파일 하나가 100MB를 넘으면 올라가지 않습니다. mp3는 적당한 음질(128~192kbps)로 넣어 주세요.
- 아이폰은 무음 스위치가 켜져 있으면 웹 소리가 나지 않습니다. 스플래시의 안내 문구가 그래서 있습니다.
- Suno 플레이어는 `suno.com/song/곡ID` 형태의 주소를 넣어야 나옵니다. `suno.com/s/…` 짧은 링크는 곡 페이지를 열어 긴 주소로 바꿔 주세요.
