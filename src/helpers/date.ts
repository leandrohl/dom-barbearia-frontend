function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0'); // Dia com dois dígitos
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês (0 é janeiro, então adiciona 1)
  const year = date.getFullYear(); // Ano

  return `${day}/${month}/${year}`;
}

export {
  formatDate
}
