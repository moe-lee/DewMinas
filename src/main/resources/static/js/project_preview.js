// JSON 데이터 예시
let iv = {
  "title": "프로젝트 제목",
  "summary": "프로젝트 요약",
  "roles": [
    {
      "roleName": "Team Leader",
      "responsibility": "프로젝트 관리"
    }
  ],
  "troubleshooting": [
    {
      "problem": "API 응답 오류",
      "solution": "로그 확인 후 대응",
      "result": "문제 해결 완료",
      "lesson": "디버깅"
    },
    {
      "problem": "서버 속도 저하",
      "solution": "DB 인덱스 추가",
      "result": "속도 개선",
      "lesson": "성능 최적화"
    }
  ],
  "skills": [
    {
      "name": "Java"
    },
    {
      "name": "mysql"
    },
    {
      "name": "oracle"
    }
  ],
  "projectSources": [
    {
      "name": "GitHub",
      "url": "https://github.com"
    }
  ],
  "repositoryLinks": [
    {
      "name": "Bitbucket",
      "url": "https://bitbucket.org"
    }
  ]
};

// HTML 업데이트 함수
function populateProjectData(data) {
  // 프로젝트 제목 및 요약
  document.querySelector(".head-text").textContent = data.title || "Project";
  document.querySelector("[name='summary']").textContent = data.summary || "No Summary Available";

  // Skills 동적 생성
  const skillFrame = document.querySelector(".skill-frame");
  const skillIconContainer = skillFrame.querySelector(".input-icon");
  
  data.skills.forEach(skill => {
    const img = document.createElement("img");
    img.classList.add("skill-icon");
    img.src = `../static/img/icon_${skill.name.toLowerCase().replace(" ", "_")}.png`;
    img.alt = skill.name;
    skillIconContainer.appendChild(img);
  });

  // Open sources 및 Repository Links
  const projectSourcesContainer = document.querySelector("[name='projectSources']");
  const repositoryLinksContainer = document.querySelector("[name='repositoryLinks']");

  data.projectSources.forEach(source => {
    const link = document.createElement("a");
    link.href = source.url;
    link.textContent = source.name;
    link.target = "_blank";
    projectSourcesContainer.appendChild(link);
  });

  data.repositoryLinks.forEach(linkData => {
    const link = document.createElement("a");
    link.href = linkData.url;
    link.textContent = linkData.name;
    link.target = "_blank";
    repositoryLinksContainer.appendChild(link);
  });

 // 역할 정보 렌더링 (첫 번째 역할만 렌더링)
 const roleTitleElement = document.querySelector("[name='role-title']");
 const roleCommentElement = document.querySelector("[name='role-comment']");

 if (data.roles.length > 0) {
   const role = data.roles[0];
   roleTitleElement.textContent = `Role: ${role.roleName}`;
   roleCommentElement.textContent = `${role.responsibility}`;
 }
  // 트러블슈팅 섹션 데이터 삽입
  const troubleshootingContainer = document.querySelector(".trouble-shooting");


  data.troubleshooting.forEach(trouble => {
    const troubleDiv = document.createElement("div");
    troubleDiv.classList.add("trouble");

    const problem = document.createElement("div");
    problem.classList.add("text-wrapper-5");
    problem.textContent = `Problem: ${trouble.problem}`;

    const solution = document.createElement("div");
    solution.classList.add("text-wrapper-5");
    solution.textContent = `Solution: ${trouble.solution}`;

    const result = document.createElement("div");
    result.classList.add("text-wrapper-5");
    result.textContent = `Result: ${trouble.result}`;

    const lesson = document.createElement("div");
    lesson.classList.add("text-wrapper-5");
    lesson.textContent = `Lesson: ${trouble.lesson}`;

    // 텍스트 줄바꿈 처리를 위해 CSS 스타일 적용
    [problem, solution, result, lesson].forEach(el => {
      el.style.whiteSpace = "pre-wrap";
    });

    // 트러블슈팅 정보를 <div class="trouble"> 요소에 추가
    troubleDiv.appendChild(problem);
    troubleDiv.appendChild(solution);
    troubleDiv.appendChild(result);
    troubleDiv.appendChild(lesson);

    // 최종적으로 <div class="trouble-shooting"> 요소에 추가
    troubleshootingContainer.appendChild(troubleDiv);
  });
}

// 페이지 로드 시 데이터 반영
document.addEventListener("DOMContentLoaded", () => {
  populateProjectData(iv);
});
