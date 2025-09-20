// بيانات الملفات - يمكن تعديلها بسهولة
// ملاحظة: يمكنك تعديل الحجم الكلي يدوياً في المتغير totalSizeManual أدناه
const partsData = [
    {
        id: 'part1',
        name: 'الجزء الأول',
        size: '500 MB',
        url: 'https://example.com/file1.zip'
    },
    {
        id: 'part2',
        name: 'الجزء الثاني',
        size: '450 MB',
        url: 'https://example.com/file2.zip'
    },
    {
        id: 'part3',
        name: 'الجزء الثالث',
        size: '380 MB',
        url: 'https://example.com/file3.zip'
    },
    {
        id: 'part4',
        name: 'الجزء الرابع',
        size: '420 MB',
        url: 'https://example.com/file4.zip'
    },
    {
        id: 'part5',
        name: 'الجزء الخامس',
        size: '350 MB',
        url: 'https://example.com/file5.zip'
    },
    {
        id: 'part6',
        name: 'الجزء السادس',
        size: '480 MB',
        url: 'https://example.com/file6.zip'
    },
    {
        id: 'part7',
        name: 'الجزء السابع',
        size: '390 MB',
        url: 'https://example.com/file7.zip'
    },
    {
        id: 'part8',
        name: 'الجزء الثامن',
        size: '460 MB',
        url: 'https://example.com/file8.zip'
    },
    {
        id: 'part9',
        name: 'الجزء التاسع',
        size: '370 MB',
        url: 'https://example.com/file9.zip'
    },
    {
        id: 'part10',
        name: 'الجزء العاشر',
        size: '440 MB',
        url: 'https://example.com/file10.zip'
    },
    {
        id: 'part11',
        name: 'الجزء الحادي عشر',
        size: '410 MB',
        url: 'https://example.com/file11.zip'
    },
    {
        id: 'part12',
        name: 'الجزء الثاني عشر',
        size: '360 MB',
        url: 'https://example.com/file12.zip'
    },
    {
        id: 'part13',
        name: 'الجزء الثالث عشر',
        size: '470 MB',
        url: 'https://example.com/file13.zip'
    },
    {
        id: 'part14',
        name: 'الجزء الرابع عشر',
        size: '400 MB',
        url: 'https://example.com/file14.zip'
    },
    {
        id: 'part15',
        name: 'الجزء الخامس عشر',
        size: '330 MB',
        url: 'https://example.com/file15.zip'
    }
];

// الحجم الكلي اليدوي - قم بتعديل هذا الرقم يدوياً حسب الحاجة
const totalSizeManual = "6.2 GB"; // مثال: يمكنك تغيير هذا إلى أي قيمة تريدها

// متغيرات عامة
let downloadedParts = new Set();

// تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadDownloadedState();
    updateProgress();
    updateTotalSize();
    setupEventListeners();
});

// إعداد الصفحة
function initializePage() {
    const container = document.querySelector('.parts-container');
    
    partsData.forEach(part => {
        const partElement = createPartElement(part);
        container.appendChild(partElement);
    });
}

// إنشاء عنصر البارت
function createPartElement(part) {
    const partDiv = document.createElement('div');
    partDiv.className = 'part';
    partDiv.id = part.id;
    
    partDiv.innerHTML = `
        <div class="part-info">
            <span class="part-name">${part.name}</span>
            <span class="part-size">${part.size}</span>
        </div>
        <button class="download-btn" onclick="downloadPart('${part.url}', '${part.id}')">
            <span class="btn-text">⬇️ تحميل</span>
        </button>
        <span class="status"></span>
    `;
    
    return partDiv;
}

// تحميل البارت
function downloadPart(url, partId) {
    // تغيير حالة البارت فوراً
    markAsDownloaded(partId);
    
    // حفظ الحالة في LocalStorage
    saveDownloadedState(partId);
    
    // فتح الرابط في نافذة جديدة
    window.open(url, '_blank');
    
    // تحديث شريط التقدم
    updateProgress();
    
    // إضافة تأثير بصري
    addDownloadEffect(partId);
}

// تمييز البارت كمحمل
function markAsDownloaded(partId) {
    const partElement = document.getElementById(partId);
    const button = partElement.querySelector('.download-btn');
    const status = partElement.querySelector('.status');
    
    // تغيير شكل البارت
    partElement.classList.add('downloaded');
    
    // تغيير النص والأيقونة
    button.innerHTML = '<span class="btn-text">✅ تم التحميل</span>';
    button.classList.add('downloaded');
    button.onclick = null; // إزالة وظيفة الضغط
    
    // إضافة علامة الحالة
    status.textContent = '✅';
    
    // إضافة إلى مجموعة المحملة
    downloadedParts.add(partId);
}

// تحديث عرض الحجم الكلي
function updateTotalSize() {
    const totalSizeElement = document.getElementById('totalSize');
    if (totalSizeElement) {
        totalSizeElement.textContent = totalSizeManual;
    }
}

// حفظ حالة التحميل
function saveDownloadedState(partId) {
    localStorage.setItem(partId, 'downloaded');
    
    // حفظ قائمة جميع البارتات المحملة
    const downloaded = Array.from(downloadedParts);
    localStorage.setItem('downloadedParts', JSON.stringify(downloaded));
}

// تحميل حالة التحميل المحفوظة
function loadDownloadedState() {
    const savedParts = localStorage.getItem('downloadedParts');
    
    if (savedParts) {
        const downloaded = JSON.parse(savedParts);
        downloaded.forEach(partId => {
            if (document.getElementById(partId)) {
                markAsDownloaded(partId);
            }
        });
    } else {
        // طريقة بديلة للتوافق مع النسخة القديمة
        partsData.forEach(part => {
            if (localStorage.getItem(part.id) === 'downloaded') {
                markAsDownloaded(part.id);
            }
        });
    }
}

// تحديث شريط التقدم
function updateProgress() {
    const totalParts = partsData.length;
    const downloadedCount = downloadedParts.size;
    const percentage = totalParts > 0 ? (downloadedCount / totalParts) * 100 : 0;
    
    // تحديث النص
    const progressText = document.getElementById('progressText');
    progressText.textContent = `تم تحميل ${downloadedCount} من ${totalParts} ملف`;
    
    // تحديث شريط التقدم
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = percentage + '%';
}

// إضافة تأثير بصري عند التحميل
function addDownloadEffect(partId) {
    const partElement = document.getElementById(partId);
    
    // إضافة تأثير وميض
    partElement.style.animation = 'pulse 0.6s ease-in-out';
    
    setTimeout(() => {
        partElement.style.animation = '';
    }, 600);
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // زر إعادة التعيين
    document.getElementById('resetAll').addEventListener('click', resetAllParts);
}

// إعادة تعيين جميع الحالات
function resetAllParts() {
    if (confirm('هل أنت متأكد من إعادة تعيين حالة جميع الملفات؟')) {
        // مسح LocalStorage
        partsData.forEach(part => {
            localStorage.removeItem(part.id);
        });
        localStorage.removeItem('downloadedParts');
        
        // إعادة تعيين المتغيرات
        downloadedParts.clear();
        
        // إعادة إنشاء العناصر
        const container = document.querySelector('.parts-container');
        container.innerHTML = '';
        initializePage();
        
        // تحديث شريط التقدم
        updateProgress();
        
        // تحديث الحجم الكلي
        updateTotalSize();
        
        // رسالة تأكيد
        showNotification('تم إعادة تعيين حالة جميع الملفات بنجاح!');
    }
}

// عرض إشعار
function showNotification(message) {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    // إضافة الإشعار للصفحة
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 3 ثوان
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// إضافة أنماط CSS للتأثيرات
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

