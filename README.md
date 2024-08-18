
# Çalışan Yönetim Sistemi

Bu proje, bir çalışan yönetim sistemi geliştirmeyi amaçlayan bir web uygulamasıdır. Uygulama, yöneticilerin ve çalışanların giriş yapmasını, çalışan bilgilerini görüntülemesini ve düzenlemesini sağlar. Adminler, çalışanların bilgilerinde değişiklik yapabilir ve sistem üzerinde tam yetkiye sahiptir.

## Özellikler

- **Çalışan Girişi**: Çalışanlar e-posta adresleri ve şifreleri ile giriş yapabilirler.
- **Admin Girişi**: Yöneticiler özel admin girişi ile sisteme erişim sağlarlar.
- **Profil Yönetimi**: Çalışanlar kendi profil bilgilerini görüntüleyebilir ve şifrelerini güncelleyebilirler.
- **Admin Yetkileri**: Adminler tüm kullanıcıları görüntüleyebilir, kullanıcı bilgilerini düzenleyebilir ve yönetebilirler.
- **Kullanıcı Bilgileri**: Adminler kullanıcıların isim, telefon numarası, adres ve diğer bilgilerini güncelleyebilirler.
- **Şifre Güvenliği**: Şifreler bcryptjs kullanılarak hashlenir ve güvenli bir şekilde saklanır.

## Kurulum

Bu projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/rmkofficial/employee-management
cd calisan-yonetim-sistemi
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın

Proje kök dizininde `.env.local` dosyası oluşturun ve aşağıdaki gibi ortam değişkenlerini tanımlayın:

```plaintext
MONGODB_URI=mongodb+srv://<kullaniciAdi>:<sifre>@cluster.mongodb.net/veritabani?retryWrites=true&w=majority
JWT_SECRET=sizinSuperGizliAnahtariniz
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 4. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin ve uygulamayı görüntüleyin.

## Kullanım

### Admin Girişi

Admin olarak giriş yapmak için:

1. **E-posta**: Admin olarak belirlenen e-posta adresini girin.
2. **Şifre**: Admin için hashlenmiş şifreyi kullanın.
3. Başarılı bir girişin ardından admin paneline yönlendirileceksiniz.

### Çalışan Girişi

Çalışanlar, e-posta ve şifrelerini kullanarak giriş yapabilir, profil bilgilerini görüntüleyebilir ve güncelleyebilir.

### Profil Yönetimi

Çalışanlar profil sayfalarında şifrelerini ve diğer profil bilgilerini güncelleyebilirler. Adminler ise çalışanların tüm bilgilerini güncelleyebilirler.

