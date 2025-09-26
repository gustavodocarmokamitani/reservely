export const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatYearMonth = (data: string) => {
  const mesesPt = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];
  const [year, month] = data.split("-");
  return `${mesesPt[parseInt(month, 10) - 1]}/${year}`;
};

export const formatDataMonth = (data: string) => {
  const mesesPt = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];
  
  // 1. Extrai apenas a parte da data (YYYY-MM-DD), ignorando 'T' e o restante.
  // Se a entrada for "2025-09-23T21:40:12.4084780Z", dataOnly será "2025-09-23".
  const dataOnly = data.split('T')[0];

  // 2. Agora o split com '-' funciona corretamente.
  const [year, month, day] = dataOnly.split("-");
  
  // Converte o mês para índice (0-11)
  const monthIndex = parseInt(month, 10) - 1;

  // Verificação de segurança
  if (monthIndex < 0 || monthIndex >= mesesPt.length) {
      return `${day} ${month}/${year}`; // Retorna a data em formato dd/mm/aaaa como fallback
  }

  // Retorna no formato: DD Mês AAAA (Ex: "23 Set 2025")
  return `${day} ${mesesPt[monthIndex]} ${year}`;
};

export const formatCurrencyBRL = (valor: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(valor);
};

export const formatToBRL = (value: string) => {
  const numberValue = parseFloat(value) / 100;
  return numberValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const formatToHourMinute = (value: number): string => {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
};