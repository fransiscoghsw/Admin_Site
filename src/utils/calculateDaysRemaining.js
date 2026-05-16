export const calculateDaysRemaining = (tanggalBerakhir) => {
  const today = new Date();
  const berakhirDate = new Date(tanggalBerakhir);

  // Menghitung selisih waktu dalam milidetik
  const timeDiff = berakhirDate - today;

  // Mengonversi milidetik ke hari
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  // Mengembalikan sisa hari jika > 0, atau 0 jika sudah melewati deadline
  return daysRemaining > 0 ? daysRemaining : "-";
};
