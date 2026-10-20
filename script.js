const currencies = [
  { code: 'USD', name: 'Dólar Americano', rateToUSD: 1 },
  { code: 'BRL', name: 'Real Brasileiro', rateToUSD: 5.4 },
  { code: 'EUR', name: 'Euro', rateToUSD: 0.92 },
  { code: 'GBP', name: 'Libra Esterlina', rateToUSD: 0.79 },
  { code: 'JPY', name: 'Iene Japonês', rateToUSD: 157.3 },
  { code: 'CAD', name: 'Dólar Canadense', rateToUSD: 1.36 },
  { code: 'AUD', name: 'Dólar Australiano', rateToUSD: 1.51 },
  { code: 'CHF', name: 'Franco Suíço', rateToUSD: 0.88 },
  { code: 'CNY', name: 'Yuan Chinês', rateToUSD: 7.24 },
  { code: 'INR', name: 'Rúpia Indiana', rateToUSD: 83.2 }
];

const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const result = document.getElementById('result');
const rateInfo = document.getElementById('rateInfo');

function populateSelect(select, selectedCode) {
  currencies.forEach((currency) => {
    const option = document.createElement('option');
    option.value = currency.code;
    option.textContent = `${currency.name} (${currency.code})`;
    if (currency.code === selectedCode) option.selected = true;
    select.appendChild(option);
  });
}

function formatMoney(value, currencyCode) {
  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencyCode
    }).format(value);
  } catch {
    return `${currencyCode} ${value.toFixed(2)}`;
  }
}

function convert() {
  const amount = Number(amountInput.value);
  if (Number.isNaN(amount) || amount < 0) {
    result.textContent = 'Valor inválido';
    return;
  }

  const from = currencies.find((c) => c.code === fromCurrency.value);
  const to = currencies.find((c) => c.code === toCurrency.value);

  if (!from || !to) return;

  const usdEquivalent = amount / from.rateToUSD;
  const converted = usdEquivalent * to.rateToUSD;

  const rate = to.rateToUSD / from.rateToUSD;

  result.textContent = formatMoney(converted, to.code);
  rateInfo.textContent = `1 ${from.code} = ${rate.toFixed(4)} ${to.code}`;
}

document.getElementById('convertBtn').addEventListener('click', convert);

document.getElementById('swapBtn').addEventListener('click', () => {
  const previous = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = previous;
  convert();
});

amountInput.addEventListener('input', convert);
fromCurrency.addEventListener('change', convert);
toCurrency.addEventListener('change', convert);

populateSelect(fromCurrency, 'BRL');
populateSelect(toCurrency, 'USD');
convert();
