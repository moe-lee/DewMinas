let allData;
try {
    // localStorage에서 데이터 가져오기
    allData = JSON.parse(localStorage.getItem('formData'));

    // 데이터가 유효하지 않을 경우 예외 발생
    if (!allData) {
        throw new Error("localStorage에 'formData' 데이터가 없거나 값이 비어 있습니다.");
    }

    // 데이터가 정상적인 경우 콘솔 출력
    console.log("전송할 데이터:", allData);

} catch (error) {
    // 오류 발생 시 콘솔에 출력
    console.error("데이터 처리 중 오류 발생:", error.message);
}

// 저장 버튼 클릭 이벤트 핸들러
document.getElementById('profile-save').addEventListener('click', function () {
    // localStorage에서 데이터 가져오기
    const allData = JSON.parse(localStorage.getItem('formData'));
    
    if (allData) {
        // 콘솔에 출력
        console.log("전송할 데이터:", allData);
    } else {
        // 데이터가 없는 경우
        console.error("localStorage에 'formData' 데이터가 없습니다.");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    console.log(allData)
    // 데이터가 없으면 바로 종료
    if (!allData) return;
    const portfolioContainer = document.querySelector(".main-container[name='portfolio-container']");
    // Intro 섹션 생성
    function createIntroSection(data) {
        const introContainer = document.createElement("div");
        introContainer.classList.add("intro-container");
        introContainer.setAttribute("name", "intro");

        const img = document.createElement("img");
        img.classList.add("intro-img");
        img.setAttribute("alt", "Png");
        img.setAttribute("src", "image2.png");  // 기본 이미지 설정
        introContainer.appendChild(img);

        const introFrame = document.createElement("div");
        introFrame.classList.add("intro-frame");

        const fullName = document.createElement("p");
        fullName.classList.add("name");
        fullName.textContent = data.name && data.name[0] ? `${data.name[0]} (${data.englishName ? data.englishName[0] : ''})` : "이원준 (WONJUN LEE)";
        introFrame.appendChild(fullName);

        const role = document.createElement("p");
        role.classList.add("role");
        role.textContent = data.desiredPosition ? data.desiredPosition : "Software Engineer";
        introFrame.appendChild(role);

        const phoneNumber = document.createElement("p");
        phoneNumber.classList.add("contact-info");
        phoneNumber.textContent = data.phone && data.phone[0] ? `Phone. ${data.phone[0]}` : "Phone. 010-1234-5678";
        introFrame.appendChild(phoneNumber);

        const emailAddress = document.createElement("p");
        emailAddress.classList.add("contact-info");
        emailAddress.textContent = data.email && data.email[0] ? `e-mail. ${data.email[0]}` : "e-mail. evenil0206@gmail.com";
        introFrame.appendChild(emailAddress);

        introContainer.appendChild(introFrame);
        portfolioContainer.appendChild(introContainer);
    }

    function createEducationSection(allData) {
        // allData.educations가 비어 있으면 함수 종료
        if (!allData.educations || allData.educations.length === 0) return;
    
        // Education 섹션 컨테이너 생성
        const educationContainer = document.createElement("div");
        educationContainer.classList.add("content-container");
        educationContainer.setAttribute("name", "education");
    
        // 섹션 제목 생성
        const title = document.createElement("h2");
        title.classList.add("content-head");
        title.textContent = "/ Education /";
        educationContainer.appendChild(title);
    
        // 각 교육 항목을 처리
        allData.educations.forEach((education, index) => {
            const contentFrame = document.createElement("div");
            contentFrame.classList.add("content-frame");
    
            // Bullet Point 생성
            const bulletPoint = document.createElement("p");
            bulletPoint.classList.add("content-0");
            bulletPoint.textContent = "•";
            contentFrame.appendChild(bulletPoint);
    
            // 교육 정보 생성
            const educationInfo = document.createElement("p");
            educationInfo.classList.add("content-1");
            educationInfo.textContent = `${education. institution_name || "대학교"} / ${education.department || "컴퓨터공학과"} / ${education.degree || "학사"}`;
            contentFrame.appendChild(educationInfo);

            
            

            // GPA 정보 생성
            const gpa = document.createElement("p");
            gpa.classList.add("content-2");
            gpa.textContent = `GPA : ${education.gpa || "4.49"} / ${education.max_gpa || "4.5"}`;
            contentFrame.appendChild(gpa);
            

            const miniframe=document.createElement("div");
            miniframe.classList.add("miniframe");
            const date = document.createElement("p");
            date.classList.add("content-2")
            date.textContent = `${education.from_date || "2000.10.15"} ~ ${education.to_now === "1" ? new Date().toLocaleDateString() : education.to_date || "2000.10.15"}`;
            
            const ty = document.createElement("p");
            ty.classList.add("content-2");
            ty.textContent = `${education.to_now === "1" ? "재학중" : "졸업"}`;
            
            // 각 항목을 Education Container에 추가
            miniframe.appendChild(date);
            miniframe.appendChild(ty);
            contentFrame.appendChild(miniframe);
            educationContainer.appendChild(contentFrame);

        });
    
        // 최종적으로 portfolioContainer에 Education 섹션 추가
        portfolioContainer.appendChild(educationContainer);
    }
    
    function createLicenseSection(allData) {
        // allData.licenses가 비어 있으면 함수 종료
        if (!allData.licenses || allData.licenses.length === 0) return;
        
        // License 섹션 컨테이너 생성
        const licenseContainer = document.createElement("div");
        licenseContainer.classList.add("content-container");
        licenseContainer.setAttribute("name", "license");
    
        // 섹션 제목 생성
        const title = document.createElement("h2");
        title.classList.add("content-head");
        title.textContent = "/ License /";
        licenseContainer.appendChild(title);
    
        // 각 라이센스 항목을 처리
        allData.licenses.forEach((license, index) => {
            const contentFrame = document.createElement("div");
            contentFrame.classList.add("content-frame");
    
            // Bullet Point 생성
            const bulletPoint = document.createElement("p");
            bulletPoint.classList.add("content-0");
            bulletPoint.textContent = "•";
            contentFrame.appendChild(bulletPoint);
    
            // 라이센스 정보 생성
            const licenseInfo = document.createElement("p");
            licenseInfo.classList.add("content-1");
            licenseInfo.textContent = `${license.name || "정보처리기사"}`;
            contentFrame.appendChild(licenseInfo);

            
            // 날짜 정보 생성
            const miniframe = document.createElement("div");
            miniframe.classList.add("miniframe");

            const organization = document.createElement("p");
            organization.classList.add("content-2");
            organization.textContent=`${license.organization_name || "국가가 인증하는 기관"}`;
            miniframe.appendChild(organization);

            const date = document.createElement("p");
            date.classList.add("content-2");
            date.textContent = `${license.issued_date || "2000.10.15"}`;
            
            miniframe.appendChild(date);
            contentFrame.appendChild(miniframe);
    
            // 각 항목을 License Container에 추가
            licenseContainer.appendChild(contentFrame);
        });
        portfolioContainer.appendChild(licenseContainer);
    }
    

    // Awards 섹션 생성
    function createAwardsSection(data) {
        // 만약 data.awards.name이 비어 있으면 함수를 종료
        if (!data.awards || data.awards.length === 0) return;

        const awardsContainer = document.createElement("div");
        awardsContainer.classList.add("content-container");
        awardsContainer.setAttribute("name", "award");

        const title = document.createElement("h2");
        title.classList.add("content-head");
        title.textContent = "/ Awards /";
        awardsContainer.appendChild(title);

        data.awards.forEach((award, index) => {
            const contentFrame = document.createElement("div");
            contentFrame.classList.add("content-frame");

            const bulletPoint = document.createElement("p");
            bulletPoint.classList.add("content-0");
            bulletPoint.textContent = "•";
            contentFrame.appendChild(bulletPoint);

            const awardTitle = document.createElement("p");
            awardTitle.classList.add("content-1");
            awardTitle.textContent = award.competition_name || "2024년 하계, 동계 계절학기 캡스톤 디자인 경진대회";
            contentFrame.appendChild(awardTitle);

            const awardname = document.createElement("p");
            awardname.classList.add("content-1");
            awardname.textContent = award.award_name|| "장려상";
            contentFrame.appendChild(awardname);

            // 날짜 정보 생성
            const miniframe = document.createElement("div");
            miniframe.classList.add("miniframe");

            const awardOrganizer = document.createElement("p");
            awardOrganizer.classList.add("content-2");
            awardOrganizer.textContent = award.organizer || "동의대학교 LINC+ 사업단";
            miniframe.appendChild(awardOrganizer);

            const awardDate = document.createElement("p");
            awardDate.classList.add("content-2");
            awardDate.textContent = award.award_date || "2020-11";
            miniframe.appendChild(awardDate);
            contentFrame.appendChild(miniframe);
            awardsContainer.appendChild(contentFrame);
        });

        portfolioContainer.appendChild(awardsContainer);
    }

// Experience 섹션 생성
function createExperienceSection(data) {
    // 만약 data.eduExps가 비어 있으면 함수를 종료
    if (!data.eduExps || data.eduExps.length === 0) return;

    const experienceContainer = document.createElement("div");
    experienceContainer.classList.add("content-container");
    experienceContainer.setAttribute("name", "experience");

    const title = document.createElement("h2");
    title.classList.add("content-head");
    title.textContent = "/ Experience /";
    experienceContainer.appendChild(title);

    // 각 경험 항목을 처리
    data.eduExps.forEach((experience) => {
        const contentFrame = document.createElement("div");
        contentFrame.classList.add("content-frame");

        // Bullet Point 생성
        const bulletPoint = document.createElement("p");
        bulletPoint.classList.add("content-0");
        bulletPoint.textContent = "•";
        contentFrame.appendChild(bulletPoint);

        // 경험 제목 생성
        const experienceTitle = document.createElement("p");
        experienceTitle.classList.add("content-1");
        experienceTitle.textContent = experience.education_name || "미래 내일 일 경험 프로그램 프로그램";
        contentFrame.appendChild(experienceTitle);

        // 수료 상태 생성 (수료 중 / 수료 완료)
        const to_now = document.createElement("p");
        to_now.classList.add("content-1");
        to_now.textContent = experience.to_now === "1" ? "수료 중" : "수료 완료";
        contentFrame.appendChild(to_now);

        // 날짜 및 주최 기관 정보 생성
        const miniframe = document.createElement("div");
        miniframe.classList.add("miniframe");

        // 경험 주최 기관 생성
        const experienceOrganizer = document.createElement("p");
        experienceOrganizer.classList.add("content-2");
        experienceOrganizer.textContent = experience.organizer || "한국융합인재교육협회";
        miniframe.appendChild(experienceOrganizer);

        // 경험 기간 생성
        const experienceDate = document.createElement("p");
        experienceDate.classList.add("content-2");
        const startYear = experience.from_date || "2020-10-10";
        const endYear = experience.to_date || "2021-10-12";
        experienceDate.textContent = `${startYear} - ${endYear}`;
        miniframe.appendChild(experienceDate);

        // 각 항목을 experienceContainer에 추가
        contentFrame.appendChild(miniframe);
        experienceContainer.appendChild(contentFrame);
    });

    
    portfolioContainer.appendChild(experienceContainer);
}

// academicActivities 섹션 생성
function createAcaActSection(data) {
    // 만약 data.academicActivities가 비어 있으면 함수를 종료
    if (!data.academicActivities || data.academicActivities.length === 0) return;

    const acaActContainer = document.createElement("div");
    acaActContainer.classList.add("content-container");
    acaActContainer.setAttribute("name", "acaAct");

    const title = document.createElement("h2");
    title.classList.add("content-head");
    title.textContent = "/ Academic Activities /";
    acaActContainer.appendChild(title);

    // 각 활동 항목을 처리
    data.academicActivities.forEach((activity) => {
        const contentFrame = document.createElement("div");
        contentFrame.classList.add("content-frame");

        // Bullet Point 생성
        const bulletPoint = document.createElement("p");
        bulletPoint.classList.add("content-0");
        bulletPoint.textContent = "•";
        contentFrame.appendChild(bulletPoint);

        // 활동 제목 생성
        const activityTitle = document.createElement("p");
        activityTitle.classList.add("content-1");
        activityTitle.textContent = activity.activity_name || "학술 활동 프로그램";
        contentFrame.appendChild(activityTitle);

        // 활동 제목 생성
        const conference= document.createElement("p");
        conference.classList.add("content-1");
        conference.textContent =  activity.conference_name || "컨퍼런스 이름";
        contentFrame.appendChild(conference);


        // 날짜 및 주최 기관 정보 생성
        const miniframe = document.createElement("div");
        miniframe.classList.add("miniframe");

        // 활동 주최 기관 생성
        const activityOrganizer = document.createElement("p");
        activityOrganizer.classList.add("content-2");
        activityOrganizer.textContent = activity.academic_insititution|| "미정의 기관";
        miniframe.appendChild(activityOrganizer);

        // 활동 기간 생성
        const activityDate = document.createElement("p");
        activityDate.classList.add("content-2");
        const startYear = activity.from_date || "2020-10";
        activityDate.textContent = `${startYear} `;
        miniframe.appendChild(activityDate);

        // 각 항목을 acaActContainer에 추가
        contentFrame.appendChild(miniframe);
        acaActContainer.appendChild(contentFrame);
    });

    portfolioContainer.appendChild(acaActContainer);
}





    function createWorkExperienceSection(data) {
        if (!data.workExps || data.workExps.length === 0) return;

        const workExperienceContainer = document.createElement("div");
        workExperienceContainer.classList.add("content-container");
        workExperienceContainer.setAttribute("name", "workExperience");
    
        const title = document.createElement("h2");
        title.classList.add("content-head");
        title.textContent = "/ Work Experience /";
        workExperienceContainer.appendChild(title);
    
        data.workExps.forEach((workExp, index) => {
            const contentFrame = document.createElement("div");
            contentFrame.classList.add("content-frame");
        
            // Bullet Point 생성
            const bulletPoint = document.createElement("p");
            bulletPoint.classList.add("content-0");
            bulletPoint.textContent = "•";
            contentFrame.appendChild(bulletPoint);

             // 마지막 항목이 아니면 timeline 추가
    if (index !== data.workExps.length - 1) {
        const timeline = document.createElement("div");
        timeline.classList.add("timeline");
        contentFrame.appendChild(timeline);
    }
            // 회사명
            const companyName = document.createElement("p");
            companyName.classList.add("content-1");
            companyName.textContent = workExp.company_name || "Unknown Company";
            contentFrame.appendChild(companyName);
        
            // 직책
            const jobTitle = document.createElement("p");
            jobTitle.classList.add("content-1");
            jobTitle.textContent = workExp.job_title || "Unknown Job Title";
            contentFrame.appendChild(jobTitle);
        
            // 업무 내용
            const responsibilities = document.createElement("p");
            responsibilities.classList.add("content-1");
            responsibilities.textContent = workExp.responsibilities || "No responsibilities listed.";
            contentFrame.appendChild(responsibilities);
        
            // 날짜 정보는 miniframe에 넣기
            const miniframe = document.createElement("div");
            miniframe.classList.add("miniframe");
        
            // 기간 (시작일 - 종료일)
            const workPeriod = document.createElement("p");
            workPeriod.classList.add("content-4");
            workPeriod.textContent = `${workExp.from_date || "Start Date"} - ${workExp.to_now === "1" ? "재직중" : workExp.to_date || "End Date"}`;
            miniframe.appendChild(workPeriod);
        
            // miniframe을 contentFrame에 추가
            contentFrame.appendChild(miniframe);
        
            // 최종적으로 workExperienceContainer에 contentFrame을 추가
            workExperienceContainer.appendChild(contentFrame);
        });
        
    
        portfolioContainer.appendChild(workExperienceContainer);
    }
    
    // Skills 섹션 생성
    function createSkillsSection(data) {
        // 만약 data.skills.name이 비어 있으면 함수를 종료
        if (!data.skills || !data.skills.name || data.skills.name.length === 0) return;

        const skillsContainer = document.createElement("div");
        skillsContainer.classList.add("content-container");
        skillsContainer.setAttribute("name", "skill");

        const title = document.createElement("h2");
        title.classList.add("content-head");
        title.textContent = "/ Skills /";
        skillsContainer.appendChild(title);

        data.skills.name.forEach((name, index) => {
            const contentFrame = document.createElement("div");
            contentFrame.classList.add("content-frame");

            const skillContainer = document.createElement("div");
            skillContainer.classList.add("skill-container");

            const levelImg = document.createElement("img");
            levelImg.classList.add("svg");
            levelImg.setAttribute("src", data.skills.level[index] ? `img/${data.skills.level[index]}.png` : "img/level_2.png");
            skillContainer.appendChild(levelImg);

            const skillImg = document.createElement("img");
            skillImg.classList.add("skill-img");
            skillImg.setAttribute("src", name ? `img/${name}.png` : "img/java.png");
            skillContainer.appendChild(skillImg);

            const skillText = document.createElement("p");
            skillText.classList.add("skill-txt");
            skillText.textContent = data.skills.introduce[index] || "기술에 대한 설명이 없습니다.";
            skillContainer.appendChild(skillText);

            contentFrame.appendChild(skillContainer);
            skillsContainer.appendChild(contentFrame);
        });

        portfolioContainer.appendChild(skillsContainer);
    }

    // 호출
    createIntroSection(allData);
    createEducationSection(allData);
    createLicenseSection(allData);
    createAwardsSection(allData);
    createExperienceSection(allData);
    createAcaActSection(allData);
    createWorkExperienceSection(allData);
    createSkillsSection(allData);
});
