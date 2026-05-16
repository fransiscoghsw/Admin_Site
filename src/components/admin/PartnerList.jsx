import Alert from "../common/Alert";
import PartnerItem from "./PartnerItem";

const PartnerList = (props) => {
    const { partners, openModal } = props;

    return (
        <>
            {Array.isArray(partners) && partners.length > 0 ? (
                <div className="grid grid-cols-4 gap-x-9 gap-y-8 mb-4">
                    {partners.map((partner) => (
                        <PartnerItem
                            key={partner.id}
                            {...partner}
                            openModal={openModal}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center">
                    <Alert
                        message={"Tidak ada partner yang tersedia."}
                        type={"info"}
                    />
                </div>
            )}
        </>
    );
};

export default PartnerList;
