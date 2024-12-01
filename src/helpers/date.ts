function formatDate(dateString: string): string {
  const date = new Date(dateString);

  date.setUTCHours(0, 0, 0, 0);

  const day = String(date.getUTCDate()).padStart(2, '0'); // Dia com dois dígitos
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mês (0 é janeiro, então adiciona 1)
  const year = date.getUTCFullYear(); // Ano

  return `${day}/${month}/${year}`;
}

export {
  formatDate
}
