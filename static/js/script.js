function previewImg1(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
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
        reader.onload = function (e) {
            document.getElementById('preview2').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        document.getElementById('preview2').src = "";
    }
}

function takeWebcam1() {
    if (confirm("촬영하시려면 확인 버튼 클릭")) {
        captureImage1();
    } else {
        var input = document.getElementsByName("image1");
        // var input = document.createElement("input");
        // input.type = "file";
        // input.accept = "image/jpeg"; // 이미지 확장자를 jpeg로 설정
        //
        // input.style.display = "none";
        input.addEventListener("change", function () {
            var selectedFile = input.files[0];
            if (selectedFile) {
                previewImg1(input)
            }
        });
        input.click();
    }
}

function takeWebcam2() {
    if (confirm("촬영하시려면 확인 버튼 클릭")) {
        captureImage2();
    } else {
        var input = document.getElementsByName("image2");
        // var input = document.createElement("input");
        // input.type = "file";
        // input.accept = "image/jpeg"; // 이미지 확장자를 jpeg로 설정
        //
        // input.style.display = "none";
        input.addEventListener("change", function () {
            var selectedFile = input.files[0];
            if (selectedFile) {
                previewImg2(input)
            }
        });
        input.click();
    }
}

// 웹캠으로 사진 촬영
function captureImage1() {
    navigator.mediaDevices.getUserMedia({video: true})
        .then(function (stream) {
            const video = document.createElement('video');
            document.body.appendChild(video);
            video.srcObject = stream;
            video.play();

            video.addEventListener('canplay', function () {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

                const img = document.getElementById('preview1');
                img.src = canvas.toDataURL('image/png', 0.8); // 이미지 포맷 및 품질 조절

                // 웹캠 스트림 종료
                stream.getTracks().forEach(track => track.stop());

                // 촬영 완료 메시지 표시
                alert('촬영 완료 XD');
            });
        })
        .catch(function (error) {
            console.error('웹캠에 액세스할 수 없습니다:', error);
        });
}

function captureImage2() {
    navigator.mediaDevices.getUserMedia({video: true})
        .then(function (stream) {
            const video = document.createElement('video');
            document.body.appendChild(video);
            video.srcObject = stream;
            video.play();

            video.addEventListener('canplay', function () {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

                const img = document.getElementById('preview2');
                img.src = canvas.toDataURL('image/png', 0.8); // 이미지 포맷 및 품질 조절

                // 웹캠 스트림 종료
                stream.getTracks().forEach(track => track.stop());

                // 촬영 완료 메시지 표시
                alert('촬영 완료 XD');
            });
        })
        .catch(function (error) {
            console.error('웹캠에 액세스할 수 없습니다:', error);
        });
}

// 이미지 업로드 처리
document.getElementById('preview2').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const img = document.getElementById('preview2');
        const reader = new FileReader();

        reader.onload = function (e) {
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
});
