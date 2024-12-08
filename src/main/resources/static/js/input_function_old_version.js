// 전역에서 사용할 헬퍼 함수 및 상수

const StorageKeys = {
    hidden: (sectionName) => `section-${sectionName}-hidden`,
    activate: (sectionName) => `button-${sectionName}-activate`
  };
  
  // 자식 요소와 플러스 버튼의 visibility 토글 함수
  function toggleChildrenVisibility(section, isHidden) {
    Array.from(section.children).forEach(child => child.classList.toggle('hidden', isHidden));
    const plusButton = section.querySelector('.plusbutton');
    if (plusButton) {
        plusButton.classList.toggle('hidden', isHidden);
    }
  }
  
  // 섹션 상태 복원 함수
  function restoreSectionState(button) {
    const sectionName = button.getAttribute('data-section');
    const section = document.querySelector(`[name="${sectionName}"]`);
    if (!section) return;
  
    const isHidden = localStorage.getItem(StorageKeys.hidden(sectionName)) === 'true';
    const isActivated = localStorage.getItem(StorageKeys.activate(sectionName)) === 'true';
  
    button.classList.toggle('activate', isActivated);
    section.classList.toggle('hidden', isHidden);
    toggleChildrenVisibility(section, isHidden);
  }
  
  // 버튼 클릭 이벤트 핸들러
  function handleToggleButtonClick(event) {
    const button = event.target.closest('.toggle-button');
    if (!button) return;
  
    const sectionName = button.getAttribute('data-section');
    const section = document.querySelector(`[name="${sectionName}"]`);
    if (!section) return;
  
    const isNowActivated = button.classList.toggle('activate');
    localStorage.setItem(StorageKeys.activate(sectionName), isNowActivated);
  
    const isNowHidden = section.classList.toggle('hidden');
    toggleChildrenVisibility(section, isNowHidden);
    localStorage.setItem(StorageKeys.hidden(sectionName), isNowHidden);
  }
  
  
  
  ///////////////////////////////////////////////plusbutton
  document.addEventListener('DOMContentLoaded', function () {
    // Initialize sections based on saved field counts
    document.querySelectorAll('.plusbutton').forEach(button => {
        const section = button.getAttribute('data-section');
        const savedFieldCount = getFieldCount(section);
        
        // Load the saved field sets when the page loads
        for (let i = 0; i < savedFieldCount; i++) {
            addFieldSet(section);
        }
  
        // Attach click event listener to each button
        button.addEventListener('click', (event) =>{
          handleAddButtonClick(section)
          event.preventDefault();
        
        } );
    });
  });
  
  // Helper to get and set field count in localStorage
  function getFieldCount(section) {
    return parseInt(localStorage.getItem(`fieldCount-${section}`)) || 0;
  }
  
  function setFieldCount(section, count) {
    localStorage.setItem(`fieldCount-${section}`, count);
  }
  
  // Handle adding a new field set when the button is clicked
  function handleAddButtonClick(section) {
    addFieldSet(section);
  
    // Update field count in localStorage
    const currentCount = getFieldCount(section);
    setFieldCount(section, currentCount + 1);
  }
  
  // Retrieve template and container elements for a section
  function getSectionElements(section) {
    const template = document.querySelector(`.maincontainer[name="${section}"] .subframe`);
    const container = document.querySelector(`.maincontainer[name="${section}"] .mainframe`);
  
    if (!template || !container) {
        console.warn(`Unknown section: ${section}`);
        return null;
    }
  
    return { template, container };
  }
  
  // Add a new field set to the section
  function addFieldSet(section) {
    const elements = getSectionElements(section);
    if (!elements) return;
  
    const { template, container } = elements;
    const newFieldSet = template.cloneNode(true);
  
    // Clear inputs and adjust name attributes
    newFieldSet.querySelectorAll('input, textarea, select').forEach(input => {
        input.value = '';
        const index = container.querySelectorAll('.subframe').length;
        if (input.name) {
            input.name = input.name.replace(/\[\d+\]/, `[${index}]`);
        }
    });
  
    newFieldSet.style.display = 'flex'; // Ensure it's visible
    container.appendChild(newFieldSet);
  }
  
  
  //이미지 추가하는 함수임
  document.getElementById('addImageBtn').addEventListener('click', function() {
    document.getElementById('imageInput').click();
  });
  
  document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const imageContainer = document.querySelector('.image-container');
        const imageUrl = e.target.result;
        localStorage.setItem('imageUrl', imageUrl);
        imageContainer.style.backgroundImage = `url(${e.target.result})`;  // 배경 이미지로 설정
      };
      reader.readAsDataURL(file);
    }
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    const previewButton = document.querySelector('#preview'); // 미리보기 버튼
  
    // 미리보기 버튼 클릭 이벤트
    previewButton.addEventListener('click', function () {
      const allData = {
        educations: [],
        awards: [],
        eduExps: [],
        academicActivities: [],
        workExps: [],
        licenses: [],
        desiredPosition: "" // desiredPosition 추가
      };
  
      // 모든 입력 값 수집 (hidden 클래스 제외)
      document.querySelectorAll('.text_area, .text_area_1, .select, .check, .e_check, .image').forEach(input => {
        if (!input.style.display !== "none") { // 디스플레이 옵션이 none이 아닌 요소만 처리
          const name = input.getAttribute('name');
          if (!name) return; // name 속성이 없는 경우 무시
  
          console.log('Processing input:', name); // 디버깅용
  
          // desiredPosition 예외 처리
          if (name === "desiredPosition") {
            allData.desiredPosition = input.value.trim(); // desiredPosition은 배열이 아닌 단일 값으로 처리
            return; // 다른 처리 하지 않도록 early return
          }
  
          const matches = name.match(/^(\w+)\[(\d+)]\.(\w+)$/); // 정규식으로 파싱
          if (!matches) {
            console.warn(`Invalid name format: ${name}`);
            return;
          }
  
          const [, listName, index, field] = matches; // 정규식 그룹 매칭 결과
          const listIndex = parseInt(index, 10);
  
          if (!allData[listName]) {
            console.warn(`Undefined list name: ${listName}`);
            return;
          }
  
          // 배열 초기화
          if (!allData[listName][listIndex]) {
            allData[listName][listIndex] = {};
          }
  
          // 값을 추가하기 전에 유효한 값인지 체크
          if (input.type === 'checkbox') {
            // checkbox일 경우 체크된 경우에만 값을 추가
            if (input.checked) {
              allData[listName][listIndex][field] = true;
            } else {
                allData[listName][listIndex][field] = false;
            }
          } else {
            // checkbox가 아닌 경우 빈 값이 아닌 것만 추가
            allData[listName][listIndex][field] = input.value.trim();
          }
        }
      });
  
      // 빈 객체를 가진 배열 항목을 제거하는 코드 추가
      Object.keys(allData).forEach(key => {
        if (key !== "desiredPosition") {  // desiredPosition은 배열이 아니므로 제외
          allData[key] = allData[key].filter(item => {
            return Object.keys(item).length > 0; // 객체가 비어 있지 않은 경우만 포함
          });
        }
      });
  
      // 데이터를 JSON 문자열로 변환하여 localStorage에 저장
      localStorage.setItem('formData', JSON.stringify(allData));
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      console.log('Final JSON Data:', allData); // 최종 데이터 디버깅용 출력
    });
  });
  
  
  
  
  // beforeunload 이벤트 핸들러
  function beforeUnloadHandler(event) {
    // 페이지가 닫히거나 다른 URL로 이동하기 직전에 실행될 코드
    console.log("페이지 정보를 저장하셨습니까?");
    event.preventDefault();
    event.returnValue = ""; // 경고 메시지 표시 (일부 브라우저만 지원)
    localStorage.clear(); // 페이지 닫힐 때 로컬 스토리지 초기화
  }
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