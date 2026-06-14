# Video İndirici

YouTube videolarını 1080p (mevcut en yüksek kalitede) indirmek için reklamsız, minimalist bir web uygulaması. Node.js (Express) backend ve tek sayfa (vanilla HTML/CSS/JS) frontend ile çalışır.

## Özellikler

- Koyu tema, mobil uyumlu arayüz
- YouTube linkini yapıştır, video bilgisini (başlık, kanal, kapak görseli, süre) getir
- Mevcut en yüksek kalitede (4K dahil, varsa) MP4 olarak indir
- Reklamsız, takip kodu yok

## Gereksinimler

- [Node.js](https://nodejs.org/) (v18 veya üzeri önerilir)
- [FFmpeg](https://ffmpeg.org/) (video ve ses akışlarını birleştirmek için)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) (video indirme motoru)

## Kurulum

### 1. Depoyu klonlayın

```bash
git clone https://github.com/afweb76/downloaderyou.git
cd downloaderyou
```

### 2. FFmpeg kurun

```bash
sudo apt update
sudo apt install ffmpeg -y
```

### 3. yt-dlp kurun (pipx ile önerilir)

```bash
sudo apt install pipx -y
pipx ensurepath
pipx install yt-dlp
```

Kurulumdan sonra terminali yeniden açın ve doğrulayın:

```bash
yt-dlp --version
```

### 4. Node.js bağımlılıklarını kurun

```bash
npm install
```

### 5. Sunucuyu başlatın

```bash
node server.js
```

Tarayıcıdan `http://localhost:3000` adresine gidin.

## Kullanım

1. YouTube video linkini girin
2. **Getir** butonuna basın, video bilgisi yüklensin
3. **İndir** butonuna basarak videoyu mevcut en yüksek kalitede indirin

## Telefondan erişim (aynı Wi-Fi üzerinden)

Bilgisayarınızın yerel IP adresini öğrenin:

```bash
hostname -I
```

`server.js` içindeki `app.listen` satırının `0.0.0.0` üzerinden dinlediğinden emin olun, ardından telefon tarayıcısından `http://BILGISAYAR_IP:3000` adresine gidin.

## Önemli Not

Bu proje kişisel ve eğitim amaçlıdır. YouTube'un Hizmet Şartları içerik indirmeyi genel olarak yasaklamaktadır. Telif hakkı kurallarına ve YouTube ToS'a uygun kullanım sorumluluğu kullanıcıya aittir.

## Sorun Giderme

**"Failed to find any playable formats" / format hataları:**
```bash
pipx upgrade yt-dlp
```

**"No supported JavaScript runtime" uyarısı:**
```bash
curl -fsSL https://deno.land/install.sh | sh
```
Terminali yeniden açın ve tekrar deneyin.

## Lisans

Kişisel kullanım için serbesttir.
