const form = document.getElementById('laptopForm');
const specsCard = document.getElementById('specsCard');
const resetBtn = document.getElementById('resetBtn');
const printBtn = document.getElementById('printBtn');
const intelCheckbox = document.getElementById('intelCheckbox');
const amdCheckbox = document.getElementById('amdCheckbox');
const intelCpuList = document.getElementById('intelCpuList');
const intelGenList = document.getElementById('intelGenList');
const amdCpuList = document.getElementById('amdCpuList');
const amdGenList = document.getElementById('amdGenList');
const amdGenText = document.getElementById('amdGenText');
// 
const gpuSelect = document.getElementById('gpu');
const nvidiaDetailsGroup = document.getElementById('nvidiaDetailsGroup');
const amdDetailsGroup = document.getElementById('amdDetailsGroup');
const nvidiaDetails = document.getElementById('nvidiaDetails');
const amdDetails = document.getElementById('amdDetails');


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
        dell: './image/company/dell.png',
        lenovo: './image/company/lenovo-logo.png',
        acer: './image/company/acer.png',
        asus: './image/company/asus.png',
        apple: './image/company/apple.png',
        msi: './image/company/msi.png',
        razer: './image/company/razer.png',
        samsung: './image/company/samsung.png',
        toshiba: './image/company/toshiba.png',
        microsoft: './image/company/microsoft.png',
        huawei: './image/company/huawei.jpg',
        lg: './image/company/lg.png',
        fujitsu: './image/company/fujitsu.png',
        panasonic: './image/company/panasonic.png',
        sony: './image/company/sony.png',
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
        intel: './image/Screen-card/intel.png',
        nvidia: './image/Screen-card/NVIDIA.jpeg',
        amd: './image/Screen-card/AMD.png',
    },
    touch: './image/touch.png'
};

// Dictionary للصور حسب المعالج والجيل
const cpuGenImages = {
    // Core i3
    "Corei3-1th": "./image/Intel/Corei3/corei3-1th.png",
    "Corei3-2th": "./image/Intel/Corei3/corei3-2th.png",
    "Corei3-3th": "./image/Intel/Corei3/corei3-3th.png",
    "Corei3-4th": "./image/Intel/Corei3/corei3-4th.png",
    "Corei3-5th": "./image/Intel/Corei3/corei3-5th.png",
    "Corei3-6th": "./image/Intel/Corei3/corei3-6th.png",
    "Corei3-7th": "./image/Intel/Corei3/corei3-7th.png",
    "Corei3-8th": "./image/Intel/Corei3/corei3-8th.png",
    "Corei3-9th": "./image/Intel/Corei3/corei3-9th.png",
    "Corei3-10th": "./image/Intel/Corei3/corei3-10th.png",
    "Corei3-11th": "./image/Intel/Corei3/corei3-11th.png",
    "Corei3-12th": "./image/Intel/Corei3/corei3-12th.png",
    "Corei3-13th": "./image/Intel/Corei3/corei3-13th.png",
    "Corei3-14th": "./image/Intel/Corei3/corei3-14th.png",
    // Core i5
    "Corei5-1th": "./image/Intel/Corei5/corei5-1th.png",
    "Corei5-2th": "./image/Intel/Corei5/corei5-2th.png",
    "Corei5-3th": "./image/Intel/Corei5/corei5-3th.png",
    "Corei5-4th": "./image/Intel/Corei5/corei5-4th.png",
    "Corei5-5th": "./image/Intel/Corei5/corei5-5th.png",
    "Corei5-6th": "./image/Intel/Corei5/corei5-6th.png",
    "Corei5-7th": "./image/Intel/Corei5/corei5-7th.png",
    "Corei5-8th": "./image/Intel/Corei5/corei5-8th.png",
    "Corei5-9th": "./image/Intel/Corei5/corei5-9th.png",
    "Corei5-10th": "./image/Intel/Corei5/corei5-10th.png",
    "Corei5-11th": "./image/Intel/Corei5/corei5-11th.png",
    "Corei5-12th": "./image/Intel/Corei5/corei5-12th.png",
    "Corei5-13th": "./image/Intel/Corei5/corei5-13th.png",
    "Corei5-14th": "./image/Intel/Corei5/corei5-14th.png",
    // Core i7
    "Corei7-1th": "./image/Intel/Corei7/corei7-1th.png",
    "Corei7-2th": "./image/Intel/Corei7/corei7-2th.png",
    "Corei7-3th": "./image/Intel/Corei7/corei7-3th.png",
    "Corei7-4th": "./image/Intel/Corei7/corei7-4th.png",
    "Corei7-5th": "./image/Intel/Corei7/corei7-5th.png",
    "Corei7-6th": "./image/Intel/Corei7/corei7-6th.png",
    "Corei7-7th": "./image/Intel/Corei7/corei7-7th.png",
    "Corei7-8th": "./image/Intel/Corei7/corei7-8th.png",
    "Corei7-9th": "./image/Intel/Corei7/corei7-9th.png",
    "Corei7-10th": "./image/Intel/Corei7/corei7-10th.png",
    "Corei7-11th": "./image/Intel/Corei7/corei7-11th.png",
    "Corei7-12th": "./image/Intel/Corei7/corei7-12th.png",
    "Corei7-13th": "./image/Intel/Corei7/corei7-13th.png",
    "Corei7-14th": "./image/Intel/Corei7/corei7-14th.png",
    // Core i9
    "Corei9-9th": "./image/Intel/Corei9/corei9-9th.png",
    "Corei9-10th": "./image/Intel/Corei9/corei9-10th.png",
    "Corei9-11th": "./image/Intel/Corei9/corei9-11th.png",
    "Corei9-12th": "./image/Intel/Corei9/corei9-12th.png",
    "Corei9-13th": "./image/Intel/Corei9/corei9-13th.png",
    "Corei9-14th": "./image/Intel/Corei9/corei9-14th.png",
    // Ultra 5

    "Ultra-5-1th": "./image/Intel/ultra5-1th.png",
    "Ultra-5-2th": "./image/Intel/ultra5-2th.png",
    "Ultra-5-3th": "./image/Intel/ultra5-3th.png",
    "Ultra-5-4th": "./image/Intel/ultra5-4th.png",
    "Ultra-5-5th": "./image/Intel/ultra5-5th.png",
    "Ultra-5-6th": "./image/Intel/ultra5-6th.png",
    "Ultra-5-7th": "./image/Intel/ultra5-7th.png",
    "Ultra-5-8th": "./image/Intel/ultra5-8th.png",
    "Ultra-5-9th": "./image/Intel/ultra5-9th.png",
    "Ultra-5-10th": "./image/Intel/ultra5-10th.png",
    "Ultra-5-11th": "./image/Intel/ultra5-11th.png",
    "Ultra-5-12th": "./image/Intel/ultra5-12th.png",
    "Ultra-5-13th": "./image/Intel/ultra5-13th.png",
    "Ultra-5-14th": "./image/Intel/ultra5-14th.png",
    // Ultra 7
    "Ultra-7-1th": "./image/Intel/ultra7-1th.png",
    "Ultra-7-2th": "./image/Intel/ultra7-2th.png",
    "Ultra-7-3th": "./image/Intel/ultra7-3th.png",
    "Ultra-7-4th": "./image/Intel/ultra7-4th.png",
    "Ultra-7-5th": "./image/Intel/ultra7-5th.png",
    "Ultra-7-6th": "./image/Intel/ultra7-6th.png",
    "Ultra-7-7th": "./image/Intel/ultra7-7th.png",
    "Ultra-7-8th": "./image/Intel/ultra7-8th.png",
    "Ultra-7-9th": "./image/Intel/ultra7-9th.png",
    "Ultra-7-10th": "./image/Intel/ultra7-10th.png",
    "Ultra-7-11th": "./image/Intel/ultra7-11th.png",
    "Ultra-7-12th": "./image/Intel/ultra7-12th.png",
    "Ultra-7-13th": "./image/Intel/ultra7-13th.png",
    "Ultra-7-14th": "./image/Intel/ultra7-14th.png",
    // Ultra 9
    "Ultra-9-1th": "./image/Intel/ultra9-1th.png",
    "Ultra-9-2th": "./image/Intel/ultra9-2th.png",
    "Ultra-9-3th": "./image/Intel/ultra9-3th.png",
    "Ultra-9-4th": "./image/Intel/ultra9-4th.png",
    "Ultra-9-5th": "./image/Intel/ultra9-5th.png",
    "Ultra-9-6th": "./image/Intel/ultra9-6th.png",
    "Ultra-9-7th": "./image/Intel/ultra9-7th.png",
    "Ultra-9-8th": "./image/Intel/ultra9-8th.png",
    "Ultra-9-9th": "./image/Intel/ultra9-9th.png",
    "Ultra-9-10th": "./image/Intel/ultra9-10th.png",
    "Ultra-9-11th": "./image/Intel/ultra9-11th.png",
    "Ultra-9-12th": "./image/Intel/ultra9-12th.png",
    "Ultra-9-13th": "./image/Intel/ultra9-13th.png",
    "Ultra-9-14th": "./image/Intel/ultra9-14th.png",

    // AMD
    "Ryzen3": "./image/AMD/ryzen-3.jpeg",
    "Ryzen5": "./image/AMD/ryzen-5.jpg",
    "Ryzen7": "./image/AMD/ryzen-7.jpg",
    "Ryzen9": "./image/AMD/Ryzen-9.jpeg",
};

// نصوص الاختيارات (تُستخدم في البطاقة)
const labels = {
    brand: {
        hp: 'HP',
        dell: 'Dell',
        lenovo: 'Lenovo',
        acer: 'Acer',
        asus: 'ASUS',
        apple: 'Apple',
        msi: 'MSI',
        razer: 'Razer',
        samsung: 'Samsung',
        toshiba: 'Toshiba',
        microsoft: 'Microsoft',
        huawei: 'Huawei',
        lg: 'LG ',
        fujitsu: 'Fujitsu',
        panasonic: 'Panasonic',
        sony: 'Sony'
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
        intel: 'Intel',
        nvidia: 'Nvidia',
        amd: 'AMD',
    }
};

const intelGenLabels = {
    "1th": "الجيل الاول ",
    "2th": "الجيل الثاني ",
    "3th": "الجيل الثالث ",
    "4th": "الجيل الرابع ",
    "5th": "الجيل الخامس ",
    "6th": "الجيل السادس ",
    "7th": "الجيل السابع ",
    "8th": "الجيل الثامن",
    "9th": "الجيل التاسع",
    "10th": "الجيل العاشر",
    "11th": "الجيل الحادي عشر",
    "12th": "الجيل الثاني عشر",
    "13th": "الجيل الثالث عشر",
    "14th": "الجيل الرابع عشر",
};

gpuSelect.addEventListener('change', function() {
    if (gpuSelect.value === "nvidia") {
        nvidiaDetailsGroup.style.display = "block";
        amdDetailsGroup.style.display = "none";
    } else if (gpuSelect.value === "amd") {
        amdDetailsGroup.style.display = "block";
        nvidiaDetailsGroup.style.display = "none";
    } else {
        nvidiaDetailsGroup.style.display = "none";
        amdDetailsGroup.style.display = "none";
    }
    updateCard();
});
nvidiaDetails.addEventListener('input', updateCard);
amdDetails.addEventListener('input', updateCard);


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


    if (!brand && !selectedCpu && !os && !storage && !ram && !screen && !gpu && !price && !touch && !laptopName && !hz) {
        specsCard.innerHTML = `<div style="text-align:center; color:#D97D55; margin-top:5cm; margin-right:3cm; font-size:3.4rem;">يرجى اختيار المواصفات   </div>`;
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

    if (screen || hz) {
    detailsCol += `
        <div class="card-detail-row" style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
            <span>
                Screen ${screen ? ' ' + screen : ''}${(screen && hz) ? ' - ' : ''}${hz ? hz + ' GHz' : ''} - <span style="color:#ED3F27;">FHD</span>
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
    let ramLabel = labels.ram[ram];
    let ddrLabel = "";

    if (selectedCpuBrand === 'intel' && selectedGen) {
        let genNum = parseInt(selectedGen);
        if (!isNaN(genNum)) {
            if (genNum >= 1 && genNum <= 5) {
                ddrLabel = "-PC3 DDR3";
            } else if (genNum >= 6 && genNum <= 12) {
                ddrLabel = "-PC4 DDR4";
            } else if (genNum === 13 || genNum === 14) {
                ddrLabel = "-PC5 DDR5";
            }
        }
    }

    detailsCol += `
        <div class="card-detail-row">
            <img src="${images.ram[ram] || ''}" alt="رام"> 
            <span><b></b> ${ramLabel}${ddrLabel}</span>
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
    let gpuImg = '';
    let gpuText = '';
    // Intel
    if (gpu === "intel") {
        // نتحقق من الجيل ورام
        if (selectedCpuBrand === 'intel' && selectedGen) {
            let genNum = parseInt(selectedGen);
            let ramNum = ram === "GB_16" ? 8 : ram === "GB_8" ? 4 : "";
            if (genNum >= 1 && genNum <= 10) {
                gpuText = `Intel HD Graphic${ramNum ? ' ' + ramNum + 'G' : ''}`;
            } else if (genNum >= 11 && genNum <= 14) {
                gpuText = `Intel Iris Graphic${ramNum ? ' ' + ramNum + 'G' : ''}`;
            } else {
                gpuText = `Intel Graphic`;
            }
        } else {
            gpuText = `Intel Graphic`;
        }
        gpuImg = images.gpu.intel;
    }
    // Nvidia
    else if (gpu === "nvidia") {
        gpuText = "Nvidia";
        if (nvidiaDetails.value.trim()) {
            gpuText += " " + nvidiaDetails.value.trim();
        }
        gpuImg = images.gpu.nvidia;
    }
    // AMD
    else if (gpu === "amd") {
        gpuText = "AMD";
        if (amdDetails.value.trim()) {
            gpuText += " " + amdDetails.value.trim();
        }
        gpuImg = images.gpu.amd;
    }

    detailsCol += `
        <div class="card-detail-row">
            <img src="${gpuImg}" alt="كرت الشاشة" style="width:38px;vertical-align:middle;"> 
            <span><b></b> ${gpuText}</span>
        </div>
    `;
    }



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
