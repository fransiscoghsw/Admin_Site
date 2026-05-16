import Alert from "../common/Alert";
import BatchItem from "./BatchItem";

const BatchList = ({ investments, openModal }) => {
  if (!investments || !Array.isArray(investments)) {
    console.log("Invalid investments data:", investments);
    return <div className="flex justify-center">Loading...</div>;
  }

  return (
    <>
      {investments.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-14 gap-y-12">
          {investments.map((investment) => {
            if (!investment || !investment.id) {
              console.log("Invalid investment item:", investment);
              return null;
            }
            return (
              <BatchItem
                key={investment.id}
                {...investment}
                openModal={openModal}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center">
          <Alert message={"Tidak ada investasi yang tersedia."} type={"info"} />
        </div>
      )}
    </>
  );
};

export default BatchList;
