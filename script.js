// بيانات البارتات - يتم تعديلها حسب الحاجة
const partsData = [
    {
        id: 'part1',
        name: 'الجزء الأول',
        size: '500 MB',
        url: 'https://example.com/file1.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part2',
        name: 'الجزء الثاني',
        size: '450 MB',
        url: 'https://example.com/file2.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part3',
        name: 'الجزء الثالث',
        size: '380 MB',
        url: 'https://example.com/file3.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part4',
        name: 'الجزء الرابع',
        size: '420 MB',
        url: 'https://example.com/file4.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part5',
        name: 'الجزء الخامس',
        size: '350 MB',
        url: 'https://example.com/file5.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part6',
        name: 'الجزء السادس',
        size: '480 MB',
        url: 'https://example.com/file6.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part7',
        name: 'الجزء السابع',
        size: '390 MB',
        url: 'https://example.com/file7.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part8',
        name: 'الجزء الثامن',
        size: '460 MB',
        url: 'https://example.com/file8.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part9',
        name: 'الجزء التاسع',
        size: '370 MB',
        url: 'https://example.com/file9.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part10',
        name: 'الجزء العاشر',
        size: '440 MB',
        url: 'https://example.com/file10.zip' // استبدل برابط التحميل الفعلي
    }
    // يمكن إضافة أي عدد من البارتات هنا
];

class PartsDownloader {
    constructor() {
        this.partsContainer = document.getElementById('partsContainer');
        this.completedSpan = document.getElementById('completed');
        this.totalSpan = document.getElementById('total');
        this.percentageSpan = document.getElementById('percentage');
        this.progressFill = document.getElementById('progressFill');
        this.resetButton = document.getElementById('resetAllBtn');
        
        this.init();
    }
    
    init() {
        this.renderParts();
        this.updateProgress();
        this.setupEventListeners();
    }
    
    renderParts() {
        this.partsContainer.innerHTML = '';
        
        partsData.forEach((part, index) => {
            const partCard = this.createPartCard(part, index + 1);
            this.partsContainer.appendChild(partCard);
        });
        
        this.totalSpan.textContent = partsData.length;
    }
    
    createPartCard(part, number) {
        const card = document.createElement('div');
        card.className = 'part-card';
        card.dataset.partId = part.id;
        
        const isDownloaded = localStorage.getItem(part.id) === 'downloaded';
        if (isDownloaded) {
            card.classList.add('downloaded');
        }
        
        card.innerHTML = `
            <div class="part-header">
                <div class="part-number">${number.toString().padStart(2, '0')}</div>
                <div class="part-info">
                    <h3>${part.name}</h3>
                    <div class="part-size">${part.size}</div>
                </div>
            </div>
            
            <div class="download-section">
                <button class="download-btn" onclick="partsDownloader.downloadPart('${part.url}', '${part.id}')">
                    ${isDownloaded ? '✅' : '⬇️'}
                </button>
                <div class="status-text">
                    ${isDownloaded ? 'تم التحميل' : 'جاهز للتحميل'}
                </div>
            </div>
        `;
        
        return card;
    }
    
    downloadPart(url, partId) {
        const card = document.querySelector(`[data-part-id="${partId}"]`);
        const btn = card.querySelector('.download-btn');
        const statusText = card.querySelector('.status-text');
        
        // تأثير النقر
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
        
        // تغيير الحالة
        card.classList.add('downloaded', 'just-downloaded');
        btn.innerHTML = '✅';
        statusText.textContent = 'تم التحميل';
        
        // حفظ الحالة
        localStorage.setItem(partId, 'downloaded');
        
        // تحديث التقدم
        this.updateProgress();
        
        // فتح الرابط
        window.open(url, '_blank');
        
        // إزالة تأثير الانيميشن
        setTimeout(() => {
            card.classList.remove('just-downloaded');
        }, 600);
    }
    
    updateProgress() {
        const completed = partsData.filter(part => 
            localStorage.getItem(part.id) === 'downloaded'
        ).length;
        
        const total = partsData.length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        this.completedSpan.textContent = completed;
        this.percentageSpan.textContent = `${percentage}%`;
        this.progressFill.style.width = `${percentage}%`;
    }

    setupEventListeners() {
        if (this.resetButton) {
            this.resetButton.addEventListener('click', () => this.resetAllParts());
        }
    }

    resetAllParts() {
        if (confirm('هل أنت متأكد أنك تريد إعادة تعيين حالة جميع البارتات؟')) {
            partsData.forEach(part => {
                localStorage.removeItem(part.id);
            });
            this.renderParts();
            this.updateProgress();
            alert('تمت إعادة تعيين جميع البارتات بنجاح!');
        }
    }
}

// تشغيل التطبيق
let partsDownloader;
window.addEventListener('DOMContentLoaded', () => {
    partsDownloader = new PartsDownloader();
});

