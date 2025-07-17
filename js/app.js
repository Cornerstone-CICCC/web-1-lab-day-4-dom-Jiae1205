document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const employeeList = document.getElementById("employeeList");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // input id와 동일하게 맞추기
    const firstName = document.getElementById("firstname").value.trim();
    const lastName = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const hireDate = document.getElementById("hire_date").value;
    const photoInput = form.querySelector('input[type="file"]');
    const file = photoInput.files[0];

    // 유효성 검사 - 이메일 직접 JS로 한번 더 검사 (HTML pattern도 있으니 중복)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@canada\.ca$/;
    if (!emailPattern.test(email)) {
      alert("Email must be a valid @canada.ca address.");
      return;
    }

    // 파일 선택 여부 및 images 폴더 검사
    if (!file) {
      alert("Please select a photo.");
      return;
    }

    // 실제 파일 이름은 file.name에 images/가 포함되지 않을 수 있음
    // 대신 사용자가 파일 선택 시 images 폴더를 열도록 안내해야 함
    // 여기서는 file.name 앞 경로가 포함 안되므로 정확한 검사 어려움
    // 대신 파일명에 "images" 포함 여부로 체크하거나, 아래처럼 경고 띄우기
    // if (!file.name.toLowerCase().startsWith("images")) {
    //   // 여기서 무조건 막으면 보통 안됨. 보통 파일명만 나옴. 그래서 참고용 안내
    //   alert("Please select a photo from the 'images' directory.");
    //   // 필요하면 return; // 주석 처리하면 경고만 띄움
    //   return;
    // }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // 사진 읽어서 테이블에 추가하기 위해 FileReader 사용
    const reader = new FileReader();
    reader.onload = function () {
      const row = document.createElement("tr");

      // Photo cell
      const photoCell = document.createElement("td");
      const img = document.createElement("img");
      img.src = reader.result;
      img.style.width = "50px";
      img.style.height = "50px";
      img.style.objectFit = "cover";
      photoCell.appendChild(img);
      row.appendChild(photoCell);

      // First Name
      const firstNameCell = document.createElement("td");
      firstNameCell.textContent = firstName;
      row.appendChild(firstNameCell);

      // Last Name
      const lastNameCell = document.createElement("td");
      lastNameCell.textContent = lastName;
      row.appendChild(lastNameCell);

      // Email
      const emailCell = document.createElement("td");
      emailCell.textContent = email;
      row.appendChild(emailCell);

      // Hire Date
      const hireDateCell = document.createElement("td");
      hireDateCell.textContent = hireDate;
      row.appendChild(hireDateCell);

      // Actions - Delete button
      const actionCell = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this employee?")) {
          row.remove();
        }
      });
      actionCell.appendChild(deleteBtn);
      row.appendChild(actionCell);

      employeeList.appendChild(row);

      form.reset();
    };

    reader.readAsDataURL(file);
  });
});
