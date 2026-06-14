const express = require('express');
const youtubedl = require('youtube-dl-exec');
const path = require('path');

const app = express();
const PORT = 3000;

const FORMAT = 'bestvideo[vcodec^=avc1]+bestaudio[ext=m4a]/best[vcodec^=avc1]/bestvideo+bestaudio/best';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/info', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'Link gerekli.' });
    }

    const info = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificates: true,
      preferFreeFormats: true,
      format: FORMAT
    });

    res.json({
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      author: info.uploader
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Video bilgisi alınamadı.' });
  }
});

app.get('/api/download', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'Link gerekli.' });
    }

    const info = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      format: FORMAT
    });

    const title = (info.title || 'video').replace(/[^\w\s-]/g, '').trim();

    res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
    res.header('Content-Type', 'video/mp4');

    const subprocess = youtubedl.exec(url, {
      output: '-',
      format: FORMAT,
      mergeOutputFormat: 'mp4'
    });

    subprocess.stdout.pipe(res);

    subprocess.stderr.on('data', (data) => {
      console.error(`yt-dlp stderr: ${data}`);
    });

    subprocess.on('error', (err) => {
      console.error('Subprocess hatası:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'İndirme sırasında hata oluştu.' });
      }
    });

    res.on('close', () => {
      subprocess.kill();
    });
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Sunucu hatası.' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
