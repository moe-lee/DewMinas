

// 페이지가 처음 로드될 때만 populateData를 실행하고 다시 로드되지 않게 하는 코드
window.onload = function() {
  if(!localStorage.getItem("populateDataExecuted")){
    // 이후 이 코드가 다시 실행되지 않도록 로컬 스토리지에 값을 저장
    localStorage.setItem('populateDataExecuted', 'true');
    const savedData = localStorage.getItem("portfolioData");
    if (savedData) {
      const parsedData = JSON.parse(savedData); // 저장된 데이터를 객체로 변환
      console.log(parsedData);
      populateData(parsedData[0]); // 데이터를 채우기
    }
  }
};

document.addEventListener('click', function(event) {
  const wrapper = event.target.closest('.image-wrapper');
  const container = wrapper.closest('.maincontainer');
  const section = container.getAttribute('name');

  if (wrapper && wrapper.parentElement) {
    const fieldCountKey = `fieldCount-${section}`;
    const currentCount = parseInt(localStorage.getItem(fieldCountKey)) || 0;
    localStorage.setItem(fieldCountKey, currentCount - 1);
    wrapper.parentElement.remove();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener("beforeunload", beforeUnloadHandler);
// 모든 버튼의 상태 복원
 document.querySelectorAll('.toggle-button').forEach(restoreSectionState);

// 버튼 클릭 이벤트 리스너 등록
 document.addEventListener('click', handleToggleButtonClick);
 const savedImageUrl = localStorage.getItem('imageUrl');
 if (savedImageUrl) {
   const imageContainer = document.querySelector('.image-container');
   imageContainer.style.backgroundImage = `url(${savedImageUrl})`;
 }
});
//이미지 추가하는 함수임
document.getElementById('addImageBtn').addEventListener('click', function() {
  document.getElementById('imageInput').click();
});



document.addEventListener('click', function(event) {
 const wrapper = event.target.closest('.image-wrapper');
 const container = wrapper.closest('.maincontainer');
 const section = container.getAttribute('name');

 if (wrapper && wrapper.parentElement) {
   const fieldCountKey = `fieldCount-${section}`;
   const currentCount = parseInt(localStorage.getItem(fieldCountKey)) || 0;
   localStorage.setItem(fieldCountKey, currentCount - 1);
   wrapper.parentElement.remove();
 }
});

function populateData(data) {
  // 인적사항
    document.querySelector('textarea[name="desiredPosition"]').value = data.desiredPosition || '';

  // 학력
  if (data.educations) {
    data.educations.forEach((edu, index) => {
      addFieldSet('educations');
      
      const educationSection = document.querySelectorAll('[name="educations"]');
      // 대학 정보 입력 필드 채우기
      educationSection.forEach((section) => {
        section.querySelector(`input[name="educations[${index + 1}].institution_name"]`).value = edu.institution_name || '';
        section.querySelector(`input[name="educations[${index + 1}].department"]`).value = edu.department || '';
        section.querySelector(`input[name="educations[${index + 1}].degree"]`).value = edu.degree || '';
        section.querySelector(`input[name="educations[${index + 1}].gpa"]`).value = edu.gpa || '';
        section.querySelector(`input[name="educations[${index + 1}].max_gpa"]`).value = edu.max_gpa || '';
        section.querySelector(`input[name="educations[${index + 1}].from_Date"]`).value = edu.from_date || '';
        section.querySelector(`input[name="educations[${index + 1}].to_date"]`).value = edu.to_date || '';
        const toNowCheckbox = section.querySelector(`input[name="educations[${index + 1}].to_now"]`);
        if (edu.to_now) {
          toNowCheckbox.checked = true;
        } else {
          toNowCheckbox.checked = false;
        }
      });
    });
  }

  // 자격증
  if (data.licenses) {
    data.licenses.forEach((license, index) => {
      addFieldSet('licenses');
      const licensesSection = document.querySelector('[name="licenses"]');
      licensesSection.querySelector(`input[name="licenses[${index + 1}].name"]`).value = license.name || '';
      licensesSection.querySelector(`input[name="licenses[${index + 1}].organization_name"]`).value = license.organization_name || '';
      licensesSection.querySelector(`input[name="licenses[${index + 1}].issued_data"]`).value = license.issued_date || '';
    });
  }

  // 수상
  if (data.awards) {
    data.awards.forEach((award, index) => {
      addFieldSet('awards');
      const awardsSection = document.querySelector('[name="awards"]');
      awardsSection.querySelector(`input[name="awards[${index + 1}].award_name"]`).value = award.award_name || '';
      awardsSection.querySelector(`input[name="awards[${index + 1}].competition_name"]`).value = award.competition_name || '';
      awardsSection.querySelector(`input[name="awards[${index + 1}].organization_name"]`).value = award.organization_name || '';
      awardsSection.querySelector(`input[name="awards[${index + 1}].award_date"]`).value = award.award_date || '';
    });
  }

  // 교육이수
  if (data.eduExps) {
    data.eduExps.forEach((eduExp, index) => {
      addFieldSet('eduExps');
      const eduExpsSection = document.querySelector('[name="eduExps"]');
      eduExpsSection.querySelector(`input[name="eduExps[${index + 1}].education_name"]`).value = eduExp.education_name || '';
      eduExpsSection.querySelector(`input[name="eduExps[${index + 1}].organization_name"]`).value = eduExp.organization_name || '';
      eduExpsSection.querySelector(`input[name="eduExps[${index + 1}].from_date"]`).value = eduExp.from_date || '';
      eduExpsSection.querySelector(`input[name="eduExps[${index + 1}].to_date"]`).value = eduExp.to_date || '';
      const toNowCheckbox = eduExpsSection.querySelector(`input[name="eduExps[${index + 1}].to_now"]`);
      if (eduExp.to_now) {
        toNowCheckbox.checked = true;
      } else {
        toNowCheckbox.checked = false;
      }
    });
  }

  // 학술활동
  if (data.academicActivities) {
    data.academicActivities.forEach((activity, index) => {
      addFieldSet('academicActivities');
      const academicActivitiesSection = document.querySelector('[name="academicActivities"]');
      academicActivitiesSection.querySelector(`input[name="academicActivities[${index + 1}].education_name"]`).value = activity.education_name || '';
      academicActivitiesSection.querySelector(`input[name="academicActivities[${index + 1}].academic_institution"]`).value = activity.academic_institution || '';
      academicActivitiesSection.querySelector(`input[name="academicActivities[${index + 1}].conferenace_name"]`).value = activity.conference_name || '';
      academicActivitiesSection.querySelector(`input[name="academicActivities[${index + 1}].activity_date"]`).value = activity.activity_date || '';
    });
  }

  // 경력
  if (data.workExps) {
    data.workExps.forEach((workExp, index) => {
      addFieldSet('workExps');
      const workExpsSection = document.querySelector('[name="workExps"]');
      workExpsSection.querySelector(`input[name="workExps[${index + 1}].job_title"]`).value = workExp.job_title || '';
      workExpsSection.querySelector(`input[name="workExps[${index + 1}].company_name"]`).value = workExp.company_name || '';
      workExpsSection.querySelector(`input[name="workExps[${index + 1}].from_date"]`).value = workExp.from_date || '';
      workExpsSection.querySelector(`input[name="workExps[${index + 1}].to_date"]`).value = workExp.to_date || '';
      workExpsSection.querySelector(`textarea[name="workExps[${index + 1}].responsibilities"]`).value = workExp.responsibilities || '';
    });
  }

  // 기술
  if (data.skills) {
    data.skills.forEach((skill, index) => {
      const skillsSection = document.querySelector('[name="skill"]');
      skillsSection.querySelector(`input[name="s_name"]`).value = skill.name || '';
      skillsSection.querySelector(`select[name="s_level"]`).value = skill.level || 'level_1';
      skillsSection.querySelector(`input[name="s_introduce"]`).value = skill.introduce || '';
    });
  }
}
