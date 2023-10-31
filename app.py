from io import BytesIO

import qrcode
import logging
import os
from flask import Flask, render_template, request, redirect
from flask_cors import CORS
import base64



# 지정한 절대 경로
SECOND_IMAGE_NAME = "mom.png"
BASE_DIRECTORY = "C:\\Users\\User\\Desktop\\image_test"

FIRST_IMAGE_NAME = "dad.png"
# 이 경로에 이미지 파일 이름을 추가
FIRST_IMAGE_PATH = os.path.join(BASE_DIRECTORY, FIRST_IMAGE_NAME)
SECOND_IMAGE_PATH = os.path.join(BASE_DIRECTORY, SECOND_IMAGE_NAME)


app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
CORS(app)


def generate_qrcode(data):
    """
    QR코드를 생성하는 함수
    :param data: QR코드로 변환할 문자열
    :return: QR코드 이미지
    """
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill='black', back_color='white')
    return img


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/download_images', methods=['POST'])
def download_images():
    img_data1 = request.form.get('preview1').split(",")[1]  # 데이터 URL에서 base64 부분만 추출
    img_data2 = request.form.get('preview2').split(",")[1]  # 데이터 URL에서 base64 부분만 추출


    # 이미지 데이터를 디코딩하여 파일로 저장
    with open(FIRST_IMAGE_PATH, "wb") as f:
        f.write(base64.b64decode(img_data1))

    with open(SECOND_IMAGE_PATH, "wb") as f:
        f.write(base64.b64decode(img_data2))

    return "Images saved successfully"


# @app.route('/download_images', methods=['POST'])
# def download_images():
#     app.logger.info("tset log")
#     img1 = request.form.get('preview1')
#     img2 = request.form.get('preview2')
#     print(img1)

# @app.route('/test', methods=['POST'])
# def test():
#     app.logger.info('This is an info message')
#     img1 = request.form.get('preview1')
#     img2 = request.form.get('preview2')
#
#     app.logger.info("테스트 중 입니다")
#     # return render_template('result.html', result_image1=img1, result_image2=img2)


if __name__ == '__main__':
    app.run(debug=True, port=80)
