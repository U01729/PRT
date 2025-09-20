// بيانات البارتات - يتم تعديلها حسب الحاجة
const partsData = [
    {
        id: 'part1',
        name: 'الجزء الأول',
        size: '0.5 GB', // تم التعديل إلى GB
        url: 'https://example.com/file1.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part2',
        name: 'الجزء الثاني',
        size: '0.45 GB', // تم التعديل إلى GB
        url: 'https://example.com/file2.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part3',
        name: 'الجزء الثالث',
        size: '0.38 GB', // تم التعديل إلى GB
        url: 'https://example.com/file3.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part4',
        name: 'الجزء الرابع',
        size: '0.42 GB', // تم التعديل إلى GB
        url: 'https://example.com/file4.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part5',
        name: 'الجزء الخامس',
        size: '0.35 GB', // تم التعديل إلى GB
        url: 'https://example.com/file5.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part6',
        name: 'الجزء السادس',
        size: '0.48 GB', // تم التعديل إلى GB
        url: 'https://example.com/file6.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part7',
        name: 'الجزء السابع',
        size: '0.39 GB', // تم التعديل إلى GB
        url: 'https://example.com/file7.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part8',
        name: 'الجزء الثامن',
        size: '0.46 GB', // تم التعديل إلى GB
        url: 'https://example.com/file8.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part9',
        name: 'الجزء التاسع',
        size: '0.37 GB', // تم التعديل إلى GB
        url: 'https://example.com/file9.zip' // استبدل برابط التحميل الفعلي
    },
    {
        id: 'part10',
        name: 'الجزء العاشر',
        size: '0.44 GB', // تم التعديل إلى GB
        url: 'https://example.com/file10.zip' // استبدل برابط التحميل الفعلي
    }
    // يمكن إضافة أي عدد من البارتات هنا
];

class PartsDownloader {
    constructor() {
        console.log('PartsDownloader constructor called.');
        this.partsContainer = document.getElementById('partsContainer');
        this.completedSpan = document.getElementById('completed');
        this.totalSpan = document.getElementById('total');
        this.percentageSpan = document.getElementById('percentage');
        this.progressFill = document.getElementById('progressFill');
        this.fullFileNameDisplay = document.getElementById('fullFileName');
        this.totalFileSizeDisplay = document.getElementById('totalFileSize');
        this.resetButton = null; 
        
        this.init();
    }
    
    init() {
        console.log('init method called.');
        this.resetButton = document.getElementById('resetAllBtn'); 
        this.renderParts();
        this.updateProgress();
        this.displayFileInfo();
        this.setupEventListeners();
    }
    
    renderParts() {
        console.log('renderParts method called.');
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
        
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
        
        card.classList.add('downloaded', 'just-downloaded');
        btn.innerHTML = '✅';
        statusText.textContent = 'تم التحميل';
        
        localStorage.setItem(partId, 'downloaded');
        
        this.updateProgress();
        
        window.open(url, '_blank');
        
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

    displayFileInfo() {
        this.fullFileNameDisplay.textContent = 'Ghost of Tsushima Full Game.zip'; // اسم ملف افتراضي
        
        let totalSizeGB = 0;
        partsData.forEach(part => {
            // التأكد من أن الحجم بصيغة 'X.XX GB' واستخراج القيمة الرقمية
            const sizeValue = parseFloat(part.size.replace(' GB', ''));
            if (!isNaN(sizeValue)) {
                totalSizeGB += sizeValue;
            }
        });

        this.totalFileSizeDisplay.textContent = `${totalSizeGB.toFixed(2)} GB`;
    }

    setupEventListeners() {
        console.log('setupEventListeners called.');
        if (this.resetButton) {
            console.log('Reset button found. Adding event listener.');
            this.resetButton.addEventListener('click', () => this.resetAllParts());
        } else {
            console.log('Reset button not found in setupEventListeners.');
        }
    }

    resetAllParts() {
        console.log('resetAllParts called.');
        if (confirm('هل أنت متأكد أنك تريد إعادة تعيين حالة جميع البارتات؟')) {
            console.log('Confirmation received. Resetting parts.');
            partsData.forEach(part => {
                localStorage.removeItem(part.id);
            });
            this.renderParts();
            this.updateProgress();
            alert('تمت إعادة تعيين جميع البارتات بنجاح!');
        } else {
            console.log('Reset cancelled by user.');
        }
    }
}

// تشغيل التطبيق
let partsDownloader;
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired. Initializing PartsDownloader.');
    partsDownloader = new PartsDownloader();
});


