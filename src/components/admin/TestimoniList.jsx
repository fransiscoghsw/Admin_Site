import Alert from "../common/Alert";
import TestimoniItem from "./TestimoniItem";

const TestimoniList = (props) => {
  const { testimonis, openModal } = props;
  return (
    <>
      {Array.isArray(testimonis) && testimonis.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-10 gap-y-8 mb-4">
          {testimonis.map((testimoni) => (
            <TestimoniItem
              key={testimoni.id}
              {...testimoni}
              openModal={openModal}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <Alert
            message={"Tidak ada testimoni yang tersedia."}
            type={"info"}
          />
        </div>
      )}
    </>
  );
};

export default TestimoniList;
