var calcs = 1;
var seokcha = [];
var man = [];
var dongseokcha = [];
var danwi = [];
var grade = [];
var calcpoint = [];

function addInput() {
    const targetDiv = document.getElementById('results');
    // inputContainer의 내용을 복사합니다.
    const container = document.querySelector('#inputContainer');
    const clone = container.cloneNode(true);

    // 복사본을 문서의 마지막 부분에 붙여넣습니다.
    // document.body.appendChild(clone);
    targetDiv.insertBefore(clone, targetDiv.lastChild);

    // 복사본의 input 요소 id를 자동으로 변환합니다.
    const inputs = clone.querySelectorAll('input');
    inputs.forEach((input, index) => {
        input.id = `one${calcs}_${index + 1}`; // 예: one1, one2, ...
    });

    calcs++;
    // 복사본의 display 속성을 none으로 설정하여 복사본이 보이지 않게 합니다.
    // clone.style.display = 'none';
}

// 폼 제출 이벤트 처리
document.querySelector('#formSubmit').addEventListener('submit', function(e) {
    e.preventDefault(); // 폼의 기본 제출 동작 방지
    
    // 현재 페이지에 있는 모든 입력창을 찾습니다.
    var inputs = document.querySelectorAll('#inputContainer input');
    
    // 각 입력창의 값을 배열에 저장합니다.
    var values = Array.from(inputs).map(function(input) {
        return input.value;
    });
    
    console.log(values); // 콘솔에 출력 (또는 다른 처리)
});

function startcalc() {
    seokcha = [];
    man = [];
    dongseokcha = [];
    danwi = [];
    grade = [];
    var inputs = document.querySelectorAll('#inputContainer input');
    
    // 각 입력창의 값을 배열에 저장합니다.
    var values = Array.from(inputs).map(function(input) {
        return input.value;
    });
    

    for (let i = 0; i < (values.length / 4); i++) {
        seokcha.push(values[i*4]*1);
        man.push(values[i*4+1]*1);
        dongseokcha.push(values[i*4+2]*1);
        danwi.push(values[i*4+3]*1);
    }



    for (let j = 0; j < seokcha.length; j++) {
        middleseokcha = seokcha[j] + ((dongseokcha[j] - 1) / 2)
        perc = middleseokcha / man[j];
        
        if(perc <= 0.04) {
            grade.push(1);
        } else if(perc > 0.04 && perc <= 0.11) {
            grade.push(2);
        } else if(perc > 0.11 && perc <= 0.23) {
            grade.push(3);
        } else if(perc > 0.23 && perc <= 0.40) {
            grade.push(4);
        } else if(perc > 0.40 && perc <= 0.60) {
            grade.push(5);
        } else if(perc > 0.60 && perc <= 0.77) {
            grade.push(6);
        } else if(perc > 0.77 && perc <= 0.89) {
            grade.push(7);
        } else if(perc > 0.89 && perc <= 0.96) {
            grade.push(8);
        } else if(perc > 0.96) {
            grade.push(9);
        }
    }
    console.log(grade);

    for(let k = 0; k < grade.length; k++) {
        let resultisu = danwi.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        calcpoint[k] = (danwi[k] * grade[k]) / resultisu;
    }

    const sresults = document.getElementById('results');
    sresults.innerHTML = `<h3>결과:</h3><br><h4>`;
    for(let g = 0; g < seokcha.length; g++) {
        sresults.innerHTML += `${g+1}번째 과목: ${grade[g]}등급 / ${danwi[g]}단위(${seokcha[g]}(${dongseokcha[g]})/${man[g]}등)<br>`;
    }
    sresults.innerHTML += `</h4>`;
    let pyeong = calcpoint.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    sresults.innerHTML += `<h2>총 내신등급: ${pyeong.toFixed(3)}</h2><br><input type=\"button\" onclick=\"location.reload()\" value=\"다시하기\">`;
}