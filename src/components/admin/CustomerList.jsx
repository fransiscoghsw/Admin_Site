import Alert from "../common/Alert";
import CustomerItem from "./CustomerItem";

const CustomerList = (props) => {
    const { customers, openModal } = props;

    return (
        <>
            {Array.isArray(customers) && customers.length > 0 ? (
                <div className="grid grid-cols-4 gap-x-9 gap-y-8 mb-4">
                    {customers.map((customer) => (
                        <CustomerItem
                            key={customer.id}
                            {...customer}
                            openModal={openModal}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center">
                    <Alert
                        message={"Tidak ada customer yang tersedia."}
                        type={"info"}
                    />
                </div>
            )}
        </>
    );
};

export default CustomerList;
