import Alert from "../common/Alert";
import InvestorItem from "./InvestorItem";

const InvestorList = ({ investors, openModal, handleToggleStatus }) => {
  return (
    <>
      {Array.isArray(investors) && investors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-12">
          {investors.map((investor) => (
            <InvestorItem
              key={investor.id}
              {...investor}
              openModal={openModal}
              handleToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <Alert message={"Tidak ada investor yang tersedia."} type={"info"} />
        </div>
      )}
    </>
  );
};

export default InvestorList;
