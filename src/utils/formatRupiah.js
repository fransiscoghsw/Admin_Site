export const formatRupiah = (number) => {
  if (number === null || number === undefined) {
      return "Rp 0";
  }
  
  // Jika input adalah string, bersihkan dari titik terlebih dahulu
  const cleanNumber = typeof number === 'string' 
      ? number.replace(/\./g, '') 
      : number;
  
  // Convert to number
  const amount = Number(cleanNumber);
  
  // Format number
  return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
  }).format(amount);
};