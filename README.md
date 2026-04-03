BULUT TABANLI KİŞİSEL KÜTÜPHANE UYGULAMASI

Bu proje, kullanıcıların kitaplarını ekleyebildiği, listeleyebildiği, güncelleyebildiği ve silebildiği full-stack bir web uygulamasıdır. Proje, bulut bilişim dersine yönelik olarak geliştirilmiş olup, frontend ve backend ayrı servisler olarak dağıtılmıştır.

Bu projenin amacı:
RESTful API geliştirme sürecini öğrenmek,
Frontend–backend entegrasyonunu gerçekleştirmek,
Uygulamayı bulut ortamına deploy etmek,
AWS servislerini kullanarak gerçek bir sistem kurmaktır.

Kullanılan teknolojiler:

Backend:
Python, FastAPI,SQLAlchemy,SQLite, Uvicorn
Frontend:
React, JavaScript, CSS
Cloud ve Deployment:
AWS EC2 (Backend), AWS S3 (Frontend hosting), GitHub

Kurulum:

Backend çalıştırma:
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload
Backend adresi: http://127.0.0.1:8000
Swagger dökümantasyonu: http://127.0.0.1:8000/docs

Frontend çalıştırma:
cd frontend
npm install
npm run dev
Frontend adresi: http://localhost:5173

Deployment:

Backend (AWS EC2):
Ubuntu server kuruldu,
Proje GitHub üzerinden çekildi,
Virtual environment oluşturuldu,
FastAPI uvicorn ile çalıştırıldı,
systemd service ile sürekli çalışır hale getirildi,
Backend URL: http://51.21.182.182:8000

Frontend (AWS S3):
React projesi build alındı: npm run build
Build klasörü S3 bucket’a yüklendi,
Static website hosting aktif edildi
Frontend URL: http://gozde-bulut-kutuphane-frontend-2026.s3-website.eu-north-1.amazonaws.com

CORS Yapılandırması:
Frontend ve backend farklı domainlerde çalıştığı için CORS ayarları yapılmıştır.
Özellikle S3 frontend için backend’de yandaki origin eklenmiştir: "http://gozde-bulut-kutuphane-frontend-2026.s3-website.eu-north-1.amazonaws.com"
