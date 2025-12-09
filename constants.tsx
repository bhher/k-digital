import { SlideType, SlideData } from './types';
import { Code, Database, Layout, Smartphone, Layers, Award, Terminal, Server, Cpu, Globe } from 'lucide-react';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    type: SlideType.COVER,
    title: "2026 K-Digital Training\n신입생 오리엔테이션",
    subTitle: "클라우드&데브옵스 배포 기반 실무형 프론트&백엔드(자바, 스프링, 리액트) 멘토링 클래스",
    content: {
      highlight: "기초 프로그래밍부터 실무 프로젝트까지, 개발자로 거듭나는 1100시간의 여정",
      footer: "K-Digital Training Center / 2025.12.22"
    }
  },
  {
    id: 2,
    type: SlideType.GOALS,
    title: "어떤 개발자가 되는가?",
    subTitle: "교육 목표 및 인재상",
    content: [
      {
        keyword: "Solid Foundation",
        desc: "Java와 C/C++을 통한 탄탄한 프로그래밍 기초 확립",
        icon: <Terminal size={32} />
      },
      {
        keyword: "Full-Stack Ability",
        desc: "Spring Boot(백엔드)와 React(프론트엔드)를 아우르는 웹 개발 능력",
        icon: <Layout size={32} />
      },
      {
        keyword: "Hybrid Competence",
        desc: "Kotlin을 활용한 안드로이드 앱 개발 확장성 확보",
        icon: <Smartphone size={32} />
      },
      {
        keyword: "Project Ready",
        desc: "MSA 아키텍처 및 현업 트렌드를 반영한 실전 프로젝트 수행 능력",
        icon: <Layers size={32} />
      }
    ]
  },
  {
    id: 3,
    type: SlideType.ROADMAP,
    title: "전체 학습 로드맵",
    subTitle: "From Zero to Hero",
    content: [
      { step: "Step 1", title: "Language Base", desc: "Java, C/C++" },
      { step: "Step 2", title: "Data & Web", desc: "Oracle, HTML/CSS/JS" },
      { step: "Step 3", title: "Web Framework", desc: "Spring Boot, React" },
      { step: "Step 4", title: "Mobile Expansion", desc: "Kotlin/Android" },
      { step: "Step 5", title: "Practical Project", desc: "Portfolio" },
    ]
  },
  {
    id: 4,
    type: SlideType.CONTENT_PHASE,
    title: "[Phase 1] 프로그래밍 언어 기초",
    subTitle: "개발의 언어를 배우다",
    hours: 144,
    tags: ['Java', 'C/C++', 'OOP', 'Memory'],
    content: {
      sections: [
        {
          head: "Java Programming",
          items: [
            "객체지향(OOP)의 완벽한 이해 (Class, 상속, 인터페이스)",
            "컬렉션 프레임워크 (List, Map, Set)",
            "스트림 API, 스레드 및 네트워크 프로그래밍"
          ]
        },
        {
          head: "C/C++ Foundation",
          items: [
            "컴퓨터 구조와 메모리 관리의 이해",
            "생성자와 소멸자, 연산자 오버로딩",
            "포인터와 메모리 동적 할당"
          ]
        }
      ],
      point: "단순 문법 암기가 아닌, '데이터를 다루는 논리적 사고력' 배양"
    }
  },
  {
    id: 5,
    type: SlideType.CONTENT_PHASE,
    title: "[Phase 2] 데이터베이스 & 웹 표준",
    subTitle: "데이터 관리와 화면 구현",
    hours: 200,
    tags: ['Oracle', 'MySQL', 'HTML5', 'ES6+'],
    content: {
      sections: [
        {
          head: "Database (72H)",
          items: [
            "관계형 DB 모델링 및 정규화",
            "SQL(기초/고급) 및 PL/SQL",
            "JDBC를 활용한 자바 연동"
          ]
        },
        {
          head: "UI Implementation (128H)",
          items: [
            "웹 표준(HTML5, CSS3) 및 반응형 웹",
            "JavaScript Deep Dive: ES6+ 문법",
            "DOM 제어 및 REST API 비동기 통신"
          ]
        }
      ],
      point: "사용자가 보는 화면(Front)과 데이터가 저장되는 곳(DB)의 연결 고리 이해"
    }
  },
  {
    id: 6,
    type: SlideType.CONTENT_PHASE,
    title: "[Phase 3] 웹 애플리케이션 프레임워크",
    subTitle: "현업 표준 기술 스택 습득",
    hours: 148,
    tags: ['React', 'JSP', 'Servlet', 'Hooks'],
    content: {
      sections: [
        {
          head: "Legacy to Modern (56H)",
          items: [
            "JSP & Servlet: 웹 서버 동작 원리(Model 1 & 2)",
            "세션/쿠키 관리 및 인증 처리 기초"
          ]
        },
        {
          head: "Frontend Framework (92H)",
          items: [
            "React: 컴포넌트 기반 개발 & JSX",
            "Hooks (useState, useEffect) & Custom Hooks",
            "Redux/Context API 상태 관리"
          ]
        }
      ],
      point: "현대적인 SPA(Single Page Application) 구조와 리액트 생태계 적응"
    }
  },
  {
    id: 7,
    type: SlideType.CONTENT_PHASE,
    title: "[Phase 4] 엔터프라이즈 백엔드 & 모바일",
    subTitle: "강력한 서버 구축과 모바일 확장",
    hours: 192,
    tags: ['Spring Boot', 'Kotlin', 'Android', 'MyBatis'],
    content: {
      sections: [
        {
          head: "Spring Framework & Boot (128H)",
          items: [
            "DI/IoC 컨테이너, AOP, MVC 패턴",
            "MyBatis 연동 및 데이터 트랜잭션 처리",
            "SBB(Spring Boot Board) 서비스 배포 실습"
          ]
        },
        {
          head: "Kotlin Programming (64H)",
          items: [
            "자바와의 상호 운용성 및 Kotlin 문법",
            "안드로이드 액티비티 생명주기",
            "외부 API 연동 및 웹앱(Hybrid) 구현"
          ]
        }
      ],
      point: "대한민국 전자정부 표준 프레임워크(Spring) 마스터 및 앱 개발 능력 추가"
    }
  },
  {
    id: 8,
    type: SlideType.PROJECT,
    title: "[Phase 5] 실전 프로젝트 1 - 세미",
    subTitle: "아이디어를 현실로 (Semi-Project)",
    hours: 120,
    tags: ['Git', 'Jira', 'Collaboration', 'UI/UX'],
    content: {
      goal: "협업 툴(Git, Jira) 사용법 익히기 및 UI/UX 중심 구현",
      examples: [
        { title: "K-Culture 플랫폼", desc: "외국인 관광객 대상 커뮤니티" },
        { title: "취미 공유 플랫폼", desc: "위치 기반 One-Day Class 추천 서비스" },
        { title: "소셜 챌린지", desc: "동기부여 및 목표 달성 챌린지 웹 서비스" }
      ],
      effect: "기획부터 배포까지의 사이클 1회차 경험"
    }
  },
  {
    id: 9,
    type: SlideType.PROJECT,
    title: "[Phase 6] 실전 프로젝트 2 - 파이널",
    subTitle: "취업을 위한 포트폴리오 (Final Project)",
    hours: 0, // Period based
    tags: ['MSA', 'Spring Cloud', 'AI API', 'Deployment'],
    content: {
      goal: "최신 기술(MSA, Spring Boot, AI API)을 접목한 고도화 시스템 개발",
      examples: [
        { title: "종합 의료 관리 시스템", desc: "MSA 아키텍처 활용, 환자 중심 서비스" },
        { title: "1인 가구 인테리어", desc: "MVC2 패턴 및 추천 알고리즘 적용" },
        { title: "구독형 서비스 관리", desc: "결제 모듈 및 정기 배송 로직 구현" },
        { title: "사용자 맞춤 산책 웹앱", desc: "위치 기반 서비스(LBS)와 헬스케어 접목" }
      ],
      effect: "기업이 요구하는 '문제 해결 능력'과 '기술적 깊이' 증명"
    }
  },
  {
    id: 10,
    type: SlideType.CONTENT_PHASE,
    title: "학습 방법",
    subTitle: "이론과 실습의 균형, 그리고 협업",
    tags: ['Hands-on', 'Code Review', 'Docker', 'Agile'],
    content: {
      tagsTitle: "Key Methods",
      sections: [
        {
          head: "강의 + 실습 병행",
          items: [
            "핵심 이론 학습 후 즉시 실습 과제 수행",
            "이론 · 실습 균형: 개념 이해부터 코드 구현까지 단계적 학습"
          ]
        },
        {
          head: "팀 프로젝트 중심",
          items: [
            "협업을 통한 실무 기반 개발 경험 축적",
            "협업 · 배포 경험: GitHub 협업, Docker · Kubernetes 배포 실습"
          ]
        },
        {
          head: "실시간 피드백 & 발표",
          items: [
            "코드 리뷰와 발표를 통한 지속적 개선",
            "멘토링을 통한 기술적 깊이 향상"
          ]
        }
      ],
      point: "개념 이해부터 실무 배포까지 완성하는 '진짜 개발자' 로드맵"
    }
  },
  {
    id: 11,
    type: SlideType.CLOSING,
    title: "Development is not a Sprint,\nIt's a Marathon.",
    subTitle: "성공적인 수료를 위한 다짐 & Q&A",
    content: {
      guides: [
        { label: "출석", text: "KDT 과정의 생명 (지각/결석 관리 철저)" },
        { label: "소통", text: "팀 프로젝트 시 갈등 관리와 커뮤니케이션" },
        { label: "기록", text: "1일 1커밋, 블로그 회고 작성 권장" }
      ],
      message: "여러분의 0개월 뒤 모습은 오늘 시작됩니다."
    }
  }
];