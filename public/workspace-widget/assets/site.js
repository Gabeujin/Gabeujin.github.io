const LOCALE_KEY = 'locale-preference';
const THEME_KEY = 'theme-preference';

const ko = {
  'nav.features': '기능',
  'nav.screenshots': '화면',
  'nav.privacy': '개인정보',
  'nav.support': '지원',
  'nav.source': '소스',
  'common.language': '언어 선택',
  'common.themeToLight': '밝은 테마로 변경',
  'common.themeToDark': '어두운 테마로 변경',
  'common.backHome': '제품 홈으로',
  'common.updated': '최종 업데이트: 2026년 7월 30일',
  'footer.summary': 'Windows 11을 위한 로컬 우선 런처',
  'footer.privacy': '개인정보처리방침',
  'footer.support': '지원',
  'footer.source': 'GitHub 소스',

  'home.eyebrow': 'Windows 11 · 로컬 우선',
  'home.heroTitle': '로컬 도구를 한곳에서, 더 차분하게.',
  'home.heroBody': 'Workspace Widget은 앱, 폴더, URL과 로컬 서비스를 하나의 이동 가능한 작업 공간으로 모아주는 Windows 11 런처입니다.',
  'home.ctaSource': 'GitHub에서 소스 보기',
  'home.ctaExplore': '기능 살펴보기',
  'home.metaRc': '0.1.0 릴리스 후보',
  'home.metaAccount': '계정 불필요',
  'home.metaTelemetry': '개발자 텔레메트리 없음',
  'home.metaLicense': 'MIT 라이선스',
  'home.trustLocalTitle': '로컬 상태',
  'home.trustLocalBody': '구성과 레이아웃은 사용자 기기에 저장됩니다.',
  'home.trustHealthTitle': 'Health 인식',
  'home.trustHealthBody': '등록한 엔드포인트를 30초마다 확인합니다.',
  'home.trustNodeTitle': '오프라인 시작',
  'home.trustNodeBody': '번들 Node.js로 신뢰하는 로컬 서비스를 시작합니다.',
  'home.trustNativeTitle': 'Windows 네이티브',
  'home.trustNativeBody': '트레이, 시작 프로그램, Always on top과 MIN UI를 지원합니다.',
  'home.featuresKicker': '집중을 위한 설계',
  'home.featuresTitle': '매일 쓰는 것만 남긴 작업 공간.',
  'home.featuresBody': '브라우저 북마크와 시작 메뉴 사이에 흩어진 로컬 작업 흐름을 빠르고 예측 가능한 한 화면으로 정리합니다.',
  'home.featureLaunchTitle': '모든 종류의 바로가기',
  'home.featureLaunchBody': '.lnk, .url, EXE, 파일, 폴더, HTTP/HTTPS 주소를 추가하거나 끌어다 놓으세요.',
  'home.featureServiceTitle': '살아 있는 로컬 서비스',
  'home.featureServiceBody': '명시적 포트를 표시하고 선택한 Health API로 온라인 상태를 알려줍니다.',
  'home.featureStartTitle': '필요할 때 시작',
  'home.featureStartBody': '오프라인이면 구성한 JavaScript 또는 패키지 스크립트를 실행하고 준비된 뒤 URL을 엽니다.',
  'home.featureMinTitle': '96px MIN UI',
  'home.featureMinBody': '아이콘 중심 레일로 축소해 화면 가장자리에 붙여두고 필요할 때 바로 실행하세요.',
  'home.featureVisualTitle': '내 작업 방식에 맞는 화면',
  'home.featureVisualBody': '테마, 색상, 불투명도, 로컬 배경과 검증된 HTTPS 미디어를 원하는 방식으로 설정합니다.',
  'home.featureSafeTitle': '경계를 지키는 원격 미디어',
  'home.featureSafeBody': '정적 이미지는 크기와 리디렉션을 제한한 캐시에 저장하고 직접 원격 비디오 스트림은 거부합니다.',
  'home.flowKicker': '간단한 흐름',
  'home.flowTitle': '추가하고, 확인하고, 실행하세요.',
  'home.flowBody': '서버 관리 도구처럼 복잡하지 않고 단순 북마크보다 더 많은 맥락을 제공합니다.',
  'home.flowAddTitle': '바로가기를 추가',
  'home.flowAddBody': '앱이나 폴더를 끌어 놓거나 URL, Health API, 선택적 시작 대상을 입력하세요.',
  'home.flowWatchTitle': '상태를 한눈에 확인',
  'home.flowWatchBody': '포트와 온라인 표시로 어떤 서비스가 준비되어 있는지 즉시 알 수 있습니다.',
  'home.flowOpenTitle': '한 번에 실행',
  'home.flowOpenBody': '온라인 서비스는 바로 열고, 오프라인 서비스는 준비된 뒤 자동으로 엽니다.',
  'home.galleryKicker': '제품 화면',
  'home.galleryTitle': '기능을 숨기지 않는 단정한 UI.',
  'home.galleryBody': '실제 앱에서 공개용 예제 데이터로 캡처한 화면입니다.',
  'home.shotOverviewTitle': '하나의 작업 공간',
  'home.shotOverviewBody': '앱, 폴더, URL과 서비스를 함께 배치합니다.',
  'home.shotSettingsTitle': '사용자가 제어하는 동작',
  'home.shotSettingsBody': '시작 프로그램, 항상 위, MIN UI와 화면 스타일을 설정합니다.',
  'home.shotAddTitle': 'Health-aware 서비스 등록',
  'home.shotAddBody': 'URL, Health API와 선택적 로컬 시작 대상을 입력합니다.',
  'home.shotMenuTitle': '빠른 정리',
  'home.shotMenuBody': '우클릭으로 편집하고 순서를 바꾸거나 위젯 항목만 제거합니다.',
  'home.confidenceKicker': '로컬 우선',
  'home.confidenceTitle': '작업 공간은 사용자의 기기에.',
  'home.confidenceBody': 'Workspace Widget에는 개발자 운영 계정, 광고, 분석 또는 텔레메트리 서비스가 없습니다.',
  'home.confidenceOne': '레이아웃과 바로가기 구성은 사용자별 로컬 앱 데이터에 저장',
  'home.confidenceTwo': '요청은 사용자가 구성하거나 실행한 Health, URL, 미디어 기능에 한정',
  'home.confidenceThree': '로컬 프로젝트를 업로드하거나 의존성을 자동 설치하지 않음',
  'home.confidenceFour': '보안 경계와 네트워크 동작을 공개 소스와 문서로 설명',
  'home.statusBadge': '공개 릴리스 후보',
  'home.statusTitle': '소스는 공개되었습니다. Store 배포는 인증을 기다리고 있습니다.',
  'home.statusBody': '현재 공개 저장소는 소스 검토용입니다. 서명되지 않은 개발 패키지는 배포하지 않으며, 인증된 Microsoft Store 목록이 준비되기 전에는 설치 파일을 제공하지 않습니다.',
  'home.statusRoadmap': '공개 소스 릴리스 보기',
  'home.statusSupport': '지원 및 보안',

  'privacy.eyebrow': '정책 · 버전 2026-07-30',
  'privacy.title': '개인정보처리방침',
  'privacy.intro': 'Workspace Widget은 로컬 우선 Windows 데스크톱 런처입니다. 개발자가 운영하는 분석, 광고, 텔레메트리, 계정 또는 원격 데이터 수집 서비스를 포함하지 않습니다.',
  'privacy.notice': '요약: 구성은 기기에 저장됩니다. 네트워크 요청은 사용자가 설정하거나 실행한 기능에서만 발생합니다.',
  'privacy.tocDevice': '기기에 저장되는 데이터',
  'privacy.tocNetwork': '네트워크 요청',
  'privacy.tocProcesses': '로컬 프로세스',
  'privacy.tocRetention': '보존과 삭제',
  'privacy.tocChildren': '아동',
  'privacy.tocChanges': '변경 및 문의',
  'privacy.deviceTitle': '기기에 저장되는 데이터',
  'privacy.deviceBody': 'Workspace Widget은 사용자의 레이아웃, 화면 설정, 등록한 바로가기 대상, 선택적 실행 인수, 선택적 Health URL, 로컬 서비스 시작 구성과 미디어 선택을 로그인한 사용자의 로컬 애플리케이션 데이터 디렉터리에 저장합니다. 사용자가 다른 제품으로 해당 디렉터리를 백업, 동기화 또는 공유하지 않는 한 이 값은 기기에 머뭅니다.',
  'privacy.deviceWarning': '바로가기 인수와 URL은 일반 텍스트 로컬 구성입니다. 비밀번호, 액세스 토큰, 개인 키 또는 다른 비밀 정보를 입력하지 마세요.',
  'privacy.networkTitle': '네트워크 요청',
  'privacy.networkIntro': 'Workspace Widget은 사용자가 구성하거나 실행한 다음 기능에 대해서만 네트워크 요청을 보냅니다.',
  'privacy.networkHealth': '선택적 Health URL을 조회해 서비스 상태를 표시합니다.',
  'privacy.networkShortcut': 'HTTP 또는 HTTPS 바로가기를 사용자가 선택한 브라우저로 엽니다.',
  'privacy.networkMedia': '원격 이미지 또는 미디어를 사용자가 지정한 호스트에서 요청합니다.',
  'privacy.networkYoutube': 'YouTube 미리보기를 켜면 Microsoft Edge WebView2를 통해 YouTube 개인정보 보호 강화 임베드 서비스에 연결합니다.',
  'privacy.networkOutro': '해당 서비스는 IP 주소와 요청 메타데이터 같은 일반 연결 정보를 수신하며 자체 개인정보처리방침을 적용합니다. Workspace Widget은 이 요청을 개발자 운영 서버로 중계하지 않습니다.',
  'privacy.processTitle': '로컬 프로세스',
  'privacy.processBody': '선택적 로컬 서비스 기능은 사용자가 직접 선택한 프로젝트 또는 스크립트만 로그인한 사용자의 권한으로 실행합니다. Workspace Widget은 프로젝트를 개발자에게 업로드하거나 프로젝트 의존성을 자동으로 설치하지 않습니다.',
  'privacy.retentionTitle': '보존과 삭제',
  'privacy.retentionBody': 'Microsoft Store 제거는 앱 패키지를 제거합니다. 이후 다시 설치했을 때 레이아웃을 복구할 수 있도록 사용자별 상태 디렉터리는 남습니다. 그 디렉터리를 별도로 삭제하면 Workspace Widget의 로컬 구성이 영구 삭제됩니다. 삭제 전 정확한 경로와 범위를 확인하세요.',
  'privacy.childrenTitle': '아동',
  'privacy.childrenBody': 'Workspace Widget은 일반 생산성 도구이며 아동을 대상으로 하지 않습니다. 아동의 개인정보를 의도적으로 수집하지 않습니다.',
  'privacy.changesTitle': '변경 및 문의',
  'privacy.changesBody': '중요한 정책 변경은 날짜를 갱신해 릴리스 정보와 함께 게시합니다. 개인정보 관련 문의는 민감한 내용을 제외하고 지원 페이지의 공개 이슈 경로를 이용하세요. 보안 취약점 또는 민감한 정보는 반드시 비공개 보안 신고 양식으로 보내세요.',
  'privacy.supportLink': '지원 경로 보기',

  'support.eyebrow': '도움말 · 오픈 소스',
  'support.title': '지원',
  'support.intro': '사용 방법, 재현 가능한 오류, 기능 제안과 보안 신고를 목적에 맞는 경로로 보내주세요.',
  'support.issuesTitle': '버그 및 기능 요청',
  'support.issuesBody': '재현 단계, 예상 동작, 실제 동작과 Windows 버전을 포함해 GitHub Issue를 등록하세요. 비밀 정보와 업무용 화면은 첨부하지 마세요.',
  'support.issuesCta': 'GitHub Issues 열기',
  'support.docsTitle': '문서와 소스',
  'support.docsBody': '설치, 미디어 보안, 개인정보, 빌드 및 기여 방법은 공개 저장소의 문서를 확인하세요.',
  'support.docsCta': '저장소 보기',
  'support.securityTitle': '보안 취약점',
  'support.securityBody': '취약점 세부 정보, 공격 코드, 로그 또는 민감한 화면을 공개 Issue에 올리지 마세요. GitHub의 비공개 보안 권고 양식을 이용해 주세요.',
  'support.securityCta': '비공개 취약점 신고',
  'support.responseTitle': '지원 범위',
  'support.responseBody': 'Workspace Widget은 현재 0.1.0 공개 릴리스 후보입니다. Windows 11 x64만 지원하며, 인증 전 개발용 패키지는 공개 설치 파일로 제공하지 않습니다.',
  'support.checkOne': '공개 Issue: 일반 오류와 기능 제안',
  'support.checkTwo': '비공개 Security Advisory: 취약점과 민감한 자료',
  'support.checkThree': 'Partner Center 인증 후: Microsoft Store 목록의 지원 정보'
};

const pageMeta = {
  home: {
    en: {
      title: 'Workspace Widget — A calm launcher for local work',
      description: 'Launch Windows apps, folders, URLs, and health-aware local services from one movable workspace.'
    },
    ko: {
      title: 'Workspace Widget — 로컬 작업을 위한 차분한 런처',
      description: 'Windows 앱, 폴더, URL과 Health-aware 로컬 서비스를 하나의 이동 가능한 작업 공간에서 실행하세요.'
    }
  },
  privacy: {
    en: {
      title: 'Privacy Policy — Workspace Widget',
      description: 'How Workspace Widget stores local configuration and when user-configured network requests occur.'
    },
    ko: {
      title: '개인정보처리방침 — Workspace Widget',
      description: 'Workspace Widget이 로컬 구성을 저장하는 방식과 사용자 구성 네트워크 요청이 발생하는 경우를 설명합니다.'
    }
  },
  support: {
    en: {
      title: 'Support — Workspace Widget',
      description: 'Get help, report a bug, propose a feature, or privately report a Workspace Widget vulnerability.'
    },
    ko: {
      title: '지원 — Workspace Widget',
      description: 'Workspace Widget 도움말, 오류 및 기능 제안, 비공개 보안 취약점 신고 경로입니다.'
    }
  }
};

function readStored(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Preferences remain valid for the current page if storage is unavailable.
  }
}

function detectLocale() {
  const stored = readStored(LOCALE_KEY);
  if (stored === 'ko' || stored === 'en') return stored;
  if ((navigator.language || '').toLowerCase().startsWith('ko')) return 'ko';
  try {
    if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Seoul') return 'ko';
  } catch {
    // Use the international default.
  }
  return 'en';
}

let currentLocale = detectLocale();

function translate(key, fallback) {
  return currentLocale === 'ko' && ko[key] ? ko[key] : fallback;
}

function applyLocale(locale) {
  currentLocale = locale === 'ko' ? 'ko' : 'en';
  document.documentElement.lang = currentLocale;
  writeStored(LOCALE_KEY, currentLocale);

  document.querySelectorAll('[data-copy]').forEach((element) => {
    if (!element.dataset.copyEn) element.dataset.copyEn = element.textContent.trim();
    element.textContent = translate(element.dataset.copy, element.dataset.copyEn);
  });

  document.querySelectorAll('[data-copy-aria]').forEach((element) => {
    if (!element.dataset.ariaEn) element.dataset.ariaEn = element.getAttribute('aria-label') || '';
    element.setAttribute('aria-label', translate(element.dataset.copyAria, element.dataset.ariaEn));
  });

  const page = document.body.dataset.page || 'home';
  const meta = pageMeta[page]?.[currentLocale] || pageMeta.home[currentLocale];
  document.title = meta.title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', meta.description);

  const localeSelect = document.getElementById('locale-select');
  if (localeSelect) localeSelect.value = currentLocale;
  updateThemeButton();
}

function systemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  const next = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  writeStored(THEME_KEY, next);
  updateThemeButton();
}

function updateThemeButton() {
  const button = document.getElementById('theme-toggle');
  if (!button) return;
  const isDark = document.documentElement.dataset.theme === 'dark';
  button.textContent = isDark ? '☀' : '◐';
  const fallback = isDark ? 'Switch to light theme' : 'Switch to dark theme';
  button.setAttribute('aria-label', translate(isDark ? 'common.themeToLight' : 'common.themeToDark', fallback));
  button.title = button.getAttribute('aria-label');
}

const storedTheme = readStored(THEME_KEY);
applyTheme(storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : systemTheme());
applyLocale(currentLocale);

document.getElementById('locale-select')?.addEventListener('change', (event) => {
  applyLocale(event.target.value);
});

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

const header = document.querySelector('.site-header');
const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 6);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.rel = 'noopener noreferrer';
});
