// 전역에서 사용할 헬퍼 함수 및 상수
const globalSections = ["educations", "licenses", "awards", "eduExps", "academicActivities", "workExps"];

const StorageKeys = {
    hidden: (sectionName) => `section-${sectionName}-hidden`,
    activate: (sectionName) => `button-${sectionName}-activate`
  };
  
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


// 입력 데이터를 모아 요청용 객체를 만들어주는 함수
function parseResumeData() {
    const allData = {
            educations: [],
            awards: [],
            eduExps: [],
            academicActivities: [],
            workExps: [],
            licenses: [],
            desiredPosition: "" // desiredPosition 추가
          };
    let notSatisfiedSections = new Set();

    allData.desiredPosition = document.getElementById("desiredPosition_input").value;
    if(allData.desiredPosition === "") {
        notSatisfiedSections.add("desiredPosition");
    }

    for(let section of globalSections) {
        let sectionMainContainer = section + '_main_container';
        let subframes = document.querySelectorAll(`#${sectionMainContainer} .subframe`);
        for(let i = 1; i < subframes.length; i++) {
            let inputs = subframes[i].querySelectorAll("input");
            let newObject = {};
            let complete = true;
            inputs.forEach(input => {
                let tokens = input.getAttribute("name").split("-");
                let value = input.value;

                if(tokens[1] === "toNow") {
                    value = (value === "on") ? true : false;
                } else if(tokens[1].indexOf('Date') >= 0) {
                    value += 'T00:00:00.0000000';
                } else if(value){
                    value = (!isNaN(Number(value))) ? Number(value) : value;
                }
                newObject[tokens[1]] = value;
            });
            for(let key in newObject) { // 채워지지 않은 항목이 있을 경우 추가하지 않는다.
                if(key === "id") continue;
                if(newObject[key] === "") complete = false;
            }
            if(complete) allData[section].push(newObject);
            else notSatisfiedSections.add(section);
        }
    }
    if(notSatisfiedSections.size == 0) return JSON.stringify(allData);
    else {
        alert([...notSatisfiedSections].join("\n"));
        return "";
    }
}

let saveButton = document.getElementById("save");
let previewButton = document.getElementById("preview");

saveButton.addEventListener('click', (ev) => {
    let parsedData = parseResumeData();
    if(parsedData === "") return;
    let resumeId = document.getElementById("resumeId").value;
    fetch(`/api/resume/${resumeId}`, {
        method : 'PUT',
        headers : {
            "Content-Type" : "application/json"
        },
        body : parsedData
    }).then(()=> {
        let email = (new URL(window.location.href)).searchParams.get('email');
        location = `/profile?email=${email}`;
    });
});