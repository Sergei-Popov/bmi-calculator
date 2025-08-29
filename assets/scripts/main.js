const data = {
  russian: {
    categoriesBMI: [
      'Выраженный дефицит массы тела',
      'Недостаточная (дефицит) масса тела',
      'Норма',
      'Избыточная масса тела (предожирение)',
      'Ожирение первой степени',
      'Ожирение второй степени',
      'Ожирение третьей степени (морбидное)',
    ],
  },
  english: {
    categoriesBMI: [
      'Severe underweight',
      'Underweight',
      'Normal',
      'Overweight (pre-obesity)',
      'Obesity Class I',
      'Obesity Class II',
      'Obesity Class III (morbid)',
    ],
  },
};

document.addEventListener('DOMContentLoaded', function () {
  // const cisLocales = [
  //   'ru',
  //   'uk',
  //   'be',
  //   'kk',
  //   'uz',
  //   'ky',
  //   'tg',
  //   'tk',
  //   'az',
  //   'hy',
  //   'ka',
  // ];

  // let localData = cisLocales.includes(navigator.language.slice(0, 2)) ? data.russian : data.english;

  let localData = data.english;

  // Переключение между метрической и имперской системами
  const checkboxMetric = document.getElementById('metric');
  const checkboxImperial = document.getElementById('imperial');

  const calculatorMetric = document.querySelector(
    '.calculator__input-group--metric'
  );
  const calculatorImperial = document.querySelector(
    '.calculator__input-group--imperial'
  );

  // Для расчета ИМТ
  const inputHeightMetric = document.getElementById('height-metric');
  const inputWeightMetric = document.getElementById('weight-metric');
  const inputHeightFT = document.getElementById('height-ft');
  const inputHeightIN = document.getElementById('height-in');
  const inputWeightST = document.getElementById('weight-st');
  const inputWeightLBS = document.getElementById('weight-lbs');

  const calculatorResultScore = document.querySelector(
    '.calculator__result-score'
  );
  const calculatorResultClassification = document.querySelector(
    '.calculator__result-classification'
  );
  const calculatorIdealWeightMin = document.querySelector(
    '.calculator__ideal-weight-min'
  );
  const calculatorIdealWeightMax = document.querySelector(
    '.calculator__ideal-weight-max'
  );

  checkboxMetric.checked = true;

  function toggleCalculator() {
    if (checkboxMetric.checked) {
      calculatorMetric.style.display = 'flex';
      calculatorImperial.style.display = 'none';
    } else {
      calculatorMetric.style.display = 'none';
      calculatorImperial.style.display = 'flex';
    }
  }

  toggleCalculator();

  checkboxMetric.addEventListener('change', function () {
    if (this.checked) {
      checkboxImperial.checked = false;
      inputHeightFT.value = '';
      inputHeightIN.value = '';
      inputWeightST.value = '';
      inputWeightLBS.value = '';
      if (calculatorResultScore.textContent !== '--') {
        calculatorResultScore.textContent = '--';
        calculatorIdealWeightMin.textContent = '--';
        calculatorIdealWeightMax.textContent = '--';
      }
    }
    toggleCalculator();
  });

  checkboxImperial.addEventListener('change', function () {
    if (this.checked) {
      checkboxMetric.checked = false;
      inputHeightMetric.value = '';
      inputWeightMetric.value = '';
      if (calculatorResultScore.textContent !== '--') {
        calculatorResultScore.textContent = '--';
        calculatorIdealWeightMin.textContent = '--';
        calculatorIdealWeightMax.textContent = '--';
      }
    }
    toggleCalculator();
  });

  // Расчет ИМТ в метрической системе
  function calculateMetricBMI(weight, height) {
    return weight / (height * height);
  }

  // Расчет ИМТ в имперской системе
  function calculateBMIImperial(ft, inch, st, lbs) {
    // Переводим рост в дюймы
    const heightInches = ft * 12 + inch;
    // Переводим вес в фунты
    const weightPounds = st * 14 + lbs;
    // Формула BMI для имперской системы
    let bmi;
    bmi = (weightPounds / (heightInches * heightInches)) * 703;
    return bmi;
  }

  function resultClassification(result, height) {
    if (result <= 16) {
      return localData.categoriesBMI[0];
    } else if (result > 16 && result <= 18.5) {
      const minBMI = 16;
      const maxBMI = 18.5;
      const minWeight = minBMI * height * height;
      const maxWeight = maxBMI * height * height;
      return [
        localData.categoriesBMI[1],
        { min: minWeight.toFixed(1), max: maxWeight.toFixed(1) },
      ];
    } else if (result > 18.5 && result <= 24.99) {
      const minBMI = 18.5;
      const maxBMI = 24.99;
      const minWeight = minBMI * height * height;
      const maxWeight = maxBMI * height * height;
      return [
        localData.categoriesBMI[2],
        { min: minWeight.toFixed(1), max: maxWeight.toFixed(1) },
      ];
    } else if (result >= 25 && result <= 29.99) {
      const minBMI = 25;
      const maxBMI = 29.99;
      const minWeight = minBMI * height * height;
      const maxWeight = maxBMI * height * height;
      return [
        localData.categoriesBMI[3],
        { min: minWeight.toFixed(1), max: maxWeight.toFixed(1) },
      ];
    } else if (result >= 30 && result <= 34.99) {
      const minBMI = 30;
      const maxBMI = 34.99;
      const minWeight = minBMI * height * height;
      const maxWeight = maxBMI * height * height;
      return [
        localData.categoriesBMI[4],
        { min: minWeight.toFixed(1), max: maxWeight.toFixed(1) },
      ];
    } else if (result >= 35 && result <= 39.99) {
      const minBMI = 35;
      const maxBMI = 39.99;
      const minWeight = minBMI * height * height;
      const maxWeight = maxBMI * height * height;
      return [
        localData.categoriesBMI[5],
        { min: minWeight.toFixed(1), max: maxWeight.toFixed(1) },
      ];
    } else {
      const minBMI = 40;
      const maxBMI = 60;
      const minWeight = minBMI * height * height;
      const maxWeight = maxBMI * height * height;
      return [
        localData.categoriesBMI[6],
        { min: minWeight.toFixed(1), max: maxWeight.toFixed(1) },
      ];
    }
  }

  // Отслеживание изменений в инпутах
  function handleChangeInput() {
    const weight = parseFloat(inputWeightMetric.value);
    const height = parseFloat(inputHeightMetric.value);

    const feet = parseFloat(inputHeightFT.value);
    const inches = parseFloat(inputHeightIN.value);
    const stones = parseFloat(inputWeightST.value);
    const pounds = parseFloat(inputWeightLBS.value);

    if (weight && height) {
      const bmi = calculateMetricBMI(weight, height);
      calculatorResultScore.textContent = bmi.toFixed(2);
      calculatorResultClassification.textContent = resultClassification(
        bmi.toFixed(2),
        height
      )[0];
      calculatorIdealWeightMin.textContent = resultClassification(
        bmi.toFixed(2),
        height
      )[1].min;
      calculatorIdealWeightMax.textContent = resultClassification(
        bmi.toFixed(2),
        height
      )[1].max;
    } else if (feet && inches && stones && pounds) {
      const bmi = calculateBMIImperial(feet, inches, stones, pounds);
      calculatorResultScore.textContent = bmi.toFixed(2);
      const height = (feet * 30.48 + inches * 2.54).toFixed(2) / 100;
      calculatorResultClassification.textContent = resultClassification(
        bmi.toFixed(2),
        height
      )[0];
      calculatorIdealWeightMin.textContent = resultClassification(
        bmi.toFixed(2),
        height
      )[1].min;
      calculatorIdealWeightMax.textContent = resultClassification(
        bmi.toFixed(2),
        height
      )[1].max;
    } else {
      calculatorResultScore.textContent = '--';
    }
  }

  inputHeightMetric.addEventListener('input', handleChangeInput);
  inputWeightMetric.addEventListener('input', handleChangeInput);

  inputHeightFT.addEventListener('input', handleChangeInput);
  inputHeightIN.addEventListener('input', handleChangeInput);
  inputWeightST.addEventListener('input', handleChangeInput);
  inputWeightLBS.addEventListener('input', handleChangeInput);
});
