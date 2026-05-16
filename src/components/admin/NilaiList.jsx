import Alert from "../common/Alert";
import NilaiItem from "./NilaiItem";

const NilaiList = (props) => {
    const { nilais, openModal } = props;

    return (
        <>
            {Array.isArray(nilais) && nilais.length > 0 ? (
                <div className="grid grid-cols-4 gap-x-9 gap-y-8 mb-4">
                    {nilais.map((nilai) => (
                        <NilaiItem
                            key={nilai.id}
                            {...nilai}
                            openModal={openModal}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center">
                    <Alert
                        message={"Tidak ada nilai yang tersedia."}
                        type={"info"}
                    />
                </div>
            )}
        </>
    );
};

export default NilaiList;
