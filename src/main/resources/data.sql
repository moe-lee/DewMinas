-- 테스트용 user
INSERT INTO USERS(name_kor, name_eng, phone_number, email, nickname, password) values('이원준', 'LEE WONJUN','01034422631', 'mail@gmail.com', 'moeLee', '1234');

-- 테스트용 resume
--INSERT INTO RESUMES(owner_id, desired_position, created_at, updated_at) values (1, 'Back-end engineer', NOW(), NOW());

-- 스킬 아이콘 정보 입력
insert  into skill_book(skill_name, img_url) values('AWS', 'static/img/icon_AWS.png');
insert  into skill_book(skill_name, img_url) values('c', 'static/img/icon_c.png');
insert  into skill_book(skill_name, img_url) values('github', 'static/img/icon_github.png');
insert  into skill_book(skill_name, img_url) values('html', 'static/img/icon_html.png');
insert  into skill_book(skill_name, img_url) values('java', 'static/img/icon_java.png');
insert  into skill_book(skill_name, img_url) values('js', 'static/img/icon_js.png');
insert  into skill_book(skill_name, img_url) values('mysql', 'static/img/icon_mysql.png');
insert  into skill_book(skill_name, img_url) values('oracle', 'static/img/icon_oracle.png');
insert  into skill_book(skill_name, img_url) values('python', 'static/img/icon_python.png');
insert  into skill_book(skill_name, img_url) values('springboot', 'static/img/icon_springboot.png');
insert  into skill_book(skill_name, img_url) values('tensorflow', 'static/img/icon_tensorflow.png');
insert  into skill_book(skill_name, img_url) values('ubuntu', 'static/img/icon_ubuntu.png');
