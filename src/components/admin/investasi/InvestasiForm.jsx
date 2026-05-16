import { useState } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import InputError from "../../common/InputError";
import ReactQuill from "react-quill";
import { PiPercent } from "react-icons/pi";

const InvestasiForm = ({
  formInvestment,
  setFormInvestment,
  errors,
  setErrors,
  previewImage,
  setPreviewImage,
  addressOptions,
  modalType,
  validateForm,
  handleInvestmentImageChange,
  handleInvestmentDescriptionChange,
  handleInvestmentTextChange,
}) => {
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  return (
    <>
      <Label htmlFor={"title"} value={"Judul Investasi"} />
      <Input
        type={"text"}
        name={"title"}
        placeholder={"Masukkan title investasi.."}
        variant={"primary-outline"}
        value={formInvestment.title}
        handleChange={handleInvestmentTextChange}
        isError={!!errors.title}
      />
      <InputError message={errors.title} />

      <Label htmlFor={"image"} value={"Gambar"} />
      <div className="mb-4">
        <div
          className={`flex flex-col items-center justify-center w-full py-4 mt-2 h-full border-2 rounded-2xl bg-gray-50 shadow ${
            errors.image ? "border-red-500" : "border-gray-300"
          }`}
        >
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="object-top w-56 h-52 mb-4 object-cover rounded-xl border-2 border-gray-300"
            />
          )}

          <label
            htmlFor="image"
            className={`flex flex-col items-center justify-center w-full cursor-pointer ${
              !previewImage && "h-32"
            }`}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-8 h-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Unggah image di sini</span>
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG atau JPEG
              </p>
            </div>
            <input
              id="image"
              name="image"
              type="file"
              className="hidden"
              onChange={handleInvestmentImageChange}
              accept=".svg,.png,.jpg,.jpeg"
            />
          </label>
        </div>
        <InputError message={errors.image} />
      </div>

      <Label htmlFor={"description"} value={"Deskripsi"} />
      <div
        onFocus={() => setIsDescriptionFocused(true)}
        onBlur={() => setIsDescriptionFocused(false)}
        className={`react-quill-container ${
          isDescriptionFocused ? "focus" : ""
        } ${errors.description ? "border-red-500" : "border-gray-300"}`}
      >
        <ReactQuill
          theme="snow"
          value={formInvestment.description}
          onChange={handleInvestmentDescriptionChange}
        />
      </div>
      <InputError message={errors.description} />

      {/* Profil Bisnis */}
      <div className="grid grid-cols-2 gap-x-4 ">
        <div>
          <Label htmlFor={"farmAddressId"} value={"Alamat Investasi"} />
          {console.log("Modal Type:", modalType)}
          {console.log("Form Investment:", formInvestment)}
          {console.log("Address Options:", addressOptions)}
          <select
            name={"farmAddressId"}
            value={String(formInvestment.farmAddressId || "")}
            onChange={(e) => {
              console.log("Selecting new value:", e.target.value);
              handleInvestmentTextChange(e);
            }}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-2xl block w-full p-2.5 shadow 
                            ${
                              errors.farmAddressId
                                ? "border-red-500"
                                : "border-gray-300"
                            }
                            focus:ring-[#B87817] focus:border-[#B87817]`}
          >
            <option value="">Pilih alamat peternakan..</option>
            {addressOptions?.map((address) => (
              <option
                key={address.id}
                value={String(address.id)}
                selected={
                  String(address.id) === String(formInvestment.farmAddressId)
                }
              >
                {`${address.title}`}
              </option>
            ))}
          </select>
          <InputError message={errors.farmAddressId} />
        </div>
        <div>
          <Label htmlFor={"openingDate"} value={"Tanggal Pembukaan"} />
          <Input
            type={"date"}
            name={"openingDate"}
            variant={"primary-outline"}
            value={formInvestment.openingDate}
            handleChange={handleInvestmentTextChange}
            isError={!!errors.openingDate}
          />
          <InputError message={errors.openingDate} />
        </div>
        <div>
          <Label htmlFor={"closingDate"} value={"Tanggal Berakhir"} />
          <Input
            type={"date"}
            name={"closingDate"}
            variant={"primary-outline"}
            value={formInvestment.closingDate}
            handleChange={handleInvestmentTextChange}
            isError={!!errors.closingDate}
          />
          <InputError message={errors.closingDate} />
        </div>
        <div>
          <Label htmlFor={"fundingTarget"} value={"Target Pendanaan"} />
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 font-medium bg-gray-200 border-2 rounded-e-0 border-gray-300 border-e-0 rounded-s-2xl shadow">
              Rp
            </span>
            <Input
              type={"text"}
              name={"fundingTarget"}
              placeholder={"Masukkan target pendanaan.."}
              variant={"primary-outline"}
              value={formInvestment.fundingTarget}
              handleChange={handleInvestmentTextChange}
              isError={!!errors.fundingTarget}
              className={"rounded-s-none border-s-[1px]"}
            />
          </div>

          <InputError message={errors.fundingTarget} />
        </div>
        <div>
          <Label htmlFor={"tenor"} value={"Tenor"} />
          <div className="relative">
            <Input
              type={"text"}
              name={"tenor"}
              placeholder={"Masukkan tenor.."}
              variant={"primary-outline"}
              value={formInvestment.tenor}
              handleChange={handleInvestmentTextChange}
              isError={!!errors.tenor}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <p className="text-slate-800 text-sm">bulan</p>
            </div>
          </div>

          <InputError message={errors.tenor} />
        </div>
        <div>
          <Label
            htmlFor={"profitSharingPayment"}
            value={"Pembayaran Bagi Hasil"}
          />
          <div className="relative">
            <Input
              type={"text"}
              name={"profitSharingPayment"}
              placeholder={"Masukkan pembayaran bagi hasil.."}
              variant={"primary-outline"}
              value={formInvestment.profitSharingPayment}
              handleChange={handleInvestmentTextChange}
              isError={!!errors.profitSharingPayment}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <p className="text-slate-800 text-sm">/bulan</p>
            </div>
          </div>
          <InputError message={errors.profitSharingPayment} />
        </div>
        <div>
          <Label htmlFor={"profitSharingPercentage"} value={"Bagi Hasil"} />
          <div className="">
            <div className="relative">
              <Input
                type={"text"}
                name={"profitSharingPercentage"}
                placeholder={"Masukkan bagi hasil.."}
                variant={"primary-outline"}
                value={formInvestment.profitSharingPercentage}
                handleChange={handleInvestmentTextChange}
                isError={!!errors.profitSharingPercentage}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <PiPercent className="text-slate-800 w-4 h-4" />
              </div>
            </div>
            <InputError message={errors.profitSharingPercentage} />
          </div>
        </div>
        <div>
          <Label htmlFor={"minimumInvestment"} value={"Minimum Investasi"} />
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 font-medium bg-gray-200 border-2 rounded-e-0 border-gray-300 border-e-0 rounded-s-2xl shadow">
              Rp
            </span>
            <Input
              type={"text"}
              name={"minimumInvestment"}
              placeholder={"Masukkan minimum investasi.."}
              variant={"primary-outline"}
              value={formInvestment.minimumInvestment}
              handleChange={handleInvestmentTextChange}
              isError={!!errors.minimumInvestment}
              className={"rounded-s-none border-s-[1px]"}
            />
          </div>
          <InputError message={errors.minimumInvestment} />
        </div>
        <div>
          <Label htmlFor={"maximumInvestment"} value={"Maksimum Investasi"} />
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 font-medium bg-gray-200 border-2 rounded-e-0 border-gray-300 border-e-0 rounded-s-2xl shadow">
              Rp
            </span>
            <Input
              type={"text"}
              name={"maximumInvestment"}
              placeholder={"Masukkan maksimum investasi.."}
              variant={"primary-outline"}
              value={formInvestment.maximumInvestment}
              handleChange={handleInvestmentTextChange}
              isError={!!errors.maximumInvestment}
              className={"rounded-s-none border-s-[1px]"}
            />
          </div>
          <InputError message={errors.maximumInvestment} />
        </div>
      </div>
    </>
  );
};

export default InvestasiForm;
