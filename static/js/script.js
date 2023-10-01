function previewImg1(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('preview1').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById('preview1').src = "";
  }
}

function previewImg2(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('preview2').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById('preview2').src = "";
  }
}

function call_confirm1(){
	if(confirm("이미지 업로드 방식 선택")){
		alert("웹캡 실행");
	}else{
        var input = document.createElement("input");
        input.type = "file";
        input.accept = "image/jpeg"; // 이미지 확장자를 jpeg로 설정

        input.style.display = "none";
        input.addEventListener("change", function () {
            var selectedFile = input.files[0];
            if (selectedFile) {
                previewImg1(input)
            }
        });

        // input 엘리먼트를 현재 문서에 추가
        document.body.appendChild(input);

        // input 엘리먼트를 클릭하여 이미지 선택 창을 열도록 함
        input.click();
	}
}

function call_confirm2(){
	if(confirm("이미지 업로드 방식 선택")){
		alert("웹캡 실행");
	}else{
        var input = document.createElement("input");
        input.type = "file";
        input.accept = "image/jpeg"; // 이미지 확장자를 jpeg로 설정

        input.style.display = "none";
        input.addEventListener("change", function () {
            var selectedFile = input.files[0];
            if (selectedFile) {
                previewImg2(input)
            }
        });
        input.click();
	}
}