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
const amdGenText = document.getElementById('amdGenText');

// منع اختيار أكثر من شركة
intelCheckbox.addEventListener('change', function() {
    if (intelCheckbox.checked) {
        amdCheckbox.checked = false;
        intelCpuList.style.display = 'block';
        intelGenList.style.display = 'block';
        amdCpuList.style.display = 'none';
        amdGenList.style.display = 'none';
         amdGenText.value = ""; 
        amdGenText.style.display = 'none';
    } else {
        intelCpuList.value = "";
        intelGenList.value = "";
        intelCpuList.style.display = 'none';
        intelGenList.style.display = 'none';
        amdGenText.style.display = 'none';
        amdGenText.value = "";
    }
    updateCard();
});
amdCheckbox.addEventListener('change', function() {
    if (amdCheckbox.checked) {
        intelCheckbox.checked = false;
        amdCpuList.style.display = 'block';
        amdGenText.style.display = 'block';  
        intelCpuList.style.display = 'none';
        intelGenList.style.display = 'none';
    } else {
        amdCpuList.value = "";
        amdGenText.value = "";
        amdCpuList.style.display = 'none';
        amdGenText.style.display = 'none';
    }
    updateCard();
});
// عند تغيير اختيار أي قائمة
intelCpuList.addEventListener('change', updateCard);
intelGenList.addEventListener('change', updateCard);
amdCpuList.addEventListener('change', updateCard);
amdGenText.addEventListener('input', updateCard);


// قائمة الصور الافتراضية (يمكنك تغيير الأسماء كما يناسبك)
const images = {
    brand: {
        hp: './image/company/hp-logo.png',
        dell: './image/company/dell-logo.png',
        lenovo: './image/company/lenovo-logo.png'
    },
    os: {
        win10: './image/win-10.png',
        win11: './image/win-11.png',
    },
    ram: {
        GB_8: './image/Storage/RAM-8GB.png',
        GB_16: './image/Storage/RAM-16GB.jpg',
    },
    storage: {
        ssd_128: './image/Storage/SSD.jpg',
        ssd_256: './image/Storage/SSD.jpg',
        ssd_512: './image/Storage/SSD.jpg',
        ssd_1T: './image/Storage/SSD.jpg',
        nvme_128: './image/Storage/nvme.png',
        nvme_256: './image/Storage/nvme.png',
        nvme_512: './image/Storage/nvme.png',
        nvme_1T: './image/Storage/nvme.png',
    },
    gpu: {
        intel_irisXe: './image/Screen-card/irisXe.jpeg',
        nvidia: './image/Screen-card/Nvidia.png',
        amd: './image/Screen-card/amd.png',
    },
    touch: './image/touch-screen.png'
};

// Dictionary للصور حسب المعالج والجيل
const cpuGenImages = {
    "Corei5-10th": "./image/Intel/cori5-10th.png",
    "Corei7-12th": "./image/Intel/cori7-12th.jpeg",
    // 
    "Ryzen3": "./image/AMD/ryzen-3.jpeg",
    "Ryzen5": "./image/AMD/ryzen-5.jpg",
    "Ryzen7": "./image/AMD/ryzen-7.jpg",
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
        amd: 'AMD',
    }
};

const intelGenLabels = {
    "8th": "الجيل الثامن",
    "9th": "الجيل التاسع",
    "10th": "الجيل العاشر",
    "11th": "الجيل الحادي عشر",
    "12th": "الجيل الثاني عشر"
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
        selectedGen = amdGenText.value;
    }

// إذا لم يتم اختيار شيء، اعرض رسالة فقط
    if (!brand && !selectedCpu && !os && !storage && !ram && !screen && !gpu && !price && !touch && !laptopName && !hz) {
        specsCard.innerHTML = `<div style="text-align:center; color:#bbb; margin-top:5cm; font-size:1.4rem;">يرجى اختيار المواصفات   </div>`;
        return;
    }

    let cpuGenImageHtml = '';
    if (selectedCpuBrand === 'intel' && selectedCpu && selectedGen) {
        const cpuGenKey = selectedCpu + '-' + selectedGen;
        const cpuGenImageSrc = cpuGenImages[cpuGenKey];
        if (cpuGenImageSrc) {
            cpuGenImageHtml = `<img src="${cpuGenImageSrc}" alt="${selectedCpu} ${selectedGen}">`;
        } else {
            cpuGenImageHtml = `<img src="./image/default-cpu-gen.png" alt="صورة غير متوفرة">`;
        }
    } else if (selectedCpuBrand === 'amd' && selectedCpu) {
        // الصورة حسب المعالج فقط، ابحث عنها بمفتاح المعالج فقط
        const cpuImageSrc = cpuGenImages[selectedCpu];
        if (cpuImageSrc) {
            cpuGenImageHtml = `<img src="${cpuImageSrc}" alt="${selectedCpu}">`;
        } else {
            cpuGenImageHtml = `<img src="./image/default-cpu-gen.png" alt="صورة غير متوفرة">`;
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
    if (selectedCpuBrand === 'intel' && selectedCpu && selectedGen) {
        const genLabel = intelGenLabels[selectedGen] ? ' ' + intelGenLabels[selectedGen] : '';
        cpuDetailsText = `
            <div class="card-detail-row">
                <span>${selectedCpu} - ${selectedGen}${genLabel}</span>
            </div>
        `;
    } else if (selectedCpuBrand === 'amd' && selectedCpu) {
        cpuDetailsText = `
            <div class="card-detail-row">
                <span>${selectedCpu}${selectedGen ? ' - ' + selectedGen : ''}</span>
            </div>
        `;
    }



    // --- عمود التفاصيل ---
    let detailsCol = `
        <div class="card-title">
            ${brand ? labels.brand[brand] : ''}${laptopName ? ' - ' + laptopName : ''}
        </div>
        ${cpuDetailsText}
    `;


    // if (screen || hz) {
    // detailsCol += `<div class="card-detail-row" style="display:flex;align-items:center;gap:16px;justify-content:center;">
    //     <span>
    //         Screen Size${screen ? ' ' + screen : ''}${(screen && hz) ? ' - ' : ''}${hz ? hz + ' GHz' : ''}
    //     </span>
    //     ${touch ? `<span style="display:flex;align-items:center;gap:6px;"><img src="${images.touch}" alt="شاشة لمس" style="width:40px;height:40px;"><span>لمس</span></span>` : ''}
    // </div>`;
    // }

    if (screen || hz) {
    detailsCol += `
        <div class="card-detail-row" style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
            <span>
                Screen Size${screen ? ' ' + screen : ''}${(screen && hz) ? ' - ' : ''}${hz ? hz + ' GHz' : ''}
            </span>
            ${touch ? `
                <span style="display: flex; align-items: center; gap: 6px;">
                    <img src="${images.touch}" alt="شاشة لمس" style="width:40px;height:65px;">
                    <span>لمس</span>
                </span>
            ` : ''}
        </div>
    `;
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
    
    // if (os) {
    // detailsCol += `
    //     <div class="card-detail-row">
    //         <img src="${images.os[os] || ''}" alt="النظام">
    //         <span><b>  </b> ${labels.os[os]}</span>
    //     </div>
    // `;
    // }


    // --- الخط الفاصل والسعر ---
    detailsCol += `<div class="card-divider"></div>`;
    if (price) {
    detailsCol += `
        <div class="card-price-row">
            <span class="price-label"> السعر ثابت </span>
            <span class="price-value">${price}</span>
        </div>
    `;
}

    // --- وضع كل الأعمدة في البطاقة ---
    specsCard.innerHTML = `
    <div class="card-details-column">${detailsCol}</div>
        <div class="card-images-column">${imagesCol}</div>
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
