import { format } from "date-fns";
import { id } from "date-fns/locale";
import PropTypes from "prop-types";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Pastikan ini diimpor
import "react-date-range/dist/theme/default.css"; // Pastikan ini diimpor
import { useEffect } from "react";

const FilterSection = ({
  filters,
  onFilterChange,
  dateRange,
  onDateRangeChange,
  showDatePicker,
  setShowDatePicker,
  isDateSelected,
  setIsDateSelected,
  setDateRange,
}) => {
  const customLocale = {
    ...id,
    formatDistance: id.formatDistance,
    formatRelative: id.formatRelative,
    localize: {
      ...id.localize,
      month: (n) => {
        const months = [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ];
        return months[n];
      },
    },
    options: {
      ...id.options,
      weekStartsOn: 1,
    },
  };

  // Custom styles untuk komponen DateRange
  const dateRangeCustomStyles = {
    dayCell: {
      width: "40px",
      height: "40px",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    monthWrapper: {
      padding: "10px",
    },
  };

  // Tambahkan useEffect untuk memproses perubahan filter
  useEffect(() => {
    if (isDateSelected) {
      const dateFilter = {
        startDate: format(dateRange[0].startDate, "yyyy-MM-dd"),
        endDate: format(dateRange[0].endDate, "yyyy-MM-dd"),
      };
      onFilterChange({
        target: {
          name: "dateFilter",
          value: dateFilter,
        },
      });
    } else {
      // Reset date filter when no date is selected
      onFilterChange({
        target: {
          name: "dateFilter",
          value: null,
        },
      });
    }
  }, [isDateSelected, dateRange, onFilterChange]);

  // Handle perubahan status secara eksplisit
  const handleStatusChange = (e) => {
    onFilterChange(e);
    // Trigger filter langsung saat status berubah
    const newStatus = e.target.value;
    if (filters.onStatusChange) {
      filters.onStatusChange(newStatus);
    }
  };

  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Search Investasi */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Judul Investasi
        </label>
        <input
          type="text"
          name="searchInvestasi"
          value={filters.searchInvestasi}
          onChange={onFilterChange}
          className="block px-4 py-2.5 w-full text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-[#B87817] focus:border-[#B87817] focus:outline-none"
          placeholder="Cari investasi..."
        />
      </div>

      {/* Search Investor */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Nama Investor
        </label>
        <input
          type="text"
          name="searchInvestor"
          value={filters.searchInvestor}
          onChange={onFilterChange}
          className="block px-4 py-2.5 w-full text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-[#B87817] focus:border-[#B87817] focus:outline-none"
          placeholder="Cari investor..."
        />
      </div>

      {/* Date Range Picker */}
      <div className="relative">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Rentang Tanggal
        </label>
        <div className="relative">
          <input
            type="text"
            className="block px-4 py-2.5 w-full text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-[#B87817] focus:border-[#B87817] focus:outline-none cursor-pointer"
            placeholder="Pilih rentang tanggal"
            value={
              isDateSelected
                ? `${format(dateRange[0].startDate, "dd MMM yyyy", {
                    locale: id,
                  })} - ${format(dateRange[0].endDate, "dd MMM yyyy", {
                    locale: id,
                  })}`
                : ""
            }
            onClick={() => setShowDatePicker(!showDatePicker)}
            readOnly
          />
          {isDateSelected && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDateSelected(false);
                setDateRange([
                  {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: "selection",
                  },
                ]);
              }}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>

        {showDatePicker && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-30"
              onClick={() => setShowDatePicker(false)}
            />
            <div
              className="absolute z-50 left-0 md:left-auto md:right-0 mt-2 bg-white border shadow-lg rounded-2xl overflow-hidden date-range-wrapper"
              style={{ width: "360px" }}
            >
              <div className="p-3 bg-[#F8F9FA] border-b text-center font-medium text-gray-700">
                Pilih Rentang Tanggal
              </div>
              <div className="custom-date-range">
                <style>
                  {`
                    .custom-date-range .rdrMonth {
                      width: 100% !important;
                    }
                    .custom-date-range .rdrDay {
                      width: 40px !important;
                      height: 40px !important;
                    }
                    .custom-date-range .rdrDayNumber {
                      font-size: 14px !important;
                      font-weight: 500 !important;
                      top: 0 !important;
                      bottom: 0 !important;
                      left: 0 !important;
                      right: 0 !important;
                      display: flex !important;
                      align-items: center !important;
                      justify-content: center !important;
                    }
                    .custom-date-range .rdrDayNumber span {
                      position: static !important;
                    }
                    .custom-date-range .rdrDayToday .rdrDayNumber span:after {
                      bottom: 6px !important;
                    }
                    .custom-date-range .rdrWeekDay {
                      font-size: 13px !important;
                      line-height: 2.6 !important;
                      font-weight: 500 !important;
                      color: #666 !important;
                    }
                    .custom-date-range .rdrMonthAndYearWrapper {
                      height: 50px !important;
                      padding-top: 10px !important;
                    }
                    .custom-date-range .rdrMonthAndYearPickers select {
                      font-size: 14px !important;
                      font-weight: 500 !important;
                      color: #333 !important;
                    }
                  `}
                </style>
                <DateRange
                  ranges={dateRange}
                  onChange={onDateRangeChange}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  locale={customLocale}
                  months={1}
                  showSelectionPreview={true}
                  showPreview={true}
                  rangeColors={["#B87817"]}
                  minDate={new Date("2020-01-01")}
                  maxDate={new Date()}
                  dateDisplayFormat="dd MMM yyyy"
                  className="custom-date-range"
                />
              </div>
              <div className="p-3 border-t flex justify-between">
                <button
                  onClick={() => {
                    setIsDateSelected(false);
                    setDateRange([
                      {
                        startDate: new Date(),
                        endDate: new Date(),
                        key: "selection",
                      },
                    ]);
                    setShowDatePicker(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-[#B87817] bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => {
                    setShowDatePicker(false);
                  }}
                  className="px-4 py-2 text-sm text-white bg-[#B87817] hover:bg-[#A26A15] rounded-xl transition-colors"
                >
                  Terapkan
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Status Filter */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Status Transaksi
        </label>
        <select
          name="status"
          value={filters.statusTransaction}
          onChange={handleStatusChange}
          className="block px-4 py-2.5 w-full text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-[#B87817] focus:border-[#B87817] focus:outline-none"
        >
          <option value="">Semua</option>
          <option value="success">Berhasil</option>
          <option value="failed">Gagal</option>
          <option value="process">Proses</option>
        </select>
      </div>
    </div>
  );
};

FilterSection.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  dateRange: PropTypes.array.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
  showDatePicker: PropTypes.bool.isRequired,
  setShowDatePicker: PropTypes.func.isRequired,
  isDateSelected: PropTypes.bool.isRequired,
  setIsDateSelected: PropTypes.func.isRequired,
  setDateRange: PropTypes.func.isRequired,
};

export default FilterSection;
