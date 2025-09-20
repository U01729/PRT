// بيانات البارتات - يتم تعديلها حسب الحاجة
const partsData = [
    {
        id: 'part1',
        name: 'Part 1',
        size: '250 MB',
        url: 'https://example.com/file1.zip'
    },
    {
        id: 'part2', 
        name: 'Part 2',
        size: '250 MB',
        url: 'https://example.com/file2.zip'
    },
    {
        id: 'part3',
        name: 'Part 3', 
        size: '180 MB',
        url: 'https://example.com/file3.zip'
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
        
        this.init();
    }
    
    init() {
        console.log('init method called.');
        this.renderParts();
        this.updateProgress();
    }
    
    renderParts() {
        console.log('renderParts method called.');
        console.log('partsData:', partsData);
        this.partsContainer.innerHTML = '';
        
        partsData.forEach((part, index) => {
            console.log('Creating card for part:', part.name);
            const partCard = this.createPartCard(part, index + 1);
            this.partsContainer.appendChild(partCard);
        });
        
        this.totalSpan.textContent = partsData.length;
        console.log('Total parts:', partsData.length);
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
        console.log('downloadPart called for:', partId);
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
        console.log('updateProgress called.');
        const completed = partsData.filter(part => 
            localStorage.getItem(part.id) === 'downloaded'
        ).length;
        
        const total = partsData.length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        this.completedSpan.textContent = completed;
        this.percentageSpan.textContent = `${percentage}%`;
        this.progressFill.style.width = `${percentage}%`;
        console.log(`Progress: ${completed}/${total} (${percentage}%)`);
    }
}

// تشغيل التطبيق
let partsDownloader;
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired.');
    partsDownloader = new PartsDownloader();
});

