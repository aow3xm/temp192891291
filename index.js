// phân tích và xây dựng layout => done
// phân tích mô hình 3 khối
// Viết các chức năng xử lí trong người dùng

// Mô hình 3 khối
// Đầu vào: 
// Người dùng chọn loại xe, nhập số km, thời gian chờ, bảng giá cướ từng loại xe
// Các bước xử lí
// Dùng dữ liệu người dùng để phân tích xem người dùng đi loại xe nào, từ đó có bảng giá phù hợp
// Dựa vào số km đi của người dùng, thì sẽ có 3TH xảy ra: 
// -Người dùng mở cửa xong không đi
// -Người dùng đi trong khoảng 1-19km ->
// km*1 + (soKmDi-1)*km2
// Người dùng đi hơn 19km km*1+18*km + (soKmDi-19)*km3
// Tính tiền, in hoá đơn(nếu người dùng yêu cầu)


const UBER_CAR = `uberCar`;
const UBER_SUV = `uberSUV`;
const UBER_BLACK = `uberBlack`;


var btnTinhTien = document.querySelector(`#btnTinhTien`);
var btnInHoaDon = document.querySelector(`#btnInHoaDon`);

btnTinhTien.addEventListener(`click`, function(){

    var soKm = document.querySelector(`#txt-km`).value*1;
    var thoiGianChoE = document.querySelector(`#txt-thoiGianCho`).value*1;
    var option = document.querySelector(`input[name="selector"]:checked`).value;
    var xuatTien = document.querySelector(`.xuatTien`); 


    var kmDauTien = tinhGiaTienKmChang1(option);
    var tuKm2 = tinhGiaTienKmChang2(option);
    var tuKm19 = tinhGiaTienKmChang3(option);
    var thoiGianCho = tinhThoiGianCho(option);
    var thanhTienThoiGianCho = tinhTienThoiGianCho(option, thoiGianChoE);

    
    var tongTien = 0;
    if(soKm > 19){
        tongTien = kmDauTien + 18 * tuKm2 + (soKm-19) * tuKm19;
    }
    else if(soKm <= 19){
        tongTien = kmDauTien + (soKm-1)*tuKm2;
    }
    else{
        tongTien = kmDauTien*soKm;
    }
    tongTien+=thanhTienThoiGianCho;
    tongTien = (Math.round(tongTien/1000)*1000).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });;
    xuatTien.innerHTML = tongTien;

    btnInHoaDon.addEventListener(`click`, function(){
        var modal = document.querySelector('.modal');   
        modal.style.display = 'block';
        modal.style.opacity = 1;
        var closeBtn = document.querySelector('.modal-header button');
        var submitBtn = document.querySelector('.modal-footer button');
    
    

        var tdKm1 = document.querySelector('table .kmDauTien');
        var tdDonGiaKm1 = document.querySelector('table .donGiaKmDauTien');
        var tdThanhTienKm1 = document.querySelector('table .thanhTienKmDauTien');

        var tdKm2 = document.querySelector('table .kmThu2');
        var tdDonGiaKm2 = document.querySelector('table .donGiaKm2');
        var tdThanhTienKm2 = document.querySelector('table .thanhTienKm2');

        var tdKm19 = document.querySelector('table .kmThu19');
        var tdDonGiaKm19 = document.querySelector('table .donGiaKm19');
        var tdThanhTienKm19 = document.querySelector('table .thanhTienKm19');


        var tdThoiGianCho = document.querySelector('table .thoiGianCho');
        var tdDonGiaThoiGianCho = document.querySelector('table .donGiaThoiGianCho');
        var tdThanhTienThoiGianCho = document.querySelector('table .thanhTienThoiGianCho');

        if(soKm > 19){
            tdKm1.innerHTML = soKm-(soKm-1);
            tdDonGiaKm1.innerHTML = kmDauTien;
            tdThanhTienKm1.innerHTML = 1*kmDauTien;

            tdKm2.innerHTML = soKm-(soKm-19);
            tdDonGiaKm2.innerHTML = tuKm2;
            tdThanhTienKm2.innerHTML = (soKm-(soKm-19))*tuKm2;

            tdKm19.innerHTML = soKm-20;
            tdDonGiaKm19.innerHTML = tuKm19;
            tdThanhTienKm19.innerHTML = (soKm-20)*tuKm19;
        }
        else if(soKm <= 1){
            tdKm1.innerHTML = soKm;
            tdDonGiaKm1.innerHTML = kmDauTien;
            tdThanhTienKm1.innerHTML = soKm*kmDauTien;

            tdKm2.innerHTML = '';
            tdDonGiaKm2.innerHTML = '';
            tdThanhTienKm2.innerHTML = '';

            tdKm19.innerHTML = '';
            tdDonGiaKm19.innerHTML = '';
            tdThanhTienKm19.innerHTML = '';
        }
        else{
            tdKm1.innerHTML = soKm-(soKm-1);
            tdDonGiaKm1.innerHTML = kmDauTien;
            tdThanhTienKm1.innerHTML = 1*kmDauTien;

            tdKm2.innerHTML = soKm-1;
            tdDonGiaKm2.innerHTML = tuKm2;
            tdThanhTienKm2.innerHTML = (soKm-1)*tuKm2;
        }
        tdThoiGianCho.innerHTML = thoiGianChoE + ' phút';
        tdDonGiaThoiGianCho.innerHTML = thoiGianCho + ' /3 phút';
        tdThanhTienThoiGianCho.innerHTML = Math.round(tinhTienThoiGianCho(option, thoiGianChoE)/1000)*1000;
 
        tdThanhTien = document.querySelector('table .thanhTien');
        tdThanhTien.innerHTML = tongTien;


        closeBtn.addEventListener('click', closeModal);
        submitBtn.addEventListener('click', closeModal);
        function closeModal() {
            modal.style.display = 'none';
            modal.style.opacity = 0;
        }
    })
})


function tinhGiaTienKmChang1(loaiXe){
    switch(loaiXe){
        case UBER_CAR:{
            return 8000;
        }
        case UBER_SUV:{
            return 9000;
        }
        case UBER_BLACK:{
            return 10000;
        }
    }
}

function tinhGiaTienKmChang2(loaiXe){
    switch(loaiXe){
        case UBER_CAR:{
            return 7500;
        }
        case UBER_SUV:{
            return 8500;

        }
        case UBER_BLACK:{
            return 9500;
        }
    }
}

function tinhGiaTienKmChang3(loaiXe){
    switch(loaiXe){
        case UBER_CAR:{
            return 7000;
        }
        case UBER_SUV:{
            return 8000;

        }
        case UBER_BLACK:{
            return 9000;

        }
    }
}
function tinhThoiGianCho(loaiXe){
    switch(loaiXe){
        case UBER_CAR:{
            return 2000;
        }
        case UBER_SUV:{
            return 3000;

        }
        case UBER_BLACK:{
            return 3500;
        }
    }
}
function tinhTienThoiGianCho(loaiXe, soPhutCho){
    switch(loaiXe){
        case UBER_CAR:{
            return (2000*soPhutCho)/3;
        }
        case UBER_SUV:{
            return (2500*soPhutCho)/3;

        }
        case UBER_BLACK:{
            return (3000*soPhutCho)/3;


        }
    }
}

