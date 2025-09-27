// ربط القوائم والعناصر بالمتغيرات
const form = document.getElementById('laptopForm');
const specsCard = document.getElementById('specsCard');
const resetBtn = document.getElementById('resetBtn');
const printBtn = document.getElementById('printBtn');
// Join Action for image processing 
const intelCheckbox = document.getElementById('intelCheckbox');
const amdCheckbox = document.getElementById('amdCheckbox');
const intelCpuList = document.getElementById('intelCpuList');
const intelGenList = document.getElementById('intelGenList');
const amdCpuList = document.getElementById('amdCpuList');
const amdGenList = document.getElementById('amdGenList');

// منع اختيار أكثر من شركة
intelCheckbox.addEventListener('change', function() {
    if (intelCheckbox.checked) {
        amdCheckbox.checked = false;
        intelCpuList.style.display = 'block';
        intelGenList.style.display = 'block';
        amdCpuList.style.display = 'none';
        amdGenList.style.display = 'none';
    } else {
        intelCpuList.value = "";
        intelGenList.value = "";
        intelCpuList.style.display = 'none';
        intelGenList.style.display = 'none';
    }
    updateCard();
});
amdCheckbox.addEventListener('change', function() {
    if (amdCheckbox.checked) {
        intelCheckbox.checked = false;
        amdCpuList.style.display = 'block';
        amdGenList.style.display = 'block';
        intelCpuList.style.display = 'none';
        intelGenList.style.display = 'none';
    } else {
        amdCpuList.value = "";
        amdGenList.value = "";
        amdCpuList.style.display = 'none';
        amdGenList.style.display = 'none';
    }
    updateCard();
});
// عند تغيير اختيار أي قائمة
intelCpuList.addEventListener('change', updateCard);
intelGenList.addEventListener('change', updateCard);
amdCpuList.addEventListener('change', updateCard);
amdGenList.addEventListener('change', updateCard);


// قائمة الصور الافتراضية (يمكنك تغيير الأسماء كما يناسبك)
const images = {
    brand: {
        hp: './image/hp-logo.png',
        dell: './image/dell-logo.png',
        lenovo: './image/lenovo-logo.png'
    },
    os: {
        win10: './image/win-10.png',
        win11: './image/win-11.png',
    },
    ram: {
        GB_8: './image/RAM-8GB.png',
        GB_16: './image/RAM-16GB.jpg',
    },
    storage: {
        ssd_128: './image/SSD.jpg',
        ssd_256: './image/SSD.jpg',
        ssd_512: './image/SSD.jpg',
        ssd_1T: './image/SSD.jpg',
        nvme_128: './image/nvme.png',
        nvme_256: './image/nvme.png',
        nvme_512: './image/nvme.png',
        nvme_1T: './image/nvme.png',
    },
    gpu: {
        intel_irisXe: './image/irisXe.jpeg',
        nvidia: './image/Nvidia.png',
    },
    touch: './image/touch-screen.png'
};

// Dictionary للصور حسب المعالج والجيل
const cpuGenImages = {
    "Corei5-10th": "./image/cori5-10th.png",
    "Corei7-12th": "./image/cori7-12th.jpeg",
    "Ryzen5-3000": "./image/ryzen5-3600.png",
    "Ryzen7-5000": "./image/ryzen7-5000.jpg",
    // Complate ...
};

// نصوص الاختيارات (تُستخدم في البطاقة)
const labels = {
    brand: {
        hp: 'HP',
        dell: 'Dell',
        lenovo: 'Lenovo'
    },
    os: {
        win10: 'Win-10 ',
        win11: ' Win-11',
    },
    ram: {
        GB_8: 'Ram 8 GB',
        GB_16: 'Ram 16 GB',
    },
    storage: {
        ssd_128: 'SSD-128 GB',
        ssd_256: 'SSD-256 GB',
        ssd_512: 'SSD-512 GB',
        ssd_1T: 'SSD-1T',
        nvme_128: 'NVME-128 GB',
        nvme_256: 'NVME-256 GB',
        nvme_512: 'NVME-512 GB',
        nvme_1T: 'NVME-1T',
    },
    gpu: {
        intel_irisXe: 'Intel iRISXe',
        nvidia: 'Nvidia',
    }
};

// دالة تحديث البطاقة بناءً على القيم المختارة
function updateCard() {
    // جلب القيم المختارة
    const brand = form.brand.value;
    const laptopName = form.laptopName.value.trim();
    const os = form.os.value;
    const storage = form.storage.value;
    const ram = form.ram.value;
    const screen = form.screen.value;
    const hz = form.hz.value;
    const gpu = form.gpu.value;
    const price = form.price.value;
    const touch = form.touch.checked;
// 
    const selectedCpuBrand = intelCheckbox.checked ? 'intel' : amdCheckbox.checked ? 'amd' : '';
    let selectedCpu = '';
    let selectedGen = '';
    if (selectedCpuBrand === 'intel') {
        selectedCpu = intelCpuList.value;
        selectedGen = intelGenList.value;
    } else if (selectedCpuBrand === 'amd') {
        selectedCpu = amdCpuList.value;
        selectedGen = amdGenList.value;
    }

// إذا لم يتم اختيار شيء، اعرض رسالة فقط
    if (!brand && !selectedCpu && !os && !storage && !ram && !screen && !gpu && !price && !touch && !laptopName && !hz) {
        specsCard.innerHTML = `<div style="text-align:center; color:#bbb; margin-top:5cm; font-size:1.4rem;">يرجى اختيار المواصفات   </div>`;
        return;
    }

    let cpuGenImageHtml = '';
    if (selectedCpu && selectedGen) {
        const cpuGenKey = selectedCpu + '-' + selectedGen;
        const cpuGenImageSrc = cpuGenImages[cpuGenKey];
        if (cpuGenImageSrc) {
            cpuGenImageHtml = `<img src="${cpuGenImageSrc}" alt="${selectedCpu} ${selectedGen}">`;
        } else {
            cpuGenImageHtml = `<img src="./image/default-cpu-gen.png" alt="صورة غير متوفرة">`; // صورة افتراضية
        }
    }


    // --- عمود الصور الجانبي ---
    let imagesCol = '';
    if (brand) {
        imagesCol += `<img src="${images.brand[brand] || ''}" alt="شعار الشركة">`;
    }
    if (cpuGenImageHtml) {
    imagesCol += cpuGenImageHtml; // صورة المعالج مع الجيل
    }
    if (os) {
        imagesCol += `<img src="${images.os[os] || ''}" alt="النظام">`;
    }

    let cpuDetailsText = '';
    if (selectedCpu && selectedGen) {
    cpuDetailsText = `
        <div class="card-detail-row">
        <b> </b> 
        <span>${selectedCpu} - ${selectedGen}</span>
        </div>
    `;
    }


    // --- عمود التفاصيل ---
    let detailsCol = `
        <div class="card-title">
            ${brand ? labels.brand[brand] : ''}
        </div>
        ${cpuDetailsText}
    `;

    if (laptopName) {
    detailsCol += `<div class="card-detail-row" style="font-weight:bold;color:#2f3e65">${laptopName}</div>`;
    }

    if (screen) {
        detailsCol += `<div class="card-detail-row"><b>   </b> ${screen}  </div>`;
    }
    if (hz) {
    detailsCol += `<div class="card-detail-row"><b>   </b> ${hz} Hz</div>`;
    }
    if (ram) {
        detailsCol += `
            <div class="card-detail-row">
                <img src="${images.ram[ram] || ''}" alt="رام"> 
                <span><b>   </b> ${labels.ram[ram]}</span>
            </div>
        `;
    }
    if (storage) {
        detailsCol += `
            <div class="card-detail-row">
                <img src="${images.storage[storage] || ''}" alt="هارد"> 
                <span><b>  </b> ${labels.storage[storage]}</span>
            </div>
        `;
    }
    if (gpu) {
        detailsCol += `
            <div class="card-detail-row">
                <img src="${images.gpu[gpu] || ''}" alt="كرت الشاشة"> 
                <span><b>   </b> ${labels.gpu[gpu]}</span>
            </div>
        `;
    }
    if (touch) {
        detailsCol += `
            <div class="card-detail-row">
                <img src="${images.touch}" alt="شاشة لمس">
                <span> لمس </span>
            </div>
        `;
    }
    if (os) {
    detailsCol += `
        <div class="card-detail-row">
            <img src="${images.os[os] || ''}" alt="النظام">
            <span><b>  </b> ${labels.os[os]}</span>
        </div>
    `;
    }


    // --- الخط الفاصل والسعر ---
    detailsCol += `<div class="card-divider"></div>`;
    if (price) {
        detailsCol += `<div class="card-price">${price} د.ع</div>`;
    }

    // --- وضع كل الأعمدة في البطاقة ---
    specsCard.innerHTML = `
        <div class="card-images-column">${imagesCol}</div>
        <div class="card-details-column">${detailsCol}</div>
    `;
}

// تحديث البطاقة عند كل تغيير اختيار
form.addEventListener('input', updateCard);

// زر إعادة التعيين
resetBtn.addEventListener('click', () => {
    form.reset();
    updateCard();
});

// زر الطباعة
printBtn.addEventListener('click', () => {
    window.print();
});

// تحديث البطاقة أول مرة
updateCard();
