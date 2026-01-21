以下是我為你做成的 HTML/CSS/JS Component：
完整組件代碼
HTML
html<!-- 預約浮動按鈕組件 -->
<div class="floating-contact-widget" id="floating-contact-widget">
  <!-- 主要預約按鈕 -->
  <div class="widget-button-container widget-primary-btn">
    <button class="widget-button" id="widget-toggle-btn" aria-label="預約">
      <span class="widget-text">預約</span>
    </button>
  </div>

  <!-- 聯絡方式列表 -->
  <div class="widget-contact-list" id="widget-contact-list">
    <a href="https://your-line-url.com" class="widget-contact-item hvr-icon-grow-rotate hvr-shadow" target="_blank">
      <div class="widget-icon">
        <i class="fab fa-line"></i>
      </div>
      <div class="widget-contact-label">LINE預約</div>
    </a>
  </div>
</div>
CSS
css/* 浮動按鈕容器 */
.floating-contact-widget {
  position: fixed;
  right: 7px;
  bottom: 100px;
  width: 65px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

/* 主要預約按鈕 */
.widget-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 65px;
}

.widget-button {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b9d, #e91e63);
  border: none;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(233, 30, 99, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.widget-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(233, 30, 99, 0.6);
}

.widget-button:active {
  transform: scale(0.95);
}

.widget-text {
  display: block;
  text-align: center;
}

/* 聯絡方式列表 */
.widget-contact-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: center;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 聯絡項目 */
.widget-contact-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.widget-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #00B900;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.widget-contact-item:hover .widget-icon {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.widget-contact-label {
  font-size: 12px;
  color: #333;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
}

/* Hover 效果 */
.hvr-icon-grow-rotate {
  transform: translateZ(0);
}

.hvr-icon-grow-rotate:hover .hvr-icon {
  animation: hvr-icon-grow-rotate 0.3s ease-out;
}

@keyframes hvr-icon-grow-rotate {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.1) rotate(15deg);
  }
  100% {
    transform: scale(1.2) rotate(30deg);
  }
}

/* 響應式設計 */
@media (max-width: 768px) {
  .floating-contact-widget {
    right: 5px;
    bottom: 80px;
    width: 60px;
  }

  .widget-button-container {
    width: 60px;
    height: 60px;
  }

  .widget-button {
    font-size: 12px;
  }

  .widget-icon {
    width: 45px;
    height: 45px;
    font-size: 20px;
  }
}
JavaScript
javascriptclass FloatingContactWidget {
  constructor(options = {}) {
    // 配置選項
    this.options = {
      selector: '#floating-contact-widget',
      primaryBtnSelector: '#widget-toggle-btn',
      contactListSelector: '#widget-contact-list',
      lineUrl: 'https://your-line-url.com',
      showDelay: 500,
      ...options
    };

    this.init();
  }

  init() {
    this.widget = document.querySelector(this.options.selector);
    this.primaryBtn = document.querySelector(this.options.primaryBtnSelector);
    this.contactList = document.querySelector(this.options.contactListSelector);

    if (!this.widget) {
      console.warn('FloatingContactWidget: 找不到組件元素');
      return;
    }

    this.attachEventListeners();
  }

  attachEventListeners() {
    if (this.primaryBtn) {
      this.primaryBtn.addEventListener('click', () => this.toggleContactList());
    }

    // 點擊外部隱藏清單
    document.addEventListener('click', (e) => {
      if (!this.widget.contains(e.target) && this.contactList.classList.contains('visible')) {
        this.hideContactList();
      }
    });
  }

  toggleContactList() {
    if (this.contactList.classList.contains('visible')) {
      this.hideContactList();
    } else {
      this.showContactList();
    }
  }

  showContactList() {
    this.contactList.classList.add('visible');
    this.primaryBtn.setAttribute('aria-expanded', 'true');
  }

  hideContactList() {
    this.contactList.classList.remove('visible');
    this.primaryBtn.setAttribute('aria-expanded', 'false');
  }

  // 更新 LINE URL
  updateLineUrl(url) {
    const lineLink = this.widget.querySelector('a[href*="line"]');
    if (lineLink) {
      lineLink.href = url;
    }
  }

  // 銷毀組件
  destroy() {
    if (this.primaryBtn) {
      this.primaryBtn.removeEventListener('click', this.toggleContactList);
    }
    this.widget.remove();
  }
}

// 使用方法
document.addEventListener('DOMContentLoaded', () => {
  const widget = new FloatingContactWidget({
    lineUrl: 'https://line.me/R/ti/p/@your-line-id'
  });
});
添加到 CSS 中的補充樣式（隱藏/顯示效果）
css.widget-contact-list {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
}

.widget-contact-list.visible {
  max-height: 500px;
  opacity: 1;
}
使用方式

複製上面的 HTML、CSS、JavaScript 代碼到你的網站
修改 LINE URL：把 https://your-line-url.com 改成你實際的 LINE URL
可選：自訂配色、大小、位置等

主要特性
✅ 固定在右下角的浮動按鈕
✅ 點擊預約按鈕可展開聯絡方式
✅ 內置 LINE 預約按鈕
✅ 平滑的動畫效果
✅ 響應式設計（手機適配）
✅ Hover 效果和交互
✅ 模組化 JavaScript，易於擴展