let ownerEmail = document.getElementById("emailBox").value;
let resumeAddButton = document.getElementById("resumeAddButton");
let resumeUpdateButton = document.getElementById("resumeUpdateButton");
let callbackToUpdate = (ev)=> {
                           alert('이력서를 등록합니다.');
                           fetch("/api/resume", {
                               method: 'POST',
                               headers: {
                                   "Content-Type" : "application/json"
                               },
                               body: JSON.stringify({ email: `${ownerEmail}`})
                           }).then(() => {
                               location = `/resume-update?email=${ownerEmail}`
                           })};
if(resumeAddButton != null) {
    resumeAddButton.addEventListener("click", callbackToUpdate);
}
if(resumeUpdateButton != null) {
 resumeUpdateButton.addEventListener("click", (ev) => {
    alert("이력서를 수정합니다.");
    location=`/resume-update?email=${ownerEmail}`;
});
};