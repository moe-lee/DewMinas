document.addEventListener('DOMContentLoaded', function() {
window.addEventListener("beforeunload", beforeUnloadHandler);
  addFieldSet('problemSection');
});
//이미지 추가하는 함수임
document.getElementById('image-button').addEventListener('click', function() {
  document.getElementById('image-input').click();
});

 document.getElementById("preview-button").addEventListener("click", handlePreview);

function handlePreview() {
  const formData = collectFormData();
  console.log("가공된 JSON 데이터:", formData);
}

function collectFormData() {
  const formData = new FormData(document.getElementById("projectForm"));

  return {
    projectName: formData.get("projectName")?.trim() || "프로젝트 제목",
    projectDescription: formData.get("projectDescription")?.trim() || "프로젝트 요약",
    projectLink: formData.get("projectLink")?.trim() || "https://github.com",
    repositoryLink: formData.get("repositoryLink")?.trim() || "https://bitbucket.org",
    role: formData.get("role")?.trim() || "Team Leader",
    roleDescription: formData.get("roleDescription")?.trim() || "프로젝트 관리",
    skills: Array.from(document.querySelectorAll("[name='usedTech']"))
      .map(input => input.value.trim())
      .filter(tech => tech), // 빈 값을 제거하고 배열 생성
    troubleshooting: Array.from(document.querySelectorAll(".subframe"))
      .map(section => ({
        problem: section.querySelector("[name='problem']")?.value.trim(),
        solution: section.querySelector("[name='solution']")?.value.trim(),
        result: section.querySelector("[name='result']")?.value.trim(),
        lesson: section.querySelector("[name='lesson']")?.value.trim()
      }))
      .filter(data => data.problem || data.solution || data.result || data.lesson) // 데이터가 존재하는 경우만 필터링
  };
}


