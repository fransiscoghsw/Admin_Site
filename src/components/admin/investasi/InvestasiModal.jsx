import Modal from "../../common/Modal";
import InvestasiForm from "./InvestasiForm";
import InvestasiTabs from "./InvestasiTabs";
import { formatRupiah } from "../../../utils/formatRupiah";

const InvestasiModal = ({
  isModalOpen,
  closeModal,
  modalType,
  formInvestment,
  setFormInvestment,
  errors,
  setErrors,
  previewImage,
  setPreviewImage,
  addressOptions,
  validateForm,
  handleInvestmentImageChange,
  handleInvestmentDescriptionChange,
  handleInvestmentTextChange,
  handleAddInvestment,
  handleUpdateInvestment,
  handleDeleteInvestment,
  handleSendProfitSharingNotification,
  showConfirmationModal,
  setShowConfirmationModal,
  setSelectedInvestment,
  isLoading,
  notification,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      size={modalType === "delete_investment" ? "sm" : ""}
    >
      {(modalType === "add_investment" ||
        modalType === "update_investment") && (
        <>
          <Modal.Header
            title={
              modalType === "add_investment"
                ? "Tambah Investasi"
                : "Ubah Investasi"
            }
            onClose={closeModal}
          />
          <Modal.Body>
            <InvestasiForm
              formInvestment={formInvestment}
              setFormInvestment={setFormInvestment}
              errors={errors}
              setErrors={setErrors}
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
              addressOptions={addressOptions}
              modalType={modalType}
              validateForm={validateForm}
              handleInvestmentImageChange={handleInvestmentImageChange}
              handleInvestmentDescriptionChange={
                handleInvestmentDescriptionChange
              }
              handleInvestmentTextChange={handleInvestmentTextChange}
            />
          </Modal.Body>
          <Modal.Footer
            action={modalType === "add_investment" ? "Tambah" : "Ubah"}
            onAction={
              modalType === "add_investment"
                ? handleAddInvestment
                : handleUpdateInvestment
            }
            onClose={closeModal}
          />
        </>
      )}

      {modalType === "delete_investment" && (
        <>
          <Modal.Header title="Hapus Investasi" onClose={closeModal} />
          <Modal.Body>
            <p>Apakah Anda yakin ingin menghapus investasi ini?</p>
          </Modal.Body>
          <Modal.Footer
            action="Hapus"
            onAction={handleDeleteInvestment}
            onClose={closeModal}
          />
        </>
      )}

      {modalType === "detail_investment" && (
        <>
          <Modal.Header title="Detail Investasi" onClose={closeModal} />
          <Modal.Body>
            <div className="max-w-3xl mx-auto">
              <div className="h-96 mb-4 rounded-xl overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_API_URL}/investment/image/${
                    formInvestment.image
                  }`}
                  alt="image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="font-bold text-3xl mb-1">
                    {formInvestment.title}
                  </h2>
                </div>
                {formInvestment.status === "soon" ? (
                  <div className="bg-[#5766CE] font-semibold text-white text-lg text-center py-1 w-32 rounded-3xl">
                    Segera
                  </div>
                ) : formInvestment.status === "open" ? (
                  <div className="bg-[#138A36] font-semibold text-white text-lg text-center py-1 w-32 rounded-3xl">
                    Buka
                  </div>
                ) : formInvestment.status === "finished" ? (
                  <div className="bg-[#8a1713] font-semibold text-white text-lg text-center py-1 w-32 rounded-3xl">
                    Selesai
                  </div>
                ) : formInvestment.status === "process" ? (
                  <div className="bg-[#8a1713] font-semibold text-white text-lg text-center py-1 w-32 rounded-3xl">
                    Proses
                  </div>
                ) : null}
              </div>

              {/* Profit Sharing Notification Button & Form */}
              {formInvestment.status === "process" && (
                <>
                  <div className="mb-8">
                    <button
                      onClick={() => {
                        setSelectedInvestment(formInvestment);
                        setShowConfirmationModal(true);
                      }}
                      className="bg-[#5766CE] hover:bg-[#4555BD] text-white font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Mengirim..."
                        : "Kirim Notifikasi Bagi Hasil"}
                    </button>
                  </div>

                  {/* Notification Alert */}
                  {notification.show && (
                    <div
                      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
                        notification.type === "success"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {notification.message}
                    </div>
                  )}

                  {/* Confirmation Modal */}
                  {showConfirmationModal && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4">
                        <div
                          className="fixed inset-0 bg-black bg-opacity-25"
                          onClick={() => setShowConfirmationModal(false)}
                        />
                        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-10">
                          <div className="mb-6 text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Konfirmasi Pengiriman Notifikasi
                            </h3>
                            <p className="text-sm text-gray-600">
                              Apakah Anda yakin ingin mengirim notifikasi bagi
                              hasil kepada investor?
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() => {
                                setShowConfirmationModal(false);
                                setSelectedInvestment(null);
                              }}
                              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5766CE]"
                              disabled={isLoading}
                            >
                              Batal
                            </button>
                            <button
                              onClick={handleSendProfitSharingNotification}
                              className="px-4 py-2 text-sm font-medium text-white bg-[#5766CE] border border-transparent rounded-md hover:bg-[#4555BD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5766CE]"
                              disabled={isLoading}
                            >
                              {isLoading
                                ? "Mengirim..."
                                : "Ya, Kirim Notifikasi"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="flex items-center justify-between mb-2">
                <div>
                  {formInvestment.status === "selesai" ? (
                    <p className="font-semibold text-2xl text-[#138A36]">
                      {formatRupiah(formInvestment.totalFunding)}
                    </p>
                  ) : (
                    <p className="font-semibold text-2xl text-[#FFA90B]">
                      {formatRupiah(formInvestment.totalFunding)}
                    </p>
                  )}
                  <p>{`dari target dana ${formatRupiah(
                    formInvestment.fundingTarget
                  )}`}</p>
                </div>
                <div className="flex gap-3">
                  {formInvestment.status === "process" && (
                    <div className="flex gap-3">
                      <div className="bg-gray-200 text-slate-900 font-semibold text-lg text-center py-1 w-32 rounded-3xl">
                        {formInvestment?.transaction?.length || 0} investor
                      </div>
                      <div className="bg-[#057a55] text-zinc-100 font-semibold text-lg text-center py-1 w-32 rounded-3xl">
                        {formInvestment?.profitSharing?.[0]?.totalPeriod || 0}x
                        bagi hasil
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full mb-12">
                <div
                  className="font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{
                    width: `${(() => {
                      const totalFunding =
                        typeof formInvestment.totalFunding === "string"
                          ? parseInt(
                              formInvestment.totalFunding.replace(/\./g, "")
                            )
                          : formInvestment.totalFunding || 0;

                      const fundingTarget =
                        typeof formInvestment.fundingTarget === "string"
                          ? parseInt(
                              formInvestment.fundingTarget.replace(/\./g, "")
                            )
                          : formInvestment.fundingTarget || 1;

                      return Math.round((totalFunding / fundingTarget) * 100);
                    })()}%`,
                    backgroundColor: `${
                      formInvestment.status === "selesai"
                        ? "#138A36"
                        : "#FFA90B"
                    }`,
                  }}
                >
                  {(() => {
                    const totalFunding =
                      typeof formInvestment.totalFunding === "string"
                        ? parseInt(
                            formInvestment.totalFunding.replace(/\./g, "")
                          )
                        : formInvestment.totalFunding || 0;

                    const fundingTarget =
                      typeof formInvestment.fundingTarget === "string"
                        ? parseInt(
                            formInvestment.fundingTarget.replace(/\./g, "")
                          )
                        : formInvestment.fundingTarget || 1;

                    return Math.round((totalFunding / fundingTarget) * 100);
                  })()}
                  %
                </div>
              </div>

              <InvestasiTabs
                formInvestment={formInvestment}
                addressOptions={addressOptions}
              />
            </div>
          </Modal.Body>
          <Modal.Footer buttonLabel={"Kembali"} onClose={closeModal} />
        </>
      )}
    </Modal>
  );
};

export default InvestasiModal;
