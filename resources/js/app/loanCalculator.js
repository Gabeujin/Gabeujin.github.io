// HUG 든든전세주택 대출 계산기 JavaScript

class LoanCalculator {
    constructor() {
        this.data = {
            defaultAsset: 50000000, // 기본 개인 자산 (5천만원)
            interestRates: {
                basic: 0.025,
                preferential: 0.018
            },
            loanRatioRange: {
                min: 20,
                max: 80,
                default: 80
            }
        };
        
        this.elements = {
            personalAsset: document.getElementById('personalAsset'),
            deposit: document.getElementById('deposit'),
            loanRatio: document.getElementById('loanRatio'),
            loanRatioValue: document.getElementById('loanRatioValue'),
            loanAmount: document.getElementById('loanAmount'),
            requiredCapital: document.getElementById('requiredCapital'),
            monthlyInterest: document.getElementById('monthlyInterest'),
            statusIndicator: document.getElementById('statusIndicator'),
            interestRateInputs: document.querySelectorAll('input[name="interestRate"]')
        };
        
        this.init();
    }
    
    init() {
        this.setDefaultValues();
        this.bindEvents();
        this.calculate();
    }
    
    setDefaultValues() {
        // 개인 자산 기본값 설정
        this.elements.personalAsset.value = this.formatNumber(this.data.defaultAsset);
        
        // 대출 비율 슬라이더 기본값 설정
        this.elements.loanRatio.value = this.data.loanRatioRange.default;
        this.elements.loanRatioValue.textContent = this.data.loanRatioRange.default;
    }
    
    bindEvents() {
        // 숫자 입력 필드 이벤트
        this.elements.personalAsset.addEventListener('input', (e) => {
            this.handleNumberInput(e);
            this.validateInputs(); // 추가
            this.calculate();
        });
        this.elements.deposit.addEventListener('input', (e) => {
            this.handleNumberInput(e);
            this.validateInputs(); // 추가
            this.calculate();
        });
        // 대출 비율 슬라이더 이벤트
        this.elements.loanRatio.addEventListener('input', (e) => {
            this.elements.loanRatioValue.textContent = e.target.value;
            this.calculate();
        });
        // 금리 선택 이벤트
        this.elements.interestRateInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.calculate();
            });
        });
    }
    
    handleNumberInput(event) {
        let value = event.target.value;
        
        // 숫자가 아닌 문자 제거 (콤마 제외)
        value = value.replace(/[^\d,]/g, '');
        
        // 기존 콤마 제거
        const numericValue = value.replace(/,/g, '');
        
        // 숫자가 있을 때만 포맷팅
        if (numericValue) {
            event.target.value = this.formatNumber(parseInt(numericValue));
        } else {
            event.target.value = '';
        }
    }
    
    formatNumber(number) {
        if (isNaN(number) || number === null || number === undefined) {
            return '';
        }
        return number.toLocaleString('ko-KR');
    }
    
    parseNumber(value) {
        if (!value) return 0;
        return parseInt(value.replace(/,/g, '')) || 0;
    }
    
    getSelectedInterestRate() {
        const selectedRate = document.querySelector('input[name="interestRate"]:checked');
        return this.data.interestRates[selectedRate.value];
    }
    
    calculate() {
        // 입력값 파싱
        const personalAsset = this.parseNumber(this.elements.personalAsset.value);
        const deposit = this.parseNumber(this.elements.deposit.value);
        const loanRatio = parseInt(this.elements.loanRatio.value) / 100;
        const interestRate = this.getSelectedInterestRate();
        
        // 계산
        const loanAmount = Math.floor(deposit * loanRatio);
        const requiredCapital = deposit - loanAmount;
        const monthlyInterest = Math.floor((loanAmount * interestRate) / 12);
        
        // 결과 표시
        this.updateResults(loanAmount, requiredCapital, monthlyInterest);
        
        // 자산 적정성 평가
        this.updateAssetStatus(personalAsset, requiredCapital);
    }
    
    updateResults(loanAmount, requiredCapital, monthlyInterest) {
        // 대출금액
        this.elements.loanAmount.textContent = loanAmount > 0 
            ? `${this.formatNumber(loanAmount)}원` 
            : '0원';
        
        // 필요 자본
        this.elements.requiredCapital.textContent = requiredCapital > 0 
            ? `${this.formatNumber(requiredCapital)}원` 
            : '0원';
        
        // 월 이자
        this.elements.monthlyInterest.textContent = monthlyInterest > 0 
            ? `${this.formatNumber(monthlyInterest)}원` 
            : '0원';
    }
    
    updateAssetStatus(personalAsset, requiredCapital) {
        const statusElement = this.elements.statusIndicator;
        
        // 입력값이 없는 경우
        if (!personalAsset || !requiredCapital) {
            statusElement.textContent = '입력 대기';
            statusElement.className = 'status status--waiting';
            return;
        }
        
        // 자산 적정성 판단
        if (personalAsset >= requiredCapital) {
            statusElement.textContent = '자산 충분';
            statusElement.className = 'status status--sufficient';
        } else {
            const shortage = requiredCapital - personalAsset;
            statusElement.textContent = `자산 부족 (${this.formatNumber(shortage)}원)`;
            statusElement.className = 'status status--insufficient';
        }
    }
    
    // 입력 유효성 검사
    validateInputs() {
        const personalAsset = this.parseNumber(this.elements.personalAsset.value);
        const deposit = this.parseNumber(this.elements.deposit.value);
        
        // 최대 보증금 한도 확인 (서울 2억, 지방 1.5억)
        const maxDeposit = 200000000; // 최대값으로 설정
        
        if (deposit > maxDeposit) {
            alert(`보증금은 최대 ${this.formatNumber(maxDeposit)}원까지 입력 가능합니다.`);
            this.elements.deposit.value = this.formatNumber(maxDeposit);
            return false;
        }
        
        return true;
    }
    
    // 시나리오 테스트용 메서드
    setScenario(deposit, loanRatio) {
        this.elements.deposit.value = this.formatNumber(deposit);
        this.elements.loanRatio.value = loanRatio;
        this.elements.loanRatioValue.textContent = loanRatio;
        this.calculate();
    }
}

// 애플리케이션 초기화
// document.addEventListener('DOMContentLoaded', () => {
//     const calculator = new LoanCalculator();
    
//     // 전역에서 접근 가능하도록 설정 (테스트용)
//     window.loanCalculator = calculator;
    
//     // 예시 시나리오 버튼 추가 (선택사항)
//     const addExampleButtons = () => {
//         const examples = [
//             { deposit: 150000000, loanRatio: 80, description: '안정형 계획' },
//             { deposit: 200000000, loanRatio: 80, description: '최대형 계획' }
//         ];
        
//         // 예시 버튼은 UI에 추가하지 않고 콘솔에서 테스트 가능하도록 함
//         console.log('사용 가능한 예시 시나리오:');
//         examples.forEach((example, index) => {
//             console.log(`${index + 1}. ${example.description}: loanCalculator.setScenario(${example.deposit}, ${example.loanRatio})`);
//         });
//     };
    
//     addExampleButtons();
// });

// 수정된 코드
function loanCalculatorInit() {
	const calculator = new LoanCalculator();

	// 전역에서 접근 가능하도록 설정 (테스트용)
	window.loanCalculator = calculator;

	// 예시 시나리오 버튼 추가 (선택사항)
	const addExampleButtons = () => {
		const examples = [
			{ deposit: 150000000, loanRatio: 80, description: '안정형 계획' },
			{ deposit: 200000000, loanRatio: 80, description: '최대형 계획' }
		];

		// 예시 버튼은 UI에 추가하지 않고 콘솔에서 테스트 가능하도록 함
		console.log('사용 가능한 예시 시나리오:');
		examples.forEach((example, index) => {
			console.log(`${index + 1}. ${example.description}: loanCalculator.setScenario(${example.deposit}, ${example.loanRatio})`);
		});
	};

	addExampleButtons();

    // 접근성 개선을 위한 키보드 네비게이션 개선 코드
    const sliderElement = document.getElementById('loanRatio');

    sliderElement.addEventListener('keydown', (e) => {
        let currentValue = parseInt(e.target.value);

        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowDown':
                e.preventDefault();
                if (currentValue > 20) {
                    e.target.value = Math.max(20, currentValue - 5);
                    e.target.dispatchEvent(new Event('input'));
                }
                break;
            case 'ArrowRight':
            case 'ArrowUp':
                e.preventDefault();
                if (currentValue < 80) {
                    e.target.value = Math.min(80, currentValue + 5);
                    e.target.dispatchEvent(new Event('input'));
                }
                break;
            case 'Home':
                e.preventDefault();
                e.target.value = 20;
                e.target.dispatchEvent(new Event('input'));
                break;
            case 'End':
                e.preventDefault();
                e.target.value = 80;
                e.target.dispatchEvent(new Event('input'));
                break;
        }
    });
}

// 유틸리티 함수들
const utils = {
    // 숫자 포맷팅
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('ko-KR', {
            style: 'currency',
            currency: 'KRW'
        }).format(amount);
    },
    
    // 퍼센트 포맷팅
    formatPercent: (value) => {
        return new Intl.NumberFormat('ko-KR', {
            style: 'percent',
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }).format(value / 100);
    },
    
    // 디바운싱 함수
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// 접근성 개선
// document.addEventListener('DOMContentLoaded', () => {
//     // 키보드 네비게이션 개선
//     const sliderElement = document.getElementById('loanRatio');
//     sliderElement.addEventListener('keydown', (e) => {
//         let currentValue = parseInt(e.target.value);
//         switch(e.key) {
//             case 'ArrowLeft':
//             case 'ArrowDown':
//                 e.preventDefault();
//                 if (currentValue > 20) {
//                     e.target.value = Math.max(20, currentValue - 5);
//                     e.target.dispatchEvent(new Event('input'));
//                 }
//                 break;
//             case 'ArrowRight':
//             case 'ArrowUp':
//                 e.preventDefault();
//                 if (currentValue < 80) {
//                     e.target.value = Math.min(80, currentValue + 5);
//                     e.target.dispatchEvent(new Event('input'));
//                 }
//                 break;
//             case 'Home':
//                 e.preventDefault();
//                 e.target.value = 20;
//                 e.target.dispatchEvent(new Event('input'));
//                 break;
//             case 'End':
//                 e.preventDefault();
//                 e.target.value = 80;
//                 e.target.dispatchEvent(new Event('input'));
//                 break;
//         }
//     });
// });