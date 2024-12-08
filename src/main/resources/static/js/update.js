

document.addEventListener('DOMContentLoaded', function() {
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