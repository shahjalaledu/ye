(function () {
  const articleSelector = '#article-content';
  const ttsPlayerEl     = document.getElementById('tts-player');
  if (!ttsPlayerEl) return;

  const statusEl = document.getElementById('tts-status');
  const chunksEl = document.getElementById('tts-chunks');
  const playBtn  = document.getElementById('tts-play');
  const pauseBtn = document.getElementById('tts-pause');
  const stopBtn  = document.getElementById('tts-stop');
  const prevBtn  = document.getElementById('tts-prev');
  const nextBtn  = document.getElementById('tts-next');
  const rateSel  = document.getElementById('tts-rate');

  if (!('speechSynthesis' in window)) {
    statusEl.textContent = 'এই ব্রাউজারে টেক্সট টু স্প���চ সাপোর্ট নেই।';
    [playBtn, pauseBtn, stopBtn, prevBtn, nextBtn, rateSel].forEach(btn => {
      if (btn) btn.disabled = true;
    });
    return;
  }

  const synth = window.speechSynthesis;
  let utterance = null;
  let chunks = [];
  let currentIndex = 0;
  let isPaused = false;

  function extractChunks() {
    const container = document.querySelector(articleSelector);
    if (!container) return [];

    const textNodes = [];
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) {
            return NodeFilter.FILTER_REJECT;
          }
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (['script', 'style', 'noscript'].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode.nodeValue.trim());
    }

    const fullText = textNodes.join(' ').replace(/\s+/g, ' ').trim();
    if (!fullText) return [];

    const rawParts = fullText.split(/([.!?।]+)\s+/);
    const sentences = [];
    for (let i = 0; i < rawParts.length; i += 2) {
      const part = rawParts[i] ? rawParts[i].trim() : '';
      const punct = rawParts[i + 1] ? rawParts[i + 1].trim() : '';
      const sentence = (part + ' ' + punct).trim();
      if (sentence) sentences.push(sentence);
    }
    return sentences;
  }

  function renderChunks() {
    chunksEl.innerHTML = '';
    chunks.forEach((sentence, idx) => {
      const div = document.createElement('div');
      div.className = 'tts-chunk';
      div.dataset.index = idx;
      div.textContent = sentence;
      chunksEl.appendChild(div);
    });
  }

  function updateStatus(text) {
    if (statusEl) statusEl.textContent = text;
  }

  function highlightChunk(index) {
    const items = chunksEl.querySelectorAll('.tts-chunk');
    items.forEach(el => el.classList.remove('active'));
    const active = chunksEl.querySelector(`.tts-chunk[data-index="${index}"]`);
    if (active) active.classList.add('active');
  }

  function speakFromIndex(index) {
    if (!chunks.length) {
      updateStatus('পড়ার মতো কোন লেখা পাওয়া যায়নি।');
      return;
    }
    if (index < 0 || index >= chunks.length) index = 0;
    currentIndex = index;

    if (synth.speaking || synth.paused) {
      synth.cancel();
    }

    const text = chunks[currentIndex];
    utterance = new SpeechSynthesisUtterance(text);

    // Bangla voice if available
    utterance.lang = 'bn-BD';

    const rate = parseFloat(rateSel.value || '1');
    utterance.rate = rate;
    utterance.pitch = 1.0;

    utterance.onstart = function () {
      isPaused = false;
      highlightChunk(currentIndex);
      updateStatus(
        'পড়া হচ্ছে বাক্য ' +
        (currentIndex + 1) +
        ' / ' +
        chunks.length +
        ' ...'
      );
    };

    utterance.onend = function () {
      if (!synth.speaking && !isPaused) {
        if (currentIndex < chunks.length - 1) {
          currentIndex++;
          speakFromIndex(currentIndex);
        } else {
          updateStatus('পুরো আর্টিকেল পড়া শেষ।');
        }
      }
    };

    utterance.onerror = function (e) {
      console.error('TTS error:', e.error);
      updateStatus('টেক্সট টু স্পিচ চলাকালীন একটি সমস্যা হয়েছে।');
    };

    synth.speak(utterance);
  }

  playBtn.addEventListener('click', function () {
    if (synth.paused && isPaused) {
      synth.resume();
      isPaused = false;
      updateStatus('পুনরায় পড়া শুরু হয়েছে।');
      return;
    }
    speakFromIndex(currentIndex);
  });

  pauseBtn.addEventListener('click', function () {
    if (synth.speaking && !synth.paused) {
      synth.pause();
      isPaused = true;
      updateStatus('পজ করা হয়েছে।');
    } else if (synth.paused) {
      synth.resume();
      isPaused = false;
      updateStatus('পুনরায় পড়া শুরু হয়েছে।');
    }
  });

  stopBtn.addEventListener('click', function () {
    if (synth.speaking || synth.paused) {
      synth.cancel();
      isPaused = false;
      updateStatus('স্টপ করা হয়েছে।');
    }
  });

  prevBtn.addEventListener('click', function () {
    if (!chunks.length) return;
    currentIndex = Math.max(0, currentIndex - 1);
    speakFromIndex(currentIndex);
  });

  nextBtn.addEventListener('click', function () {
    if (!chunks.length) return;
    currentIndex = Math.min(chunks.length - 1, currentIndex + 1);
    speakFromIndex(currentIndex);
  });

  rateSel.addEventListener('change', function () {
    if (synth.speaking) {
      synth.cancel();
      speakFromIndex(currentIndex);
    }
  });

  chunksEl.addEventListener('click', function (e) {
    const target = e.target.closest('.tts-chunk');
    if (!target) return;
    const index = parseInt(target.dataset.index, 10);
    if (isNaN(index)) return;
    currentIndex = index;
    speakFromIndex(currentIndex);
  });

  chunks = extractChunks();
  if (!chunks.length) {
    updateStatus('পড়ার মতো কোন লেখা পাওয়া যায়নি।');
  } else {
    renderChunks();
    updateStatus('প্রস্তুত। মোট ' + chunks.length + 'টি বাক্য পাওয়া গেছে।');
  }
})();
