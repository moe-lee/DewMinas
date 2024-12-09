let ownerEmail = document.getElementById("emailBox").value;
let resumeAddButton = document.getElementById("resumeAddButton");
let resumeUpdateButton = document.getElementById("resumeUpdateButton");
localStorage.setItem("ownerEmail", ownerEmail);
let callbackToUpdate = (ev)=> {
    ev.stopPropagation();

    alert('이력서를 등록합니다.');
    fetch("/api/resume", {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({ email: `${ownerEmail}`})
        }).then(() => {
            location = `/resume-update?email=${ownerEmail}`
        }
    )
};
if(resumeAddButton != null) {
    resumeAddButton.addEventListener("click", callbackToUpdate);
}
if(resumeUpdateButton != null) {
    resumeUpdateButton.addEventListener("click", (ev) => {
        alert("이력서를 수정합니다.");
        location=`/resume-update?email=${ownerEmail}`;
    });
};

document.getElementById("resumeBox").addEventListener("click", (ev) => {
    location = `/resume?email=${ownerEmail}`;
});

document.getElementById("resumeDeleteButton").addEventListener("click", (ev) => {
    ev.stopPropagation();
    const userResponse = confirm('정말로 이력서를 삭제하시겠습니까?');
    if(!userResponse) return;
    fetch(`/api/resume?email=${ownerEmail}`, {
        method :'DELETE'
    }).then((ev) => {
        location = `/profile?email=${ownerEmail}`;
    });
});