import PropTypes from "prop-types";
import Modal from "../admin/Modal";
import { Tabs } from "flowbite-react";
import { useEffect } from "react";
import DefaultMaleUser from "../../assets/images/icons/default-male-user.svg";
import Text from "../../components/input/Text";
import ImageInput from "../../components/input/ImageInput";

const Detail = ({ title, data, groups, onClose }) => {
    useEffect(() => {
        console.log("data : ", data);
    }, []);

    if (!data) return null;

    const hasMultipleGroups = groups.length > 1;

    return (
        <div>
            <Modal.Header title={title} onClose={onClose} />
            <Modal.Body className="md:pb-5 mt-2">
                {hasMultipleGroups ? (
                    // <Tabs aria-label="Detail Tabs" variant="pills">
                    <Tabs aria-label="Pills" variant="pills">
                        {groups.map(({ title, fields }, index) => (
                            <Tabs.Item key={index} title={title}>
                                {fields.map(({ label, key, imageKey }, i) => {
                                    const value =
                                        key
                                            .split(".")
                                            .reduce(
                                                (acc, part) => acc?.[part],
                                                data
                                            ) || "-";

                                    return (
                                        <div key={i}>
                                            {imageKey && value !== "-" ? (
                                                <ImageInput
                                                    label={label}
                                                    isDisabled={true}
                                                    initialImage={`${
                                                        import.meta.env
                                                            .VITE_API_URL
                                                    }/${imageKey}/${value}`}
                                                />
                                            ) : (
                                                <Text
                                                    key={i}
                                                    variant={"disabled"}
                                                    label={label}
                                                    value={value}
                                                    isDisabled={true}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </Tabs.Item>
                        ))}
                    </Tabs>
                ) : (
                    <div className="grid gap-3 text-gray-700">
                        {groups[0].fields.map(({ label, key, imageKey }, i) => {
                            const value =
                                key
                                    .split(".")
                                    .reduce((acc, part) => acc?.[part], data) ||
                                "-";

                            return (
                                <div
                                    key={i}
                                    className="p-2 border-b border-gray-200"
                                >
                                    <span className="font-semibold">
                                        {label}:
                                    </span>
                                    {imageKey && value !== "-" ? (
                                        <img
                                            src={`${
                                                import.meta.env.VITE_API_URL
                                            }/${imageKey}/${value}`}
                                            alt={label}
                                            className="w-32 h-32 object-cover rounded-lg mt-2"
                                            onError={(e) =>
                                                (e.target.src = DefaultMaleUser)
                                            }
                                        />
                                    ) : (
                                        <span className="text-gray-600">
                                            {value}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </Modal.Body>
        </div>
    );
};

Detail.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            fields: PropTypes.arrayOf(
                PropTypes.shape({
                    label: PropTypes.string.isRequired,
                    key: PropTypes.string.isRequired,
                    imageKey: PropTypes.string,
                })
            ).isRequired,
        })
    ).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Detail;
