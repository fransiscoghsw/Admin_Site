import { Tabs } from "flowbite-react";
import { formatDate } from "../../../utils/formatDate";
import { formatRupiah } from "../../../utils/formatRupiah";
import {
  PiCalendarCheckDuotone,
  PiCalendarDotsDuotone,
  PiCalendarXDuotone,
  PiMoneyWavyDuotone,
  PiPercent,
  PiTargetDuotone,
  PiUserBold,
  PiUsersThreeBold,
} from "react-icons/pi";

const InvestasiTabs = ({ formInvestment, addressOptions }) => {
  return (
    <Tabs aria-label="Pills" variant="pills">
      <Tabs.Item active title="Tentang Bisnis">
        <div>
          <div className="format min-w-full">
            <p
              className="text-black"
              dangerouslySetInnerHTML={{
                __html: formInvestment.description,
              }}
            ></p>
          </div>
          <h3 className="text-2xl mb-4 font-semibold">Penggunaan Dana</h3>
          {addressOptions.title}
        </div>
      </Tabs.Item>

      <Tabs.Item title="Profil Bisnis">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 p-1">
              <PiCalendarCheckDuotone className="w-full h-full" />
            </div>
            <div>
              <p className="text-lg font-medium">Tanggal Dibuka</p>
              <p>{formatDate(formInvestment.openingDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 p-1">
              <PiCalendarXDuotone className="w-full h-full" />
            </div>
            <div>
              <p className="text-lg font-medium">Tanggal Ditutup</p>
              <p>{formatDate(formInvestment.closingDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 p-1">
              <PiTargetDuotone className="w-full h-full" />
            </div>
            <div>
              <p className="text-lg font-medium">Target Pendanaan</p>
              <p>{formatRupiah(formInvestment.fundingTarget)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 p-1">
              <PiPercent className="w-full h-full" />
            </div>
            <div>
              <p className="text-lg font-medium">Bagi Hasil</p>
              <p>{formInvestment.profitSharingPercentage}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 p-1">
              <PiCalendarDotsDuotone className="w-full h-full" />
            </div>
            <div>
              <p className="text-lg font-medium">Tenor</p>
              <p>{formInvestment.tenor}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 p-1">
              <PiCalendarCheckDuotone className="w-full h-full" />
            </div>
            <div>
              <p className="text-lg font-medium">Pembayaran Bagi Hasil</p>
              <p>{formInvestment.profitSharingPayment}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 p-2">
              <PiMoneyWavyDuotone className="w-full h-full" />
            </div>
            <div>
              <p className="text-lg font-medium">Minimum Investasi</p>
              <p>{formatRupiah(formInvestment.minimumInvestment)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 p-2">
              <PiMoneyWavyDuotone className="w-full h-full" />
            </div>
            <div>
              <p className="text-lg font-medium">Maksimum Investasi</p>
              <p>{formatRupiah(formInvestment.maximumInvestment)}</p>
            </div>
          </div>
        </div>
      </Tabs.Item>

      <Tabs.Item title="Investor">
        <h3 className="text-2xl font-semibold mb-4">
          Investor ({formInvestment.transaction.length})
        </h3>

        <div className="flex flex-col gap-4">
          {formInvestment.transaction.map((investor) => (
            <div key={investor.investorId} className="flex gap-3 items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden p-2">
                {investor.profilePhoto ? (
                  <img
                    src={investor.profilePhoto}
                    alt={investor.fullname}
                    className="w-full h-full"
                  />
                ) : investor.investorType === "organisasi" ? (
                  <PiUsersThreeBold className="w-full h-full" />
                ) : (
                  <PiUserBold className="w-full h-full" />
                )}
              </div>

              <div className="grow">
                <p className="text-lg font-medium">{investor.fullname}</p>
                <p>{investor.investorType}</p>
              </div>
              <div className="bg-gray-200 text-slate-900 font-semibold text-lg text-center py-1 min-w-36 max-w-fit rounded-3xl">
                {formatRupiah(investor.totalInvestment)}
              </div>
            </div>
          ))}
        </div>
      </Tabs.Item>
    </Tabs>
  );
};

export default InvestasiTabs;
